import Taro, { Component } from "@tarojs/taro";
import "./word.list.scss"
import { View, Text, Navigator } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import PageLoading from "../../components/pageLoading/pageLoading";
import { IWordListDataModel } from "../../models/word";

interface WordListProps {
    wordStore: {
        loading: boolean,
        wordList: IWordListDataModel[],
        getWordListAsync: () => {}
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

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { wordStore: { loading, wordList } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="单词列表" hidePageTitle={true} backUrl="../me/me" openType={NavigatorOpenType.switchTab}></NavigationBar>
            <PageLoading loading={loading}></PageLoading>
            <View className="page-content">
                <View className="word-list">
                    {
                        wordList && wordList.map(word => {
                            return <Navigator url={`./word.detail?wordId=${word.id}`}>
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
                    点击加载更多
                </View>
            </View>
        </View>
    }
}