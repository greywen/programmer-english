import { BaseRepository } from "./base.repository";
import { WordQueryModel, WordSentencesModel, WordModel, WordListModel, WordListQueryModel } from "../model/word/word.model";
import { WordEntity } from "./entity/word.entity";

class WordRepository extends BaseRepository<WordEntity> {
    async getWordListAsync(queryModel: WordListQueryModel): Promise<WordListModel[]> {
        let sql = `select dw.id,dw.english,dw.chinese,dw.createTime from user_collection uc left join data_word dw on dw.id = uc.wordId where uc.userId = ? limit ?,?;`;
        return await this.sqlmap.queryAsync(sql, [queryModel.userId, queryModel.page, queryModel.pageSize]);
    }

    async getWordSentencesAsync(wordId: number): Promise<WordSentencesModel[]> {
        let sql = `select id, english, chinese, keyWords, languageType, excerptFrom, createTime from data_sentence where id in (select sentenceId from sentence_word where wordId = ?);`
        return await this.sqlmap.queryAsync(sql, [wordId])
    }

    async getWordAsync(queryModel: WordQueryModel): Promise<WordModel> {
        let data = await this.sqlmap.dQueryAsync("getWord", [queryModel]);
        return data[0];
    }
}

export default new WordRepository({ table: "data_Word" });