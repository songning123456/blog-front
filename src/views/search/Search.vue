<template>
    <div class="search">
        <main-head @futureTab='futureTab' ref='mainHead'></main-head>
        <div class='search-article' ref='searchArticle'>
            <div v-infinite-scroll='loadMore' infinite-scorll-disabled='busy' infinite-scroll-distance='10'
                 class="frame-center">
                <column v-for='(item, index) in result' :key="index" :article="item" :show-introduction="true"
                        @detail='getDetail' @introduction='showIntroduction'></column>
            </div>
            <div v-if="modal" class="introduction-popover" ref="introductionPopover">
                <el-table :data='currentSearchResult' :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                          max-height="400">
                    <el-table-column width="60" label='序号' align="center">
                        <span slot-scope="scope" v-html="scope.$index + 1"></span>
                    </el-table-column>
                    <el-table-column label='查询结果' align="center">
                        <span slot-scope="scope" v-html="scope.row"></span>
                    </el-table-column>
                </el-table>
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
                modal: false,
                content: '',
                result: [],
                currentSearchResult: [],
                loading: false
            };
        },
        mounted() {
            if (this.$route.query) {
                this.content = this.$route.query.data;
            }
            let doc = this.$refs['searchArticle'];
            doc.addEventListener('click', this.hiddenIntroduction);
            doc.addEventListener('mousewheel', this.hiddenIntroduction);
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
            hiddenIntroduction(e) {
                this.modal = false;
            },
            showIntroduction(id, positionY) {
                this.modal = false;
                setTimeout(() => {
                    this.modal = true;
                    let index = -1;
                    for (let i = 0; i < this.result.length; i++) {
                        if (this.result[i].id === id) {
                            index = i;
                            break;
                        }
                    }
                    if (index > -1) {
                        this.$nextTick(() => {
                            this.currentSearchResult = this.result[index].searchResult;
                            if (positionY < document.body.clientHeight / 2) {
                                this.$refs['introductionPopover'].style.top = (positionY - 15) + 'px';
                            } else {
                                this.$refs['introductionPopover'].style.top = (positionY - this.$refs['introductionPopover'].offsetHeight) + 'px';
                            }
                        });
                    }
                }, 100);
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

        .introduction-popover {
            width: 20rem;
            height: auto;
            position: absolute;
            right: 8rem;
            z-index: 1;

            .el-table {
                /deep/ .el-table__body-wrapper::-webkit-scrollbar {
                    width: 3px;
                    height: 3px;
                }

                /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
                    background-color: #a1a3a9;
                    border-radius: 3px;
                }
            }
        }
    }

</style>
