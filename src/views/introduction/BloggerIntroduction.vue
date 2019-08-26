<template>
    <div class='blogger-introduction'>
        <div class='el-frame-left'>
            <div class='inner-text'>
                <div class="avatar">
                    <div class='inner-border'>
                        <el-avatar shape="square"
                                   src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                    </div>
                </div>
                <div class='simple-info'>
                    <div class='inner-info'>
                        <div v-for='(item, index) in display' :key='index' class='circle-display'
                             :style='{height: 100 / display.length + "%"}'>
                            <div class='key'>{{item.key}}</div>
                            <div class='value'>{{result[item.value]}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=el-frame-right>
            <div class='detail-header'>
                <div v-for='(item, index) in detail' :key='index' class='detail-content'
                     :class='current === index ? "detail-choose" : ""'>
                    <img :src='item.url'/>
                    <span @click='sureContent(index)'>{{item.info}}</span>
                </div>
            </div>
            <div v-if='current === 0' class='detail-show-0'>
                <empty-view v-if='JSON.stringify(resume) === "{}"'></empty-view>
                <el-scrollbar class='detail-inner-info'>
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
            <div v-else-if='current === 2' class='detail-show-2'>
            </div>
            <div v-else-if=' current === 3' class='detail-show-3'>
                <div class='email-head'>
                    联系 && 交流
                </div>
                <el-form ref='emailForm' :model='emailForm' label-width='8rem'>
                    <el-form-item v-for='(item, index) in emailInfo' :key='index' :label='item.key'
                                  :style='{height: 70 / emailInfo.length + "%"}'>
                        <el-input v-model='emailForm[item.value]'
                                  :type='item.value === "message" ? "textarea" : "text"'
                                  :placeholder='item.value'></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class='email-tail'>Send</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import EmptyView from '../../components/util/EmptyView';
    import {getPersonalInfo, getBloggerInfo} from '../../service/request';

    export default {
        name: 'BloggerIntroduction',
        components: {EmptyView},
        data () {
            return {
                result: {},
                resume: {
                    data: [],
                    total: 0
                },
                display: [
                    {
                        key: '作者',
                        value: 'userName'
                    },
                    {
                        key: '性别',
                        value: 'gender'
                    },
                    {
                        key: '年龄',
                        value: 'age'
                    },
                    {
                        key: '职位',
                        value: 'profession'
                    },
                    {
                        key: '电话',
                        value: 'telephone'
                    },
                    {
                        key: '电子邮箱',
                        value: 'email'
                    }
                ],
                detail: [
                    {url: '', info: '简历'},
                    {url: '', info: '打印'},
                    {url: '', info: '查看照片'},
                    {url: '', info: '给我发电子邮件?'}
                ],
                emailInfo: [{key: '姓名', value: 'name'},
                    {key: '联系方式', value: 'telephone'},
                    {key: '电子邮箱', value: 'email'},
                    {key: '主题', value: 'subject'},
                    {key: '信息', value: 'message'}],
                emailForm: {
                    name: '',
                    telephone: '',
                    email: '',
                    subject: '',
                    message: ''
                },
                current: ''
            };
        },
        methods: {
            sureContent (index) {
                let scope = this;
                if (scope.current !== index) {
                    scope.current = index;
                }
            },
            getMyInfo () {
                let scope = this;
                let form = {
                        // 暂时这样写，等数据库同步数据
                        infoOwner: 'songning'
                        // infoOwner: scope.$route.query.author || 'songning'
                    }
                ;
                let param = {
                    condition: form
                };
                getPersonalInfo(param).then((data) => {
                    if (data.status === 200) {
                        if (data.total > 0) {
                            scope.resume.data = data.data;
                            scope.resume.total = data.total;
                        } else {
                            scope.$message.error('查询结果为空');
                        }
                    } else {
                        scope.$message.error('查询异常! ' + data.message);
                    }
                }).catch().finally();
            },
            getBlogger () {
                let scope = this;
                let form = {
                    // userName: scope.$route.query.author || 'songning';
                    userName: 'songning'
                };
                let param = {
                    condition: form
                };
                getBloggerInfo(param).then((data) => {
                    if (data.status === 200) {
                        if (data.total > 0) {
                            scope.result = data.data[0];
                        } else {
                            scope.$message.error('查询结果为空');
                        }
                    } else {
                        scope.$message.error('查询异常! ' + data.message);
                    }
                }).catch().finally();
            }
        },
        mounted () {
            this.sureContent(0);
            this.getMyInfo();
            this.getBlogger();
        }
    };
</script>

<style lang="scss">
    .blogger-introduction {
        width: 100%;
        height: 100%;

        .el-frame-left {
            height: 100%;
            width: 20%;
            float: left;
            box-sizing: border-box;
            background: #6ecadc;

            .inner-text {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 2rem 1.5rem;

                .avatar {
                    height: 30%;
                    width: 100%;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .inner-border {
                        height: 80%;
                        width: 80%;

                        display: flex;
                        justify-content: center;
                        align-items: center;

                        border: 1px solid white;

                        .el-avatar {
                            height: 7.5rem;
                            width: 7.5rem;
                        }
                    }
                }

                .simple-info {
                    height: 70%;
                    width: 100%;

                    .inner-info {
                        width: 100%;
                        height: 100%;
                        padding: 1.8rem;
                        box-sizing: border-box;

                        .circle-display {
                            width: 100%;

                            .key {
                                width: 100%;
                                height: 50%;
                                text-align: left;

                                font-size: 1.2rem;
                                font-weight: 600;
                                color: white;
                            }

                            .value {
                                width: 100%;
                                height: 50%;
                                text-align: left;
                                padding-left: 1rem;
                            }
                        }
                    }
                }
            }
        }

        .el-frame-right {
            height: 100%;
            width: 80%;
            float: left;
            box-sizing: border-box;

            .detail-header {
                height: 3rem;
                width: 100%;

                display: flex;
                align-items: center;
                justify-content: center;

                .detail-content {
                    text-align: left;
                    display: inline-block;
                    width: 8rem;
                    cursor: pointer;

                    &.detail-choose {
                        color: #409eff;
                    }
                }
            }

            .detail-show-0 {
                width: 100%;
                height: calc(100% - 3rem);

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
                                        padding-bottom: .8rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .detail-show-2 {
                width: 100%;
                height: calc(100% - 3rem);
            }

            .detail-show-3 {
                width: 100%;
                height: calc(100% - 3rem);

                .email-head {
                    height: 2.5rem;
                    width: 20rem;
                    background: orange;
                    line-height: 2.9rem;
                    float: left;
                    font-size: 1.7rem;
                    color: white;
                    margin: 1rem 0;
                    border-radius: .2rem;
                }

                .el-form {
                    clear: both;
                    height: 70%;
                    width: 70%;
                    float: left;
                }

                .email-tail {
                    width: 12rem;
                    float: left;
                    font-size: 1.7rem;
                    color: white;
                    clear: both;
                    margin-left: 8rem;
                }
            }
        }
    }

</style>
