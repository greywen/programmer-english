import { observable } from 'mobx'

import { IWordListQueryModel, IWordCreateModel } from '../models/word';
import { BaseStore } from './base.store';

class UserWordStore extends BaseStore {
    @observable
    wordListQuery: IWordListQueryModel = { page: 0, pageSize: 20 };

    constructor() {
        super();
        this.loading = false;
    }

    getUserWordListAsync = async (page: number, pageSize: number) => {
        return await this.get("userWord/getWordList", { page: page, pageSize: pageSize });
    }

    createUserWordAsync = async (word: IWordCreateModel) => {
        return await this.post("userWord/createWord", word);
    }

    updateUserWordAsync = async (word: IWordCreateModel) => {
        return await this.post("userWord/updateWord", word);
    }

    deleteUserWordAsync = async (wordId: number) => {
        return await this.post("userWord/deleteWord", { wordId: wordId });
    }
}

export default new UserWordStore()