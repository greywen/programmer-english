export interface WechatJSCodeSessionModel {
    openid: string,
    session_key: string,
    code?: number,
    errMsg?: string,
}