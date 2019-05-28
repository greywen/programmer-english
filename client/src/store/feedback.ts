import { IFeedbackModel } from '../models/user';
import { BaseStore } from './base.store';

class FeedbackStore extends BaseStore {
    constructor() {
        super();
        this.loading = false;
    }
    createFeedbackAsync = async (feedback: IFeedbackModel) => {
        await this.post("user/createFeedback", feedback);
    }
}

export default new FeedbackStore()