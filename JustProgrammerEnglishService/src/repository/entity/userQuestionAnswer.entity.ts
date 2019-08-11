import { BaseEntity } from "./base.entity";

export interface UserQuestionAnswerEntity extends BaseEntity {
    userId: number,
    questionId: number,
    answer: string,
    contact?: string,
    createTime?: string
}