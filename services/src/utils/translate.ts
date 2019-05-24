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

        if (type == TranslateType.Sentence) {
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

        if (type == TranslateType.Word) {
            let url = `https://cn.bing.com/dict/search?q=${text.replace(/ /g, "%20")}`
            request.get(url, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    let $ = cheerio.load(body);
                    let english = $("#headword h1").text();
                    let phoneticUS = $(".hd_prUS").text().trim();
                    let phoneticEN = $(".hd_pr").text().trim();
                    let chinese = $("ul li .web").next().text();
                    let chineseV = $("div.qdef > ul > li:nth-child(1) > span.def > span")[0].children[0].data;
                    let chineseN = $("div.qdef > ul > li:nth-child(2) > span.def > span")[0].children[0].data;
                    let collocation = [];
                    let matchElement = $("#colid");
                    matchElement.children().map((index) => {
                        $(`#colid > div:nth-child(${index + 1}) > div.col_fl > a >span`).map((i, m) => {
                            collocation.push(m.children[0].data);
                        });
                    })
                    resolve({ english: english, chinese: chinese, chineseV: chineseV, chineseN: chineseN, phoneticEN: phoneticEN, phoneticUS: phoneticUS, collocation: collocation.join("；") });
                }
            })
        }
    })
}

interface ITranslateResultModel {
    english: string,
    phonetic?: string,
    chinese: string,
    chineseV?: string,
    chineseN?: string,
    phoneticEN?: string,
    phoneticUS?: string,
    collocation?: string
}

interface IBaiduTranslateAPIResultModel {
    error_code?: string,
    error_msg?: string,
    trans_result?: { src: string, dst: string }[],
    from: string,
    to: string
}