import { UserWordCreateModel, UserWordUpdateModel, WordListQueryModel, UserWordResultModel } from "../model/word";
import userWordRepository from "../repository/userWord.repository";
import { parseNumber } from "../utils/common";

export class UserWordService {
    async createWordAsync(createModel: UserWordCreateModel) {
        return await userWordRepository.insertAsync(createModel);
    }

    async updateWordAsync(updateModel: UserWordUpdateModel) {
        let userWord = await userWordRepository.getAsync({ id: updateModel.id, createUserId: updateModel.createUserId });
        if (!userWord) {
            return;
        }
        return await userWordRepository.updateAsync(updateModel, { id: updateModel.id });
    }

    async deleteWordAsync(userWordId: number, userId: number) {
        let userWord = await userWordRepository.getAsync({ id: userWordId, createUserId: userId });
        if (!userWord) {
            return;
        }
        return await userWordRepository.deleteAsync({ id: userWordId });
    }

    async getUserWordListAsync(queryModel: WordListQueryModel): Promise<UserWordResultModel[]> {
        let page = parseNumber(queryModel.page), pageSize = parseNumber(queryModel.pageSize);

        if (pageSize < 0 && pageSize > 20) {
            pageSize = 20;
        }
        if (page < 0) {
            page = 0;
        }
        page *= pageSize;

        return await userWordRepository.getUserWordListAsync({ userId: queryModel.userId, page: page, pageSize: pageSize + 1 });
    }
}

export default new UserWordService();