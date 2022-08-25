import axios from "axios";
import router from "../router";
import { Message } from 'element-ui';

// 是否加密请求方法
let passFlag = false;

// 错误code码，跳转至登录
const errorCodeArr = [4010001, 4010002]

const instance = axios.create({
  // 接口地址根路径
  baseURL: '/sun_go_api',
  timeout: 60000
})

//请求前拦截
instance.interceptors.request.use(config => {
  if (passFlag) {
    if (config.data) {
      let hb_json_data = encrypt(JSON.stringify(config.data));
      config.data = {
        hb_json_data
      }
    }
  }
  const saveAuthorization = localStorage.getItem('saveAuthorization')
  if (saveAuthorization != undefined) {
    config.headers.common['authorization'] = saveAuthorization
  }
  return config;
}, err => {
  
})

//请求后拦截
instance.interceptors.response.use(res => {
  const responseHeaderToken = res.headers.refresh_token
  if (responseHeaderToken) {
    localStorage.setItem('saveAuthorization', responseHeaderToken)
  }
  if (res.data) {
    let code = res.data.code;
    if (errorCodeArr.includes(code)) {
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 1500,
        onClose: function () {
          localStorage.removeItem('personalInfo')
          localStorage.removeItem('saveAuthorization')
          top.location.href = 'index'
        }
      });
    }
  }
  return res.data;
}, error => {
  console.log(error)
})

export function get(url, params, headers) {
  let config = {}
  if (params != undefined) {
    config.params = params;
  }
  if (headers != undefined) {
    config.headers = headers;
  }
  return instance.get(url, config)
}

export function post(url, data, headers) {
  let config = {}
  if (headers != undefined) {
    config.headers = headers;
  }
  return instance.post(url, data, config)
}
