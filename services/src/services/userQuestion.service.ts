import { userQuestionRepository, userQuestionAnswerRepository } from "../repository";
import { UserQuestionEntity } from "../repository/entity/userQuestion.entity";
import { CreateUserQuestionAnswerModel } from "../model/userQuestion";
import { NotFoundException } from "../common/exception";

export class UserQuestionService {
    async getUserQuestionAsync(): Promise<UserQuestionEntity> {
        return await userQuestionRepository.getFirstOrDefaultAsync({ enable: true });
    }

    async createUserQuestionAswerAsync(createModel: CreateUserQuestionAnswerModel): Promise<number> {
        let question = await userQuestionRepository.getFirstOrDefaultAsync({ id: createModel.questionId, enable: true });
        if (!question) {
            throw new NotFoundException("Question not found");
        }
        return await userQuestionAnswerRepository.insertAsync(createModel);
    }
}

export default new UserQuestionService();