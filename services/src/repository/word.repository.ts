import { BaseRepository } from "./base.repository";
import { WordQueryModel, WordSentencesModel, WordModel, WordListModel, WordListQueryModel } from "../model/word/word.model";
import { WordEntity } from "./entity/word.entity";
import { IdName } from "../model/common.model";

class WordRepository extends BaseRepository<WordEntity> {
    async getWordListAsync(queryModel: WordListQueryModel): Promise<WordListModel[]> {
        return await this.sqlmap.dQueryAsync("getWordList", queryModel);
    }

    async getWordSentencesAsync(wordId: number): Promise<WordSentencesModel[]> {
        let sql = `select id, english, chinese, keyWords, languageType, excerptFrom, createTime from data_sentence where id in (select sentenceId from sentence_word where wordId = ?);`
        return await this.sqlmap.queryAsync(sql, [wordId])
    }

    async getWordAsync(queryModel: WordQueryModel): Promise<WordModel> {
        let data = await this.sqlmap.dQueryAsync("getWord", queryModel);
        return data[0];
    }

    async getWordByAutoCompleteAsync(query: string): Promise<IdName[]> {
        let sql = `select id,english from data_word where english like ? limit 5;`;
        let data = await this.sqlmap.queryAsync(sql, [`${query}%`]);
        return data.map(x => { return { id: x["id"], name: x["english"] } });
    }
}

export default new WordRepository({ table: "data_Word" });