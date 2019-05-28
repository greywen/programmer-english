import { BaseEntity } from "./base.entity";

export interface ArticleEntity extends BaseEntity {
    describe: string,
    createUserId: number,
    source: string,
    author: string,
    createTime: string
}