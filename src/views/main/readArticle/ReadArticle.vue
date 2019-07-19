<template>
    <el-frameset :rows='"6%, *"' class='read-article'>
        <el-frame class='label-info'>
            <el-tabs v-model='currentContent'>
                <el-tab-pane v-for='(tab, index) in tabs' :label='tab.label' :name='tab.name'
                             :key='index'></el-tab-pane>
            </el-tabs>
        </el-frame>
        <el-frame>
            <el-frameset :cols='"30%, *, 30%"' class='content-info'>
                <el-frame></el-frame>
                <el-frame>
                    <template v-if='currentContent === "first"'>
                        <kind-article :kinds='"数据库"'></kind-article>
                    </template>
                </el-frame>
                <el-frame></el-frame>
            </el-frameset>
        </el-frame>
    </el-frameset>
</template>

<script>
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';
    import KindArticle from '@/views/main/readArticle/kindArticle/KindArticle';
    import ToolLoading from '@/components/util/ToolLoading';
    import FunctionUtil from '@/utils/FunctionUtil';

    export default {
        name: 'ReadArticle',
        components: {KindArticle, ToolLoading, ElFrame, ElFrameset},
        computed: {
            category () {
                let scope = this;
                let result = FunctionUtil.getValueByLabel(scope.tabs, 'name', scope.currentContent, 'label');
                return result;
            }
        },
        data () {
            return {
                tabs: [
                    {label: '热门', name: 'first'},
                    {label: '关注', name: 'second'},
                    {label: '后端', name: 'third'},
                    {label: '前端', name: 'fourth'},
                    {label: '代码人生', name: 'fifth'}
                ],
                currentContent: 'first'
            };
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
