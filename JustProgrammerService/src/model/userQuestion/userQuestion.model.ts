export interface UserQuestionResultModel {
    id: number,
    title: string,
    describe: string,
    createTime: string
}


export interface CreateUserQuestionAnswerModel {
    questionId: number,
    answer: string,
    contact: string,
    userId: number
}