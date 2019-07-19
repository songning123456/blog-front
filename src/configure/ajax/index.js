import axios from './config';

let refreshToken = function (resolve, reject, config, customize, responseState) {
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    let refreshConfig = {
        method: 'post',
        headers: headers
    };
    refreshConfig.transformRequest = [function (data) {
        let ret = '';
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret;
    }];
    console.log('refreshConfig>>>', refreshConfig);
    axios(refreshConfig).then(response => {
        console.log('refreshToken>>>', JSON.stringify(response));
        // 请求接口正确且成功时
        if (response.data.status === 200) {
            httpRequest(resolve, reject, config, true, customize, responseState);
        } else {
            resolve(response.data);
        }
    }).catch(error => {
        reject(error);
    });
};

let httpRequest = function (resolve, reject, config, isRetry, customize, responseState) {
    if (!customize) {
        customize = {};
    }
    if (customize.headers) {
        for (let key in customize.headers) {
            config.headers[key] = customize.headers[key];
        }
    }
    axios(config)
        .then(response => {
            // 请求接口正确且成功时
            if (response.data.status === 200) {
                if (responseState === 0) {
                    resolve(response.data);
                } else {
                    resolve(response.data.result ? response.data.result : response.data);
                }
            } else if (axios.isInvalidToken(response)) {
                if (!isRetry) { // jwtoken 过期只retry一次
                    refreshToken(resolve, reject, config, customize, responseState);
                } else {
                }
            } else {
                // 请求接口错误或不成功时
                resolve(response.data.result ? response.data.result : response.data);
            }
        }).catch(error => reject(error));
};
axios.ajax = function (url, method, params, form = false, customize = {}, responseState = 1) { // responseState = 0 response.data else response.data.result
    return new Promise((resolve, reject) => {
        let config = null;
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
        if (method && method.toLowerCase() === 'get') {
            config.params = params;
        } else {
            config.data = params;
        }
        httpRequest(resolve, reject, config, false, customize, responseState);
    });
};

axios.ajax0 = function (url, method, params, form = false, customize) { // responseState = 0 response.data else response.data.result
    return axios.ajax(url, method, params, form, customize, 0);
};

axios.isInvalidToken = function (response) {
    // 10013 错误的JWT 10014 jwt过期 10015 JWT为空
    if ((response.data.status === 10014 || response.data.status === 10013) && response.data.code === '-1') {
        return true;
    } else if (response.data.status === 401 || response.data.code === 401) {
        return true;
    } else if (response.data.code === '-1' && response.data.message === 'Invalid token') {
        return true;
    } else {
        return false;
    }
};
// 登录的时候要form表单提交请求中多了form参数，关于权限的要请求权限的服务器地址多了authorityService参数
export default axios;
