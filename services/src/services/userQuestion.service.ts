import { userQuestionRepository, userQuestionAnswerRepository, userAttachmentRepository } from "../repository";
import { UserQuestionEntity } from "../repository/entity/userQuestion.entity";
import { CreateUserQuestionAnswerModel } from "../model/userQuestion";
import { NotFoundException, InternalServerException } from "../common/exception";

export class UserQuestionService {
    async getUserQuestionAsync(): Promise<UserQuestionEntity> {
        return await userQuestionRepository.getFirstOrDefaultAsync({ enable: true });
    }

    async createUserQuestionAswerAsync(createModel: CreateUserQuestionAnswerModel): Promise<number> {
        let question = await userQuestionRepository.getFirstOrDefaultAsync({ id: createModel.questionId, enable: true });
        if (!question) {
            // new NotFoundException("Question not found");
            return;
        }

        let userAnswerList = await userQuestionAnswerRepository.getAsync({ userId: createModel.userId, questionId: question.id });

        if (userAnswerList.length > 1) {
            // new InternalServerException("翻译分析已达上限");
            return;
        }

        let answerId = await userQuestionAnswerRepository.insertAsync(createModel);
        let attachementIds = await userAttachmentRepository.getUserNotRefIdAttachmentList(createModel.userId);
        if (attachementIds.length > 0) {
            await userAttachmentRepository.updateUserAttachmentRefIdByIdsAsync(answerId, attachementIds);
        }
        return answerId;
    }
}

export default new UserQuestionService();