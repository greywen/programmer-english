import Taro, { Component } from "@tarojs/taro";
import "./word.create.scss"
import { View, Input, Textarea } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar, Loading } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import { showSuccess, showMessage } from "../../utils/wechatUtils";
import { IEnglishChineseModel, IWordCreateModel } from "../../models/word";

interface WordState {
    english: string,
    chinese: string,
    phoneticUS: string,
    phoneticEN: string,
    collocation: string,
    sentences: IEnglishChineseModel[],
    timeout: any
}

interface WordProps {
    wordStore: {
        loading: boolean,
        createWordAsync: (word: IWordCreateModel) => {},
        updateWordAsync: (word: IWordCreateModel) => {},
        translateWordAsync: (text: string) => {}
    }
}

@inject("wordStore")
@observer
export default class WordCreate extends Component<WordProps, WordState> {

    constructor() {
        super()
        this.state = {
            english: "",
            chinese: "",
            phoneticUS: "",
            phoneticEN: "",
            collocation: "",
            sentences: [{ english: "", chinese: "" }],
            timeout: null
        }
    }

    async onCreateWord() {
        let { english, chinese, phoneticUS, phoneticEN, collocation, sentences } = this.state;
        if (!english || !chinese) {
            showMessage("词汇必填");
            return;
        }
        let createWordResult = await this.props.wordStore.createWordAsync({ english: english, chinese: chinese, phoneticUS: phoneticUS, phoneticEN: phoneticEN, collocation: collocation, sentences: sentences });
        if (createWordResult) {
            showSuccess("创建成功");
            this.clearState();
        }
    }

    async onTranslateWord(value: string) {
        this.setState({ english: value });

        clearTimeout(this.state.timeout);
        if (value) {
            let _timeout = setTimeout(async () => {
                let word = await this.props.wordStore.translateWordAsync(value);
                this.setState(word);
            }, 1000);

            this.setState({
                timeout: _timeout
            })
        } else {
            this.clearState();
        }
    }

    clearState() {
        this.setState({
            english: "",
            chinese: "",
            phoneticUS: "",
            phoneticEN: "",
            collocation: "",
            sentences: [{ english: "", chinese: "" }]
        })
    }

    onChangeSentence(index: number, sentence: IEnglishChineseModel) {
        let sentences = this.state.sentences.slice();
        sentences[index] = sentence;
        this.setState({ sentences: sentences });
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { english, chinese, collocation, sentences } = this.state;
        const { wordStore: { loading } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="创建单词" scrollTop={0} backUrl="./me" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                <View className="form-content">
                    <View className="form-item">
                        <View className="form-title">词汇英文</View>
                        <View className="form-input">
                            <Input placeholder="必填" value={english} onInput={(e) => { this.onTranslateWord(e.target["value"]) }}></Input>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">词汇中文</View>
                        <View className="form-input">
                            <Input placeholder="必填" value={chinese} onInput={(e) => { this.setState({ chinese: e.target["value"] }) }}></Input>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">词汇搭配</View>
                        <View className="form-input">
                            <Input placeholder="选填" maxLength={200} value={collocation} onInput={(e) => { this.setState({ collocation: e.target["value"] }) }}></Input>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">词汇例句</View>
                        {sentences.map((sentence, index) => {
                            return <View className="form-input">
                                <Textarea placeholder="例句中文(选填)" maxlength={200} autoHeight value={sentence.chinese} onInput={(e) => { this.onChangeSentence(index, { chinese: e.target["value"], english: sentence.english }) }}></Textarea>
                                <View style="border-bottom: 1px dashed #b2b2b2;margin:10px 0px 10px 0px;"></View>
                                <Textarea placeholder="例句英文(选填)" maxlength={200} autoHeight value={sentence.english} onInput={(e) => { this.onChangeSentence(index, { english: e.target["value"], chinese: sentence.chinese }) }}></Textarea>
                            </View>
                        })}
                    </View>
                    <View className="form-submit-item">
                        <View className="form-submit" onClick={this.onCreateWord}>完成</View>
                    </View>
                </View>
            </View>
        </View>
    }
}