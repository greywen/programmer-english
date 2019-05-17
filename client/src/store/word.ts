import { observable } from 'mobx'

import { get, post } from '../utils/request';
import { IWordDataModel, IWordListDataModel, IWordListQueryModel } from '../models/word';
import { BaseStore } from './base.store';

class WordStore extends BaseStore {
    @observable
    word: IWordDataModel;
    @observable
    wordList: IWordListDataModel[];
    @observable
    showLoadMore: boolean;
    @observable
    wordListQuery: IWordListQueryModel = { page: 0, pageSize: 20 };
    @observable
    wordDetail: IWordDataModel;

    getWordAsync = async () => {
        this.loading = true;
        this.word = await get("word/getWord");
        this.loading = false;
    }

    getNextWordAsync = async () => {
        this.loading = true;
        let _word = await get("word/getNextWord");
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

    collectDetailWordAsync = async () => {
        let params = { wordId: this.wordDetail.id };
        this.wordDetail.collectionId = await post("word/collectWord", params);
    }

    getWordListAsync = async () => {
        this.loading = true;
        let _wordList = await get("word/getWordList", this.wordListQuery);
        this.showLoadMore = _wordList && _wordList.length > 20;
        if (this.showLoadMore) {
            _wordList.pop(1);
        }
        this.wordList === undefined ? this.wordList = _wordList : this.wordList.push(..._wordList);
        this.loading = false;
    }

    getMoreWordAsync = async () => {
        this.wordListQuery.page += 1;
        this.getWordListAsync();
    }

    getWordDetailAsync = async (wordId: number) => {
        this.loading = true;
        this.wordDetail = await get("word/getWordDetail", { wordId: wordId });
        this.loading = false;
    }
}

export default new WordStore()