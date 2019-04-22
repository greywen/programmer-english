import { BaseRepository } from "./base.repository";
import { UserCollectionEntity } from "./entity/userCollection.entity";

class UserCollectionRepository extends BaseRepository<UserCollectionEntity> {
    
}

export default new UserCollectionRepository({ table: "user_Collection" });
