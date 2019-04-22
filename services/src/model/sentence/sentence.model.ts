export interface UserSentenceModel {
    id: number,
    sentenceId: number,
    english: string,
    chinese: string,
    keyWords: string,
    collectionId: number
}

export interface DashboardResultModel {
    id: number,
    english: string,
    chinese: string,
    keyWords: string,
    collectionId: number,
    word: SentenceWordModel[]
}

export interface SentenceWordModel {
    id: number,
    english: string,
    chinese: string,
    phonetic: string
}

export interface CreateSentenceModel extends EnglishChineseModel {
    userId: number,
    keyWords: string[],
    word: EnglishChineseModel[]
}

interface EnglishChineseModel {
    english: string,
    chinese: string,
}