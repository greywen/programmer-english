import { FeedbackType } from "../common/enums";

export interface IFeedbackModel {
    type: FeedbackType,
    describe: string,
    contact: string
}