import { observable } from 'mobx'

import { get, post } from '../utils/request';
import { IQuestionDataModel, IQuestionAnswerModel } from '../models/dashiboard';
import { BaseStore } from './base.store';

class DashboardStore extends BaseStore {
    @observable
    userAnswer: IQuestionAnswerModel;
    @observable
    question: IQuestionDataModel;

    getQuestionAsync = async () => {
        this.loading = true;
        this.question = await get("question/getQuestion");
        this.loading = false;
    }

    createAnswerAsync = async (createModel: IQuestionAnswerModel): Promise<number> => {
        return await post("question/createAswer", createModel);
    }
}

export default new DashboardStore()