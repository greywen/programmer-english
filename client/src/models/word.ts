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

export interface IDisplayWordDataModel {
    wordId: number,
    collectionId: number,
    english: string,
    chinese: string,
}

export interface IWordListDataModel {
    id: number,
    english: string,
    chinese: string,
    createTime: string
}

export interface IWordListQueryModel {
    page: number,
    pageSize: number
}

interface ISentenceWordModel {
    id?: number,
    english: string,
    chinese: string,
    keyWords?: string,
    languageType?: number,
    excerptFrom?: number,
    createTime?: string
}

export interface IEnglishChineseModel {
    id?: number,
    english: string,
    chinese: string
}

export interface IWordCreateModel {
    id?: number,
    english: string,
    chinese: string,
    phoneticUS?: string,
    phoneticEN?: string,
    collocation?: string,
    sentences: IEnglishChineseModel[],
}