import { BaseRepository } from "./base.repository";
import { UserResourceEntity } from "./entity/userResource.entity";
import sqlmap from "./core/dataContextHelper";

class UserResourceRepository extends BaseRepository<UserResourceEntity> {
    
}

export default new UserResourceRepository({ table: "user_resource" });