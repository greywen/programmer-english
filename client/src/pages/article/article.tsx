import Taro, { Component } from "@tarojs/taro";
import "./article.scss"
import { View, Image, Navigator } from "@tarojs/components";
import { observer, inject } from '@tarojs/mobx';

import { NavigationBar, WecharAuthorize, Loading } from "../../components";
import { ArticleListDataModel } from "../../models/article";

interface ArticleState {
    scrollTop: number
}

interface ArtickeProps {
    articleStore: {
        loading: boolean,
        showLoadMore: boolean,
        artileList: ArticleListDataModel[],
        getArticleListAsync: () => {},
        getMoreArticleAsync: () => {}
    },
    authorizationStore: {
        isAuthorized: boolean,
        update: () => {}
    }
}

@inject("articleStore")
@observer
export default class Document extends Component<ArtickeProps, ArticleState> {
    constructor() {
        super()
        this.state = {
            scrollTop: 0
        }
    }

    onPageScroll = (e) => {
        this.setState({
            scrollTop: e.scrollTop
        })
    }

    async componentWillMount() {
        await this.props.articleStore.getArticleListAsync();
    }

    onLoadMoreArticleAsync = async () => {
        await this.props.articleStore.getMoreArticleAsync();
    }

    async onPullDownRefresh() {
        await this.props.articleStore.getArticleListAsync();
        Taro.stopPullDownRefresh();
    }

    render() {
        const { windowHeight } = Taro.getSystemInfoSync();
        const { scrollTop } = this.state;
        const { articleStore: { loading, showLoadMore, artileList } } = this.props;

        return <View className="page" style={{ minHeight: windowHeight + "px", backgroundColor: "#f8f8f8" }}>
            <NavigationBar title="文档阅读" scrollTop={scrollTop}></NavigationBar>
            <Loading loading={loading}></Loading>
            <WecharAuthorize authorizationStore={this.props.authorizationStore}>
                <View className="article">
                    {
                        artileList ? artileList.map(article => {
                            return <Navigator url={`./article.detail?articleId=${article.id}`} key={"article-" + article.id}>
                                <View className="article-item">
                                    <View className="article-item-icon">
                                        <Image src={article.articleCover} />
                                    </View>
                                    <View>
                                        <View className="article-item-title">{article.focusTitle}</View>
                                    </View>
                                </View>
                            </Navigator>
                        }) : null
                    }
                </View>
            </WecharAuthorize>
            <View className="footer">
                {
                    showLoadMore ? <View onClick={this.onLoadMoreArticleAsync}>点击加载更多</View> : null
                }
            </View>
        </View>
    }
}