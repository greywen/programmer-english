import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import '../../assets/icons.scss'
import './navigationBar.scss'

interface NavigationBarProps {
    background?: string,
    color?: string,
    title?: string,
    showBack?: boolean,
    backUrl?: string
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
        Taro.redirectTo({
            url: this.props.backUrl || ""
        })
    }

    render() {
        const { background, color, title, showBack } = this.props;

        return (
            <View className="navigation-bar" style={{
                paddingTop: this.state.paddingTop + "px",
                height: this.state.height + "px",
                lineHeight: this.state.height + "px",
                background: background || "#efeff4",
                color: color || "#000"
            }}>
                <View className="tools" style={{
                    paddingTop: this.state.paddingTop + "px",
                    height: this.state.height + "px",
                    lineHeight: this.state.height + "px"
                }}>
                    <View className="icon-tools">
                        {showBack ? <Text className="icomoonfont icon-arrowleft" onClick={this.onClickBack.bind(this)}></Text> : ""}
                    </View>
                </View>
                <View className="title">{title ? title : ""}</View>
            </View >
        )
    }
}
