import { BaseEntity } from "./base.entity";
import { FeedbackType } from "../../common/enums";

export interface UserFeedbackEntity extends BaseEntity {
    userId: number,
    type: FeedbackType,
    describe: string,
    contact?: string,
    createTime?: string
}