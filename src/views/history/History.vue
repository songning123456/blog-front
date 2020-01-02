<template>
    <div class="history">
        <main-head @futureTab='futureTab' current-tab="history" ref='mainHead'></main-head>
        <div class='frame-center'>
            <el-timeline v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
                <el-timeline-item :timestamp="item.time" placement='top' v-for='(item, index) in result.data'
                                  :key="index">
                    <el-card>
                        <h3 v-html='item.title' class='history-title'></h3>
                        <p v-html='item.description'></p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <tool-loading :loading='loading' v-if='result.data.length === 0'></tool-loading>
            <empty-view v-if='result.data.length === 0'></empty-view>
            <el-backtop target='.history' :visibility-height='50'></el-backtop>
        </div>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import {getHistoryInfo} from '../../service/request';
    import ToolLoading from '../../components/util/ToolLoading';
    import EmptyView from '../../components/util/EmptyView';

    export default {
        name: 'History',
        components: {MainHead, EmptyView, ToolLoading},
        data () {
            return {
                // 是否继续查询
                busy: false,
                // 分页信息
                page: {
                    recordStartNo: -1,
                    pageRecordNum: 10
                },
                // 返回的数据
                result: {
                    data: [],
                    total: 0
                },
                loading: false
            };
        },
        watch: {
            listData: {
                handler (newVal, oldVal) {
                    let scope = this;
                    // 监听result.data的变化， 每次变化 重新绑定事件
                    if (newVal.length > oldVal.length) {
                        // 增加数据直接绑定
                        let start = oldVal.length;
                        let end = newVal.length - 1;
                        scope.addListener(start, end);
                    } else {
                        // 清空数据 取消绑定
                        scope.removeListener();
                    }
                },
                deep: true
            }
        },
        computed: {
            listData () {
                let scope = this;
                return JSON.parse(JSON.stringify(scope.result.data));
            }
        },
        methods: {
            futureTab (tab) {
                this.$router.push({path: '/' + tab});
            },
            loadMore () {
                let scope = this;
                scope.busy = true;
                scope.loading = true;
                setTimeout(() => {
                    scope.page.recordStartNo++;
                    scope.getHistory();
                }, 500);
            },
            addListener (start, end) {
                let scope = this;
                setTimeout(() => {
                    let docs = document.getElementsByClassName('history-title');
                    for (let i = start; i <= end; i++) {
                        let child = docs[i].children[2];
                        if (child) {
                            child.addEventListener('click', (function (index) {
                                return function () {
                                    scope.newLink(index);
                                };
                            })(i), false);
                        }
                    }
                }, 1000);
            },
            removeListener () {
                let scope = this;
                let docs = document.getElementsByClassName('history-title');
                Object.keys(docs).forEach(index => {
                    let child = docs[index].children[2];
                    if (child) {
                        child.removeEventListener('click', (function (index) {
                            return function () {
                                scope.newLink(index);
                            };
                        })(index), false);
                    }
                });
            },
            destroy () {
                let scope = this;
                scope.page = {
                    recordStartNo: -1,
                    pageRecordNum: 10
                };
                scope.result = {
                    data: [],
                    total: 0
                };
                scope.busy = false;
            },
            resetQuery () {
                let scope = this;
                scope.page = {
                    recordStartNo: -1,
                    pageRecordNum: 10
                };
                scope.result = {
                    data: [],
                    total: 0
                };
                scope.busy = false;
                scope.loadMore();
            },
            getHistory () {
                let scope = this;
                let param = {
                    recordStartNo: scope.page.recordStartNo,
                    pageRecordNum: scope.page.pageRecordNum
                };
                getHistoryInfo(param).then(data => {
                    scope.$response(data, 'infiniteScroll').then(data => {
                        scope.result.total = data.total;
                        if (data.data.length > 0) {
                            scope.result.data.push(...data.data);
                            scope.busy = false;
                        } else {
                            scope.busy = true;
                        }
                    });
                }).finally(() => {
                    scope.loading = false;
                });
            },
            newLink (index) {
                let scope = this;
                let routerData = scope.$router.resolve({
                    path: '/detail',
                    query: {
                        id: scope.result.data[index].articleId
                    }
                });
                window.open(routerData.href, '_blank');
                scope.resetQuery();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .history {
        position: relative;
        width: 100%;
        height: 100%;

        .frame-center {
            width: 100%;
            height: 90%;
            overflow: auto;

            /deep/ .el-timeline {
                padding: .2rem 25rem;
                box-sizing: border-box;

                /deep/ .el-timeline-item {
                    /deep/ .el-timeline-item__timestamp {
                        text-align: left;
                    }

                    /deep/ .el-timeline-item__content {
                        .history-title {
                            span:nth-child(1) {
                                color: #417BF1;
                            }

                            span:nth-child(3) {
                                font-weight: 500;
                                cursor: pointer;

                                &:hover {
                                    color: #417BF1;
                                    text-decoration: underline;
                                }
                            }
                        }
                    }
                }
            }
        }

    }

</style>
