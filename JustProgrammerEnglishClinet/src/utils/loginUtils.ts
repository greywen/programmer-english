import Taro from "@tarojs/taro";

import config from '../common/config';

export async function login(userInfo?: UserInfo) {
    let wechatAuthorized = await Taro.login();
    if (wechatAuthorized.errMsg !== "login:ok") {
        return null;
    }

    let loginResult = await Taro.request({
        url: config.baseUrl + "user/login",
        data: { code: wechatAuthorized.code, wechatUserInfo: userInfo },
        header: {
            "Content-Type": "application/json"
        },
        method: "POST",
    });

    if (loginResult.data) {
        Taro.setStorageSync("authorized", loginResult.data);
        return loginResult.data;
    }
    else {
        return null;
    }
}

export function getToken() {
    let authorized: AuthorizedModel = Taro.getStorageSync("authorized");
    return authorized["token"];
}

export function isAuthorized() {
    return !!Taro.getStorageSync("authorized")["token"];
}

export function getUserResource(): number[] {
    return Taro.getStorageSync("authorized")["resourceIds"] || [];
}

interface AuthorizedModel {
    token: string;
    expireTime: Date;
}


// interface WxUserModel {
//     errMsg?: string,
//     encryptedData: string,
//     iv: string,
//     rawData: string,
//     signature: string,
//     userInfo: UserInfo
// }

interface UserInfo {
    avatarUrl: string,
    city: string,
    country: string,
    gender: number,
    language: string,
    nickName: string,
    province: string
}