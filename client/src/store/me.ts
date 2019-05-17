import { observable } from 'mobx'

import { get, post } from '../utils/request';
import { IDisplayWordDataModel } from '../models/word';
import { BaseStore } from './base.store';

class MeStore extends BaseStore {
    @observable
    word: IDisplayWordDataModel;

    getDisplayWordAsync = async () => {
        this.loading = true;
        this.word = await get("word/getDisplayWord");
        this.loading = false;
    }

    collectWordAsync = async () => {
        let params = { wordId: this.word.wordId };
        this.word.collectionId = await post("word/collectWord", params);
    }
}

export default new MeStore()