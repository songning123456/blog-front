<template>
    <el-frameset :rows='"10%, *"' class='home-page'>
        <el-frame>
            <el-row :gutter='20' class='row-flex'>
                <el-col :span='8' class='title-info'>
                <span class='title-image'>
                    <img src='../../assets/notebook.png'/>
                </span>
                    <span class='title-font'>simple</span>
                </el-col>
                <el-col :span='8' class='tabs-info'>
                    <el-tabs v-model='currentPage' @tab-click='handleClick'>
                        <el-tab-pane v-for='(tab, index) in tabs' :label='tab.label' :name='tab.name'
                                     :key='index'></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span='8' class='article-info'>
                    <el-button type="primary" @click.native='writeArticle'>写文章</el-button>
                </el-col>
            </el-row>
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

        .row-flex {
            height: 100%;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #f0f2f9;
            background: url('../../assets/标题背景.jpg') no-repeat 10px -2000px;

            .title-info {
                font-family: 'Tahoma';
                display: flex;
                justify-content: flex-end;
                padding-left: .5rem !important;

                .title-image {
                    padding-right: .5rem;

                    img {
                        padding-top: .5rem;
                        max-width: 2rem;
                        max-height: 2rem;
                    }
                }

                .title-font {
                    padding-top: .3rem;
                    font-size: 1.5rem;
                    font-style: italic;
                    color: #dc9e52;
                }
            }

            .tabs-info {

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

            .article-info {
                display: flex;
                justify-content: flex-start;

                .el-button {
                    width: 20%;
                }
            }
        }
    }


</style>
