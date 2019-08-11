import { observable } from 'mobx'

import { IQuestionDataModel, IQuestionAnswerModel } from '../models/dashiboard';
import { BaseStore } from './base.store';

class DashboardStore extends BaseStore {
    @observable
    userAnswer: IQuestionAnswerModel;
    @observable
    question: IQuestionDataModel;

    constructor() {
        super();
        this.loading = false;
    }

    getQuestionAsync = async () => {
        this.question = await this.get("question/getQuestion");
    }

    createAnswerAsync = async (createModel: IQuestionAnswerModel): Promise<number> => {
        return await this.post("question/createAswer", createModel);
    }

    // createWordAsync = async () => {
    //     await this.post("word/updateWord", {
    //         id: 15,
    //         english: "repository test",
    //         chinese: "资源库;",
    //         phoneticUS: "美 [rɪ'pɑzə.tɔri]",
    //         phoneticEN: "英 [rɪ'pɒzɪt(ə)ri]",
    //         collocation: "repository test test",
    //         sentences: [
    //             { id: 3, english: "As a result of our analysis, the team decided that the model of a document repository was the wrong model to enforce.", chinese: "根据我们的分析，团队认为文档存储库采用了错误的模型。" },
    //             { id: 4, english: "update test 2", chinese: "update test 2" }
    //         ]
    //     });
    // }
}

export default new DashboardStore()