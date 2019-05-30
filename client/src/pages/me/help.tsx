import Taro, { Component, showLoading } from "@tarojs/taro";
import "./about.scss"
import { View, Image } from "@tarojs/components";

import { NavigationBar } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import { showSuccess } from "../../utils/wechatUtils";

interface HelpState {
}

export default class Help extends Component<{}, HelpState> {

    constructor() {
        super()
    }

    onSavePayPhoto = () => {
        showLoading();
        Taro.downloadFile({
            url: "https://wx.just-right.cn:8092/1558755583.png",
            success: (res) => {
                if (res.statusCode === 200) {
                    Taro.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath
                    }).then(() => {
                        showSuccess("保存成功");
                    });
                }
            },
            fail: (err) => {
                console.log(err);
            }
        })
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="请喝饮料" scrollTop={0} backUrl="./me" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <View className="page-content">
                <View className="pay">
                    <Image onClick={this.onSavePayPhoto} src="../../assets/images/pay.png"></Image>
                </View>
                <View className="tip">
                    <View style="font-weight: bold;padding-bottom:10px;">点击二维码保存，然后使用微信扫一扫识别</View>
                    <View>请在考虑清楚后再自愿打赏或捐助。</View>
                    <View>退款没有有效期，只需要提供付款截图和收款二维码即可</View>
                    <View>如需退款请发邮件至：wenguoqishi@163.com</View>
                </View>
            </View>
        </View>
    }
}