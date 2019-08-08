import { BaseRepository } from "./base.repository";
import { UserSentenceModel } from "../model/sentence";
import { SentenceEntity } from "./entity/sentence.entity";

class SentenceRepository extends BaseRepository<SentenceEntity> {
    async getUserSentence(userId: number, sentenceId: number): Promise<UserSentenceModel> {
        let data = await this.sqlmap.dQueryAsync("getUserSentence", {
            userId: userId,
            sentenceId: sentenceId
        });
        return data[0];
    }

    async getUserNextSentence(sentenceId: number): Promise<number> {
        let data = await this.sqlmap.queryAsync(`
            SELECT id FROM data_Sentence WHERE id > ?;
        `, [sentenceId]);
        return data[0] && data[0].id;
    }

    async getUserDocumentSentenceAsync(userId: number, sentenceId: number): Promise<UserSentenceModel> {
        let data = await this.sqlmap.queryAsync(`
            SELECT
                s.id sentenceId,
                s.english,
                s.chinese,
                s.keyWords,
                c.id collectionId
            FROM
                sentence_Word sw
            LEFT JOIN data_Sentence s ON sw.sentenceId = s.id
            LEFT JOIN user_Collection c ON c.userId = ? AND sw.sentenceId = c.sentenceId
            WHERE
                sw.sentenceId = ? LIMIT 1`, [userId, sentenceId]);
        return data[0];
    }
}

export default new SentenceRepository({ table: "data_Sentence" });
