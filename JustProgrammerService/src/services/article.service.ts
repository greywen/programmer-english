import { parseNumber } from "../utils/common";
import { ArticleQueryModel, ArticleDetailResultModel } from "../model/article";
import { articleRepository, userHistoryRepository } from "../repository";
import { CreateUserHistoryModel } from "../model/word";
import { UserHistoryType } from "../common/enums";

export class ArticleService {
    async getArticleListAsync(queryModel: ArticleQueryModel) {
        let page = parseNumber(queryModel.page), pageSize = parseNumber(queryModel.pageSize);

        if (page < 0 && page > 20) {
            pageSize = 20;
        }
        if (pageSize < 0) {
            page = 0;
        }

        return await articleRepository.getArticleListAsync({ page: page, pageSize: pageSize + 1 });
    }

    async getArticleDetailAsync(articleId: number, userId: number) {
        let article = <ArticleDetailResultModel>await articleRepository.getByIdAsync(articleId);
        await this.createUserArticleHistoryAsync({ userId: userId, refId: articleId });
        return article;
    }

    private async createUserArticleHistoryAsync(model: CreateUserHistoryModel): Promise<void> {
        // let history = await userHistoryRepository.getFirstOrDefaultAsync({ userId: model.userId, refId: model.refId, historyType: UserHistoryType.Article });
        // if (!history) {
        await userHistoryRepository.insertAsync({ userId: model.userId, refId: model.refId, historyType: UserHistoryType.Article });
        // }
    }
}

export default new ArticleService();