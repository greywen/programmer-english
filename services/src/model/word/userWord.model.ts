export interface UserWordCreateModel {
    createUserId: number,
    english: string,
    chinese: string,
    comments: string
}

export interface UserWordUpdateModel {
    id: number,
    createUserId: number,
    english: string,
    chinese: string,
    comments: string
}

export interface UserWordResultModel {
    id: number,
    english: string,
    chinese: string,
    comments: string,
    createTime: string
}