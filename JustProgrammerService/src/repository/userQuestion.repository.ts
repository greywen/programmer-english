import { BaseRepository } from "./base.repository";
import { UserQuestionEntity } from "./entity/userQuestion.entity";

class UserQuestionRepository extends BaseRepository<UserQuestionEntity> {
    
}

export default new UserQuestionRepository({ table: "user_question" });