export interface IDashboardDataModel {
    id: number,
    english: string,
    chinese: string,
    keyWords: string,
    word: SentenceWordModel[],
    collectionId: number,
}

interface SentenceWordModel {
    id: number,
    english: string,
    chinese: string,
    phonetic: string
}