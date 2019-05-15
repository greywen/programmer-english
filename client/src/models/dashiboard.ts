export interface IQuestionDataModel {
    id: number,
    userId: number,
    createTime: string,
    describe: string,
    enable: boolean
}

export interface IQuestionAnswerModel {
    questionId: number,
    answer: string,
    contact: string,
}