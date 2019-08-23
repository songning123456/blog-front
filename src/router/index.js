import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'WelcomeTo',
            component: () => import('../views/login/WelcomeTo'),
            meta: {
                title: '欢迎登陆'
            }
        },
        {
            path: '/home-page',
            name: 'homePage',
            component: () => import('../views/homePage/HomePage'),
            meta: {
                title: '主页'
            },
            children: [
                {
                    path: 'read',
                    name: 'read',
                    component: () => import('../views/main/readArticle/ReadArticle'),
                    meta: {
                        title: '阅读'
                    }
                },
                {
                    path: 'search',
                    name: 'search',
                    component: () => import('../views/main/readArticle/SearchArticle'),
                    meta: {
                        title: '搜索'
                    }
                },
                {
                    path: 'statistics',
                    name: 'statistics',
                    component: () => import('../views/main/statistics/Statistics'),
                    meta: {
                        title: '话题'
                    }
                },
                {
                    path: 'history',
                    name: 'history',
                    component: () => import('../views/main/history/History'),
                    meta: {
                        title: '历史'
                    }
                },
                {
                    path: 'growth',
                    name: 'growth',
                    component: () => import('../views/main/growth/Growth'),
                    meta: {
                        title: '成长'
                    }
                }
            ]
        }, {
            path: '/edit',
            name: 'edit',
            component: () => import('../views/edit/EditArticle'),
            meta: {
                title: '文章编辑'
            }
        }, {
            path: '/detail',
            name: 'detail',
            component: () => import('../views/detail/DetailArticle'),
            meta: {
                title: '文章详情'
            }
        }, {
            path: '/introduction',
            name: 'introduction',
            component: () => import('../views/introduction/BloggerIntroduction'),
            meta: {
                title: '作者简介'
            }
        }
    ]
});
