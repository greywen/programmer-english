import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/mobx';
import "@tarojs/async-await";
import * as globalData from "./common/globalData"
// var fundebug = require('fundebug-wxjs');

// fundebug.init({
//   apikey : '86fdbe66d01609c33ca0b43eace2ac609cd564aa329edac2a89de6105473e3c9'
// });

import './assets/icons.scss'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

import store from './store';
class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      "pages/dashboard/dashboard",
      "pages/dashboard/userAnswer",
      "pages/article/article",
      "pages/article/article.detail",
      "pages/word/word.create",
      "pages/word/word",
      "pages/word/word.list",
      "pages/word/word.detail",

      //me     
      "pages/me/me",
      "pages/me/feedback",
      "pages/me/about",
      "pages/me/bug",
      "pages/me/help",
      "pages/user/userWord.create",
      "pages/user/userWord.list"
    ],
    tabBar: {
      selectedColor: "#3271fd",
      color: "#b1b1b1",
      backgroundColor: "#f8f8f8",
      list: [
        {
          pagePath: "pages/dashboard/dashboard", text: "推荐",
          selectedIconPath: "./assets/images/compass-selected.png",
          iconPath: "./assets/images/compass.png"
        },
        {
          pagePath: "pages/word/word", text: "技术词汇",
          selectedIconPath: "./assets/images/file-word-selected.png",
          iconPath: "./assets/images/file-word.png"
        },
        {
          pagePath: "pages/article/article", text: "文档阅读",
          selectedIconPath: "./assets/images/read-selected.png",
          iconPath: "./assets/images/read.png"
        },
        {
          pagePath: "pages/me/me", text: "我的",
          selectedIconPath: "./assets/images/user-selected.png",
          iconPath: "./assets/images/user.png"
        }
      ]
    },
    requiredBackgroundModes: ["audio"],
    window: {
      navigationBarTextStyle: "white",
      navigationStyle: "custom",
      enablePullDownRefresh: true
    }
  }

  componentDidMount() {
    const systemInfo = Taro.getSystemInfoSync();
    let reg = /ios/i;
    let _paddingTop = 20;
    let _height = 44;

    if (reg.test(systemInfo.system)) {
      _paddingTop = systemInfo.statusBarHeight;
      _height = 44;
    } else {
      _paddingTop = systemInfo.statusBarHeight;
      _height = 48;
    }

    globalData.set("navigationBar", {
      paddingTop: _paddingTop,
      statusBarHeight: _height
    });
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}></Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
