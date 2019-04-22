import { observable } from 'mobx'

import { get, post } from '../utils/request';
import { IDashboardDataModel } from '../models/dashiboard';

class Dashboard {
    @observable
    dashboardData: IDashboardDataModel;

    getSentenceAsync = async () => {
        this.dashboardData = await get("sentence/get");
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

export default new Dashboard()