
export interface WordModel {
    id?: number,
    english: string,
    chinese: string,
    phoneticUS?: string,
    phoneticEN?: string,
    collocation?: string,
    createTime?: string,
}

export interface CreateCollectModel {
    userId: number,
    wordId: number
}

export interface CreateUserHistoryModel {
    userId: number,
    refId: number
}

export interface WordQueryModel {
    userId: number,
    wordId?: number,
    next: boolean
}

export interface WordSentencesModel {
    id?: number,
    english: string,
    chinese: string,
    keyWords?: string,
    languageType?: number,
    excerptFrom?: string,
    createTime?: string
}

export interface WordResultModel {
    id: number,
    english: string,
    chinese: string,
    phoneticUS?: string,
    phoneticEN?: string,
    collocation?: string,
    createTime?: string,
    collectionId?: number,
    sentences: WordSentencesModel[]
}

export interface WordListModel {
    id: number,
    english: string,
    chinese: string,
    createTime: string
}

export interface WordListQueryModel {
    userId: number,
    page: number,
    pageSize: number
}

export interface DisplayWordResultModel {
    wordId: number,
    collectionId: number,
    english: string,
    chinese: string
}

export interface WordCreateModel {
    english: string,
    chinese: string,
    phoneticUS: string,
    phoneticEN: string,
    collocation: string,
    sentences: WordSentencesModel[]
}

export interface WordUpdateModel {
    id: number,
    english: string,
    chinese: string,
    phoneticUS: string,
    phoneticEN: string,
    collocation: string,
    createTime: string,
    sentences?: WordSentencesModel[]
}