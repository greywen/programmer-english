import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import '../../assets/icons.scss'

interface HighlightWordProps {
    words: string[],
    sentence: string,
    color?: string,
    distinct?: boolean
}

interface HighlightWordState {
    sentence: { value: string, isShow: boolean }[]
}

export default class HighlightWord extends Component<HighlightWordProps, HighlightWordState> {

    componentWillMount() {
        const { sentence, words, distinct } = this.props;
        let _distinct = distinct == undefined || distinct ? true : false

        let _words = words;
        let _sentence = sentence.split(" ").map(word => {
            let isShow = _words.indexOf(word) > -1;
            if (isShow && _distinct) {
                _words = _words.filter(x => x !== word);
            }
            return { value: word, isShow: isShow }
        });

        this.setState({
            sentence: _sentence
        })
    }

    render() {
        const { color } = this.props;
        let { sentence } = this.state;

        return (
            <View style={{ wordBreak: "break-all" }}>
                {
                    sentence && sentence.map((word, index) => {
                        return word.isShow ? <Text key={index} style={{ color: color || "#000", fontWeight: 800 }}>{` ${word.value} `}</Text> :
                            <Text>{` ${word.value} `}</Text>
                    })
                }
            </View >
        )
    }
}
