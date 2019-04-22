import { BaseEntity } from "./base.entity";

export interface SentenceWordEntity extends BaseEntity {
    wordId: number,
    sentenceId: number
}