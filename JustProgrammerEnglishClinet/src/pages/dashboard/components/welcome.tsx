import Taro, { Component } from '@tarojs/taro';
import { View, OpenData } from '@tarojs/components';

import './welcome.scss'

export default class Welcome extends Component {

    render() {
        return (
            <View className="welcome">
                <View className='flex-wrp' style='flex-direction:column;'>
                    <View className='flex-item flex-item-V'>
                        <View className="username text-ellipsis">
                            Hi, <OpenData lang="zh_CN" type="userNickName" />.
                            <View className="welcome">
                                {/* 欢迎回来. */}
                                只要不懒几乎每天更新哦.
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
