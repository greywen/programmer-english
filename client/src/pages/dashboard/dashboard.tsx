import Taro, { Component } from '@tarojs/taro';
import { View, Navigator } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx'

import "./dashboard.scss"
import withLogin from "../../common/decorator/withLogin";
import { IQuestionDataModel } from "../../models/dashiboard";
import NavigationBar from '../../components/navigationBar/navigationBar';
import { HtmlParse } from '../../components/htmlParse/htmlParse';
import { uploadFile } from '../../utils/request';

interface DashboardState {
    scrollTop: number
}

interface DashboardProps {
    dashboardStore: {
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
        const { dashboardStore: { question } } = this.props;
        return (
            <View className="page" style={{ height: windowHeight + "px" }
            }>
                <NavigationBar title="推荐" scrollTop={scrollTop}></NavigationBar>

                <View className="page-content">
                    <View><Navigator url="./userAnswer">提交答案</Navigator></View>
                    {question ? <HtmlParse data={question.describe}></HtmlParse> : null}
                </View >
            </View >
        )
    }
}
