import { observable } from 'mobx'

import { BaseStore } from './base.store';
import { ArticleListDataModel, ArticleDetailDataModel } from '../models/article';

class ArticleStore extends BaseStore {
    @observable
    showLoadMore: boolean;
    @observable
    artileList: ArticleListDataModel[];
    @observable
    articleListQuery = { page: 0, pageSize: 20 };
    @observable
    articleDetail: ArticleDetailDataModel;

    getArticleListAsync = async () => {
        let _articleList = await this.get("article/getArticleList", this.articleListQuery);
        this.artileList = _articleList;
    }

    getMoreArticleAsync = async () => {
        this.articleListQuery.page += 1;
        this.getArticleListAsync();
    }


    getArticleDetailAsync = async (articleId: number) => {
        this.articleDetail = await this.get("article/getArticleDetail", { articleId: articleId });
    }
}

export default new ArticleStore()