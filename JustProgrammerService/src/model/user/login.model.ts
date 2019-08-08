import { WechatUserModel, UserModel } from ".";
import { UserResource } from "../../common/enums";

export interface LoginModel {
    code: string,
    wechatUserInfo: WechatUserModel
}

export interface LoginResultModel {
    apiAccessToken?: string,
    token?: string,
    sessionKey?: string,
    expireTime?: string,
    resourceIds: UserResource[]
}

export interface JWTTokenModel extends UserModel {
    resources: UserResource[]
}