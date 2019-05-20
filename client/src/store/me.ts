import { observable } from 'mobx'

import { IDisplayWordDataModel } from '../models/word';
import { BaseStore } from './base.store';

class MeStore extends BaseStore {
    @observable
    word: IDisplayWordDataModel;

    constructor() {
        super();
        this.loading = false;
    }

    getDisplayWordAsync = async () => {
        this.word = await this.get("word/getDisplayWord");
    }

    collectWordAsync = async () => {
        let params = { wordId: this.word.wordId };
        this.word.collectionId = await this.post("word/collectWord", params);
    }
}

export default new MeStore()