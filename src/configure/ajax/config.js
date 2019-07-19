import axios from 'axios';

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

export default axios;
