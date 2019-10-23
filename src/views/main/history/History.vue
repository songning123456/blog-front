<template>
    <div class='history'>
        <el-timeline v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
            <el-timeline-item :timestamp="item.time" placement='top' v-for='(item, index) in result.data' :key="index">
                <el-card>
                    <h3 v-html='item.title'></h3>
                    <p v-html='item.description'></p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <tool-loading :loading='loading' v-if='result.data.length === 0'></tool-loading>
        <el-backtop target='.history' :visibility-height='50'></el-backtop>
    </div>
</template>

<script>
    import {getHistoryInfo} from '../../../service/request';
    import ToolLoading from '../../../components/util/ToolLoading';

    export default {
        name: 'History',
        components: {ToolLoading},
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
        methods: {
            loadMore () {
                let scope = this;
                scope.busy = true;
                scope.loading = true;
                setTimeout(() => {
                    scope.page.recordStartNo++;
                    scope.getHistory();
                }, 500);
            },
            getHistory () {
                let scope = this;
                let param = {
                    recordStartNo: scope.page.recordStartNo,
                    pageRecordNum: scope.page.pageRecordNum
                };
                getHistoryInfo(param).then(data => {
                    scope.$response(data).then(data => {
                        scope.result.total = data.total;
                        if (data.data.length > 0) {
                            data.data.forEach(item => {
                                scope.result.data.push(item);
                            });
                            scope.busy = false;
                        } else {
                            scope.busy = true;
                        }
                    });
                }).finally(() => {
                    scope.loading = false;
                });
            }
        }
    };
</script>

<style lang="scss">
    .history {
        width: 100%;
        height: 100%;
        overflow: auto;

        .el-timeline {
            padding: .2rem 25rem;
            box-sizing: border-box;

            .el-timeline-item {
                .el-timeline-item__timestamp {
                    text-align: left;
                }
            }
        }

        // 修改滚动条样式
        &::-webkit-scrollbar {
            width: 10px;
            height: 15px;
        }

        &::-webkit-scrollbar-track {
            background-color: white;
            border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb {
            background: #bfbfbf;
            border-radius: 10px;

            &:hover {
                background: #a5a5a5;
            }
        }
    }

</style>
