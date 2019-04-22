import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx'

import "./dashboard.scss"

import Welcome from "./components/welcome";
import withLogin from "../../common/decorator/withLogin";
import { IDashboardDataModel } from "../../models/dashiboard";
import { readingText } from "../../utils/baiduUtils";
import NavigationBar from '../../components/navigationBar/navigationBar';
import Authorization from '../../components/authorization/authorization';
import HighlightWord from '../../components/highlightWord/highlightWord';
import CTransition from '../../components/transition/cTransition';

import DashboardLoading from './components/loading';

interface DashboardState {
    loading: boolean
}

interface DashboardProps {
    dashboardStore: {
        dashboardData: IDashboardDataModel,
        getSentenceAsync: () => {},
        collectAsync: () => {},
        createHistoryAsync: () => {}
    },
    authorizationStore: {
        isAuthorized: boolean,
        update: () => {}
    }
}

@inject("dashboardStore", "authorizationStore")
@observer
@withLogin()
export default class Dashboard extends Component<DashboardProps, DashboardState> {
    constructor() {
        super()
        this.state = {
            loading: true
        }
    }

    async componentWillMount() {
        const { getSentenceAsync } = this.props.dashboardStore;
        await getSentenceAsync();
        this.showDashboardLoding();
    }

    showDashboardLoding = () => {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000)
    }

    onCollectWord = async () => {
        const { collectAsync } = this.props.dashboardStore;
        await collectAsync();
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { loading } = this.state;
        const { dashboardStore: { dashboardData } } = this.props;

        return (
            <View className="page" style={{ height: windowHeight + "px" }}>
                <NavigationBar></NavigationBar>

                <DashboardLoading loading={loading} authorizationStore={this.props.authorizationStore}></DashboardLoading>

                <View className="page-content" style={{ display: loading ? "none" : "block" }}>
                    <CTransition visible={true}>
                        <Welcome />
                    </CTransition>

                    {
                        dashboardData ?
                            <View className="word-card">
                                <View className="card">
                                    <View className="card-header card-header-icon">
                                        <CTransition visible={true}>
                                            <Authorization authorizationStore={this.props.authorizationStore}>
                                                <View onClick={this.onCollectWord}>
                                                    {
                                                        dashboardData && dashboardData.collectionId ?
                                                            <Text style={{ color: "#ed4630" }} className="icomoonfont icon-heart-fill"></Text> :
                                                            <Text style={{ color: "#ed4630" }} className="icomoonfont icon-heart"></Text>
                                                    }
                                                </View>
                                            </Authorization>
                                        </CTransition>
                                    </View>

                                    <View className="card-body">
                                        <View className="card-content">
                                            <CTransition visible={true}>
                                                <View>
                                                    {dashboardData.word.map((word, index) => {
                                                        return <View className='flex-wrp' style='flex-direction:column; padding-bottom:10rpx;' key={index}>
                                                            <View className='flex-item'>
                                                                <View className="card-word-english" onClick={() => { readingText(word.english) }}>{word.english}
                                                                    <Text className="card-word-phonetic">{"  " + word.phonetic}</Text>
                                                                </View>
                                                            </View>
                                                            <View className='flex-item'>
                                                                <View className="card-word-chinese">{word.chinese}</View>
                                                            </View>
                                                        </View>
                                                    })}
                                                </View>
                                            </CTransition>
                                            <CTransition visible={true}>
                                                <View className='flex-wrp' style='flex-direction:column;margin-top:10px;'>
                                                    <View className='flex-item sentence-english' onClick={() => { readingText(dashboardData.english) }}>
                                                        <HighlightWord sentence={dashboardData.english} words={dashboardData.keyWords.split(",")}></HighlightWord>
                                                    </View>
                                                    <View className='flex-item sentence-chinese'>{dashboardData.chinese}</View>
                                                </View>
                                            </CTransition>
                                        </View>
                                    </View>
                                </View>
                            </View> :
                            null
                    }
                </View >
            </View >
        )
    }
}
