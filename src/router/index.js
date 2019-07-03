import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'WelcomeTo',
            component: () => import('../views/login/WelcomeTo')
        },
        {
            path: '/home-page',
            name: 'homePage',
            component: () => import('../views/homePage/HomePage')
        }
    ]
});
