// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
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

import Dictionary from './components/common/CommonDictionary';

Vue.config.productionTip = false;
Vue.prototype.$msg = function (msg = '', type = 'error', duration = 1000) {
    this.$message({
        type: type,
        message: msg,
        duration: duration
    });
};

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(infiniteScroll);
Vue.use(Dictionary);
Vue.use(Vuex);
Vue.use(VueI18n, {
    i18n: (key, value) => i18n.t(key, value)
});
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
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
