import Taro, { Component } from "@tarojs/taro";
import "./about.scss"
import { View, Input } from "@tarojs/components";

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
                <View className="form-content">
                    <View className="form-item">
                        <View className="form-title">bug描述</View>
                        <View className="form-input">
                            <Input placeholder="必填" value={""}></Input>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">联系方式</View>
                        <View className="form-input">
                            <Input placeholder="选填" value={""}></Input>
                        </View>
                    </View>
                    <View className="form-submit-item">
                        <View className="form-submit">完成</View>
                    </View>
                </View>
            </View>
        </View>
    }
}