<template>
    <div class="search">
        <main-head ref='mainHead'></main-head>
        <div class='search-article' ref='searchArticle'>
            <div v-infinite-scroll='loadMore' infinite-scorll-disabled='busy' infinite-scroll-distance='10'
                 class="frame-center">
                <column v-for='(item, index) in result' :key="index" :article="item"
                        @detail='getDetail'></column>
            </div>
            <empty-view v-if='!result.length'></empty-view>
            <tool-loading :loading='loading' v-if='result.length === 0' category="spinner"></tool-loading>
            <el-backtop target='.search-article' :visibility-height='50'></el-backtop>
        </div>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import {highlightSearch} from '../../service/http';
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
                result: [],
                loading: false
            };
        },
        mounted() {
            this.$store.state.query = this.$route.query;
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.query = to.query;
            this.page.recordStartNo = -1;
            this.loadMore();
            next();
        },
        methods: {
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
                    condition: this.$store.state.query,
                    recordStartNo: this.page.recordStartNo,
                    pageRecordNum: this.page.pageRecordNum
                };
                highlightSearch(param).then((data) => {
                    if (data.status === 200) {
                        this.page.total = data.total;
                        if (this.page.recordStartNo === 0) {
                            this.result = [];
                        }
                        if (data.data.length > 0) {
                            data.data.forEach(item => {
                                this.result.push(item);
                            });
                            this.busy = false;
                        } else {
                            this.busy = true;
                        }
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
