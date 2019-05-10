import Taro, { Component } from "@tarojs/taro";
import "./me.scss"
import { View } from "@tarojs/components";

import { NavigationBar } from "../../components";

interface MeState {
    scrollTop: number
}

export default class Me extends Component<{}, MeState> {

    constructor() {
        super()
        this.state = {
            scrollTop: 0
        }
    }

    onPageScroll = (e) => {
        console.log(e.scrollTop);
        this.setState({
            scrollTop: e.scrollTop
        })
    }


    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { scrollTop } = this.state;

        return <View className="page" style={{ height: windowHeight + "px" }}>
            <NavigationBar title="我的" scrollTop={scrollTop}></NavigationBar>
        </View>
    }
}