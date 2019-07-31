<template>
    <el-frameset :rows='"10%, *"' class='home-page'>
        <el-frame class='above-info' @click.native='closeExpand'>
            <div class='left-title'>
                  <span class='title-image'>
                     <img src='../../assets/notebook.png'/>
                 </span>
                <span class='title-font'>simple</span>
            </div>
            <div class='middle-title'>
                <el-tabs v-model='currentPage' @tab-click='handleClick'>
                    <el-tab-pane v-for='(tab, index) in tabs' :label='tab.label' :name='tab.name'
                                 :key='index'></el-tab-pane>
                </el-tabs>
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
            <router-view></router-view>
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
                    {label: '话题', name: 'second'},
                    {label: '历史', name: 'third'},
                    {label: '成长', name: 'fourth'}
                ],
                currentPage: 'first'
            };
        },
        mounted () {
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
                    scope.$router.push({path: '/home-page/topic'});
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
            background: url('../../assets/ttile-bg.png') no-repeat;

            .left-title {
                width: 33%;

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

            .middle-title {
                width: calc(100% - 33% - 33%);

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

            .right-title {
                width: 33%;

                display: flex;
                justify-content: flex-start;

                .article-button {
                    height: 100%;
                    width: 18%;

                    .el-button {
                        height: 100%;
                        width: 100%;
                    }
                }

                .config-info {
                    width: 1.9%;
                    margin-left: .02rem;
                    border-radius: .05rem;
                    background-color: #409EFF;

                    :hover {
                        cursor: pointer;
                        background-color: rgba(255, 255, 255, 0.31);
                    }

                    .el-icon-caret-bottom {
                        height: 100%;
                        color: white;
                        line-height: 3;
                        font-size: 10px;
                    }
                }
            }

            .link-popover {
                width: 6.6%;
                z-index: 2999;
                background: white;
                right: 25.35rem;
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
