import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './cTransition.scss'

enum TransitionType {
    Enter = 'Enter',
    Leave = 'Leave',
}

interface CTransitionProps {
    visible: boolean,
    name?: string,
    duration?: number,
    onTransitionEnd?: () => void
}

interface CTransitionState {
    type: TransitionType,
    display: boolean
}

export default class CTransition extends Component<CTransitionProps, CTransitionState> {
    componentWillMount() {
        if (this.props.visible) {
            this.setState({
                display: true,
                type: TransitionType.Enter,
            })
        } else {
            this.setState({
                display: false
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => ({
            display: prevState.display || nextProps.visible,
            type: nextProps.visible ? TransitionType.Enter : TransitionType.Leave,
        }))
    }

    handleAnimationEnd = () => {
        const { visible, onTransitionEnd } = this.props;
        this.setState({
            display: visible,
        })
        onTransitionEnd && onTransitionEnd();
    }

    render() {
        const { name, duration } = this.props;
        let _name = name || "fadeUp", _duration = duration || 1500;

        const { type, display } = this.state;
        
        const animationName = `c-transition__${_name}${type}`;
        const animationDuration = `${_duration}ms`;

        return (
            <View
                className={`c-transition c-transition__${_name}`}
                style={{
                    WebkitAnimationName: animationName,
                    WebkitAnimationDuration: animationDuration,
                    animationName: animationName,
                    animationDuration: animationDuration,
                    ...(display ? {} : { display: 'none' }),
                }}
                onAnimationEnd={this.handleAnimationEnd}>
                {this.props.children}
            </View>
        )
    }
}