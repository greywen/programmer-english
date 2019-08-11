import { BaseEntity } from "./base.entity";

export interface WordEntity extends BaseEntity {
    english: string,
    chinese: string,
    phoneticUS?: string,
    phoneticEN?: string,
    collocation?: string,
    createTime?: string,
}