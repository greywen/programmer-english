import * as https from 'https'

import config from "../common/config";
import { WechatJSCodeSessionModel } from '../model';
import logger from './logger';

export async function getWechatJSCodeSession(code: string): Promise<WechatJSCodeSessionModel> {
    try {
        return await httpsRequestAsync(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.wechat.appId}&secret=${config.wechat.appSecret}&js_code=${code}&grant_type=authorization_code`)
    }
    catch (err) {
        logger.error("getWechatJSCodeSession error");
        throw err;
    }
}

async function httpsRequestAsync(url: string): Promise<any | {}> {
    return await new Promise(function (resolve, reject) {
        let result = ''
        let req = https.request(url, function (res) {
            res.on('data', function (chunk) {
                result += chunk
            })

            res.on('end', function () {
                resolve(JSON.parse(result))
            })
        })

        req.on('error', (e) => {
            reject(e.message)
        });
        req.end()
    })
} 