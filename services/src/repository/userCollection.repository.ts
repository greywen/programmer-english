import { BaseRepository } from "./base.repository";
import { UserCollectionEntity } from "./entity/userCollection.entity";
import { DisplayWordResultModel } from "../model/word";

class UserCollectionRepository extends BaseRepository<UserCollectionEntity> {
    async getUserLastCollectionWordAsync(userId: number): Promise<DisplayWordResultModel> {
        let sql = `select uc.id collectionId,dw.id wordId,dw.english,dw.chinese from user_collection uc left join data_word dw on dw.id = uc.wordId where userId = ? order by uc.id desc limit 1;`
        let data = await this.sqlmap.queryAsync(sql, [userId]);
        return data[0];
    }
}

export default new UserCollectionRepository({ table: "user_Collection" });
