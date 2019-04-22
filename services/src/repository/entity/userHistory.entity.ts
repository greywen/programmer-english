import { BaseEntity } from "./base.entity";

export interface UserHistoryEntity extends BaseEntity {
    userId: number,
    sentenceId: number,
    createTime: string
}