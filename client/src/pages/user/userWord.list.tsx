import Taro, { Component } from "@tarojs/taro";
import "./userWord.list.scss"
import { View, Navigator } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar, Loading, Swipeout } from "../../components";
import { IWordListDataModel } from "../../models/word";
import { isNullReturnEmpty } from "../../utils/common";
import justNavigationBar from "../../common/decorator/justNavigationBar";

interface UserWordListState {
    wordList: IWordListDataModel[],
    page: number,
    pageSize: number,
    showLoadMore: boolean
}

interface UserWordListProps {
    userWordStore: {
        loading: boolean,
        showLoadMore: boolean,
        getUserWordListAsync: (page: number, pageSize: number) => IWordListDataModel[],
        getMoreWordAsync: () => {},
        deleteUserWordAsync: (wordId: number) => Promise<boolean>
    }
}
@inject("userWordStore")
@observer
@justNavigationBar({ navigationBarTitleText: "单词列表" })
export default class UserWordList extends Component<UserWordListProps, UserWordListState> {

    constructor() {
        super()
        this.state = {
            wordList: [],
            page: 0,
            pageSize: 20,
            showLoadMore: false
        }
    }

    async init() {
        const { getUserWordListAsync } = this.props.userWordStore;
        const { page, pageSize } = this.state;
        var _wordList = await getUserWordListAsync(page, pageSize);

        _wordList = _wordList.map(x => {
            x.createTime = new Date(x.createTime).toLocaleString();
            return x;
        })

        this.setState({
            wordList: _wordList,
            showLoadMore: _wordList.length > this.state.pageSize
        })
    }

    async componentDidMount() {
        await this.init();
    }

    async onLoadMoreWordAsync() {
        const { getUserWordListAsync } = this.props.userWordStore;
        const { page, pageSize } = this.state;
        let _page = page + 1;
        this.setState({
            page: _page
        })
        var _wordList = await getUserWordListAsync(_page, pageSize);
        _wordList = _wordList.map(x => {
            x.createTime = new Date(x.createTime).toLocaleString();
            return x;
        })
        _wordList.shift();
        _wordList = this.state.wordList.concat(_wordList);
        this.setState({
            wordList: _wordList,
            showLoadMore: _wordList.length > this.state.pageSize * (_page + 1)
        })
    }

    onDeleteWord(wordId: number, index: number) {
        this.props.userWordStore.deleteUserWordAsync(wordId).then(() => {
            let _wordList = this.state.wordList.slice();
            _wordList.splice(index, 1);
            this.setState({
                wordList: _wordList
            })
        });
    }

    async onPullDownRefresh() {
        this.setState({
            page: 0
        })
        await this.init();
        Taro.stopPullDownRefresh();
    }

    onShowDetail(index: number) {
        let _wordList = this.state.wordList.slice();
        _wordList[index].showDetail = !_wordList[index].showDetail;
        this.setState({
            wordList: _wordList
        })
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { wordList, showLoadMore } = this.state;
        const { userWordStore: { loading } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="单词列表"></NavigationBar>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                <View className="word-list">
                    {
                        wordList && wordList.map((word, index) => {
                            return <Swipeout key={"word-" + index}>
                                <View className="list-group">
                                    <View className="list-item-title">{word.english}</View>
                                    <View className="list-item-text">{word.chinese}</View>
                                    <View className="list-item-content">
                                        <View>{isNullReturnEmpty(word.comments)}</View>
                                        <View className="list-item-time">{word.createTime}</View>
                                    </View>
                                </View>
                                <View className="list-right-group">
                                    <View className="list-right-group-item" style={{ backgroundColor: "#3271fd" }}>
                                        <Navigator url={`./userWord.create?word=${JSON.stringify(word)}`}>编辑</Navigator>
                                    </View>
                                    <View className="list-right-group-item" style={{ backgroundColor: "#fd3f34" }} onClick={() => { this.onDeleteWord(word.id, index) }}>删除</View>
                                </View>
                            </Swipeout>
                        })
                    }
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