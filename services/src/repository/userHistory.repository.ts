import { BaseRepository } from "./base.repository";
import { UserHistoryEntity } from "./entity/userHistory.entity";

class UserHistoryRepository extends BaseRepository<UserHistoryEntity> {
    async getUserLastHistoryWordIdAsync(userId: number): Promise<number> {
        let data = await this.sqlmap.queryAsync(`select max(refId) as wordId from user_history where userid = ? and historyType = 1;`, [userId]);
        return data[0].wordId;
    }
}

export default new UserHistoryRepository({ table: "user_history" });