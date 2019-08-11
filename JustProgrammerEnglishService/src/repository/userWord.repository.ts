import { BaseRepository } from "./base.repository";
import { UserWordEntity } from "./entity/userWord.entity";
import { WordListQueryModel, UserWordResultModel } from "../model/word";

class UserWordRepository extends BaseRepository<UserWordEntity> {
    async getUserWordListAsync(queryModel: WordListQueryModel): Promise<UserWordResultModel[]> {
        return await this.sqlmap.dQueryAsync("getUserWordList", queryModel);
    }
}

export default new UserWordRepository({ table: "user_Word" });