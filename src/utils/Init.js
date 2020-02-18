import store from '../store/store';
import {getBlogger} from '../service/http';

let init = {};

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
export default init;
