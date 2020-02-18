<template>
    <div class="loved">
        <main-head ref='mainHead'></main-head>
        <div class="frame-center">
            <div class="left-frame"></div>
            <div class="middle-frame">
                <div v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
                    <column v-for='(item, index) in result' :key='index' :article='item'></column>
                </div>
            </div>
            <div class="right-frame"></div>
            <el-backtop target='.loved' :visibility-height='50'></el-backtop>
        </div>
        <tool-loading :loading="loading" category="spinner" v-if='result.length === 0'></tool-loading>
        <empty-view v-if="result.length === 0"></empty-view>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import Column from '../../components/public/Column';
    import {getLovedArticle} from '../../service/http';
    import EmptyView from '../../components/util/EmptyView';
    import ToolLoading from '../../components/util/ToolLoading';

    export default {
        name: 'Loved',
        components: {ToolLoading, EmptyView, MainHead, Column},
        data() {
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
        methods: {
            getLoved() {
                let params = {
                    recordStartNo: this.page.recordStartNo,
                    pageRecordNum: this.page.pageRecordNum,
                    condition: {}
                };
                this.loading = true;
                getLovedArticle(params).then(data => {
                    this.$response(data, 'infiniteScroll').then(data => {
                        this.page.total = data.total;
                        if (data.data.length > 0) {
                            data.data.forEach(item => {
                                this.result.push(item);
                            });
                            this.busy = false;
                        } else {
                            this.busy = true;
                        }
                    });
                }).finally(() => {
                    this.loading = false;
                });
            },
            loadMore() {
                let scope = this;
                scope.busy = true;
                scope.loading = true;
                setTimeout(() => {
                    scope.page.recordStartNo++;
                    scope.getLoved();
                }, 500);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .loved {
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: #f8f8f9;

        .frame-center {
            width: 100%;
            height: 90%;

            .left-frame {
                width: 30%;
                height: 100%;
                float: left;
            }

            .middle-frame {
                width: 40%;
                height: 100%;
                float: left;
            }

            .right-frame {
                width: 30%;
                height: 100%;
                float: left;
            }
        }

        .empty-view {
            position: absolute;
            z-index: 1;
            left: 0;
            top: 10%;
        }
    }

</style>
