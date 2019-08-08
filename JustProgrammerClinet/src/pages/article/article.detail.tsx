import Taro, { Component } from "@tarojs/taro";
import "./article.detail.scss"
import { View } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx';

import { Loading } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import { ArticleDetailDataModel } from "../../models/article";
import { HtmlParse } from "../../components/htmlParse/htmlParse";

interface ArticleDetailProps {
    articleStore: {
        loading: boolean,
        getArticleDetailAsync: (articleId: number) => ArticleDetailDataModel
    }
}

interface ArticleDetailState {
    article: ArticleDetailDataModel
}

@inject("articleStore")
@observer
export default class ArticleDetail extends Component<ArticleDetailProps, ArticleDetailState> {

    config = {
        navigationBarTitleText: "文章详情"
    }

    async componentDidMount() {
        let articleId = this.$router.params["articleId"];
        let _article = await this.props.articleStore.getArticleDetailAsync(articleId);
        this.setState({
            article: _article
        })
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { articleStore: { loading } } = this.props;
        const { article } = this.state;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                {article ? <HtmlParse data={article.describe}></HtmlParse> : null}
            </View>
        </View>
    }
}