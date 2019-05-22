import Taro, { Component } from "@tarojs/taro";
import "./word.scss"
import { View, Text, Navigator } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx';

import { NavigationBar, Authorization } from "../../components";
import { IWordDataModel } from "../../models/word";
import { readingText } from "../../utils/baiduUtils";
import { showMessage } from "../../utils/wechatUtils";
import Loading from "../../components/loading/loading";

interface WordState {
    scrollTop: number
}

interface WordProps {
    wordStore: {
        loading: boolean,
        word: IWordDataModel,
        getWordAsync: () => {},
        getNextWordAsync: () => {},
        collectWordAsync: () => {}
    },
    authorizationStore: {
        isAuthorized: boolean,
        update: () => {}
    }
}

@inject("wordStore", "authorizationStore")
@observer
export default class Word extends Component<WordProps, WordState> {
    constructor() {
        super()
        this.state = {
            scrollTop: 0
        }
    }

    async componentWillMount() {
        const { getWordAsync } = this.props.wordStore;
        getWordAsync();
    }

    onPageScroll = (e) => {
        this.setState({
            scrollTop: e.scrollTop
        })
    }

    onCollectWord = async () => {
        const { collectWordAsync } = this.props.wordStore;
        await collectWordAsync();
    }

    onGetNextWord = async () => {
        const { getNextWordAsync } = this.props.wordStore;
        if (!await getNextWordAsync()) {
            showMessage("更多词汇还在路上...");
        }
    }

    isNullReturnEmpty(val) {
        return val ? val : ""
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { scrollTop } = this.state;
        const { wordStore: { word, loading } } = this.props;

        return <View className="page" style={{ height: windowHeight - 45 + "px" }}>
            <NavigationBar title="技术词汇" scrollTop={scrollTop}></NavigationBar>
            <Loading loading={loading}></Loading>
            {word ? <View className="page-content">
                <View className="page-nav">
                    <Authorization authorizationStore={this.props.authorizationStore}>
                        <View onClick={this.onCollectWord}>
                            {
                                word && word.collectionId ?
                                    <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart-fill nav-icon"></Text> :
                                    <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart nav-icon"></Text>
                            }
                        </View>
                    </Authorization>
                </View>
                <View className="flex-custom">
                    <View className="flex-custom-item">
                        <View className="flex-custom-item-word" onClick={() => { readingText(word.english) }}>
                            {word.english}
                        </View>
                        <View className="flex-custom-item-title">读音释义</View>
                        <View className="flex-custom-item-phonetic">
                            <View>{this.isNullReturnEmpty(word.phoneticEN)}</View>
                            <View onClick={() => { readingText(word.english) }}>
                                {this.isNullReturnEmpty(word.phoneticUS)}<Text className="icomoonfont icon-sound"></Text>
                            </View>
                        </View>
                        <View className="flex-custom-item-cn">
                            <View>{word.chinese}</View>
                        </View>
                        {
                            word.collocation ? <View>
                                <View className="flex-custom-item-title">搭配</View>
                                <View className="flex-custom-item-collocation">{word.collocation}</View>
                            </View> : null
                        }
                        <View className="flex-custom-item-title">例句<Navigator url="">(推荐?)</Navigator></View>
                        <View className="flex-custom-item-sentences">
                            {
                                word.sentences.map(sentence => {
                                    return <View>
                                        <View className="flex-custom-sentence-cn">
                                            {sentence.chinese}
                                        </View>
                                        <View className="flex-custom-sentence-en">
                                            {sentence.english}
                                        </View>
                                    </View>
                                })
                            }

                        </View>
                        <Authorization authorizationStore={this.props.authorizationStore}>
                            <View className="next-item" onClick={this.onGetNextWord}>下一个词汇</View>
                        </Authorization>
                        <Authorization authorizationStore={this.props.authorizationStore}>
                            <View className="page-help">
                                <Navigator url={`../me/feedback?wordId=${word.id}`}>单词有问题?</Navigator>
                            </View>
                        </Authorization>
                    </View>
                </View>
            </View> : null
            }
        </View>
    }
}