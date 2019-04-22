import { userCollectionRepository, userHistoryRepository, sentenceRepository, wordRepository } from "../repository";
import { CreateCollectModel, CreateUserHistoryModel } from "../model/word";
import { WordModel } from "../model/word/word.model";
import { now } from "../utils/dateUtils";
import { DashboardResultModel } from "../model/sentence";

export class DashboardService {

    async getDashboardDataAsync(userId: number) {
        let history = await userHistoryRepository.getUserHistoryAsync(userId);
        let sentenceId = 1;
        if (history) {
            let nextSentenceId = await sentenceRepository.getUserNextSentence(history.sentenceId);
            sentenceId = nextSentenceId || history.sentenceId;
        }
        let sentence = await sentenceRepository.getUserSentence(userId, sentenceId);
        let words = await wordRepository.getSentenceWordList(sentenceId);

        let result: DashboardResultModel = { ...sentence, word: words };
        await this.createHistoryAsync({ userId: userId, sentenceId: sentenceId });
        return result;
    }

    async getDashboardDefaultDataAsync() {
        let sentence = await sentenceRepository.getByIdAsync(1);
        let words = await wordRepository.getSentenceWordList(1);

        let result = { ...sentence, word: words };
        return result;
    }

    private async verifySentenceAnsyc(sentenceId: number): Promise<WordModel> {
        let sentence = await sentenceRepository.getByIdAsync(sentenceId);
        if (!sentence) {
            // to do: sentence not found.
            throw "sentence not found.";
        }
        return sentence;
    }

    async collectAsync(model: CreateCollectModel): Promise<number> {
        await this.verifySentenceAnsyc(model.sentenceId);
        let collectWord = await userCollectionRepository.getFirstOrDefaultAsync({ userId: model.userId });
        if (collectWord) {
            await userCollectionRepository.deleteAsync({ id: collectWord.id });
            return 0;
        }
        return await userCollectionRepository.insertAsync({ sentenceId: model.sentenceId, userId: model.userId, createTime: now() });
    }

    private async createHistoryAsync(model: CreateUserHistoryModel): Promise<void> {
        let history = await userHistoryRepository.getFirstOrDefaultAsync({ userId: model.userId, sentenceId: model.sentenceId });
        if (!history) {
            await userHistoryRepository.insertAsync({ userId: model.userId, sentenceId: model.sentenceId, createTime: now() });
        }
    }
}

export default new DashboardService();