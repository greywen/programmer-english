import Taro, { Component } from '@tarojs/taro';
import { View, OpenData } from '@tarojs/components';

import './loading.scss'
import Authorization from "../../../components/authorization/authorization";

interface DashboardLoadingProps {
    loading: boolean,
    authorizationStore: {
        isAuthorized: boolean,
        update: () => {}
    }
}

interface DashboardLoadingState {
    moveAnimate: any;
}

export default class DashboardLoading extends Component<DashboardLoadingProps, DashboardLoadingState> {
    constructor() {
        super()
        this.state = {
            moveAnimate: null
        }
    }

    render() {
        const { loading } = this.props;
        const { moveAnimate } = this.state;

        if (!loading && !moveAnimate) {
            Taro.createSelectorQuery().select(".circle").boundingClientRect().exec(() => {
                const { windowHeight, windowWidth } = Taro.getSystemInfoSync();
                let x = -(windowWidth * 0.35), y = -(windowHeight * 0.4);
                let _animation = Taro.createAnimation({});
                _animation.translate(x, y).scale(1.5, 1.5).step({
                    duration: 600,
                    timingFunction: 'ease-in-out'
                });
                this.setState({ moveAnimate: _animation });
            })
        }

        return (
            <View className="loading">
                <View animation={moveAnimate} className={loading ? "circle-anmiate" : "circle"}>
                    <View className='flex-wrp' style='flex-direction:row;'>
                        <View className='flex-item flex-item-V'>
                            <Authorization authorizationStore={this.props.authorizationStore}>
                                <OpenData className="avatar" lang="zh_CN" type='userAvatarUrl' />
                            </Authorization>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
