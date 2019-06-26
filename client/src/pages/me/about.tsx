import Taro, { Component } from "@tarojs/taro";
import "./about.scss"
import { View } from "@tarojs/components";

import { NavigationBar } from "../../components";
import { NavigatorOpenType } from "../../common/enums";

interface AboutState {
    noop: boolean
}

export default class About extends Component<{}, AboutState> {

    constructor() {
        super()
    }

    componentDidMount() {
        this.setState({ noop: false });
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="关于" showPageTitle={false} backUrl="./me" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <View className="page-content">
                <View>
                    前端工程师，目前就职于长沙一家不知名小企业；
                </View>
            </View>
        </View>
    }
}