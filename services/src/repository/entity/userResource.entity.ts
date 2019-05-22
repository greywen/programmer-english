import { BaseEntity } from "./base.entity";
import { UserResource } from "../../common/enums";

export interface UserResourceEntity extends BaseEntity {
    userId: number,
    resourceId: UserResource
}