import Taro from '@tarojs/taro';
import config from '../common/config';
import { getToken } from './loginUtils';
import { showError } from './wechatUtils';

function uploadFile(file: string) {
  return Taro.uploadFile({
    url: config.baseUrl + "file/upload",
    filePath: file,
    name: "file",
    header: {
      "Authorization": "Bearer " + getToken()
    }
  })
}

function request(options: RequestOptions) {
  if (!config.noConsole) {
    console.log(`${new Date().toLocaleString()}[M=${options.url}]P=${JSON.stringify(options.data)}`);
  }

  return Taro.request({
    url: config.baseUrl + options.url,
    data: options.data,
    header: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    },
    method: options.method,
  }).then((res) => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!config.noConsole) {
        console.log(`${new Date().toLocaleString()}[M=${options.url}][接口响应：]`, res.data);
      }
      return data;
    }
    else {
      showError(res.data["message"] || "服务器错误请稍后再试");
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  }).catch(() => {
    showError("加载失败请下拉重试");
  })
}

interface RequestOptions {
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
  data?: object,
  url: string
}

export {
  request,
  uploadFile
}