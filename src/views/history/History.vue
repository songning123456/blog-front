<template>
    <div class="history">
        <main-head @futureTab='futureTab' current-tab="history" ref='mainHead'></main-head>
        <div class='frame-center'>
            <el-timeline v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
                <el-timeline-item :timestamp="item.updateTime" placement='top' v-for='(item, index) in result.data'
                                  :key="index">
                    <el-card>
                        <h3 v-html='item.title' class='history-title'></h3>
                        <p v-html='item.description' class='history-description' @click="newLink(index)"></p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <empty-view v-if='result.data.length === 0'></empty-view>
            <el-backtop target='.history' :visibility-height='50'></el-backtop>
        </div>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import {getHistoryInfo} from '../../service/request';
    import EmptyView from '../../components/util/EmptyView';

    export default {
        name: 'History',
        components: {MainHead, EmptyView},
        data() {
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
                }
            };
        },
        methods: {
            futureTab(tab) {
                this.$router.push({path: '/' + tab});
            },
            loadMore() {
                this.busy = true;
                setTimeout(() => {
                    this.page.recordStartNo++;
                    this.getHistory();
                }, 500);
            },
            getHistory() {
                let param = {
                    recordStartNo: this.page.recordStartNo,
                    pageRecordNum: this.page.pageRecordNum
                };
                getHistoryInfo(param).then(data => {
                    this.$response(data, 'infiniteScroll').then(data => {
                        this.result.total = data.total;
                        if (data.data.length > 0) {
                            this.result.data.push(...data.data);
                            this.busy = false;
                        } else {
                            this.busy = true;
                        }
                    });
                });
            },
            newLink(index) {
                if (this.result.data[index].articleId) {
                    let routerData = this.$router.resolve({
                        path: '/detail',
                        query: {
                            id: this.result.data[index].articleId
                        }
                    });
                    window.open(routerData.href, '_blank');
                }
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
                            color: #417BF1;
                        }

                        .history-description {
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

</style>
