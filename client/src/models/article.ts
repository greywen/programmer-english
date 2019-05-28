export interface ArticleListDataModel {
    id: number,
    source: string,
    author: string,
    articleCover: string,
    focusTitle: string,
    createTime: string
}

export interface ArticleDetailDataModel {
    id: number,
    describe: string,
    source: string,
    author: string,
    createTime: string
}
