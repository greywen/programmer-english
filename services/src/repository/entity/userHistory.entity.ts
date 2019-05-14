import { BaseEntity } from "./base.entity";

export interface UserHistoryEntity extends BaseEntity {
    userId: number,
    wordId: number,
    createTime?: string
}