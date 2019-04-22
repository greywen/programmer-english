import { BaseEntity } from "./base.entity";

export interface UserLoginLogEntity extends BaseEntity {
    userId: number,
    loginTime: string
}