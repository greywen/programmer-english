import { BaseRepository } from "./base.repository";
import { UserEntity } from "./entity/user.entity";

class UserRepository extends BaseRepository<UserEntity> {

}

export default new UserRepository({ table: "user_Profile" });
