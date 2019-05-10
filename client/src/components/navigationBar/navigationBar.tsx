import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import '../../assets/icons.scss'
import './navigationBar.scss'
import CTransition from '../transition/cTransition';

interface NavigationBarProps {
    background?: string,
    color?: string,
    title?: string,
    showBack?: boolean,
    backUrl?: string,
    scrollTop?: number
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
        const { background, color, title, showBack, scrollTop } = this.props;
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
                            {showBack ? <Text className="icomoonfont icon-arrowleft" onClick={this.onClickBack.bind(this)}></Text> : ""}
                        </View>
                    </View>
                    <View className="title">{title && scrollTop && scrollTop > 50 ? title : ""}</View>
                </View >
                {!scrollTop || scrollTop < 50 ?
                    // <CTransition visible={true} name="fadeDown" duration={500} transform="5">
                    <View style={{ marginTop: this.state.height + "px", }} className="page-header">
                        <View className="header-title">{title}</View>
                    </View>
                    // </CTransition>
                    : null
                }
            </View>
        )
    }
}
