import Taro from "@tarojs/taro";

export function showMessage(title = "") {
    Taro.showToast({
        title: title,
        icon: "none",
        duration: 2000
    })
}

export function showSuccess(title = "") {
    Taro.showToast({
        title: title,
        icon: "success",
        duration: 2000
    })
}

export function showError(title = "") {
    Taro.showToast({
        title: title,
        icon: "none",
        image: "",
        duration: 2000
    })
}