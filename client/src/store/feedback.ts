import { post } from '../utils/request';
import { IFeedbackModel } from '../models/user';
import { BaseStore } from './base.store';

class FeedbackStore extends BaseStore {
    createFeedbackAsync = async (feedback: IFeedbackModel) => {
        await post("user/createFeedback", feedback);
    }
}

export default new FeedbackStore()