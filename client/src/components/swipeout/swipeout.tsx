import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './swipeout.scss'
import { ITouchEvent } from '@tarojs/components/types/common';

interface SwipeoutProps {
    limitMove?: number
}

interface SwipeoutState {
    touchStart: {
        pageX: number,
        pageY: number
    },
    position: {
        pageX: number,
        pageY: number
    }
}

export default class Swipeout extends Component<SwipeoutProps, SwipeoutState> {
    constructor() {
        super();
        this.state = {
            touchStart: { pageX: 0, pageY: 0 },
            position: { pageX: 0, pageY: 0 }
        }
    }
    componentWillMount() {

    }

    swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >=
            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }

    swipper(touches) {
        const { touchStart } = this.state;
        const { limitMove } = this.props;
        let _limitMove = limitMove || 200;
        const spacing = {
            pageX: touches.pageX - touchStart.pageX,
            pageY: touches.pageY - touchStart.pageY
        }
        if (_limitMove < Math.abs(spacing.pageX)) {
            spacing.pageX = -_limitMove;
        }

        this.setState({
            position: spacing
        })
    }

    onTouchStart = (event: ITouchEvent) => {
        const touches = event.touches ? event.touches[0] : {};
        if (touches) {
            this.setState({
                touchStart: { pageX: touches["pageX"], pageY: touches["pageY"] }
            })
        }
    }

    onTouchMove = (event: ITouchEvent) => {
        const touches = event.touches ? event.touches[0] : {};
        const { touchStart } = this.state;
        if (touches) {
            const direction = this.swipeDirection(touchStart.pageX, touches["pageX"], touchStart.pageY, touches["pageY"]);
            if (direction === 'Left') {
                this.swipper(touches);
            }
        }
    }

    onTouchEnd = (event) => {
        const touches = event.changedTouches ? event.changedTouches[0] : {};
        const { touchStart } = this.state;
        const { limitMove } = this.props;
        let _limitMove = limitMove || 200;

        if (touches) {
            const direction = this.swipeDirection(touchStart.pageX, touches.pageX, touchStart.pageY, touches.pageY);
            const spacing = {
                pageX: touches.pageX - touchStart.pageX,
                pageY: touches.pageY - touchStart.pageY
            }
            if (Math.abs(spacing.pageX) >= 40 && direction === "Left") {
                spacing.pageX = spacing.pageX < 0 ? - _limitMove : _limitMove;
            } else {
                spacing.pageX = 0;
            }
            this.setState({
                position: spacing
            })
        }
    }

    setPosition(position) {
        return `transform:translate(${position.pageX}rpx,0);`;
    }

    render() {

        return (
            <View className="swipeout-wrap">
                <View className="swipeout-item" style={this.setPosition(this.state.position)} onTouchStart={(e) => { this.onTouchStart(e) }} onTouchMove={(e) => { this.onTouchMove(e) }} onTouchEnd={(e) => { this.onTouchEnd(e) }}>
                    <View className="swipeout-content">
                        {this.props.children}
                    </View>
                </View>
            </View>
        )
    }
}