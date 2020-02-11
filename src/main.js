// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import infiniteScroll from 'vue-infinite-scroll';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Vuex from 'vuex';
import store from './store/store';
import VueI18n from 'vue-i18n';
import i18n from './lang';
import './style/iconfont/iconfont.css';
import VueLazyComponent from '@xunlei/vue-lazy-component';
import ZMessage from './configure/util/ZMessage';
import Config from '../src/utils/ConfigUtil';
import './style/elementui/elementui.scss';
import router from './router';
import App from './App';

import Dictionary from './components/common/CommonDictionary';

Vue.config.productionTip = false;

// 自定义配置
ZMessage.setConfig({max: 1, isQueue: false, showNewest: true});

// 注册全局响应返回状态
Vue.prototype.$response = function (data, message = '') {
    let msg = '';
    if (message) {
        msg = '【' + message + '】';
    }
    return new Promise((resolve) => {
        if (data.status === 200) {
            if (data.total > 0) {
                let result = {};
                if (data.data) {
                    result.data = data.data;
                }
                if (data.dataExt) {
                    result.dataExt = data.dataExt;
                }
                if (data.total) {
                    result.total = data.total;
                }
                resolve(result);
            } else {
                // 排除无限加载 默认多加载一次的情况
                if (message !== 'infiniteScroll') {
                    ZMessage.error(msg + '查询为空');
                }
            }
        } else {
            ZMessage.error('查询失败:' + data.message);
        }
    });
};

Vue.use(ElementUI);
// * 自定义Zmessage 放在ElementUI后面
Vue.prototype.$message = ZMessage;
Vue.use(VideoPlayer);
Vue.use(mavonEditor);
Vue.use(infiniteScroll);
Vue.use(VueQuillEditor);
Vue.use(Dictionary);
Vue.use(Vuex);
Vue.use(VueI18n, {
    i18n: (key, value) => i18n.t(key, value)
});
Vue.use(VueLazyComponent);
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    // 判断是否需要 登陆权限
    if (to.matched.some(record => record.meta.requireAuth)) {
        // 判断token是否存在(即 是否已经登陆)
        if (localStorage.token) {
            next();
        } else {
            // 如果还未登陆,返回到登陆页面
            next({path: '/'});
        }
    } else {
        next();
    }
});
/**
 * 获取配置项
 */
axios.get('../static/config/blog-config.json').then(({data}) => {
    Config.setConfig(data);
}).catch(e => {
    console.error('获取simple-blog 基本配置失败! ', e.message);
});
/* eslint-disable no-new */
let vue = new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: {App},
    template: '<App/>'
});

export default vue;
