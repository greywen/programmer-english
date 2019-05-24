import Taro, { Component } from "@tarojs/taro";
import "./article.detail.scss"
import { View } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx';

import { NavigationBar, Loading } from "../../components";
import { NavigatorOpenType } from "../../common/enums";
import { ArticleDetailDataModel } from "../../models/article";
import { HtmlParse } from "../../components/htmlParse/htmlParse";

interface ArticleDetailProps {
    articleStore: {
        loading: boolean,
        articleDetail: ArticleDetailDataModel,
        getArticleDetailAsync: (articleId: number) => {}
    }
}

@inject("articleStore")
@observer
export default class ArticleDetail extends Component<ArticleDetailProps, {}> {

    constructor() {
        super()
    }

    async componentDidMount() {
        let articleId = this.$router.params["articleId"];
        await this.props.articleStore.getArticleDetailAsync(articleId);
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { articleStore: { loading, articleDetail } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px" }}>
            <NavigationBar title="文章详情" hidePageTitle={true} backUrl="./article" openType={NavigatorOpenType.navigateBack}></NavigationBar>
            <Loading loading={loading}></Loading>
            <View className="page-content">
                {articleDetail ? <HtmlParse data={articleDetail.describe}></HtmlParse> : null}
            </View>
        </View>
    }
}