import { BaseRepository } from "./base.repository";
import { ArticleEntity } from "./entity/article.entity";
import { ArticleQueryModel, ArticleListResultModel } from "../model/article";
import sqlmap from "./core/dataContextHelper";

class ArticleRepository extends BaseRepository<ArticleEntity> {
    async getArticleListAsync(queryModel: ArticleQueryModel): Promise<ArticleListResultModel> {
        return await sqlmap.dQueryAsync("getArticleList", queryModel);
    }
}

export default new ArticleRepository({ table: "data_article" });
