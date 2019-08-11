import { BaseRepository } from "./base.repository";
import { UserQuestionAnswerEntity } from "./entity/userQuestionAnswer.entity";

class UserQuestionAnswerRepository extends BaseRepository<UserQuestionAnswerEntity> {
    
}

export default new UserQuestionAnswerRepository({ table: "user_questionAnswer" });