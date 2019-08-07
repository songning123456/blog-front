<template>
    <el-frameset :rows='"6%, *"' class='read-article'>
        <el-frame class='label-info'>
            <div class='choose-tabs'>
                <el-tabs v-model='currentContent' @tab-click='handleClick'>
                    <el-tab-pane v-for='(tab, index) in labelNames' :label='tab' :name='tab'
                                 :key='index'></el-tab-pane>
                </el-tabs>
            </div>
        </el-frame>
        <el-frame>
            <div style='height: 100%; width: 100%' v-for='(item, index) in labelNames' :key='index'
                 v-if='currentContent === item'>
                <el-frameset :cols='"30%, *, 30%"' class='content-info'>
                    <el-frame></el-frame>
                    <el-frame>
                        <kind-article :kinds='item' @hotShow='showHot'></kind-article>
                    </el-frame>
                    <el-frame>
                        <hot-article :result='hotResult' v-show='hotShow'></hot-article>
                    </el-frame>
                </el-frameset>
            </div>
        </el-frame>
    </el-frameset>
</template>

<script>
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';
    import KindArticle from '@/components/public/KindArticle';
    import ToolLoading from '@/components/util/ToolLoading';
    import HotArticle from '@/components/public/HotArticle';
    import {getHotArticle, getAllLabelName} from '@/service/request';

    export default {
        name: 'ReadArticle',
        components: {HotArticle, KindArticle, ToolLoading, ElFrame, ElFrameset},
        data () {
            return {
                // 当前分类
                currentContent: '',
                // 各分类热门文章结果集
                hotResult: [],
                // 判断热门文章是否显示
                hotShow: false,
                labelNames: []
            };
        },
        mounted () {
            let scope = this;
            getAllLabelName().then((data) => {
                if (data.status === 200) {
                    if (data.total > 0) {
                        data.data.forEach(item => {
                            scope.labelNames.push(item.labelName);
                        });
                    } else {
                        scope.$message.error(data.message ? data.message : '查询出错');
                    }
                } else {
                    scope.$message.error(data.message ? data.message : '查询出错');
                }
            }).catch().finally(() => {
                scope.handleClick();
            });
        },
        methods: {
            // 等分类的文章加载完毕 右侧的热门文章才显示
            showHot () {
                let scope = this;
                scope.hotShow = true;
            },
            handleClick (tab, event) {
                let scope = this;
                let form;
                if (tab) {
                    scope.hotShow = false;
                    form = {
                        kinds: tab.label
                    };
                } else {
                    scope.currentContent = scope.labelNames[0];
                    form = {
                        kinds: scope.labelNames[0]
                    };
                }
                let param = {
                    condition: form
                };
                getHotArticle(param).then((data) => {
                    scope.hotResult = data.data;
                }).finally(() => {
                });
            }
        }
    };
</script>

<style lang="scss">
    .read-article {
        height: 100%;
        width: 100%;

        .label-info {
            display: flex;
            justify-content: center;

            .choose-tabs {
                width: 60%;

                .el-tabs {

                    display: flex;
                    align-items: center;
                    padding-top: .3rem;

                    .el-tabs__header {
                        margin: unset;
                        width: 100%;
                    }

                    .el-tabs__item {
                        padding: 0 1.5rem;
                        font-size: .8rem;
                    }

                    .el-tabs__active-bar {
                        background-color: white;
                    }

                    .el-tabs__nav-wrap::after {
                        background-color: white;
                    }
                }
            }
        }

        .content-info {
            background-color: #f8f8f9;

            &.el-frameset {
                overflow: auto;
            }
        }

        /*隐藏滚动条*/
        .content-info::-webkit-scrollbar {
            width: 0;
        }
    }
</style>
