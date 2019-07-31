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
import Dictionary from '@/components/common/CommonDictionary';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.use(infiniteScroll);
Vue.use(Dictionary);
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
