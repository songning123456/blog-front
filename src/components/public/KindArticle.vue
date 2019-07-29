<template>
    <div class='kind-article'>
        <div v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
            <column v-for='(item, index) in result.data' :key='index' :data='item'
                    @click.native='getDetail(item.id)'></column>
        </div>
        <tool-loading :loading='loading'></tool-loading>
        <el-backtop target='.content-info' :visibility-height='50'></el-backtop>
    </div>
</template>

<script>
    import Column from '@/components/public/Column';
    import {getAbstract} from '@/service/request';
    import EmptyView from '@/components/util/EmptyView';
    import ToolLoading from '@/components/util/ToolLoading';

    export default {
        name: 'KindArticle',
        components: {ToolLoading, EmptyView, Column},
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
                    recordStartNo: -1,
                    pageRecordNum: 20
                },
                // 返回的数据
                result: {
                    data: [],
                    total: 0
                },
                loading: false
            };
        },
        methods: {
            // 跳转到文章内容
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
            // 加载文章
            getAllAbstract () {
                let scope = this;
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
                            if (data.data.length > 0) {
                                data.data.forEach(item => {
                                    scope.result.data.push(item);
                                });
                                scope.busy = false;
                            } else {
                                scope.busy = true;
                            }
                        }
                    } else {
                        scope.$message({
                            type: 'error',
                            message: data.message ? data.message : 'Function-getAbstract 查询异常!'
                        });
                    }
                }).catch(() => {

                }).finally(() => {
                    scope.loading = false;
                });
            },
            loadMore () {
                let scope = this;
                scope.busy = true;
                scope.loading = true;
                setTimeout(() => {
                    scope.page.recordStartNo++;
                    scope.getAllAbstract();
                }, 500);
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
