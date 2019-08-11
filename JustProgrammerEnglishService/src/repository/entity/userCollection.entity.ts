import { BaseEntity } from "./base.entity";

export interface UserCollectionEntity extends BaseEntity {
    userId: number,
    wordId: number,
    createTime?: string
}