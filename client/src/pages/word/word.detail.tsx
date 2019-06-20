import Taro, { Component } from "@tarojs/taro";
import "./word.detail.scss"
import { View, Text, Navigator } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx';

import { NavigationBar, Loading } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import { IWordDataModel } from "../../models/word";
import { readingText } from "../../utils/baiduUtils";

interface WordDetailProps {
    wordStore: {
        loading: boolean,
        wordDetail: IWordDataModel,
        getWordDetailAsync: (wordId: number) => {}
        collectDetailWordAsync: () => {}
    }
}

@inject("wordStore")
@observer
export default class WordDetail extends Component<WordDetailProps, {}> {

    constructor() {
        super()
    }

    async componentDidMount() {
        let wordId = this.$router.params["wordId"];
        await this.props.wordStore.getWordDetailAsync(wordId);
    }

    onCollectWord = async () => {
        const { collectDetailWordAsync } = this.props.wordStore;
        await collectDetailWordAsync();
    }

    isNullReturnEmpty(val) {
        return val ? val : ""
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { wordStore: { loading, wordDetail } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="单词详情" showPageTitle={false} backUrl="./word.list" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <Loading loading={loading}></Loading>
            {wordDetail ? <View className="page-content">
                <View className="page-nav">
                    <View onClick={this.onCollectWord}>
                        {
                            wordDetail && wordDetail.collectionId ?
                                <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart-fill nav-icon"></Text> :
                                <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart nav-icon"></Text>
                        }
                    </View>
                </View>
                <View className="flex-custom">
                    <View className="flex-custom-item">
                        <View className="flex-custom-item-word" onClick={() => { readingText(wordDetail.english) }}>
                            {wordDetail.english}
                        </View>
                        <View className="flex-custom-item-title">读音释义</View>
                        <View className="flex-custom-item-phonetic">
                            <View>{this.isNullReturnEmpty(wordDetail.phoneticEN)}</View>
                            <View onClick={() => { readingText(wordDetail.english) }}>
                                {this.isNullReturnEmpty(wordDetail.phoneticUS)}<Text className="icomoonfont icon-sound"></Text>
                            </View>
                        </View>
                        <View className="flex-custom-item-cn">
                            <View>{wordDetail.chinese}</View>
                        </View>
                        {
                            wordDetail.collocation ? <View>
                                <View className="flex-custom-item-title">搭配</View>
                                <View className="flex-custom-item-collocation">{wordDetail.collocation}</View>
                            </View> : null
                        }
                        <View className="flex-custom-item-title">例句{/* <Navigator url="">(推荐?)</Navigator> */}</View>
                        <View className="flex-custom-item-sentences">
                            {
                                wordDetail.sentences.map((sentence, index) => {
                                    return <View key={"sentence-" + index}>
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
                        <View className="page-help">
                            <Navigator url={`../me/feedback?wordId=${wordDetail.id}`}>单词有问题?</Navigator>
                        </View>
                    </View>
                </View>
            </View> : null
            }
        </View>
    }
}