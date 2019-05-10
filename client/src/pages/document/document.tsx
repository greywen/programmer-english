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
        console.log(e.scrollTop);
        this.setState({
            scrollTop: e.scrollTop
        })
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { scrollTop } = this.state;

        return <View className="page" style={{ height: windowHeight - 255 + "px", backgroundColor: "#f5f4f9" }}>
            <NavigationBar title="文档阅读" scrollTop={scrollTop}></NavigationBar>

            <View className="menu">
                <Navigator url="">
                    <View className="menu-item">
                        <View className="menu-item-icon">
                            <Image src="../../assets/images/nodejs.jpg" />
                        </View>
                        <View className="menu-item-text">Nodejs</View>
                    </View>
                </Navigator>

                <View className="menu-item">
                    <View className="menu-item-icon">
                        <Image src="../../assets/images/javascript.png" />
                    </View>
                    <View className="menu-item-text">Javascript</View>
                </View>

                <View className="menu-item">
                    <View className="menu-item-icon">
                        <Image src="../../assets/images/aspnetcore.png" />
                    </View>
                    <View className="menu-item-text">ASP.NET</View>
                </View>

                <View className="menu-item">
                    <View className="menu-item-icon">
                        <Image src="../../assets/images/python.png" />
                    </View>
                    <View className="menu-item-text">Python</View>
                </View>
            </View>
        </View>
    }
}