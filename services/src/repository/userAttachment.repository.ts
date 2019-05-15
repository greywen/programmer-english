import { BaseRepository } from "./base.repository";
import { UserAttachmentEntity } from "./entity/userAttachment.entity";

class UserAttachmentRepository extends BaseRepository<UserAttachmentEntity> {

}

export default new UserAttachmentRepository({ table: "user_attachment" });