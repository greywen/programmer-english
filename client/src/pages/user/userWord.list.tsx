import Taro, { Component } from "@tarojs/taro";
import "./userWord.list.scss"
import { View, Text } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar, Loading, CTransition } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import { IWordListDataModel } from "../../models/word";

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

    async componentDidMount() {
        const { getUserWordListAsync } = this.props.userWordStore;
        const { page, pageSize } = this.state;
        var _wordList = await getUserWordListAsync(page, pageSize);

        this.setState({
            wordList: _wordList,
            showLoadMore: _wordList.length > this.state.pageSize
        })
    }

    async onLoadMoreWordAsync() {
        const { getUserWordListAsync } = this.props.userWordStore;
        const { page, pageSize } = this.state;
        let _page = page + 1;
        this.setState({
            page: _page
        })
        var _wordList = await getUserWordListAsync(_page, pageSize);
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
        await this.props.userWordStore.getUserWordListAsync(0, 20);
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
            <NavigationBar title="单词列表" hidePageTitle={true} backUrl="../me/me" openType={NavigatorOpenType.switchTab}></NavigationBar>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                <View className="word-list">
                    {
                        wordList && wordList.map((word, index) => {
                            return <View className="border-bottom" key={"word-" + index}>
                                <View className="list-item">
                                    <View className="list-item-text">{word.english}</View>
                                    <View className="list-item-time">{word.chinese}</View>
                                    <View className="list-item-content" onClick={() => { this.onShowDetail(index) }}>
                                        <View className="list-item-time">{word.createTime}</View>
                                        <View className="list-item-tool">{word.showDetail ? <Text className="icomoonfont icon-down"></Text> : <Text className="icomoonfont icon-right"></Text>}</View>
                                    </View>
                                    <CTransition name="fadeDown" transform="5" duration={500} visible={word.showDetail}>
                                        <View className="list-item-more">
                                            <View>{word.comments}</View>
                                            <View className="list-item-del" onClick={() => { this.onDeleteWord(word.id, index) }}>删除词汇</View>
                                        </View>
                                    </CTransition>
                                </View>
                            </View>
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