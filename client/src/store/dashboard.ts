import { observable } from 'mobx'

import { get, post } from '../utils/request';
import { IQuestionDataModel, IQuestionAnswerModel } from '../models/dashiboard';

class DashboardStore {
    @observable
    userAnswer: IQuestionAnswerModel;
    @observable
    question: IQuestionDataModel;

    getQuestionAsync = async () => {
        this.question = await get("question/getQuestion");
    }

    createAnswerAsync = async (createModel: IQuestionAnswerModel): Promise<number> => {
        return await post("question/createAswer", createModel);
    }
}

export default new DashboardStore()