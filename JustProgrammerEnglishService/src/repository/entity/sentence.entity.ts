import { BaseEntity } from "./base.entity";

export interface SentenceEntity extends BaseEntity {
    english: string,
    chinese: string,
    keyWords?: string,
    languageType?: number,
    excerptFrom?: string
}