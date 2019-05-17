import Taro, { Component } from "@tarojs/taro";
import "./document.scss"
import { View, Image, Navigator } from "@tarojs/components";

import { NavigationBar } from "../../components";

interface DocumentState {
    scrollTop: number
}

export default class Document extends Component<{}, DocumentState> {
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

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { scrollTop } = this.state;

        return <View className="page" style={{ minHeight: windowHeight + "px", backgroundColor: "#f8f8f8" }}>
            <NavigationBar title="文档阅读" scrollTop={scrollTop}></NavigationBar>

            <View className="update">
                <View className="await">稍等一下</View>
                <View>我们正在更新</View>
            </View>

            {/* <View className="article">
                <Navigator url="">
                    <View className="article-item">
                        <View className="article-item-icon">
                            <Image src="../../assets/images/nodejs.jpg" />
                        </View>
                        <View>
                            <View className="article-item-title">08期翻译|Simplify your JavaScript .map(),.reduce(),and .filter()</View>
                        </View>
                    </View>
                </Navigator>

                <Navigator url="">
                    <View className="article-item">
                        <View className="article-item-icon">
                            <Image src="../../assets/images/javascript.png" />
                        </View>
                        <View>
                            <View className="article-item-title">08期翻译|Simplify your JavaScript .map(),.reduce(),and .filter()</View>
                        </View>
                    </View>
                </Navigator>

                <Navigator url="">
                    <View className="article-item">
                        <View className="article-item-icon">
                            <Image src="../../assets/images/aspnetcore.png" />
                        </View>
                        <View>
                            <View className="article-item-title">08期翻译|Simplify your JavaScript .map(),.reduce(),and .filter() .foreach .for .fuck .view .haha . map .reduce</View>
                        </View>
                    </View>
                </Navigator>

                <Navigator url="">
                    <View className="article-item">
                        <View className="article-item-icon">
                            <Image src="../../assets/images/python.png" />
                        </View>
                        <View>
                            <View className="article-item-title">08期翻译|Simplify your JavaScript .map(),.reduce(),and .filter()</View>
                        </View>
                    </View>
                </Navigator>

            </View> */}
        </View>
    }
}