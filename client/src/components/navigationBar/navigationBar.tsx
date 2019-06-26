import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import '../../assets/icons.scss'
import './navigationBar.scss'
import { NavigatorOpenType } from '../../common/enums';
import * as globalData from "../../common/globalData";

interface NavigationBarProps {
    background?: string,
    color?: string,
    title?: string,
    openType?: NavigatorOpenType,
    backUrl?: string,
    showPageTitle?: boolean
}

interface NavigationBarState {
    paddingTop: number,
    statusBarHeight: number
}

export default class NavigationBar extends Component<NavigationBarProps, NavigationBarState> {

    constructor() {
        super();
        const { paddingTop, statusBarHeight } = globalData.get("navigationBar");
        this.state = {
            paddingTop: paddingTop,
            statusBarHeight: statusBarHeight
        }
    }

    onClickBack = () => {
        const { openType, backUrl } = this.props;
        let _openType = openType || NavigatorOpenType.redirect, _ops = { url: backUrl || "" }
        if (_openType === NavigatorOpenType.redirect) {
            Taro.redirectTo(_ops);
        } else if (_openType === NavigatorOpenType.switchTab) {
            Taro.switchTab(_ops);
        } else if (_openType === NavigatorOpenType.navigate) {
            Taro.navigateTo(_ops);
        } else if (_openType === NavigatorOpenType.navigateBack) {
            Taro.navigateBack();
        } else if (_openType === NavigatorOpenType.reLaunch) {
            Taro.reLaunch(_ops);
        }
    }

    render() {
        const { background, color, title, backUrl, showPageTitle } = this.props;
        const { paddingTop, statusBarHeight } = this.state;
        
        return (
            <View>
                <View className="navigation-bar" style={{
                    paddingTop: paddingTop + "px",
                    height: statusBarHeight + "px",
                    lineHeight: statusBarHeight + "px",
                    background: background || "#f6f6f6",
                    color: color || "#000",
                    borderBottom: showPageTitle ? "none" : "1px solid #c7c7ca"
                }}>
                    <View className="tools" style={{
                        paddingTop: this.state.paddingTop + "px",
                        height: statusBarHeight + "px",
                        lineHeight: statusBarHeight + "px"
                    }}>
                        <View className="icon-tools">
                            {backUrl ? <Text style="color:#1d1d1d;" className="icomoonfont icon-arrowleft" onClick={this.onClickBack.bind(this)}></Text> : ""}
                        </View>
                    </View>
                    <View className="title">{showPageTitle ? "" : title}</View>
                </View >

                {
                    showPageTitle ? <View style={{ marginTop: statusBarHeight + "px", borderBottom: "1px solid #c7c7ca" }} className="page-header">
                        <View className="header-title">{title}</View>
                    </View> : null
                }

            </View>
        )
    }
}
