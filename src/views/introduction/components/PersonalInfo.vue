<template>
    <div class='personal-info'>
        <empty-view v-if='resume.total === 0'></empty-view>
        <el-scrollbar class='detail-inner-info' v-else>
            <div class='past-info' v-for='(item, index) in resume.data' :key='index'
                 :style='{height: (item.info.length ? item.info.length * 12 + 2.5 : 0) + "rem"}'>
                <div class='title'>{{item.type}}</div>
                <div class='content' v-for='(single, i) in item.info' :key='i'>
                    <div class='inner-info'>
                        <span>{{single.mechanism}}</span>
                        <span>{{single.startTime + ' ~ ' + single.endTime}}</span>
                        <span>{{single.position}}</span>
                        <div>{{single.introduction}}</div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
    import EmptyView from '../../../components/util/EmptyView';
    import {getPersonalInfo} from '../../../service/request';

    export default {
        name: 'PersonalInfo',
        components: {EmptyView},
        data() {
            return {
                resume: {
                    data: [],
                    total: 0
                }
            };
        },
        mounted() {
            this.getMyInfo();
        },
        methods: {
            getMyInfo () {
                let scope = this;
                let form = {
                    userId: scope.$route.query.userId
                };
                let param = {
                    condition: form
                };
                getPersonalInfo(param).then((data) => {
                    if (data.status === 200) {
                        if (data.total > 0) {
                            scope.resume.data = data.data;
                            scope.resume.total = data.total;
                        } else {
                            scope.$msg('查询结果为空');
                        }
                    } else {
                        scope.$msg('查询异常! ' + data.message);
                    }
                }).catch().finally();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .personal-info {
        width: 100%;
        height: 100%;

        .detail-inner-info {
            width: 100%;
            height: 100%;

            .el-scrollbar__view {
                height: 100%;

                .past-info {
                    width: 100%;

                    .title {
                        border-radius: .2rem;
                        height: 2.5rem;
                        width: 20rem;
                        background: orange;
                        line-height: 2.9rem;
                        float: left;
                        font-size: 1.7rem;
                        color: white;
                    }

                    .content {
                        clear: both;
                        float: left;
                        height: 12rem;
                        width: 60rem;

                        .inner-info {
                            text-align: left;
                            padding: 1rem;

                            span:nth-child(1) {
                                font-size: 1.8rem;
                                padding-right: .5rem;
                            }

                            span:nth-child(3) {
                                display: block;
                                padding-top: .4rem;
                                padding-bottom: .4rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
