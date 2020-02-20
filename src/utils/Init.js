import store from '../store/store';
import {getBlogger} from '../service/http';
import Config from './Config';

let init = {};

/**
 * 获取blogger信息
 * @returns {Promise<unknown>}
 */
init.getBlogger = function () {
    return new Promise((resolve, reject) => {
        if (JSON.stringify(store.state.blogger) !== '{}') {
            resolve(Object.assign({}, store.state.blogger));
        } else {
            getBlogger({condition: {}}).then((data) => {
                if (data.status === 200 && data.total > 0) {
                    store.state.blogger = data.data[0];
                    resolve(Object.assign({}, store.state.blogger));
                } else {
                    reject({});
                }
            }).catch(() => {
                reject({});
            });
        }
    });
};

/**
 * 转换头像
 * @param headPortrait
 * @returns {boolean|string|*|string}
 */
init.getHeadPortrait = function (headPortrait) {
    if (headPortrait && headPortrait.indexOf('https://') === -1 && headPortrait.indexOf('http://') === -1) {
        return Config.getImageOriginal() + encodeURIComponent(headPortrait);
    } else {
        return headPortrait;
    }
};
export default init;
