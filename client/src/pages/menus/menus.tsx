import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import '../../assets/icons.scss'
import './menus.scss'

interface MenuState {

}

interface MenuProps {

}

export default class Sentence extends Component<MenuProps, MenuState> {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <View>
                <View className='flex-wrp' style='flex-direction:column;'>
                    <View className='flex-item'>
                       
                    </View>
                    <View className='flex-item'>
                       
                    </View>
                </View>
            </View>
        )
    }
}
