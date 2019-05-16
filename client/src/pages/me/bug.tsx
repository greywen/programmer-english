import Taro, { Component } from "@tarojs/taro";
import "./bug.scss"
import { View, Input } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar } from "../../components";
import { NavigatorOpenType, FeedbackType } from "../../common/enums";
import { IFeedbackModel } from "../../models/user";
import { showSuccess } from "../../utils/wechatUtils";

interface BugState {
    type: FeedbackType,
    describe: string,
    contact: string
}

interface BugProps {
    feedbackStore: {
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
        this.props.feedbackStore.createFeedbackAsync({ describe: this.state.describe, contact: this.state.contact, type: this.state.type });
        this.setState({
            describe: "",
            contact: ""
        });
        showSuccess("反馈成功");
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { describe, contact } = this.state;

        return <View className="page" style={{ minHeight: windowHeight - 45 + "px" }}>
            <NavigationBar title="提交bug" scrollTop={0} backUrl="./me" openType={NavigatorOpenType.navigateBack}></NavigationBar>
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