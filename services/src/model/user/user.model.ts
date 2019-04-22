export interface UserModel extends WechatUserModel {
    id?: number,
    wxOpenId?: string,
    createTime?: string
}

export interface WechatUserModel {
    nickName?: string,
    gender?: number,
    language?: string,
    city?: string,
    province?: string,
    country?: string,
    avatarUrl?: string
}