export interface UserSentenceModel {
    id: number,
    english: string,
    chinese: string,
    keyWords: string
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