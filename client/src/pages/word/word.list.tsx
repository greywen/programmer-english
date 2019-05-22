import Taro, { Component } from "@tarojs/taro";
import "./word.list.scss"
import { View, Navigator } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import Loading from "../../components/loading/loading";
import { IWordListDataModel } from "../../models/word";

interface WordListProps {
    wordStore: {
        loading: boolean,
        showLoadMore: boolean,
        wordList: IWordListDataModel[],
        getWordListAsync: () => {},
        getMoreWordAsync: () => {}
    }
}
@inject("wordStore")
@observer
export default class WordList extends Component<WordListProps, {}> {

    constructor() {
        super()
    }

    async componentDidMount() {
        const { getWordListAsync } = this.props.wordStore;
        await getWordListAsync();
    }

    onLoadMoreWordAsync() {
        this.props.wordStore.getMoreWordAsync();
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { wordStore: { loading, showLoadMore, wordList } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="单词列表" hidePageTitle={true} backUrl="../me/me" openType={NavigatorOpenType.switchTab}></NavigationBar>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                <View className="word-list">
                    {
                        wordList && wordList.map(word => {
                            return <Navigator key={word.id} url={`./word.detail?wordId=${word.id}`}>
                                <View className="border-bottom">
                                    <View className="list-item">
                                        <View className="list-item-text">{word.english}</View>
                                        <View className="list-item-time">{word.chinese}</View>
                                        <View className="list-item-time">{word.createTime}</View>
                                    </View>
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