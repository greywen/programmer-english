import * as request from 'request';
import * as cheerio from "cheerio";

import { MD5 } from "./md5";
import { TranslateType } from '../common/enums';
import logger from './logger';
import config from '../common/config';

export async function translate(text: string, type: TranslateType): Promise<ITranslateResultModel> {
    return await new Promise<ITranslateResultModel>(function (resolve, reject) {
        if (!text) {
            resolve(null);
        }

        if (type === TranslateType.Sentence) {
            let appid = config.baidu.translateAppId;
            let key = config.baidu.translateKey;
            let salt = (new Date).getTime();
            var sign = MD5(appid + text + salt + key);
            request.get({
                url: `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${text}&appid=${appid}&salt=${salt}&from=en&to=zh&sign=${sign}`,
                json: true
            }, (err, response, body: IBaiduTranslateAPIResultModel) => {
                if (!err && response.statusCode == 200 && body.trans_result) {
                    resolve({ english: text, chinese: body.trans_result[0].dst });
                } else {
                    logger.error(`${err},${body}`);
                    resolve(null);
                }
            });
        }

        if (type === TranslateType.Word) {
            let url = `https://cn.bing.com/dict/search?q=${text.replace(/ /g, "%20")}`
            request.get(url, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    let $ = cheerio.load(body);
                    let english = $("#headword h1").text();
                    let phonetic = $(".hd_prUS").text().replace("美", "");
                    let chinese = $("ul li .web").next().text();
                    resolve({ english: english, phonetic: phonetic, chinese: chinese });
                }
            })
        }
    })
}

interface ITranslateResultModel {
    english: string,
    phonetic?: string,
    chinese: string
}

interface IBaiduTranslateAPIResultModel {
    error_code?: string,
    error_msg?: string,
    trans_result?: { src: string, dst: string }[],
    from: string,
    to: string
}