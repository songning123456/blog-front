<template>
    <div class='hot-article'>
        <div v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='50'>
            <column v-for='(item, index) in data' :key='index' :data='item'></column>
        </div>
        <el-backtop target='.content-info' :visibility-height='50'></el-backtop>
    </div>
</template>

<script>
    import Column from '@/components/public/Column';
    import {getAbstract} from '@/service/request';

    export default {
        name: 'KindArticle',
        components: {Column},
        props: {
            kinds: {
                type: String,
                default: '前端'
            }
        },
        data () {
            return {
                busy: false,
                data: [],
                page: {
                    recordStartNo: 0,
                    pageRecordNum: 10
                }
            };
        },
        methods: {
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
                            data.data.forEach(item => {
                                scope.data.push(item);
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
                });
            }
        }
    };
</script>

<style lang='scss'>
    .hot-article {
        width: 100%;
        height: 100%;
    }

</style>
