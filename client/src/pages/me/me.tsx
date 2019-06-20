import Taro, { Component } from "@tarojs/taro";
import "./me.scss"
import { View, OpenData, Navigator, Text, Button } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar, WecharAuthorize, ResourceAuthorize, Loading } from "../../components";
import { showMessage } from "../../utils/wechatUtils";
import { IDisplayWordDataModel } from "../../models/word";
import { isAuthorized } from "../../utils/loginUtils";
import { UserResource } from "../../common/enums";

interface MeState {
    showPageTitle: boolean
}

interface MeProps {
    meStore: {
        loading: boolean,
        word: IDisplayWordDataModel,
        getDisplayWordAsync: () => {},
        collectWordAsync: () => {}
    },
    authorizationStore: {
        isAuthorized: boolean,
        update: () => {}
    }
}

@inject("meStore", "authorizationStore")
@observer
export default class Me extends Component<MeProps, MeState> {

    constructor() {
        super()
        this.state = {
            showPageTitle: true
        }
    }

    async componentDidMount() {
        const { getDisplayWordAsync } = this.props.meStore;
        if (isAuthorized()) {
            await getDisplayWordAsync();
        }
    }

    onPageScroll = (e) => {
        let scrollTop = e.scrollTop;
        this.setState({
            showPageTitle: scrollTop < 50
        })
    }

    onShowNotOpen = () => {
        showMessage("功能暂未开放");
    }

    onCollectWord = async () => {
        const { collectWordAsync } = this.props.meStore;
        await collectWordAsync();
        Taro.vibrateShort();
    }

    onShareAppMessage = () => {
        return {
            title: '程序员英语 - 一个简单的程序员英语小程序.',
            imageUrl: '../../assets/images/appshare.png',
            path: '/pages/dashboard/dashboard'
        }
    }

    async onPullDownRefresh() {
        await this.props.meStore.getDisplayWordAsync();
        Taro.stopPullDownRefresh();
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { showPageTitle } = this.state;
        const { meStore: { loading, word } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="我的" showPageTitle={showPageTitle}></NavigationBar>
            <View className="flex-custom-border-bottom">
                <View className="flex-custom-userinfo">
                    <View>
                        <OpenData className="flex-custom-avatar" type="userAvatarUrl"></OpenData>
                    </View>
                    <View className="flex-custom-welcome">
                        <View>
                            <OpenData type="userNickName"></OpenData>
                        </View>
                        <View>欢迎回来.</View>
                    </View>
                </View>
            </View>
            <WecharAuthorize authorizationStore={this.props.authorizationStore}>
                <View className="page-content">
                    <ResourceAuthorize resources={[UserResource.WordCollect]}>
                        <View className="flex-custom-border-top">
                            <Navigator url="../word/word.list" className="flex-custom-row">
                                <View className="flex-custom-text">收藏词汇</View>
                                <View className="flex-custom-searchall">查看全部</View>
                            </Navigator>
                            <Loading loading={loading}></Loading>
                            {
                                word ? <View className="flex-custom-content">
                                    <View className="flex-custom-box">
                                        <View className="flex-custom-love">

                                            <View onClick={this.onCollectWord}>
                                                {
                                                    word && word.collectionId ?
                                                        <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart-fill"></Text> :
                                                        <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart"></Text>
                                                }
                                            </View>

                                        </View>
                                        <View className="flex-custom-word">{word.english}</View>
                                        <View className="flex-custom-cn">{word.chinese}</View>
                                    </View>
                                </View> : null
                            }
                        </View>
                    </ResourceAuthorize>

                    <View className="flex-custom-border-top">
                        <ResourceAuthorize resources={[UserResource.UserWordCreate]}>
                            <View className="flex-custom-row">
                                <Navigator hoverClass="none" url="../user/userWord.list">
                                    <View className="flex-custom-text">
                                        我的词汇
                                    </View>
                                </Navigator>
                                <View className="flex-custom-searchall">
                                    <Navigator hoverClass="none" url="../user/userWord.create"><Text className="icomoonfont icon-plus"></Text></Navigator>
                                </View>
                            </View>
                        </ResourceAuthorize>
                    </View>

                    <ResourceAuthorize resources={[UserResource.WordCreate]}>
                        <View className="flex-custom-border-top">
                            <Navigator url="../word/word.create" className="flex-custom-row">
                                <View className="flex-custom-text">单词管理</View>
                                <View className="flex-custom-icon"><Text className="icomoonfont icon-right"></Text></View>
                            </Navigator>
                        </View>
                    </ResourceAuthorize>

                    <ResourceAuthorize resources={[UserResource.Donate]}>
                        <View className="flex-custom-border-top">
                            <Navigator url="./help" className="flex-custom-row">
                                <View className="flex-custom-text">请喝饮料</View>
                                <View className="flex-custom-icon"><Text className="icomoonfont icon-right"></Text></View>
                            </Navigator>
                        </View>
                    </ResourceAuthorize>

                    <ResourceAuthorize resources={[UserResource.FeedbackCreate]}>
                        <View className="flex-custom-border-top">
                            <Navigator url="./feedback" className="flex-custom-row">
                                <View className="flex-custom-text">反馈建议</View>
                                <View className="flex-custom-icon"><Text className="icomoonfont icon-right"></Text></View>
                            </Navigator>
                        </View>
                    </ResourceAuthorize>

                    <View className="flex-custom-border-top">
                        <View className="flex-custom-row" onClick={() => { this.onShareAppMessage }}>
                            <View className="flex-custom-text">
                                <Button style={{ marginTop: "8rpx" }} openType="share" hoverClass="none" open-type="share">分享给好友</Button>
                            </View>
                            <View className="flex-custom-icon"><Text className="icomoonfont icon-right"></Text></View>
                        </View>
                    </View>

                    <View className="flex-custom-border">
                        <Navigator url="./about" className="flex-custom-row">
                            <View className="flex-custom-text">关于</View>
                            <View className="flex-custom-icon"><Text className="flex-custom-version">V 3.0.0</Text></View>
                        </Navigator>
                    </View>

                    <View className="footer">
                        <ResourceAuthorize resources={[UserResource.FeedbackCreate]}>
                            <View className="bug"><Navigator url="./bug">提交bug</Navigator></View>
                        </ResourceAuthorize>
                        <View className="copyright">版权所有 ©2017-2019 程序员英语.</View>
                    </View>
                </View>
            </WecharAuthorize>
        </View>
    }
}