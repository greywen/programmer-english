import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { UserResource } from '../../common/enums';
import { getUserResource } from '../../utils/loginUtils';

interface ResourceAuthorizeProps {
    resources: UserResource[]
}
export default class ResourceAuthorize extends Component<ResourceAuthorizeProps, {}> {

    onAuthorize() {
        const { resources } = this.props;
        let userResourceIds = getUserResource();
        return userResourceIds.filter(x => resources && resources.includes(x)).length > 0;
    }

    render() {
        return (
            <View>
                {this.onAuthorize() ? this.props.children : null}
            </View>
        )
    }
}
