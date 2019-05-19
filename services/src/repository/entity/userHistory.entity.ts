import { BaseEntity } from "./base.entity";
import { UserHistoryType } from "../../common/enums";

export interface UserHistoryEntity extends BaseEntity {
    userId: number,
    refId: number,
    historyType: UserHistoryType,
    createTime?: string
}