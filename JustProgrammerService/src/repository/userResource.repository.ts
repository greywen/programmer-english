import { BaseRepository } from "./base.repository";
import { UserResourceEntity } from "./entity/userResource.entity";
import sqlmap from "./core/dataContextHelper";

class UserResourceRepository extends BaseRepository<UserResourceEntity> {
    async createUserDefaultResourcesAsync(userId: number) {
        let sql = "INSERT INTO user_resource (userId,resourceId) SELECT ?,id FROM data_resource where id < 100;";
        return await sqlmap.queryAsync(sql, [userId]);
    }
}

export default new UserResourceRepository({ table: "user_resource" });