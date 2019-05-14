import { BaseRepository } from "./base.repository";
import { WordQueryModel, WordSentencesModel, WordModel } from "../model/word/word.model";
import { WordEntity } from "./entity/word.entity";

class WordRepository extends BaseRepository<WordEntity> {
    // async getWordList(userId: number, wordId: number): Promise<WordListModel[]> {
    //     return await this.sqlmap.queryAsync(`
    //         SELECT
    //             w.*, ws.sentences,
    //             if(ISNULL(uc.wordId),FALSE,TRUE) AS isCollection
    //         FROM
    //             data_word w
    //         LEFT JOIN (
    //             SELECT
    //                 ws.wordId,
    //                 GROUP_CONCAT(chinese, ',', english) sentences
    //             FROM
    //                 data_Sentence s
    //             LEFT JOIN word_Sentence ws ON ws.sentenceId = s.id
    //             GROUP BY
    //                 ws.wordId
    //         ) ws ON ws.wordId = w.id
    //         LEFT JOIN user_Collection uc ON uc.userId = ?
    //         AND uc.wordId = w.id
    //         WHERE
    //             w.id > ?
    //         ORDER BY w.id
    //         LIMIT 0,5;`, [userId, wordId]);
    // }

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