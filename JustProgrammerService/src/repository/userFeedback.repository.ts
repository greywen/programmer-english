import { BaseRepository } from "./base.repository";
import { UserFeedbackEntity } from "./entity/userFeedback.entity";

class UserFeedbackRepository extends BaseRepository<UserFeedbackEntity> {
    async getUserFeedbackByTodayAsync(userId: number) {
        let sql = `select id from user_feedback where userId = ? and createTime = CURDATE()`;
        let data = await this.sqlmap.queryAsync(sql, [userId])
        return data;
    }
}

export default new UserFeedbackRepository({ table: "user_feedback" });