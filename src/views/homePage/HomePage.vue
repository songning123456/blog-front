<template>
    <div class='home-page'>
        <div class='above-info'>
            <div class='left-title'>
                  <span class='title-image'>
                     <img src='../../assets/notebook.png'/>
                 </span>
                <span class='title-font'>simple</span>
            </div>
            <div class='middle-title-1'>
                <el-tabs v-model='currentPage' @tab-click='handleClick'>
                    <el-tab-pane v-for='(tab, index) in tabs' :label='tab.label' :name='tab.name'
                                 :key='index'></el-tab-pane>
                </el-tabs>
            </div>
            <div class='middle-title-2'>
                <el-input ref='elInput' suffix-icon='el-icon-search' v-model='search' placeholder='请输入搜索内容'
                          @keyup.enter.native="searchArticle"></el-input>
            </div>
            <div class='right-title'>
                <el-button type="primary" @click.native='writeArticle'>写文章</el-button>
            </div>
            <div class='right-title-2'>
                <el-popover placement='bottom' v-model='infoShow' trigger='click' :visible-arrow='false'
                            popper-class='home-page-popover'>
                    <div><span>个人信息</span></div>
                    <div><span>登陆配置</span></div>
                    <div @click='blogManage'><span>管理配置</span></div>
                    <div @click='exit'><span><img src="../../assets/exit.svg"/></span><span>退出</span></div>
                    <el-avatar :size="55" :src="owner.headPortrait || ''" slot='reference'></el-avatar>
                </el-popover>
            </div>
        </div>
        <div :class='currentPage === "first" ? "router-view-100" : "router-view-90"'>
            <router-view v-if='routeAlive'></router-view>
        </div>
        <simple-music :listen-music='$store.state.listenMusic'></simple-music>
    </div>
</template>

<script>
    import ReadArticle from '@/views/main/readArticle/ReadArticle';
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';
    import {getBloggerInfo, exitBlog} from '../../service/request';
    import SimpleMusic from '@/views/music/SimpleMusic';

    export default {
        name: 'HomePage',
        components: {SimpleMusic, ElFrame, ElFrameset, ReadArticle},
        data () {
            return {
                tabs: [
                    {label: '阅读', name: 'first'},
                    {label: '统计', name: 'second'},
                    {label: '历史', name: 'third'},
                    {label: '成长', name: 'fourth'}
                ],
                owner: {},
                routeAlive: true,
                search: '',
                currentPage: 'first'
            };
        },
        mounted () {
            let scope = this;
            // 设置样式
            document.getElementsByClassName('above-info')[0].style.marginTop = '0rem';
            // 绑定搜索点击事件
            scope.$nextTick(() => {
                let doc = scope.$refs['elInput'].$vnode.elm.children[1];
                doc.addEventListener('click', scope.searchArticle, true);
            });
            // 获取个人信息(头像)
            scope.getOwnerInfo(localStorage.getItem('username'));
            // 默认点击第一个标签
            this.handleClick();
        },
        computed: {
            infoShow: {
                get () {
                    let scope = this;
                    return scope.$store.state.showInfo;
                },
                set (newVal) {
                    let scope = this;
                    scope.$store.commit('setShowInfo', newVal);
                }
            }
        },
        methods: {
            writeArticle () {
                let scope = this;
                scope.$router.push({path: '/edit'});
            },
            exit () {
                let scope = this;
                exitBlog().then((data) => {
                    if (data.status === 200) {
                        scope.$router.push({path: '/'});
                        localStorage.removeItem('token');
                    }
                }).catch().finally();
            },
            blogManage () {
                let scope = this;
                scope.$router.push({path: '/blog-config'});
            },
            getOwnerInfo (name) {
                let scope = this;
                let form = {
                    username: name
                };
                let param = {
                    condition: form
                };
                getBloggerInfo(param).then((data) => {
                    if (data.status === 200) {
                        if (data.total > 0) {
                            scope.owner = data.data[0];
                        }
                    }
                }).catch().finally();
            },
            handleClick () {
                let scope = this;
                if (scope.currentPage === 'first') {
                    scope.$router.push({path: '/home-page/read'});
                } else if (scope.currentPage === 'second') {
                    scope.$router.push({path: '/home-page/statistics'});
                } else if (scope.currentPage === 'third') {
                    scope.$router.push({path: '/home-page/history'});
                } else if (scope.currentPage === 'fourth') {
                    scope.$router.push({path: '/home-page/growth'});
                } else {
                    // ...
                }
            },
            searchArticle () {
                let scope = this;
                scope.currentPage = '';
                scope.jumpTo();
            },
            /**
             * 跳转路由
             */
            jumpTo () {
                let scope = this;
                if (scope.search) {
                    scope.routeAlive = false;
                    scope.$nextTick(() => {
                        scope.routeAlive = true;
                    });
                    scope.$router.push({
                        path: '/home-page/search',
                        name: 'search',
                        query: {
                            data: scope.search
                        }
                    });
                } else {
                    scope.$msg('请输入搜索内容', 'warning');
                }
            }
        }
    };
</script>

<style lang='scss'>
    .home-page {
        width: 100%;
        height: 100%;
        overflow: hidden;

        &.el-frameset {
            .el-frame {
                overflow: unset;
            }
        }

        .above-info {

            position: relative;
            height: 10%;
            width: 100%;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #f0f2f9;
            background: url('../../assets/title-bg.png') no-repeat;
            transition: all .4s ease-in-out;

            .left-title {
                width: 35%;

                font-family: 'Tahoma';
                display: flex;
                justify-content: flex-end;

                .title-image {

                    img {
                        max-width: 2rem;
                        max-height: 2rem;
                    }
                }

                .title-font {
                    font-size: 1.5rem;
                    font-style: italic;
                    color: #dc9e52;
                }
            }

            .middle-title-1 {
                width: 32%;

                .el-tabs__header {
                    margin: 0 0 0;

                    .el-tabs__nav-scroll {
                        display: flex;
                        justify-content: center;
                    }
                }

                .el-tabs--top .el-tabs__item.is-top {
                    font-size: 1.2rem;
                }

                .el-tabs__active-bar {
                    background-color: unset;
                }

                .el-tabs__nav-wrap::after {
                    background-color: unset;
                }
            }

            .middle-title-2 {
                width: 20%;

                .el-input {
                    width: 90%;

                    .el-icon-search {
                        cursor: pointer;
                    }
                }
            }

            .right-title {
                width: 6%;

                .el-button {
                    width: 100%;
                    height: 100%;
                }

            }

            .right-title-2 {
                width: 10%;

                .el-avatar {
                    cursor: pointer;
                }
            }
        }

        .router-view-100 {
            height: 100%;
            width: 100%;
            position: relative;
        }

        .router-view-90 {
            height: 90%;
            width: 100%;
            position: relative;
        }
    }

    .home-page-popover {
        min-width: unset;
        width: 80px;
        padding: 12px;
        font-size: 14px;
        margin-top: 5px !important;
        left: 88.75rem !important;

        div {
            text-align: center;
            padding: 2px 0;

            span {
                font-size: 15px;
                cursor: pointer;
            }

            :hover {
                color: #409EFF;
            }
        }
    }


</style>
