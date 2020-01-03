<template>
    <div class="search">
        <main-head @futureTab='futureTab' ref='mainHead'></main-head>
        <div class='search-article'>
            <div v-infinite-scroll='loadMore' infinite-scorll-disabled='busy' infinite-scroll-distance='10' class="frame-center">
                <column-popover v-for='(item, index) in result' :key='index' :data='item'
                                @detail='getDetail'></column-popover>
            </div>
            <empty-view v-if='!result.length'></empty-view>
            <tool-loading :loading='loading' v-if='result.length === 0'></tool-loading>
            <el-backtop target='.search-article' :visibility-height='50'></el-backtop>
        </div>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import {highlightSearch} from '../../service/request';
    import Column from '../../components/public/Column';
    import ToolLoading from '../../components/util/ToolLoading';
    import EmptyView from '../../components/util/EmptyView';
    import ColumnPopover from '../../components/public/ColumnPopover';

    export default {
        name: 'Search',
        components: {MainHead, ColumnPopover, EmptyView, ToolLoading, Column},
        data () {
            return {
                busy: false,
                page: {
                    recordStartNo: -1,
                    pageRecordNum: 20,
                    total: 0
                },
                content: '',
                result: [],
                loading: false
            };
        },
        activated () {
            let scope = this;
            if (scope.$route.query) {
                scope.content = scope.$route.query.data;
            }
        },
        methods: {
            futureTab (tab) {
                this.$router.push({path: '/' + tab});
            },
            getDetail (id) {
                let scope = this;
                let routerData = scope.$router.resolve({
                    path: '/detail',
                    query: {
                        id: id
                    }
                });
                window.open(routerData.href, '_blank');
            },
            getHighlightArticle () {
                let scope = this;
                let form = {
                    content: scope.content
                };
                let param = {
                    condition: form,
                    recordStartNo: scope.page.recordStartNo,
                    pageRecordNum: scope.page.pageRecordNum
                };
                highlightSearch(param).then((data) => {
                    if (data.status === 200) {
                        if (data.total > 0) {
                            data.data.forEach(item => {
                                item.isRead = false;
                                scope.result.push(item);
                            });
                            scope.page.total = data.total;
                            scope.busy = false;
                        } else {
                            scope.busy = true;
                        }
                    } else {
                        this.$message.error(data.message ? data.message : 'Function-highlightSearch 查询异常!');
                    }
                }).catch().finally(() => {
                    scope.loading = false;
                });
            },
            loadMore () {
                let scope = this;
                scope.busy = true;
                scope.loading = true;
                setTimeout(() => {
                    scope.page.recordStartNo++;
                    scope.getHighlightArticle();
                }, 500);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .search {
        position: relative;
        width: 100%;
        height: 100%;

        .search-article {
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: #f8f8f9;

            .frame-center {
                /*width: 40%;*/
                /*margin-left: 30%;*/
            }
        }
    }

</style>
