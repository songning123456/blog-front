import axios from 'axios';
import Config from './config';
import Vue from '../../main';

// 开发环境
axios.setConfig = function (config, supportOld) {
    // axios.defaults.baseURL = config.BASE_URL;
    if (supportOld) { // 适配旧版本
        axios.defaults.timeout = config.AJAX_TIMEOUT;
        // // 解决跨域时丢失 cookie 问题,设置请求超时时间
        axios.defaults.withCredentials = false;
    } else {
        for (let key in config) {
            axios.defaults[key] = config[key];
        }
    }
};

const httpRequest = function (resolve, reject, config, isRetry, customize, responseState) {
    if (!customize) {
        customize = {};
    }
    if (customize.headers) {
        for (let key in customize.headers) {
            config.headers[key] = customize.headers[key];
        }
    }
    axios.defaults.timeout = Config.AJAX_TIMEOUT;
    axios(config).then(response => {
        // 请求接口正确且成功时
        if (response.status === 200 || response.data.status === 200) {
            // 第一次登陆时token还未生成
            if (!localStorage.token && response.data && response.data.Authorization) {
                localStorage.token = response.data.Authorization;
            }
            resolve(response.data);
        } else if (response.status === 401) {
            // 强制跳转到登陆页面
            Vue.$router.push({path: '/'});
            resolve(response.data.result ? response.data.result : response.data);
        } else {
            // 请求接口错误或不成功时
            resolve(response.data.result ? response.data.result : response.data);
        }
    }).catch(error => {
        reject(error);
        console.log('http请求失败', error);
    });
};

axios.ajax = function (url, method, params, form = false, customize = {}, responseState = 1) {
    return new Promise((resolve, reject) => {
        let config = null;
        if (url && (url.toLowerCase().indexOf('http://') !== 0 && url.toLowerCase().indexOf('https://') !== 0)) {
            url = Config.REQUEST_BASE_URL + url;
        }
        if (form) {
            config = {
                url: url,
                method: method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            config.transformRequest = [
                function (data) {
                    let ret = '';
                    for (let it in data) {
                        ret +=
                            encodeURIComponent(it) +
                            '=' +
                            encodeURIComponent(data[it]) +
                            '&';
                    }
                    return ret;
                }
            ];
        } else {
            config = {
                url: url,
                method: method
            };
            config.headers = {
                'Content-type': 'application/json;charset=utf-8'
            };
        }
        // 如果已经登陆，则接下来的请求都带上token
        if (localStorage.token) {
            config.headers.Authorization = localStorage.token;
        }
        if (method && method.toLowerCase() === 'get') {
            config.params = params;
        } else {
            config.data = params;
        }
        httpRequest(resolve, reject, config, false, customize, responseState);
    });
};

// 登录的时候要form表单提交请求中多了form参数，关于权限的要请求权限的服务器地址多了authorityService参数
export default axios;
