import { BaseRepository } from "./base.repository";
import { UserHistoryEntity } from "./entity/userHistory.entity";

class UserHistoryRepository extends BaseRepository<UserHistoryEntity> {
    async getUserHistoryAsync(userId: number): Promise<UserHistoryEntity> {
        let data = await this.sqlmap.queryAsync(`SELECT sentenceId FROM user_History WHERE id = (SELECT MAX(id) FROM user_History WHERE userId = ? AND createTime < CURDATE());`, [userId])
        return data[0];
    }
}

export default new UserHistoryRepository({ table: "user_History" });