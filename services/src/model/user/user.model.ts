import { FeedbackType } from "../../common/enums";

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

export interface UserFeedbackModel {
    type: FeedbackType,
    userId: number,
    describe: string,
    contact: string
}