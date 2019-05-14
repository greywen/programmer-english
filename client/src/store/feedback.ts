import { post } from '../utils/request';
import { IFeedbackModel } from '../models/user';

class FeedbackStore {
    createFeedbackAsync = async (feedback: IFeedbackModel) => {
        await post("user/createFeedback", feedback);
    }
}

export default new FeedbackStore()