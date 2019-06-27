import Taro, { Component } from "@tarojs/taro";
import "./word.create.scss"
import { View, Input, Textarea } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx'

import { NavigationBar, Loading } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import { showSuccess, showMessage } from "../../utils/wechatUtils";
import { IEnglishChineseModel, IWordCreateModel, IWordDataModel } from "../../models/word";
import { IdName } from "../../models/common";

interface WordState {
    id: number | null,
    english: string,
    chinese: string,
    phoneticUS: string,
    phoneticEN: string,
    collocation: string,
    sentences: IEnglishChineseModel[],
    wordList: IdName[],
    timeout: any
}

interface WordProps {
    wordStore: {
        loading: boolean,
        createWordAsync: (word: IWordCreateModel) => {},
        updateWordAsync: (word: IWordCreateModel) => {},
        translateWordAsync: (text: string) => {},
        getWordByAutoCompleteAsync: (query: string) => Promise<IdName[]>,
        getWordDetailAsync: (wordId: number) => Promise<IWordDataModel>
    }
}

@inject("wordStore")
@observer
export default class WordCreate extends Component<WordProps, WordState> {

    constructor() {
        super()
        this.state = {
            id: 0,
            english: "",
            chinese: "",
            phoneticUS: "",
            phoneticEN: "",
            collocation: "",
            sentences: [{ id: 0, english: "", chinese: "" }],
            timeout: null,
            wordList: []
        }
    }

    componentDidMount() {
        this.setState({ wordList: [] });
    }

    async onSubmit() {
        let { id: id, english, chinese, phoneticUS, phoneticEN, collocation, sentences } = this.state, result;
        if (!english || !chinese) {
            showMessage("词汇必填");
            return;
        }
        let _word = { english: english, chinese: chinese, phoneticUS: phoneticUS, phoneticEN: phoneticEN, collocation: collocation, sentences: sentences };

        if (id) {
            _word["id"] = id;
            result = await this.props.wordStore.updateWordAsync(_word);
        } else {
            result = await this.props.wordStore.createWordAsync(_word);
        }

        if (result) {
            showSuccess("操作成功");
            this.clearState();
        }
    }

    async onChangeWord(value: string) {
        const { getWordByAutoCompleteAsync, translateWordAsync } = this.props.wordStore;
        clearTimeout(this.state.timeout);
        this.setState({ english: value });

        if (value) {
            let _timeout = setTimeout(async () => {
                let wordList = await getWordByAutoCompleteAsync(value);
                if (wordList.length === 0) {
                    let word = await translateWordAsync(value);
                    this.setState(word);
                    return;
                }
                this.setState({
                    wordList: wordList
                });
            }, 1000);

            this.setState({
                timeout: _timeout
            })
        } else {
            this.setState({
                wordList: []
            });
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

    onSelectWord = async (wordId: number) => {
        let word = await this.props.wordStore.getWordDetailAsync(wordId);
        this.setState({
            id: word.id || null,
            english: word.english,
            chinese: word.chinese,
            phoneticUS: word.phoneticUS || "",
            phoneticEN: word.phoneticEN || "",
            collocation: word.collocation || "",
            sentences: word.sentences.map(sentence => { return { id: sentence.id, english: sentence.english, chinese: sentence.chinese } }),
            wordList: []
        });
    }

    onChangeSentence(index: number, sentence: IEnglishChineseModel) {
        let sentences = this.state.sentences.slice();
        sentences[index] = sentence;
        this.setState({ sentences: sentences });
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { english, chinese, collocation, sentences, wordList } = this.state;
        const { wordStore: { loading } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="单词管理" showPageTitle={false} backUrl="./me" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                <View className="form-content">
                    <View className="form-submit-item">
                        <View className="form-submit" onClick={this.onSubmit}>完成</View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">词汇英文</View>
                        <View className="form-input">
                            <Textarea placeholder="必填" value={english} onInput={(e) => { this.onChangeWord(e.target["value"]) }} autoHeight></Textarea>
                            {wordList.length > 0 ?
                                <View className="word-list">
                                    <View style="border-bottom: 1px dashed #b2b2b2;margin:10px 0px 10px 0px;"></View>
                                    {
                                        wordList.map(word => {
                                            return <View onClick={() => { this.onSelectWord(word.id) }}>{word.name}</View>
                                        })
                                    }
                                </View> : null
                            }
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">词汇中文</View>
                        <View className="form-input">
                            <Textarea placeholder="必填" value={chinese} onInput={(e) => { this.setState({ chinese: e.target["value"] }) }} autoHeight></Textarea>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">词汇搭配</View>
                        <View className="form-input">
                            <Textarea style={{ minHeight: "75px" }} placeholder="选填" value={collocation} onInput={(e) => { this.setState({ collocation: e.target["value"] }) }} autoHeight></Textarea>
                        </View>
                    </View>
                    <View className="form-item">
                        <View className="form-title">词汇例句</View>
                        {sentences.map((sentence, index) => {
                            return <View className="form-input" key={"sentence" + index}>
                                <Textarea style={{ minHeight: "75px" }} placeholder="例句中文(选填)" maxlength={200} value={sentence.chinese} onInput={(e) => { this.onChangeSentence(index, { chinese: e.target["value"], english: sentence.english }) }} autoHeight></Textarea>
                                <View style="border-bottom: 1px dashed #b2b2b2;margin:10px 0px 10px 0px;"></View>
                                <Textarea style={{ minHeight: "75px" }} placeholder="例句英文(选填)" maxlength={200} value={sentence.english} onInput={(e) => { this.onChangeSentence(index, { english: e.target["value"], chinese: sentence.chinese }) }} autoHeight></Textarea>
                            </View>
                        })}
                    </View>
                </View>
            </View>
        </View>
    }
}