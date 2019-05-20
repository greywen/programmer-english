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
        this.loading = true;
        let _articleList = await this.get("article/getArticleList", this.articleListQuery);
        this.showLoadMore = _articleList && _articleList.length > 20;
        if (this.showLoadMore) {
            _articleList.pop(1);
        }
        this.artileList === undefined ? this.artileList = _articleList : this.artileList.push(..._articleList);
        this.loading = false;
    }

    getMoreArticleAsync = async () => {
        this.articleListQuery.page += 1;
        this.getArticleListAsync();
    }


    getArticleDetailAsync = async (articleId: number) => {
        this.loading = true;
        this.articleDetail = await this.get("article/getArticleDetail", { articleId: articleId });
        this.loading = false;
    }
}

export default new ArticleStore()