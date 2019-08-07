import Taro from "@tarojs/taro";

export default function justNavigationBar(options: { navigationBarTitleText: string }) {
    return function (Component) {
        return class justNavigationBar extends Component {
            constructor(props) {
                super(props);
            }

            onPageScroll = (e) => {
                let scrollTop = e.scrollTop;

                if (scrollTop > 80) {
                    Taro.setNavigationBarTitle({
                        title: options.navigationBarTitleText
                    });
                } else {
                    Taro.setNavigationBarTitle({
                        title: ""
                    });
                }
            }
        } as any;
    }
}