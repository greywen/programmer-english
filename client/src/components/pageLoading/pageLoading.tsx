import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import "./pageLoading.scss";
import '../../assets/icons.scss';

interface PageLoadingProps {
    loading: boolean
    // size: string,
    // fix: boolean,
    // fullScreen: boolean,
    // custom: boolean
}

export default class PageLoading extends Component<PageLoadingProps, {}> {

    render() {
        return <View>{
            this.props.loading ? <View className="i-class i-spin i-spin-default i-spin-fix i-spin-fullscreen-wrapper">
                <View className="i-spin-main">
                    <View className="spinner-box">
                        <View className="circle-border">
                            <View className="circle-core"></View>
                        </View>
                    </View>
                </View>
            </View> : null
        }
        </View>
    }
}

