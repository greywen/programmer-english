import { BaseRepository } from "./base.repository";
import { UserAttachmentEntity } from "./entity/userAttachment.entity";
import sqlmap from "./core/dataContextHelper";

class UserAttachmentRepository extends BaseRepository<UserAttachmentEntity> {
    async getUserNotRefIdAttachmentList(userId: number): Promise<number[]> {
        let sql = `select id from user_attachment where userId = ? and refid is null;`;
        let data = await sqlmap.queryAsync(sql, [{ userId }]);
        if (data.length > 0) {
            return data.map(x => { return x.id; })
        }
        return [];
    }

    async updateUserAttachmentRefIdByIdsAsync(refId: number, ids: number[]) {
        return await sqlmap.dQueryAsync("updateUserAttachmentRefIdByIds", { refId, ids });
    }
}

export default new UserAttachmentRepository({ table: "user_attachment" });