import { wordRepository, userHistoryRepository, userCollectionRepository } from "../repository";
import { WordResultModel, WordQueryModel, WordModel, CreateCollectModel, CreateUserHistoryModel, WordListQueryModel, WordListModel } from "../model/word/word.model";
import { NotFoundException } from "../common/exception";
import { parseNumber } from "../utils/common";

export class WordService {
    async getWordAsync(queryModel: WordQueryModel): Promise<WordResultModel> {
        let lastHistoryWordId = await userHistoryRepository.getUserLastHistoryWordIdAsync(queryModel.userId);
        queryModel.wordId = !!lastHistoryWordId ? lastHistoryWordId : 1;
        let word = await wordRepository.getWordAsync(queryModel);
        // TODO:check word is whether last word
        if (!word) {
            return null;
        }
        let wordSentences = await wordRepository.getWordSentencesAsync(word.id);
        await this.createUserWordHistoryAsync({ wordId: word.id, userId: queryModel.userId });
        return <WordResultModel>{ ...word, sentences: wordSentences };
    }

    async getDefaultWordAsync() {
        let word = await wordRepository.getByIdAsync(1);
        let wordSentences = await wordRepository.getWordSentencesAsync(word.id);
        return <WordResultModel>{ ...word, sentences: wordSentences };
    }

    private async verifyWordAnsyc(wordId: number): Promise<WordModel> {
        let word = await wordRepository.getByIdAsync(wordId);
        if (!word) {
            // throw new NotFoundException("Word not found");
        }
        return word;
    }

    async collectWordAsync(model: CreateCollectModel): Promise<number> {
        await this.verifyWordAnsyc(model.wordId);
        let collectWord = await userCollectionRepository.getFirstOrDefaultAsync({ userId: model.userId });
        if (collectWord) {
            await userCollectionRepository.deleteAsync({ id: collectWord.id });
            return 0;
        }
        return await userCollectionRepository.insertAsync({ wordId: model.wordId, userId: model.userId });
    }

    private async createUserWordHistoryAsync(model: CreateUserHistoryModel): Promise<void> {
        let history = await userHistoryRepository.getFirstOrDefaultAsync({ userId: model.userId, wordId: model.wordId });
        if (!history) {
            await userHistoryRepository.insertAsync({ userId: model.userId, wordId: model.wordId });
        }
    }

    async getWordListAsync(queryModel: WordListQueryModel): Promise<WordListModel[]> {
        let page = parseNumber(queryModel.page), pageSize = parseNumber(queryModel.pageSize);

        if (page < 0 && page > 20) {
            pageSize = 20;
        }
        if (pageSize < 0) {
            page = 0;
        }

        return await wordRepository.getWordListAsync({ userId: queryModel.userId, page: page, pageSize: pageSize + 1 });
    }

    async getUserCollectionWordAsync(userId: number) {
        return await userCollectionRepository.getUserLastCollectionWordAsync(userId);
    }
}

export default new WordService();