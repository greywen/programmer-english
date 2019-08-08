import * as request from 'request'

import { IBaiduAuthModel } from "../model";
import logger from "./logger";
import config from "../common/config";

export async function getBaiduApiTokenAsync(): Promise<IBaiduAuthModel> {
    let url = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${config.baidu.clientId}&client_secret=${config.baidu.clientSecret}`
    return await new Promise<IBaiduAuthModel>(async function (resolve, reject) {
        request.get(url, function (error, response, body) {
            let data = <IBaiduAuthModel>JSON.parse(body)
            if (error || data.error) {
                logger.error(data.error);
                // todo:get baidu api token error
                // reject
            }
            // redis.setAsync('baiduapitoken', JSON.stringify(body));
            // redis.expire('baiduapitoken', 2592000);
            resolve(data);
        })
    })
}