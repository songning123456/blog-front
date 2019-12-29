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
                title: '欢迎登陆',
                requireAuth: false
            }
        },
        {
            path: '/home-page',
            name: 'homePage',
            component: () => import('../views/homePage/HomePage'),
            meta: {
                title: '主页',
                requireAuth: true
            },
            children: [
                {
                    path: 'read',
                    name: 'read',
                    component: () => import('../views/main/readArticle/ReadArticle'),
                    meta: {
                        title: '阅读',
                        requireAuth: true
                    },
                    children: [
                        {
                            path: ':label',
                            name: 'publicRead',
                            component: () => import('../views/main/readArticle/childRoute/PublicRead'),
                            meta: {
                                title: '阅读',
                                requireAuth: true
                            }
                        }
                    ]
                },
                {
                    path: 'search',
                    name: 'search',
                    component: () => import('../views/main/readArticle/SearchArticle'),
                    meta: {
                        title: '搜索',
                        requireAuth: true
                    }
                },
                {
                    path: 'statistics',
                    name: 'statistics',
                    component: () => import('../views/main/statistics/Statistics'),
                    meta: {
                        title: '话题',
                        requireAuth: true
                    }
                },
                {
                    path: 'history',
                    name: 'history',
                    component: () => import('../views/main/history/History'),
                    meta: {
                        title: '历史',
                        requireAuth: true
                    }
                },
                {
                    path: 'growth',
                    name: 'growth',
                    component: () => import('../views/main/growth/Growth'),
                    meta: {
                        title: '成长',
                        requireAuth: true
                    }
                }, {
                    path: 'blog-config',
                    name: 'blogConfig',
                    component: () => import('../views/config/BlogConfig'),
                    meta: {
                        title: '管理配置',
                        requireAuth: true
                    }
                }
            ]
        }, {
            path: '/experiment',
            name: 'experiment',
            component: () => import('../views/experiment/Experiment'),
            meta: {
                title: '实验',
                requireAuth: true
            },
            children: [
                {
                    path: 'lazy-experiment',
                    name: 'lazyExperiment',
                    component: () => import('../views/experiment/lazy/LazyExperiment'),
                    meta: {
                        title: '懒加载实验',
                        requireAuth: true
                    }
                }
            ]

        }, {
            path: '/edit',
            name: 'edit',
            component: () => import('../views/edit/EditArticle'),
            meta: {
                title: '文章编辑',
                requireAuth: true
            }
        }, {
            path: '/detail',
            name: 'detail',
            component: () => import('../views/detail/DetailArticle'),
            meta: {
                title: '文章详情',
                requireAuth: true
            }
        }, {
            path: '/introduction',
            name: 'introduction',
            component: () => import('../views/introduction/BloggerIntroduction'),
            meta: {
                title: '作者简介',
                requireAuth: true
            }
        }, {
            path: '/world-clock',
            name: 'worldClock',
            component: () => import('../views/worldClock/WordClock'),
            meta: {
                title: '时钟',
                requireAuth: true
            }
        }, {
            path: '/simple-map',
            name: 'simpleMap',
            component: () => import('../views/map/SimpleMap'),
            meta: {
                title: '地图信息',
                requireAuth: true
            }
        }, {
            path: '/email',
            name: 'email',
            component: () => import('../views/email/Email'),
            meta: {
                title: '邮件',
                requireAuth: true
            }
        }, {
            path: '/register',
            name: 'register',
            component: () => import('../views/register/Register'),
            meta: {
                title: '注册',
                requireAuth: false
            }
        }, {
            path: '/modify-info',
            name: 'modifyInfo',
            component: () => import('../views/modifyInfo/ModifyInfo'),
            meta: {
                title: '修改信息',
                requireAuth: true
            }
        }, {
            path: '/git-hub',
            name: 'gitHub',
            component: () => import('../views/thirdPart/gitHub/GitHub'),
            meta: {
                title: 'gitHub登录',
                requireAuth: false
            }
        }, {
            path: '/third-part',
            name: 'thirdPart',
            component: () => import('../views/thirdPart/ThirdPart'),
            meta: {
                title: '第三方登录信息',
                requireAuth: false
            }
        }
    ]
})
;
