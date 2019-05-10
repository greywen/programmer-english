import Taro, { Component } from "@tarojs/taro";
import "./word.scss"
import { View, Text } from "@tarojs/components";

import { NavigationBar } from "../../components";

interface WordState {
    scrollTop: number
}

export default class Word extends Component<{}, WordState> {

    constructor() {
        super()
        this.state = {
            scrollTop: 0
        }
    }

    onPageScroll = (e) => {
        console.log(e.scrollTop);
        this.setState({
            scrollTop: e.scrollTop
        })
    }


    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { scrollTop } = this.state;

        return <View className="page" style={{ height: windowHeight - 45 + "px" }}>
            <NavigationBar title="技术词汇" scrollTop={scrollTop}></NavigationBar>
            <View className="page-content">
                <View className="page-nav">
                    <View>
                        <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart-fill"></Text>
                    </View>
                    <View>
                        <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart"></Text>
                    </View>
                </View>
                <View className="flex-custom">
                    <View className="flex-custom-item">
                        <View className="flex-custom-item-word">
                            conservation
                        </View>
                        <View className="flex-custom-item-title">读音释义</View>
                        <View className="flex-custom-item-phonetic">
                            <View>英 [xxxxxxx]</View>
                            <View>美 [xxxxxxx]</View>
                        </View>
                        <View className="flex-custom-item-cn">
                            <View>n.保护；保存；</View>
                            <View>复数：conservations</View>
                        </View>
                        <View className="flex-custom-item-title">例句</View>
                        <View className="flex-custom-item-sentence">
                            <View className="flex-custom-sentence-en">

                            </View>
                            <View className="flex-custom-sentence-cn">

                            </View>
                        </View>
                        <View className="next-item">下一个词汇</View>
                    </View>
                </View>
            </View>
        </View>
    }
}