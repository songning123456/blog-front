<template>
    <div class="search">
        <main-head @futureTab='futureTab' ref='mainHead'></main-head>
        <div class='search-article' ref='searchArticle'>
            <div v-infinite-scroll='loadMore' infinite-scorll-disabled='busy' infinite-scroll-distance='10'
                 class="frame-center">
                <column v-for='(item, index) in result' :key="index" :article="item" :search-result='item.searchResult'
                        @detail='getDetail'></column>
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

    export default {
        name: 'Search',
        components: {MainHead, EmptyView, ToolLoading, Column},
        data() {
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
        mounted() {
            if (this.$route.query) {
                this.content = this.$route.query.data;
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.content = to.query.data;
            this.page.recordStartNo = -1;
            this.loadMore();
            next();
        },
        methods: {
            futureTab(tab) {
                this.$router.push({path: '/' + tab});
            },
            getDetail(id) {
                let routerData = this.$router.resolve({
                    path: '/detail',
                    query: {
                        id: id
                    }
                });
                window.open(routerData.href, '_blank');
            },
            getHighlightArticle() {
                let param = {
                    condition: {content: this.content},
                    recordStartNo: this.page.recordStartNo,
                    pageRecordNum: this.page.pageRecordNum
                };
                highlightSearch(param).then((data) => {
                    if (data.status === 200) {
                        if (data.total > 0) {
                            if (this.page.recordStartNo === 0) {
                                this.result = [];
                            }
                            data.data.forEach(item => {
                                this.result.push(item);
                            });
                            this.page.total = data.total;
                            this.busy = false;
                        } else {
                            this.busy = true;
                        }
                    } else {
                        this.$message.error(data.message ? data.message : 'Function-highlightSearch 查询异常!');
                    }
                }).finally(() => {
                    this.loading = false;
                });
            },
            loadMore() {
                this.busy = true;
                this.loading = true;
                setTimeout(() => {
                    this.page.recordStartNo++;
                    this.getHighlightArticle();
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
                width: 40%;
                margin-left: 30%;
            }
        }
    }

</style>
