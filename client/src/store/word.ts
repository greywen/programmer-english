import { observable } from 'mobx'

import { get, post } from '../utils/request';
import { IWordDataModel } from '../models/word';

class WordStore {
    @observable
    word: IWordDataModel;

    getWordAsync = async () => {
        this.word = await get("word/getWord");
    }

    getNextWordAsync = async () => {
        this.word = await get("word/getNextWord");
    }

    collectWordAsync = async () => {
        let params = { wordId: this.word.id };
        this.word.collectionId = await post("word/collectWord", params);
    }
}

export default new WordStore()