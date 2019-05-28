import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import '../../assets/icons.scss'
import './navigationBar.scss'
import { NavigatorOpenType } from '../../common/enums';

interface NavigationBarProps {
    background?: string,
    color?: string,
    title?: string,
    openType?: NavigatorOpenType,
    backUrl?: string,
    scrollTop?: number
    hidePageTitle?: boolean
}

interface NavigationBarState {
    paddingTop: number,
    height: number
}

export default class NavigationBar extends Component<NavigationBarProps, NavigationBarState> {

    constructor() {
        super();
        const systemInfo = Taro.getSystemInfoSync();
        let reg = /ios/i;
        let _paddingTop = 20;
        let _height = 44;

        if (reg.test(systemInfo.system)) {
            _paddingTop = systemInfo.statusBarHeight;
            _height = 44;
        } else {
            _paddingTop = systemInfo.statusBarHeight;
            _height = 48;
        }

        this.state = {
            paddingTop: _paddingTop,
            height: _height
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
        const { background, color, title, backUrl, scrollTop, hidePageTitle } = this.props;
        return (
            <View>
                <View className="navigation-bar" style={{
                    paddingTop: this.state.paddingTop + "px",
                    height: this.state.height + "px",
                    lineHeight: this.state.height + "px",
                    background: background || "#f5f4f9",
                    color: color || "#000"
                }}>
                    <View className="tools" style={{
                        paddingTop: this.state.paddingTop + "px",
                        height: this.state.height + "px",
                        lineHeight: this.state.height + "px"
                    }}>
                        <View className="icon-tools">
                            {!!backUrl ? <Text style="color:#3271fd;" className="icomoonfont icon-arrowleft" onClick={this.onClickBack.bind(this)}></Text> : ""}
                        </View>
                    </View>
                    <View className="title">{(title && scrollTop && scrollTop > 50) || hidePageTitle ? title : ""}</View>
                </View >

                {
                    hidePageTitle ? "" : <View style={{ marginTop: this.state.height + "px", }} className="page-header">
                        <View className="header-title">{scrollTop === 0 || scrollTop && scrollTop < 50 ? title : ""}</View>
                    </View>
                }

            </View>
        )
    }
}
