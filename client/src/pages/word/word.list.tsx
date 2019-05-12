import Taro, { Component } from "@tarojs/taro";
import "./word.list.scss"
import { View, Text, Navigator } from "@tarojs/components";

import { NavigationBar } from "../../components";
import { NavigatorOpenType } from "../../common/enums";

export default class WordList extends Component<{}, {}> {

    constructor() {
        super()
    }


    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="单词列表" hidePageTitle={true} backUrl="../me/me" openType={NavigatorOpenType.switchTab}></NavigationBar>
            <View className="page-content">
                <View className="word-list">
                    <Navigator url="./word.detail">
                        <View className="border-bottom">
                            <View className="list-item">
                                <View className="list-item-text">conservation</View>
                                <View className="list-item-time">保护；保存；</View>
                                <View className="list-item-time">2019/05/11</View>
                            </View>
                        </View>
                    </Navigator>

                    <Navigator url="./word.detail">
                        <View className="border-bottom">
                            <View className="list-item">
                                <View className="list-item-text">build</View>
                                <View className="list-item-time">建立；建筑；构造；</View>
                                <View className="list-item-time">2019/05/11</View>
                            </View>
                        </View>
                    </Navigator>

                    <Navigator url="./word.detail">
                        <View className="border-bottom">
                            <View className="list-item">
                                <View className="list-item-text">conservation</View>
                                <View className="list-item-time">保护；保存；</View>
                                <View className="list-item-time">2019/05/11</View>
                            </View>
                        </View>
                    </Navigator>

                    <Navigator url="./word.detail">
                        <View className="border-bottom">
                            <View className="list-item">
                                <View className="list-item-text">conservation</View>
                                <View className="list-item-time">保护；保存；</View>
                                <View className="list-item-time">2019/05/11</View>
                            </View>
                        </View>
                    </Navigator>

                    <Navigator url="./word.detail">
                        <View className="border-bottom">
                            <View className="list-item">
                                <View className="list-item-text">conservation</View>
                                <View className="list-item-time">保护；保存；</View>
                                <View className="list-item-time">2019/05/11</View>
                            </View>
                        </View>
                    </Navigator>

                    <Navigator url="./word.detail">
                        <View className="border-bottom">
                            <View className="list-item">
                                <View className="list-item-text">conservation</View>
                                <View className="list-item-time">保护；保存；</View>
                                <View className="list-item-time">2019/05/11</View>
                            </View>
                        </View>
                    </Navigator>

                    <Navigator url="./word.detail">
                        <View className="border-bottom">
                            <View className="list-item">
                                <View className="list-item-text">conservation</View>
                                <View className="list-item-time">保护；保存；</View>
                                <View className="list-item-time">2019/05/11</View>
                            </View>
                        </View>
                    </Navigator>

                    <Navigator url="./word.detail">
                        <View className="border-bottom">
                            <View className="list-item">
                                <View className="list-item-text">conservation</View>
                                <View className="list-item-time">保护；保存；</View>
                                <View className="list-item-time">2019/05/11</View>
                            </View>
                        </View>
                    </Navigator>

                    <Navigator url="./word.detail">
                        <View className="border-bottom">
                            <View className="list-item">
                                <View className="list-item-text">conservation</View>
                                <View className="list-item-time">保护；保存；</View>
                                <View className="list-item-time">2019/05/11</View>
                            </View>
                        </View>
                    </Navigator>

                    <Navigator url="./word.detail">
                        <View className="border-bottom">
                            <View className="list-item">
                                <View className="list-item-text">conservation</View>
                                <View className="list-item-time">保护；保存；</View>
                                <View className="list-item-time">2019/05/11</View>
                            </View>
                        </View>
                    </Navigator>
                </View>
            </View>
        </View>
    }
}