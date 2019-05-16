import Taro, { Component } from "@tarojs/taro";
import "./userAnswer.scss"
import { View, Input, Text, Button } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import { IQuestionAnswerModel } from "../../models/dashiboard";
import { uploadFile } from "../../utils/request";

interface UserAnswerState {
    questionId: number,
    answer: string,
    contact: string,
    files: { fileId: number, fileName: string }[]
}

interface UserAnswerProps {
    dashboardStore: {
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
            questionId: 0,
            answer: "",
            contact: "",
            files: []
        }
    }

    onChooseImage = () => {
        Taro.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera']
        }).then(async (res) => {
            let file = res.tempFilePaths[0];
            let uploadFileResult = await uploadFile(file);
            // let _files = this.state.files;
            // _files.concat(uploadFileResult);
            // this.setState({
            //     files: _files
            // })
        })
    }

    onDeleteFile = (fileId: number) => {

    }

    onSubmit = () => {
        let { answer, questionId, contact } = this.state;
        this.props.dashboardStore.createAnswerAsync({ answer: answer, questionId: questionId, contact: contact });
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { answer, contact } = this.state;

        return <View className="page" style={{ minHeight: windowHeight - 45 + "px" }}>
            <NavigationBar title="翻译分析" scrollTop={0} backUrl="./dashboard" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <View className="page-content">

                <View className="upload-file">
                    <View onClick={this.onChooseImage}><Button className="submit-button" size='mini' plain type="primary">从相册上传图片</Button></View>
                    <View className="file-list">
                        <View>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.png<Text className="file-list-del">x</Text></View>
                        <View>xxxxxxxxxxx.png<Text className="file-list-del">x</Text></View>
                        <View>xxxxxxxxxxx.png<Text className="file-list-del">x</Text></View>
                        {/* {
                            this.state.files.map(file => {
                                return <View onClick={() => { this.onDeleteFile(file.fileId) }}>{file.fileName}</View>
                            })
                        } */}
                    </View>
                </View>

                <View className="form-content">
                    <View className="form-item">
                        <View className="form-title">翻译分析</View>
                        <View className="form-input">
                            <Input placeholder="必填" value={answer} onInput={(e) => { this.setState({ answer: e.target["value"] }) }}></Input>
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
            </View>
        </View >
    }
}