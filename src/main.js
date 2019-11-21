// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import infiniteScroll from 'vue-infinite-scroll';
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
Vue.prototype.$message = ZMessage;
// 注册全局提示消息
Vue.prototype.$msg = function (msg = '', type = 'error', duration = 1000) {
    ZMessage({
        type: type,
        message: msg,
        duration: duration
    });
};
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
                    this.$msg(msg + '查询为空');
                }
            }
        } else {
            this.$msg('查询失败' + data.message);
        }
    });
};
// 注册home-page路由跳转事件
Vue.prototype.$homePage = function (src) {
    let target = '';
    // 属于驼峰格式
    if (new RegExp('[A-Za-z]+', 'g')) {
        // 转换成下划线
        target = src.replace(/([A-Z])/g, '-$1').toLowerCase();
        sessionStorage.setItem('homePage', src);
        this.$router.push({path: '/home-page/' + target});
    } else if (new RegExp('_(\\w)', 'g')) {
        target = src.replace(/_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
        sessionStorage.setItem('homePage', target);
        this.$router.push({path: '/home-page/' + src});
    } else {
        this.$msg('跳转页面失败!');
    }
};

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(infiniteScroll);
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
    // 输入存在的页面
    if (to.matched.length > 0) {
        // 判断是否需要 登陆权限
        if (to.matched.some(record => record.meta.requireAuth)) {
            // 判断token是否存在(即 是否已经登陆)
            if (localStorage.token) {
                next();
            } else {
                // 如果还未登陆，则登陆后在重定向到此路由
                next({
                    path: '/',
                    query: {
                        redirect: to.fullPath
                    }
                });
            }
        } else {
            next();
        }
    } else {
        // 不存在的页面
        from.name ? next({name: from.name}) : next('/');
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
