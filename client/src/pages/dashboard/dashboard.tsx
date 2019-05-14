import Taro, { Component } from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx'

import "./dashboard.scss"
import withLogin from "../../common/decorator/withLogin";
import { IDashboardDataModel, IQuestionDataModel } from "../../models/dashiboard";
import { readingText } from "../../utils/baiduUtils";
import NavigationBar from '../../components/navigationBar/navigationBar';
import Authorization from '../../components/authorization/authorization';
import HighlightWord from '../../components/highlightWord/highlightWord';
import CTransition from '../../components/transition/cTransition';
import { HtmlParse } from '../../components/htmlParse/htmlParse';
interface DashboardState {
    scrollTop: number
}

interface DashboardProps {
    dashboardStore: {
        question: IQuestionDataModel,
        getSentenceAsync: () => {},
        collectAsync: () => {},
        createHistoryAsync: () => {},
        getQuestionAsync: () => {}
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
            scrollTop: 0
        }
    }

    async componentWillMount() {
        const { getQuestionAsync } = this.props.dashboardStore;
        await getQuestionAsync();
    }

    onCollectWord = async () => {
        const { collectAsync } = this.props.dashboardStore;
        await collectAsync();
    }

    onPageScroll = (e) => {
        this.setState({
            scrollTop: e.scrollTop
        })
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { scrollTop } = this.state;
        const { dashboardStore: { question } } = this.props;
        return (
            <View className="page" style={{ height: windowHeight + "px" }}>
                <NavigationBar title="推荐" scrollTop={scrollTop}></NavigationBar>

                <View className="page-content">
                    {question ? <HtmlParse data={question.describe}></HtmlParse> : null}
                    {/* {
                        dashboardData ?
                            <View className="sentence-content">
                                <View className="content">
                                    <View className="header header-icon">
                                        <CTransition visible={true} transform="30">
                                            <Authorization authorizationStore={this.props.authorizationStore}>
                                                <View onClick={this.onCollectWord}>
                                                    {
                                                        dashboardData && dashboardData.collectionId ?
                                                            <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart-fill"></Text> :
                                                            <Text style={{ color: "#3271fd" }} className="icomoonfont icon-heart"></Text>
                                                    }
                                                </View>
                                            </Authorization>
                                        </CTransition>
                                    </View>

                                    <View className="content-body">
                                        <CTransition visible={true} transform="30">
                                            <View>
                                                {dashboardData.word.map(word => {
                                                    return <View className='flex-wrp' style='flex-direction:column; padding-bottom:10rpx;'>
                                                        <View className='flex-item'>
                                                            <View className="word-english" onClick={() => { readingText(word.english) }}>{word.english}
                                                                <Text className="word-phonetic">{` ${word.phonetic}`}</Text>
                                                            </View>
                                                        </View>
                                                        <View className='flex-item'>
                                                            <View className="word-chinese">{word.chinese}</View>
                                                        </View>
                                                    </View>
                                                })}
                                            </View>
                                        </CTransition>
                                        <CTransition visible={true} transform="30">
                                            <View className='flex-wrp' style='flex-direction:column;margin-top:10px;'>
                                                <View className='flex-item sentence-english' onClick={() => { readingText(dashboardData.english) }}>
                                                    <HighlightWord sentence={dashboardData.english} words={dashboardData.keyWords.split(",")}></HighlightWord>
                                                </View>
                                                <ScrollView className='flex-item sentence-chinese'>
                                                    {dashboardData.chinese}
                                                </ScrollView>
                                            </View>
                                        </CTransition>
                                    </View>
                                </View>
                            </View> :
                            null
                    } */}
                </View >
            </View >
        )
    }
}
