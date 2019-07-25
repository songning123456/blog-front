<template>
    <div class='kind-article'>
        <template v-if='result.total !== 0'>
            <div v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='50'>
                <column v-for='(item, index) in result.data' :key='index' :data='item'
                        @click.native='getDetail(item.id)'></column>
            </div>
            <el-backtop target='.content-info' :visibility-height='50'></el-backtop>
        </template>
        <template v-else>
            <empty-view></empty-view>
        </template>
    </div>
</template>

<script>
    import Column from '@/components/public/Column';
    import {getAbstract} from '@/service/request';
    import EmptyView from '@/components/util/EmptyView';

    export default {
        name: 'KindArticle',
        components: {EmptyView, Column},
        props: {
            kinds: {
                type: String,
                default: '热门'
            }
        },
        data () {
            return {
                // 是否继续查询
                busy: false,
                // 分页信息
                page: {
                    recordStartNo: 0,
                    pageRecordNum: 10
                },
                // 返回的数据
                result: {
                    data: [],
                    total: 0
                }
            };
        },
        watch: {
            kinds (newVal, oldVal) {
                let scope = this;
                scope.result.data = [];
                scope.page = {
                    recordStartNo: 0,
                    pageRecordNum: 10
                };
                scope.loadMore();
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
            loadMore () {
                let scope = this;
                scope.busy = false;
                let form = {
                    kinds: scope.kinds
                };
                let param = {
                    recordStartNo: scope.page.recordStartNo,
                    pageRecordNum: scope.page.pageRecordNum,
                    condition: form
                };
                getAbstract(param).then((data) => {
                    if (data.status === 200) {
                        if (data.total > 0) {
                            scope.result.total = data.total;
                            data.data.forEach(item => {
                                scope.result.data.push(item);
                            });
                            scope.busy = true;
                        }
                    } else {
                        scope.$message({
                            type: 'error',
                            message: data.message ? data.message : 'Function-getAbstract 查询异常!'
                        });
                    }
                }).catch(() => {

                }).finally(() => {
                    scope.page.recordStartNo++;
                });
            }
        }
    };
</script>

<style lang='scss'>
    .kind-article {
        width: 100%;
        height: 100%;
    }

</style>
