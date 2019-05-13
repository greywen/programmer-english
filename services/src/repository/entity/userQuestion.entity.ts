import { BaseEntity } from "./base.entity";

export interface UserQuestionEntity extends BaseEntity {
    userId?: number,
    describe: string,
    enable?: boolean,
    createTime?: string
}