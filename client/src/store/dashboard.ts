import { observable } from 'mobx'

import { IQuestionDataModel, IQuestionAnswerModel } from '../models/dashiboard';
import { BaseStore } from './base.store';

class DashboardStore extends BaseStore {
    @observable
    userAnswer: IQuestionAnswerModel;
    @observable
    question: IQuestionDataModel;

    getQuestionAsync = async () => {
        this.question = await this.get("question/getQuestion");
    }

    createAnswerAsync = async (createModel: IQuestionAnswerModel): Promise<number> => {
        return await this.post("question/createAswer", createModel);
    }
}

export default new DashboardStore()