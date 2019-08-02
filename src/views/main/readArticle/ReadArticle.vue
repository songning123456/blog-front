<template>
    <el-frameset :rows='"6%, *"' class='read-article'>
        <el-frame class='label-info'>
            <el-tabs v-model='currentContent' @tab-click='handleClick'>
                <el-tab-pane v-for='(tab, index) in COMMON_MAP["blog_label"]' :label='tab.label' :name='tab.value'
                             :key='index'></el-tab-pane>
            </el-tabs>
        </el-frame>
        <el-frame>
            <div style='height: 100%; width: 100%' v-for='(item, index) in COMMON_MAP["blog_label"]' :key='index'
                 v-if='currentContent === item.value'>
                <el-frameset :cols='"30%, *, 30%"' class='content-info'>
                    <el-frame></el-frame>
                    <el-frame>
                        <kind-article :kinds='item.label' @hotShow='showHot'></kind-article>
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
    import {getHotArticle} from '@/service/request';

    export default {
        name: 'ReadArticle',
        components: {HotArticle, KindArticle, ToolLoading, ElFrame, ElFrameset},
        data () {
            return {
                // 当前分类
                currentContent: 'first',
                // 各分类热门文章结果集
                hotResult: [],
                // 判断热门文章是否显示
                hotShow: false
            };
        },
        mounted () {
            this.handleClick();
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
                    form = {
                        kinds: '热门'
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

            .el-tabs {

                display: flex;
                align-items: center;

                .el-tabs__header {
                    margin: unset;
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
