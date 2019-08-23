<template>
    <el-frameset :rows='"10%, *"' class='home-page'>
        <el-frame class='above-info' @click.native='closeExpand'>
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
                <el-input ref='elInput' suffix-icon='el-icon-search' v-model='search' placeholder='请输入搜索内容'></el-input>
            </div>
            <div class='right-title'>
                <div class='article-button'>
                    <el-button type="primary" @click.native='writeArticle'>写文章</el-button>
                </div>
                <div class='config-info' @click.stop='multipleChoice'>
                    <i class='el-icon-caret-bottom'></i>
                </div>
            </div>
            <div class='link-popover'>
                <div><span>登陆配置</span></div>
                <div><span>管理配置</span></div>
            </div>
        </el-frame>
        <el-frame>
            <router-view v-if='routeAlive'></router-view>
        </el-frame>
    </el-frameset>
</template>

<script>
    import ReadArticle from '@/views/main/readArticle/ReadArticle';
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';

    export default {
        name: 'HomePage',
        components: {ElFrame, ElFrameset, ReadArticle},
        data () {
            return {
                tabs: [
                    {label: '阅读', name: 'first'},
                    {label: '统计', name: 'second'},
                    {label: '历史', name: 'third'},
                    {label: '成长', name: 'fourth'}
                ],
                routeAlive: true,
                search: '',
                currentPage: 'first'
            };
        },
        mounted () {
            let scope = this;
            scope.$nextTick(() => {
                let doc = scope.$refs['elInput'].$vnode.elm.children[1];
                doc.addEventListener('click', scope.searchArticle, true);
            });
            this.handleClick();
            document.getElementsByClassName('link-popover')[0].style.display = 'none';
        },
        methods: {
            writeArticle () {
                let scope = this;
                scope.$router.push({path: '/edit'});
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
            multipleChoice () {
                if (document.getElementsByClassName('link-popover')[0].style.display === 'none') {
                    document.getElementsByClassName('link-popover')[0].style.display = 'unset';
                } else {
                    document.getElementsByClassName('link-popover')[0].style.display = 'none';
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
                    scope.$message.warning('请输入搜索内容');
                }
            },
            closeExpand () {
                document.getElementsByClassName('link-popover')[0].style.display = 'none';
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

            display: flex;
            align-items: center;
            border-bottom: 1px solid #f0f2f9;
            background: url('../../assets/title-bg.png') no-repeat;

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
                width: 35%;

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
                }
            }

            .right-title {
                width: 10%;

                display: flex;
                justify-content: flex-start;

                .article-button {
                    height: 100%;
                    width: 60%;

                    .el-button {
                        height: 100%;
                        width: 100%;
                    }
                }

                .config-info {
                    width: 10%;
                    margin-left: .02rem;
                    border-radius: .1rem;
                    background-color: #409EFF;

                    :hover {
                        cursor: pointer;
                        background-color: rgba(255, 255, 255, 0.31);
                    }

                    .el-icon-caret-bottom {
                        width: 100%;
                        height: 100%;
                        color: white;
                        line-height: 3;
                        font-size: 10px;
                    }
                }
            }

            .link-popover {
                width: 7%;
                z-index: 2999;
                background: white;
                right: 2.85rem;
                top: 3.45rem;
                position: absolute;

                div {
                    span {
                        font-size: 15px;
                        cursor: pointer;
                    }

                    :hover {
                        color: #409EFF;
                    }
                }
            }
        }
    }


</style>
