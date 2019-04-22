import { WechatUserModel } from ".";

export interface LoginModel {
    code: string,
    wechatUserInfo: WechatUserModel
}

export interface LoginResultModel {
    apiAccessToken?: string,
    token?: string,
    sessionKey?:string,
    expireTime?: string
}