
export interface WordModel {
    id?: number,
    chinese?: string,
    english?: string,
    phonetic?: string
}

export interface WordListModel extends WordModel {
    sentences: string | any,
    isCollection: boolean
}

export interface SentenceModel {
    chinese: string,
    english: string,
}

export interface SentenceWordModel {
    id?: number,
    wordId?: number,
    sentenceId?: number
}

export interface CreateCollectModel {
    userId: number,
    sentenceId: number
}

export interface CreateUserHistoryModel {
    userId: number,
    sentenceId: number
}