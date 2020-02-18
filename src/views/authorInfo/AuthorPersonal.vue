<template>
    <div class="author-personal">
        <author-basic current-tab="personal">
            <template v-slot:container>
                <div class="personal-container">
                    <empty-view v-if="result.length === 0"></empty-view>
                    <el-scrollbar class='personal-info' v-else>
                        <div class='past-info' v-for='(item, index) in result' :key='index'
                             :style='{height: (item.info.length ? item.info.length * 12 + 2.5 : 0) + "rem"}'>
                            <div class='title'>{{item.type}}</div>
                            <div class='content' v-for='(single, i) in item.info' :key='i'>
                                <div class='inner-info'>
                                    <span>{{single.mechanism}}</span>
                                    <span>{{single.startTime + ' ~ ' + single.endTime}}</span>
                                    <div class='position'>{{single.position}}</div>
                                    <el-input type="textarea" :rows="5" v-model="single.introduction"
                                              readonly></el-input>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </template>
        </author-basic>
    </div>
</template>

<script>
    import AuthorBasic from './components/AuthorBasic';
    import {getPersonalInfo} from '../../service/http';
    import EmptyView from '../../components/util/EmptyView';

    export default {
        name: 'AuthorPersonal',
        components: {EmptyView, AuthorBasic},
        data() {
            return {
                result: []
            };
        },
        mounted() {
            this.getMyInfo();
        },
        methods: {
            getMyInfo() {
                let form = {
                    userId: this.$route.query.userId
                };
                let param = {
                    condition: form
                };
                getPersonalInfo(param).then((data) => {
                    if (data.status === 200 && data.total > 0) {
                        this.result = data.data;
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .author-personal {
        width: 100%;
        height: 100%;

        .personal-container {
            width: 100%;
            height: 100%;
            background-color: #f8f8f9;

            .personal-info {
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
                            width: 30rem;

                            .inner-info {
                                text-align: left;
                                padding: 1rem;

                                span:nth-child(1) {
                                    font-size: 1.8rem;
                                    padding-right: .5rem;
                                }

                                .position {
                                    padding-top: .4rem;
                                    padding-bottom: .4rem;
                                }

                                .el-textarea {
                                    /deep/ .el-textarea__inner {
                                        background: #fdfdfd;

                                        &:focus {
                                            outline: unset;
                                            border: 0.05rem solid #DCDFE6;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
