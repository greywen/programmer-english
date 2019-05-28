import Taro, { Component } from "@tarojs/taro";
import "./about.scss"
import { View } from "@tarojs/components";

import { NavigationBar } from "../../components";
import { NavigatorOpenType } from "../../common/enums";

interface AboutState {
}

export default class About extends Component<{}, AboutState> {

    constructor() {
        super()
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();

        return <View className="page" style={{ minHeight: windowHeight - 45 + "px" }}>
            <NavigationBar title="关于" scrollTop={0} backUrl="./me" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <View className="page-content">
                <View>
                    前端工程师，目前就职于长沙一家不知名小企业；
                    喜欢捣鼓前端相关的各种东西。
                </View>
            </View>
        </View>
    }
}