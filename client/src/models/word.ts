export interface IWordDataModel {
    id?: number,
    english: string,
    chinese: string,
    phoneticUS?: string,
    phoneticEN?: string,
    collocation?: string,
    createTime?: string,
    collectionId?: number,
    sentences: ISentenceWordModel[],
}

interface ISentenceWordModel {
    id: number,
    english: string,
    chinese: string,
    keyWords: string,
    languageType: number,
    excerptFrom: number,
    createTime: string
}