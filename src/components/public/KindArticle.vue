<template>
    <div class='kind-article'>
        <div v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
            <column v-for='(item, index) in result' :key='index' :data='item'
                    @detail="getDetail"></column>
        </div>
        <tool-loading :loading='loading' v-if='result.length === 0'></tool-loading>
        <el-backtop :target='target' :visibility-height='50' v-if="target"></el-backtop>
    </div>
</template>

<script>
    import Column from '../../components/public/Column';
    import {getAbstract} from '../../service/request';
    import EmptyView from '../../components/util/EmptyView';
    import ToolLoading from '../../components/util/ToolLoading';

    export default {
        name: 'KindArticle',
        components: {ToolLoading, EmptyView, Column},
        props: {
            kinds: {
                type: String,
                default: '热门'
            },
            target: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                // 是否继续查询
                busy: false,
                // 分页信息
                page: {
                    recordStartNo: -1,
                    pageRecordNum: 20,
                    total: 0
                },
                // 返回的数据
                result: [],
                loading: false
            };
        },
        watch: {
            kinds: {
                handler(newVal, oldVal) {
                    if (newVal) {
                        this.busy = false;
                    }
                },
                immediate: true
            }
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
                    scope.$response(data, 'infiniteScroll').then(data => {
                        scope.page.total = data.total;
                        if (data.data.length > 0) {
                            data.data.forEach(item => {
                                item.isRead = false;
                                scope.result.push(item);
                            });
                            scope.busy = false;
                        } else {
                            scope.busy = true;
                        }
                    });
                }).catch(() => {

                }).finally(() => {
                    scope.loading = false;
                    this.$emit('showHotArticle');
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
