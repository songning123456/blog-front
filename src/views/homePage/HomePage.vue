<template>
    <div class='home-page' @click="modifyShow">
        <div class='above-info' :style="{backgroundImage: 'url(' +bgUrl + ')'}">
            <div class='left-title'>
                  <span class='title-image'>
                     <img src='../../assets/notebook.png'/>
                 </span>
                <span class='title-font'>simple</span>
            </div>
            <div class='middle-title-1'>
                <span class='main-title' v-for='(tab, index) in tabs' :key='index' @click='handleClick(tab.name)'
                      :class='{"is-blue": currentPage === tab.name}'>{{tab.label}}</span>
            </div>
            <div class='middle-title-2'>
                <el-input ref='elInput' suffix-icon='el-icon-search' v-model='search' placeholder='请输入搜索内容'
                          @keyup.enter.native="searchArticle"></el-input>
            </div>
            <div class='right-title'>
                <el-button type="primary" @click.native='writeArticle'>写文章</el-button>
            </div>
            <div class='right-title-2'>
                <el-popover placement='bottom' v-model='infoShow' trigger='manual' :visible-arrow='false'
                            popper-class='home-page-popover'>
                    <div @click.stop='modifyInfo'><span>个人信息</span></div>
                    <!--                    <div><span>登陆配置</span></div>-->
                    <div @click.stop='blogManage'><span>管理配置</span></div>
                    <!--                    <div @click.stop='enterExperiment'><span>实验室</span></div>-->
                    <div @click.stop="about"><span>关于</span></div>
                    <div @click.stop='exit'><span>退出</span></div>
                    <el-avatar :src="avatar" slot='reference'
                               @click.native.stop='isShow'></el-avatar>
                </el-popover>
            </div>
        </div>
        <div :class='currentPage === "read" ? "router-view-100" : "router-view-90"'>
            <router-view v-if='routeAlive'></router-view>
        </div>
    </div>
</template>

<script>
    import ReadArticle from '../../views/main/readArticle/ReadArticle';
    import ElFrameset from '../../components/layout/el-frameset';
    import ElFrame from '../../components/layout/el-frame';
    import config from '../../utils/ConfigUtil';
    import {getBloggerInfo, exitBlog} from '../../service/request';

    export default {
        name: 'HomePage',
        components: {ElFrame, ElFrameset, ReadArticle},
        data () {
            return {
                tabs: [
                    {label: '阅读', name: 'read'},
                    {label: '统计', name: 'statistics'},
                    {label: '历史', name: 'history'},
                    {label: '成长', name: 'growth'}
                ],
                owner: {},
                routeAlive: true,
                search: '',
                currentPage: '',
                bgUrl: require('../../assets/title-bg.png')
            };
        },
        created () {
            let scope = this;
            if (sessionStorage.getItem('homePage')) {
                scope.currentPage = sessionStorage.getItem('homePage');
            } else {
                scope.currentPage = 'read';
            }
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
            scope.getOwnerInfo();
            // 默认点击第一个标签
            this.handleClick(scope.currentPage);
            // 判断设置栏状态，默认进入页面时 是关闭状态
            if (scope.$store.state.showInfo) {
                scope.$store.commit('setShowInfo', false);
            }
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
            },
            avatar () {
                let scope = this;
                if (JSON.stringify(scope.owner) !== '{}') {
                    let src = config.getImageOriginal() + encodeURIComponent(scope.owner.headPortrait);
                    return src;
                } else {
                    return '';
                }
            }
        },
        methods: {
            // 跳转到文章编辑页面
            writeArticle () {
                let scope = this;
                scope.currentPage = '';
                scope.$router.push({path: '/edit'});
            },
            // 判断设置栏状态
            isShow () {
                let scope = this;
                scope.$store.commit('setShowInfo', !scope.$store.state.showInfo);
            },
            // 其他body 点击事件 关闭 设置栏
            modifyShow () {
                let scope = this;
                if (scope.$store.state.showInfo) {
                    scope.$store.commit('setShowInfo', false);
                }
            },
            // 退出到登陆页面
            exit () {
                let scope = this;
                exitBlog().then((data) => {
                    if (data.status === 200) {
                        scope.$router.push({path: '/'});
                        // 删除token
                        localStorage.removeItem('token');
                        // 隐藏 设置栏
                        scope.$store.commit('setShowInfo', false);
                    }
                }).catch().finally();
            },
            blogManage () {
                let scope = this;
                scope.$store.commit('setShowInfo', false);
                scope.currentPage = '';
                scope.$homePage('blogConfig');
            },
            about () {
                window.open('https://github.com/songning123456/', '_blank');
            },
            enterExperiment () {
                let scope = this;
                scope.$router.push({
                    path: '/experiment'
                });
            },
            modifyInfo () {
                let scope = this;
                scope.$router.push({
                    path: '/modify-info'
                });
            },
            getOwnerInfo () {
                let scope = this;
                getBloggerInfo({condition: {}}).then((data) => {
                    scope.$response(data, '获取个人信息').then(data => {
                        scope.owner = data.data[0];
                    });
                }).catch().finally();
            },
            handleClick (type) {
                let scope = this;
                scope.currentPage = type;
                scope.$homePage(scope.currentPage);
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
            background: no-repeat;
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

                .main-title {
                    padding: 0.2rem .9rem;
                    font-weight: 500;
                    font-size: 1.2rem;

                    &.is-blue {
                        color: #409EFF;
                    }

                    &:hover {
                        color: #409EFF;
                        cursor: pointer;
                    }
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
                    height: 3rem;
                    width: 3rem;
                    line-height: 3rem;
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
        width: 4rem;
        padding: 0.6rem;
        font-size: 0.7rem;
        margin-top: 0.25rem !important;
        left: 88.75rem !important;

        div {
            text-align: center;
            padding: 0.1rem 0;

            span {
                font-size: 0.75rem;
                cursor: pointer;
            }

            :hover {
                color: #409EFF;
            }
        }
    }


</style>
