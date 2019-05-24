import Taro, { Component } from '@tarojs/taro';
import { View, Navigator } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx'

import "./dashboard.scss"
import withLogin from "../../common/decorator/withLogin";
import { IQuestionDataModel } from "../../models/dashiboard";
import { HtmlParse } from '../../components/htmlParse/htmlParse';
import { NavigationBar, Loading, WecharAuthorize } from '../../components';

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
                <NavigationBar title="推荐" scrollTop={scrollTop}></NavigationBar>
                <Loading loading={loading}></Loading>
                <View className="page-content">
                    {question ? <HtmlParse data={question.describe}></HtmlParse> : null}
                    <WecharAuthorize authorizationStore={this.props.authorizationStore}>
                        <View className="tools"><Navigator url={`./userAnswer?questionId=${question.id}`}>翻译与分析</Navigator></View>
                    </WecharAuthorize>
                </View>
            </View >
        )
    }
}
