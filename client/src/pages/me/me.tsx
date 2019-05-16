import Taro, { Component } from "@tarojs/taro";
import "./me.scss"
import { View, OpenData, Navigator, Text } from "@tarojs/components";

import { NavigationBar } from "../../components";
import { showMessage } from "../../utils/wechatUtils";

interface MeState {
    scrollTop: number
}

export default class Me extends Component<{}, MeState> {

    constructor() {
        super()
        this.state = {
            scrollTop: 0
        }
    }

    onPageScroll = (e) => {
        this.setState({
            scrollTop: e.scrollTop
        })
    }

    onShowNotOpen = () => {
        showMessage("功能暂未开放");
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { scrollTop } = this.state;

        return <View className="page" style={{ minHeight: windowHeight + "px", backgroundColor: "#f8f8f8" }}>
            <NavigationBar title="我的" scrollTop={scrollTop}></NavigationBar>
            <View className="flex-custom-border-bottom">
                <View className="flex-custom-userinfo">
                    <View>
                        <OpenData className="flex-custom-avatar" type="userAvatarUrl"></OpenData>
                    </View>
                    <View className="flex-custom-welcome">
                        <View>
                            <OpenData type="userNickName"></OpenData>
                        </View>
                        <View>欢迎回来.</View>
                    </View>
                </View>
            </View>

            <View className="page-content">
                <View className="flex-custom-border-top">
                    <Navigator url="../word/word.list" className="flex-custom-row">
                        <View className="flex-custom-text">我的词汇</View>
                        <View className="flex-custom-searchall">查看全部</View>
                    </Navigator>
                    <View className="flex-custom-content">
                        <View className="flex-custom-box">
                            <View className="flex-custom-love">
                                <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart"></Text>
                            </View>
                            <View className="flex-custom-word">conservation</View>
                            <View className="flex-custom-cn">保护；保存；</View>
                        </View>
                    </View>
                </View>

                <View className="flex-custom-border-top">
                    <Navigator url="" onClick={this.onShowNotOpen} className="flex-custom-row">
                        <View className="flex-custom-text">设置</View>
                        <View className="flex-custom-icon">></View>
                    </Navigator>
                </View>

                <View className="flex-custom-border-top">
                    <Navigator url="./feedback" className="flex-custom-row">
                        <View className="flex-custom-text">反馈建议</View>
                        <View className="flex-custom-icon">></View>
                    </Navigator>
                </View>

                <View className="flex-custom-border">
                    <Navigator url="./about" className="flex-custom-row">
                        <View className="flex-custom-text">关于</View>
                        <View className="flex-custom-icon"><Text className="flex-custom-version">V 3.0.0</Text> ></View>
                    </Navigator>
                </View>

                <View className="footer">
                    <View className="bug"><Navigator url="./bug">提交bug</Navigator></View>
                    <View className="copyright">版权所有 ©2019 程序员英语.</View>
                </View>
            </View>
        </View>
    }
}