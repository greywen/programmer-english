import { BaseRepository } from "./base.repository";
import { UserLoginLogEntity } from "./entity/userLoginLog.entity";

class UserLoginLogRepository extends BaseRepository<UserLoginLogEntity> {
   
}

export default new UserLoginLogRepository({ table: "user_LoginLog" });