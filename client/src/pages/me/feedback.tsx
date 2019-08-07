import Taro, { Component } from "@tarojs/taro";
import "./feedback.scss"
import { View, Textarea } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar, Loading } from "../../components";
import { NavigatorOpenType, FeedbackType } from "../../common/enums";
import { IFeedbackModel } from "../../models/user";
import { showSuccess, showMessage } from "../../utils/wechatUtils";

interface FeedbackState {
    type: FeedbackType,
    describe: string,
    contact: string
}

interface FeedbackProps {
    feedbackStore: {
        loading: boolean,
        createFeedbackAsync: (feedback: IFeedbackModel) => {}
    }
}

@inject("feedbackStore", "authorizationStore")
@observer
export default class Feedback extends Component<FeedbackProps, FeedbackState> {

    constructor() {
        super()
        this.state = {
            describe: "",
            type: FeedbackType.Feedback,
            contact: ""
        }
    }

    componentDidMount() {
        this.setState({ type: FeedbackType.Feedback });
    }

    async onFeedback() {
        let { describe, contact } = this.state;
        if (describe.trim().length === 0) {
            showMessage("反馈建议必填");
            return;
        }
        let _wordId = this.$router.params["wordId"] || "";
        let _describe = `${_wordId ? "wordId:" : ""}${_wordId}:${this.state.describe}`;
        this.props.feedbackStore.createFeedbackAsync({ describe: _describe, contact: contact, type: this.state.type });
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

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="建议反馈"></NavigationBar>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                <View className="form-content">
                    <View className="form-item">
                        <View className="form-title">反馈建议</View>
                        <View className="form-input">
                            <Textarea style={{ minHeight: "75px" }} placeholder="必填" value={describe} onInput={(e) => { this.setState({ describe: e.target["value"] }) }} autoHeight></Textarea>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">联系方式</View>
                        <View className="form-input">
                            <Textarea placeholder="选填" value={contact} onInput={(e) => { this.setState({ contact: e.target["value"] }) }} autoHeight></Textarea>
                        </View>
                    </View>
                    <View className="form-submit-item">
                        <View className="form-submit" onClick={this.onFeedback}>完成</View>
                    </View>
                </View>
            </View>
        </View >
    }
}