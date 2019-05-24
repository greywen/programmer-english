import Taro, { Component } from "@tarojs/taro";
import "./userAnswer.scss"
import { View, Input, Text, Button, Textarea } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar, Loading } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import { IQuestionAnswerModel } from "../../models/dashiboard";
import { uploadFile } from "../../utils/request";
import { showMessage } from "../../utils/wechatUtils";

interface UserAnswerState {
    questionId: number,
    answer: string,
    contact: string,
    files: string[],
    uploadFileLoading: boolean
}

interface UserAnswerProps {
    dashboardStore: {
        loading: boolean,
        userAnswer: IQuestionAnswerModel,
        createAnswerAsync: (createModel: IQuestionAnswerModel) => {}
    },
    authorizationStore: {
        isAuthorized: boolean,
        update: () => {}
    }
}

@inject("dashboardStore", "authorizationStore")
@observer
export default class UserAnswer extends Component<UserAnswerProps, UserAnswerState> {

    constructor() {
        super()
        this.state = {
            questionId: this.$router.params["questionId"],
            answer: "",
            contact: "",
            files: [],
            uploadFileLoading: false
        }
    }

    onChooseImage = () => {
        Taro.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera']
        }).then(async (res) => {
            let file = res.tempFilePaths[0];
            this.setState({
                uploadFileLoading: true
            })
            let uploadFileResult = await uploadFile(file);
            let _files = this.state.files;
            _files.push(uploadFileResult.data);
            this.setState({
                files: _files,
                uploadFileLoading: false
            })
        })
    }

    onDeleteFile = (fileName: string) => {
        let _files = this.state.files.filter(x => { return x != fileName });
        this.setState({
            files: _files
        });
    }

    onSubmit = () => {
        let { answer, questionId, contact } = this.state;
        if (answer.trim().length === 0) {
            showMessage("翻译分析必填");
            return;
        }
        this.props.dashboardStore.createAnswerAsync({ answer: answer, questionId: questionId, contact: contact });
        this.setState({
            answer: "",
            contact: "",
            files: []
        })
        showMessage("提交成功");
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { answer, contact, files, uploadFileLoading } = this.state;
        const { dashboardStore: { loading } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight - 45 + "px" }}>
            <NavigationBar title="翻译分析" scrollTop={0} backUrl="./dashboard" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <Loading loading={loading || uploadFileLoading}></Loading>
            <View className="page-content">

                <View className="upload-file">
                    <View onClick={this.onChooseImage}><Button className="submit-button" size='mini' plain type="primary">从相册上传图片</Button></View>
                </View>

                <View className="form-content">
                    <View className="form-item">
                        <View className="form-title">翻译分析</View>
                        <View className="form-input">
                            {/* <Input placeholder="必填" value={answer} onInput={(e) => { this.setState({ answer: e.target["value"] }) }}></Input> */}
                            <Textarea maxlength={500} autoHeight placeholder="必填" value={answer} onInput={(e) => { this.setState({ answer: e.target["value"] }) }}></Textarea>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">联系方式</View>
                        <View className="form-input">
                            <Input placeholder="选填" value={contact} onInput={(e) => { this.setState({ contact: e.target["value"] }) }}>></Input>
                        </View>
                    </View>
                    <View className="form-submit-item">
                        <View className="form-submit" onClick={this.onSubmit}><Button className="submit-button" size='mini' plain type="primary">完成</Button></View>
                    </View>
                </View>
                <View className="file-list">
                    {
                        files.map(file => {
                            return <View><Text className="file-list-del icomoonfont icon-close-circle" onClick={() => { this.onDeleteFile(file) }}></Text>{file}</View>
                        })
                    }
                </View>
            </View>
        </View >
    }
}