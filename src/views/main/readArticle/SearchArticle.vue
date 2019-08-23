<template>
    <div class='search-article'>
        <div v-infinite-scroll='loadMore' infinite-scorll-disabled='busy' infinite-scroll-distance='10'>
            <div v-for='(item, index) in result.data' :key='index' @click='getDetail(item.id)' class='search-outer'>
                <div class='search-title'>{{item.title}}</div>
                <div v-for='(single, i) in item.searchResult' :key='i' class='search-inner' v-html='single'>
                </div>
            </div>
        </div>
        <empty-view v-if='!result.data.length'></empty-view>
        <tool-loading :loading='loading' v-if='result.data.length === 0'></tool-loading>
        <el-backtop target='.search-article' :visibility-height='50'></el-backtop>
    </div>
</template>

<script>
    import {highlightSearch} from '../../../service/request';
    import Column from '@/components/public/Column';
    import ToolLoading from '@/components/util/ToolLoading';
    import EmptyView from '@/components/util/EmptyView';

    export default {
        name: 'SearchArticle',
        components: {EmptyView, ToolLoading, Column},
        data () {
            return {
                busy: false,
                page: {
                    recordStartNo: -1,
                    pageRecordNum: 20
                },
                content: '',
                result: {
                    data: [],
                    total: 0
                },
                loading: false
            };
        },
        created () {
            let scope = this;
            if (scope.$route.query) {
                scope.content = scope.$route.query.data;
            }
        },
        methods: {
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
                                scope.result.data.push(item);
                            });
                            scope.result.total = data.total;
                            scope.busy = false;
                        } else {
                            scope.busy = true;
                        }
                    } else {
                        scope.$message.error(data.message ? data.message : 'Function-highlightSearch 查询异常!');
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

<style lang="scss">
    .search-article {
        width: 100%;
        height: 100%;
        overflow: auto;

        .search-outer {
            width: 70%;
            margin: .2rem 0 0 14rem;
            border: 1px solid #eae6e6;

            :hover {
                cursor: pointer;
            }

            .search-title {
                margin: .5rem 0;
                color: #409eff;
            }

            .search-inner {
                width: 90%;
                margin-left: 3rem;
            }
        }
    }

    .search-article::-webkit-scrollbar {
        width: 0;
    }
</style>
