import { observable } from 'mobx'

import { get, post } from '../utils/request';
import { IWordDataModel } from '../models/word';
import { BaseStore } from './base.store';

class WordStore extends BaseStore {
    @observable
    word: IWordDataModel;

    getWordAsync = async () => {
        this.loading = true;
        this.word = await get("word/getWord");
        this.loading = false;
    }

    getNextWordAsync = async () => {
        this.loading = true;
        let _word = await get("word/getNextWord");;
        if (_word) {
            this.word = _word;
        }
        this.loading = false;
        return _word;
    }

    collectWordAsync = async () => {
        let params = { wordId: this.word.id };
        this.word.collectionId = await post("word/collectWord", params);
    }
}

export default new WordStore()