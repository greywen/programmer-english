import Taro, { Component } from '@tarojs/taro';
import { observer, inject } from '@tarojs/mobx'
import { Button, View } from '@tarojs/components';

import { login } from '../../utils/loginUtils';
import './authorization.scss'
import { showMessage } from '../../utils/wechatUtils';

interface AuthorizationProps {
    authorizationStore: {
        isAuthorized: boolean,
        update: () => {}
    }
}

@inject('authorizationStore')
@observer
export default class Authorization extends Component<AuthorizationProps, {}> {
    onGetUserInfo = async (user) => {
        if (user.detail.errMsg === "getUserInfo:ok") {
            login(user.detail.userInfo)
                .then(() => {
                    this.props.authorizationStore.update();
                    showMessage("授权成功");
                })
                .catch(() => {
                    showMessage("登录失败");
                })
        } else {
            showMessage("授权失败");
        }
    }

    render() {
        const { authorizationStore: { isAuthorized } } = this.props;

        return (
            <View>
                {isAuthorized ?
                    <View>{this.props.children}</View> :
                    <Button openType="getUserInfo" onGetUserInfo={this.onGetUserInfo}>
                        {this.props.children}
                    </Button>
                }
            </View>
        )
    }
}
