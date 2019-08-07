import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './navigationBar.scss'
import { CTransition } from "../"

interface NavigationBarProps {
    background?: string,
    color?: string,
    title?: string
}

interface NavigationBarState {
    paddingTop: number,
    statusBarHeight: number
}

export default class NavigationBar extends Component<NavigationBarProps, NavigationBarState> {
    render() {
        const { title } = this.props;
        return (
            <View>
                {
                    <CTransition name="fadeDown" duration={1} visible={true}>
                        <View className="page-header">
                            <View className="header-title">{title}</View>
                            <View className="page-header-hr"></View>
                        </View>
                    </CTransition>
                }

            </View>
        )
    }
}
