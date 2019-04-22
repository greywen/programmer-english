import Taro from '@tarojs/taro';
import config from '../common/config';
import { getToken } from './loginUtils';

function post(url: string, data?: object) {
  return request({ method: "POST", url: url, data: data });
}

function get(url: string, data?: object) {
  return request({ method: "GET", url: url, data: data });
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
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
}

interface RequestOptions {
  method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT',
  data?: object,
  url: string
}

export {
  post,
  get
}