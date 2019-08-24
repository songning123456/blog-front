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
                                <span>{{single.time}}</span>
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
                    <el-form-item v-for='(item, index) in emailInfo' :key='index' :label='item.key' :style='{height: 70 / emailInfo.length + "%"}'>
                        <el-input v-model='emailForm[item.value]'
                                  :type='item.value === "message" ? "textarea" : "text"' :placeholder = 'item.value'></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class='email-tail'>Send</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import EmptyView from '../../components/util/EmptyView';

    export default {
        name: 'BloggerIntroduction',
        components: {EmptyView},
        data() {
            return {
                result: {
                    id: '',
                    userName: '夷山 龙龙 张乐',
                    password: '',
                    gender: '男',
                    age: 35,
                    profession: '程序员',
                    telephone: '15850682190',
                    email: '1457065856@qq.com',
                    introduction: '从警8年他硕果累累，先后荣立个人一等功1次，二等功1次，三等功3次，嘉奖2次，2006年被评为“百姓心中好交警”，2007年被评为青年执法标兵，2008年被评为奥运交通安保标兵和“微笑北京交警之星”，2009年又荣获了首都“五一”劳动奖章,受邀参加市委政法委“学习实践科学发展观巡讲团”和北京市公安局“平凡颂”演讲报告会。孟昆玉在平凡的岗位上，做出了不平凡的业绩',
                    updateTime: '2019-08-23 13:30:00',
                    headPortrait: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                resume: {
                    data: [
                        {
                            type: '工作经历',
                            info: [
                                {
                                    mechanism: '兰科',
                                    position: '客源',
                                    time: '2018-05-06 ～ 2018-09-12',
                                    introduction: '1985年发行首张个人专辑《只知道此刻爱你》 [16]  。1990年凭借专辑《可不可以》在歌坛获得关注 [17]  。1994年获得十大劲歌金曲最受欢迎男歌星奖。1995年在央视春晚上演唱歌曲《忘情水》 [18]  。2000年被《吉尼斯世界纪录大全》评为“获奖最多的香港男歌手” [19]  。2004年第六次获得十大劲歌金曲最受欢迎男歌星奖。2016年参与填词的歌曲《原谅我》正式发行 [20]  。'
                                },
                                {
                                    mechanism: '兰科',
                                    position: '客源',
                                    time: '2018-05-06 ～ 2018-09-12',
                                    introduction: '1985年发行首张个人专辑《只知道此刻爱你》 [16]  。1990年凭借专辑《可不可以》在歌坛获得关注 [17]  。1994年获得十大劲歌金曲最受欢迎男歌星奖。1995年在央视春晚上演唱歌曲《忘情水》 [18]  。2000年被《吉尼斯世界纪录大全》评为“获奖最多的香港男歌手” [19]  。2004年第六次获得十大劲歌金曲最受欢迎男歌星奖。2016年参与填词的歌曲《原谅我》正式发行 [20]  。'
                                }
                            ]
                        },
                        {
                            type: '教育经历',
                            info: [
                                {
                                    position: '学生',
                                    time: '2018-05-06 ～ 2018-09-12',
                                    introduction: '1985年发行首张个人专辑《只知道此刻爱你》 [16]  。1990年凭借专辑《可不可以》在歌坛获得关注 [17]  。1994年获得十大劲歌金曲最受欢迎男歌星奖。1995年在央视春晚上演唱歌曲《忘情水》 [18]  。2000年被《吉尼斯世界纪录大全》评为“获奖最多的香港男歌手” [19]  。2004年第六次获得十大劲歌金曲最受欢迎男歌星奖。2016年参与填词的歌曲《原谅我》正式发行 [20]  。',
                                    mechanism: '兰科'
                                },
                                {
                                    position: '学生',
                                    time: '2018-05-06 ～ 2018-09-12',
                                    introduction: '1985年发行首张个人专辑《只知道此刻爱你》 [16]  。1990年凭借专辑《可不可以》在歌坛获得关注 [17]  。1994年获得十大劲歌金曲最受欢迎男歌星奖。1995年在央视春晚上演唱歌曲《忘情水》 [18]  。2000年被《吉尼斯世界纪录大全》评为“获奖最多的香港男歌手” [19]  。2004年第六次获得十大劲歌金曲最受欢迎男歌星奖。2016年参与填词的歌曲《原谅我》正式发行 [20]  。',
                                    mechanism: '兰科'
                                }
                            ]
                        }
                    ],
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
            sureContent(index) {
                let scope = this;
                if (scope.current !== index) {
                    scope.current = index;
                }
            }
        },
        mounted() {
            this.sureContent(0);
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
