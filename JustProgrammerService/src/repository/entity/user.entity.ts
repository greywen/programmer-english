import { BaseEntity } from "./base.entity";
import { UserRoleType } from "../../common/enums";

export interface UserEntity extends BaseEntity, WechatUserModel {
    wxOpenId?: string,
    createTime?: string,
    role?: UserRoleType
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