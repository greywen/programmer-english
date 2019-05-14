import { observable } from 'mobx'

import { get, post } from '../utils/request';
import { IDashboardDataModel, IQuestionDataModel } from '../models/dashiboard';

class DashboardStore {
    @observable
    dashboardData: IDashboardDataModel;
    @observable
    question: IQuestionDataModel;

    getSentenceAsync = async () => {
        this.dashboardData = await get("sentence/get");
    }

    getQuestionAsync = async () => {
        this.question = await get("question/getQuestion");
    }

    collectAsync = async () => {
        let params = { sentenceId: this.dashboardData.id };
        this.dashboardData.collectionId = await post("sentence/collect", params);
    }

    createHistoryAsync = async () => {
        let params = { sentenceId: this.dashboardData.id };
        await post("sentence/createhistory", params);
    }


}

export default new DashboardStore()