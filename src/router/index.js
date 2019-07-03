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
            component: () => import('../views/homePage/HomePage'),
            children: [
                {
                    path: 'read',
                    name: 'read',
                    component: () => import('../views/current/ReadArticle')
                },
                {
                    path: 'topic',
                    name: 'topic',
                    component: () => import('../views/current/Topic')
                },
                {
                    path: 'history',
                    name: 'history',
                    component: () => import('../views/current/History')
                }
            ]
        }, {
            path: '/edit',
            name: 'edit',
            component: () => import('../views/edit/EditArticle')
        }
    ]
});
