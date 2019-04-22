import Taro from "@tarojs/taro";

export function readingText(text: string, options?: any, callback?: () => {}) {
    const backgroundAudioManager = Taro.getBackgroundAudioManager();
    let token = Taro.getStorageSync("authorized").apiAccessToken;
    let src = `https://tsn.baidu.com/text2audio?tex=${text}&lan=zh&spd=${4}&tok=${token}&cuid=text&ctp=1`;
    let reg = new RegExp(' ', 'g');
    text = text.replace(reg, '%20');

    backgroundAudioManager.src = src;
    backgroundAudioManager.title = text;
    backgroundAudioManager.play();
    backgroundAudioManager.onEnded(() => {
        callback && callback();
    })
}