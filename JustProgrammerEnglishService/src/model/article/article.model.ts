export interface ArticleListResultModel {
    id: number,
    source: string,
    author: string,
    articleCover: string,
    focusTitle: string,
    createTime: string
}

export interface ArticleDetailResultModel {
    id: number,
    describe: string,
    source: string,
    author: string,
    createTime: string
}

export interface ArticleQueryModel {
    page: number,
    pageSize: number
}