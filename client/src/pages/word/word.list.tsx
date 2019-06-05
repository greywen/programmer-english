import Taro, { Component } from "@tarojs/taro";
import "./word.list.scss"
import { View, Navigator } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar, Loading } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import { IWordListDataModel } from "../../models/word";

interface WordListProps {
    wordStore: {
        loading: boolean,
        showLoadMore: boolean,
        wordList: IWordListDataModel[],
        getWordListAsync: (page: number, pageSize: number) => IWordListDataModel[]
    }
}

interface WordListState {
    wordList: IWordListDataModel[],
    page: number,
    pageSize: number,
    showLoadMore: boolean
}

@inject("wordStore")
@observer
export default class WordList extends Component<WordListProps, WordListState> {

    constructor() {
        super()
        this.state = {
            wordList: [],
            page: 0,
            pageSize: 20,
            showLoadMore: false
        }
    }

    async componentDidMount() {
        await this.init();
    }
    
    async init() {
        const { getWordListAsync } = this.props.wordStore;
        const { page, pageSize } = this.state;
        var _wordList = await getWordListAsync(page, pageSize);

        this.setState({
            wordList: _wordList,
            showLoadMore: _wordList.length > this.state.pageSize
        })
    }

    async onLoadMoreWordAsync() {
        const { getWordListAsync } = this.props.wordStore;
        const { page, pageSize } = this.state;
        let _page = page + 1;
        this.setState({
            page: _page
        })
        var _wordList = await getWordListAsync(_page, pageSize);
        _wordList.shift();
        _wordList = this.state.wordList.concat(_wordList);
        this.setState({
            wordList: _wordList,
            showLoadMore: _wordList.length > this.state.pageSize * (_page + 1)
        })
    }

    async onPullDownRefresh() {
        this.setState({
            page: 0
        })
        await this.init();
        Taro.stopPullDownRefresh();
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { wordList, showLoadMore } = this.state;
        const { wordStore: { loading } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="单词列表" hidePageTitle={true} backUrl="../me/me" openType={NavigatorOpenType.switchTab}></NavigationBar>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                <View className="word-list">
                    {
                        wordList && wordList.map(word => {
                            return <Navigator key={"word-" + word.id} url={`./word.detail?wordId=${word.id}`}>
                                <View className="list-item">
                                    <View className="list-item-title">{word.english}</View>
                                    <View className="list-item-text">{word.chinese}</View>
                                    <View className="list-item-time">{word.createTime}</View>
                                </View>
                            </Navigator>
                        })
                    }
                </View>
                <View>

                </View>
                <View className="footer">
                    {
                        showLoadMore ? <View onClick={this.onLoadMoreWordAsync}>点击加载更多</View> : null
                    }
                </View>
            </View>
        </View>
    }
}