import Taro, { Component } from '@tarojs/taro';
import { View } from "@tarojs/components";

import * as WxParse from "../wxParse/wxParse";

interface HtmlParseProps {
    data: string
}

export class HtmlParse extends Component<HtmlParseProps, {}> {

    componentDidMount() {
        let _WxParse = WxParse as any;
        _WxParse.wxParse('article', 'html', this.props.data || "", this.$scope, 10);
    }

    render() {
        return (
            <View>
                <import src='../wxParse/wxParse.wxml' />
                <template is='wxParse' data='{{wxParseData:article.nodes}}' />
            </View>
        )
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'template': any
        }
    }
}