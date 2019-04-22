import { BaseRepository } from "./base.repository";
import { WordListModel } from "../model/word";
import { WordModel } from "../model/word/word.model";
import { SentenceWordModel } from "../model/sentence";

class WordRepository extends BaseRepository<WordModel> {
    async getWordList(userId: number, wordId: number): Promise<WordListModel[]> {
        return await this.sqlmap.queryAsync(`
            SELECT
                w.*, ws.sentences,
                if(ISNULL(uc.wordId),FALSE,TRUE) AS isCollection
            FROM
                data_word w
            LEFT JOIN (
                SELECT
                    ws.wordId,
                    GROUP_CONCAT(chinese, ',', english) sentences
                FROM
                    data_Sentence s
                LEFT JOIN word_Sentence ws ON ws.sentenceId = s.id
                GROUP BY
                    ws.wordId
            ) ws ON ws.wordId = w.id
            LEFT JOIN user_Collection uc ON uc.userId = ?
            AND uc.wordId = w.id
            WHERE
                w.id > ?
            ORDER BY w.id
            LIMIT 0,5;`, [userId, wordId]);
    }

    async getSentenceWordList(sentenceId: number): Promise<SentenceWordModel[]> {
        return await this.sqlmap.queryAsync(`
            SELECT w.id,w.english,w.chinese,w.phonetic FROM sentence_Word sw
                LEFT JOIN data_word w ON w.id = sw.wordId
                WHERE sw.SentenceId = ?;
        `, [sentenceId]);
    }
}

export default new WordRepository({ table: "data_Word" });