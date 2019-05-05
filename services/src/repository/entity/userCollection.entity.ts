import { BaseEntity } from "./base.entity";

export interface UserCollectionEntity extends BaseEntity {
    userId: number,
    sentenceId: number,
    createTime?: string
}