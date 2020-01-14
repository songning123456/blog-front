<template>
    <div class="written">
        <main-head @futureTab='futureTab' ref='mainHead'></main-head>
        <div class="frame-center">
            <div class="left-frame"></div>
            <div class="middle-frame">
                <div v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
                    <column v-for='(item) in result' :key='item.id' :data='item' :show-delete="true"
                            @detail="getDetail" @delete="deleteArticle"></column>
                </div>
            </div>
            <div class="right-frame"></div>
            <el-backtop target='.written' :visibility-height='50'></el-backtop>
        </div>
        <tool-loading :loading="loading" category="spinner" v-if='result.length === 0'></tool-loading>
        <empty-view v-if="result.length === 0"></empty-view>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import Column from '../../components/public/Column';
    import {deleteArticle, getWrittenArticle} from '../../service/request';
    import EmptyView from '../../components/util/EmptyView';
    import ToolLoading from '../../components/util/ToolLoading';

    export default {
        name: 'Written',
        components: {ToolLoading, EmptyView, MainHead, Column},
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
        methods: {
            futureTab (tab) {
                this.$router.push({path: '/' + tab});
            },
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
            deleteArticle (id) {
                this.loading = true;
                deleteArticle({condition: {id: id}}).then(data => {
                    if (data.status === 200) {
                        this.$message.success('删除成功');
                        let index = -1;
                        for (let i = 0; i < this.result.length; i++) {
                            if (this.result[i].id === id) {
                                index = i;
                                break;
                            }
                        }
                        if (index > -1) {
                            this.result.splice(index, 1);
                            // 重新加载页面 删除keep-alive缓存
                            location.reload();
                        }
                    } else {
                        this.$message.error('删除失败');
                    }
                }).catch(e => {
                    this.$message.error('删除失败');
                }).finally(() => {
                    this.loading = false;
                });
            },
            getWritten () {
                let params = {
                    recordStartNo: this.page.recordStartNo,
                    pageRecordNum: this.page.pageRecordNum,
                    condition: {}
                };
                this.loading = true;
                getWrittenArticle(params).then(data => {
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
            loadMore () {
                let scope = this;
                scope.busy = true;
                scope.loading = true;
                setTimeout(() => {
                    scope.page.recordStartNo++;
                    scope.getWritten();
                }, 500);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .written {
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
