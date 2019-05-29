import Taro, { Component } from "@tarojs/taro";
import "./userWord.create.scss"
import { View, Input, Textarea } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar, Loading } from "../../../components";
import { NavigatorOpenType } from "../../../common/enums";
import { showSuccess, showMessage } from "../../../utils/wechatUtils";
import { IUserWordCreateModel } from "../../../models/word";

interface UserWordState {
    id: number | null,
    english: string,
    chinese: string,
    comments: string,
    timeout: any
}

interface UserWordProps {
    wordStore: {
        loading: boolean,
        createUserWordAsync: (word: IUserWordCreateModel) => {},
        updateUserWordAsync: (word: IUserWordCreateModel) => {}
    }
}

@inject("wordStore")
@observer
export default class UserWordCreate extends Component<UserWordProps, UserWordState> {

    constructor() {
        super()
        this.state = {
            id: 0,
            english: "",
            chinese: "",
            comments: "",
            timeout: null
        }
    }

    async onSubmit() {
        let { id: id, english, chinese, comments } = this.state, result;
        if (!english || !chinese) {
            showMessage("词汇英文必填");
            return;
        }
        let _word = { english: english, chinese: chinese, comments: comments };

        if (id) {
            _word["id"] = id;
            result = await this.props.wordStore.updateUserWordAsync(_word);
        } else {
            result = await this.props.wordStore.createUserWordAsync(_word);
        }

        if (result) {
            showSuccess("操作成功");
            this.clearState();
        }
    }

    clearState() {
        this.setState({
            english: "",
            chinese: "",
            comments: ""
        })
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { english, chinese, comments } = this.state;
        const { wordStore: { loading } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="单词管理" scrollTop={0} backUrl="../me" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                <View className="form-content">
                    <View className="form-item">
                        <View className="form-title">词汇英文</View>
                        <View className="form-input">
                            <Input placeholder="必填" value={english} onInput={(e) => { this.setState({ english: e.target["value"] }) }}></Input>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">词汇中文</View>
                        <View className="form-input">
                            <Input placeholder="选填" value={chinese} onInput={(e) => { this.setState({ chinese: e.target["value"] }) }}></Input>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">备注</View>
                        <Textarea placeholder="选填" maxlength={800} autoHeight value={comments} onInput={(e) => { this.setState({ comments: e.target["comments"] }) }}></Textarea>
                    </View>
                    <View className="form-submit-item">
                        <View className="form-submit" onClick={this.onSubmit}>完成</View>
                    </View>
                </View>
            </View>
        </View >
    }
}