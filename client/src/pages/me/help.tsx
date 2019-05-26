import Taro, { Component } from "@tarojs/taro";
import "./about.scss"
import { View, Image } from "@tarojs/components";

import { NavigationBar } from "../../components";
import { NavigatorOpenType } from "../../common/enums";

interface HelpState {
}

export default class Help extends Component<{}, HelpState> {

    constructor() {
        super()
    }

    onSavePayPhoto = () => {
        Taro.saveImageToPhotosAlbum({
            filePath: "../../assets/images/pay.png"
        });
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();

        return <View className="page" style={{ minHeight: windowHeight - 45 + "px" }}>
            <NavigationBar title="请喝饮料" scrollTop={0} backUrl="./me" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <View className="page-content">
                <View className="pay" onClick={this.onSavePayPhoto}>
                    <Image src="../../assets/images/pay.png"></Image>
                </View>
                <View className="tip">
                    自愿请喝饮料，退款没有有效期，只需要提供付款截图和收款二维码即可。如需退款请
                </View>
            </View>
        </View>
    }
}