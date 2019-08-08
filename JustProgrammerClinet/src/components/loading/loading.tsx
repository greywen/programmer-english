import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import "./loading.scss";
import '../../assets/icons.scss';

interface PageLoadingProps {
    loading: boolean,
    size?: "default" | "large" | "small",
    fullScreen?: boolean,
    text?: string
}

export default class Loading extends Component<PageLoadingProps, {}> {

    getClassName() {
        const { size = "default", fullScreen } = this.props;
        let classNames = "i-class i-spin";
        classNames += ` i-spin-${size}`;
        fullScreen ? classNames += ` i-spin-fullscreen` : classNames += ` i-spin-fix i-spin-fullscreen-wrapper`;
        return classNames;
    }

    render() {
        const { text } = this.props;

        return <View>{
            this.props.loading ? <View className={this.getClassName()}>
                <View className="i-spin-main">
                    <View className="i-circle-side"></View>
                    {/* <View className="i-k-bar"></View> */}
                    <View className="i-spin-show-text">{text ? text : ""}</View>
                </View>
            </View> : null
        }
        </View>
    }
}

