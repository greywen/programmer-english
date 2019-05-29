import { BaseEntity } from "./base.entity";

export interface UserWordEntity extends BaseEntity {
    createUserId: number,
    english: string,
    chinese: string,
    comments: string,
    createTime?: string,
}