import Taro, { Component } from '@tarojs/taro';
import { View, Navigator, Button } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx'

import "./dashboard.scss"
import withLogin from "../../common/decorator/withLogin";
import { IQuestionDataModel } from "../../models/dashiboard";
import NavigationBar from '../../components/navigationBar/navigationBar';
import { HtmlParse } from '../../components/htmlParse/htmlParse';
import PageLoading from '../../components/pageLoading/pageLoading';

interface DashboardState {
    scrollTop: number
}

interface DashboardProps {
    dashboardStore: {
        loading: boolean,
        question: IQuestionDataModel,
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

    onPageScroll = (e) => {
        this.setState({
            scrollTop: e.scrollTop
        })
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { scrollTop } = this.state;
        const { dashboardStore: { question, loading } } = this.props;
        return (
            <View className="page" style={{ height: windowHeight + "px" }}>
                <PageLoading loading={loading}></PageLoading>
                <NavigationBar title="推荐" scrollTop={scrollTop}></NavigationBar>
                <View className="page-content">

                    <Button size='mini' plain type="primary">完成</Button>
                    <View><Navigator url="./userAnswer">提交答案</Navigator></View>
                    {question ? <HtmlParse data={question.describe}></HtmlParse> : null}
                </View >
            </View >
        )
    }
}
