import Taro, { Component } from "@tarojs/taro";
import "./bug.scss"
import { View, Input } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar } from "../../components";
import { NavigatorOpenType, FeedbackType } from "../../common/enums";
import { IFeedbackModel } from "../../models/user";
import { showSuccess, showMessage } from "../../utils/wechatUtils";
import Loading from "../../components/loading/loading";

interface BugState {
    type: FeedbackType,
    describe: string,
    contact: string
}

interface BugProps {
    feedbackStore: {
        loading: boolean,
        createFeedbackAsync: (feedback: IFeedbackModel) => {}
    }
}

@inject("feedbackStore", "authorizationStore")
@observer
export default class Bug extends Component<BugProps, BugState> {

    constructor() {
        super()
        this.state = {
            describe: "",
            type: FeedbackType.Bug,
            contact: ""
        }
    }

    async onFeedback() {
        let { describe, contact } = this.state;

        if (describe.trim().length === 0) {
            showMessage("bug描述必填");
            return;
        }
        this.props.feedbackStore.createFeedbackAsync({ describe: describe, contact: contact, type: this.state.type });
        this.setState({
            describe: "",
            contact: ""
        });
        showSuccess("反馈成功");
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { describe, contact } = this.state;
        const { feedbackStore: { loading } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight - 45 + "px" }}>
            <NavigationBar title="提交bug" scrollTop={0} backUrl="./me" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                <View className="form-content">
                    <View className="form-item">
                        <View className="form-title">bug描述</View>
                        <View className="form-input">
                            <Input placeholder="必填" value={describe} onInput={(e) => { this.setState({ describe: e.target["value"] }) }}></Input>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">联系方式</View>
                        <View className="form-input">
                            <Input placeholder="选填" value={contact} onInput={(e) => { this.setState({ contact: e.target["value"] }) }}></Input>
                        </View>
                    </View>
                    <View className="form-submit-item">
                        <View className="form-submit" onClick={this.onFeedback}>完成</View>
                    </View>
                </View>
            </View>
        </View>
    }
}