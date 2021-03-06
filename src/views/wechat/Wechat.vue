<template>
    <div class="wechat">
        <main-head current-tab="wechat" ref='mainHead'></main-head>
        <div class='frame-center'>
            <div class="chat-page">
                <div class="chat-tabs">
                    <div class="chat-tab">在线聊天</div>
                </div>
                <div class="online-chat">
                    <div class="online-members">
                        <div class="member-info" v-for="item in onlineMembers" :key="item.userId"
                             :class='{"member-first": item.userId === userId, "not-online": item.online === 0}'
                             @click.stop='getIntroduction(item.userId)'>
                            <el-avatar :src="item.headPortrait" :class="{'to-grey': item.online === 0}"></el-avatar>
                            <div class='member-name' :title='item.author'>{{item.author}}</div>
                        </div>
                    </div>
                    <div class="group-message">
                        <div class="online-total">当前在线<span>{{onlineTotal}}</span>人<i
                            class="el-icon-refresh" @click="initQuery"></i></div>
                        <scroll-loader @scrollToTop="upRefresh" ref='scrollLoader'>
                            <template v-for="(item, index) in onlineMessages">
                                <post-message v-if='userId === item.userId'
                                              :loading='loading[item.userId + item.updateTime]' :post="item"
                                              :key="index"></post-message>
                                <receive-message v-else :receive="item" :key="index"></receive-message>
                            </template>
                        </scroll-loader>
                    </div>
                    <div class="extra-operate">
                        <el-popover placement="top" trigger="click" popper-class='emotion-popover'
                                    :visible-arrow="false">
                            <emotion-list @emotion='handleEmotion'></emotion-list>
                            <img class="emotion-img" src="../../assets/emotion.svg" slot="reference"/>
                        </el-popover>
                    </div>
                    <div class="send-message">
                        <content-editable v-model="toOnlineMessage" style="height: 70%" ref="contentEdit"
                                          @click.native="scrollBottom"></content-editable>
                        <el-button @click='sendMessage'>发送</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import EmptyView from '../../components/util/EmptyView';
    import PostMessage from './components/PostMessage';
    import ReceiveMessage from './components/ReceiveMessage';
    import wechat from '../../utils/Wechat';
    import DateUtil from '../../utils/Date';
    import init from '../../utils/Init';
    import {getDialog} from '../../service/http';
    import ScrollLoader from '../../components/util/ScrollLoader';
    import EmotionList from '../../components/emotion/EmotionList';
    import Emotion from '../../utils/Emotion';
    import ContentEditable from '../../components/public/ContentEditable';

    export default {
        name: 'Wechat',
        components: {ContentEditable, EmotionList, ScrollLoader, ReceiveMessage, PostMessage, MainHead, EmptyView},
        data () {
            return {
                onlineMembers: [],
                onlineTotal: 0,
                toOnlineMessage: '',
                onlineMessages: [],
                loading: {},
                isUpperLoading: false,
                isRefreshedAll: false,
                userId: '',
                page: {
                    recordStartNo: 0,
                    pageRecordNum: 10,
                    total: 0
                }
            };
        },
        created () {
            wechat.createWebSocket();
            wechat.message = this.handleMessage;
            wechat.open = this.handleOpen;
            init.getBlogger().then(data => {
                this.userId = data.userId;
            });
        },
        mounted () {
            this.initQuery();
        },
        methods: {
            sendMessage () {
                if (!this.toOnlineMessage) {
                    return;
                }
                let obj = {
                    author: this.$store.state.blogger.author,
                    headPortrait: this.$store.state.blogger.headPortrait,
                    userId: this.$store.state.blogger.userId,
                    message: Emotion.img2Text(this.toOnlineMessage),
                    updateTime: DateUtil.formatDate(new Date())
                };
                this.$set(this.loading, obj.userId + obj.updateTime, true);
                this.onlineMessages.push(obj);
                wechat.webSocket.send(JSON.stringify(obj));
                this.toOnlineMessage = '';
            },
            getIntroduction (userId) {
                let routerData = this.$router.resolve({
                    path: '/author-personal',
                    name: 'authorPersonal',
                    query: {
                        userId: userId
                    }
                });
                window.open(routerData.href, '_blank');
            },
            // 滚动条到最底部
            scrollBottom () {
                let doc = this.$refs['scrollLoader'].$el;
                doc.scrollTop = doc.scrollHeight;
            },
            initQuery () {
                let params = {
                    pageRecordNum: this.page.pageRecordNum,
                    condition: {}
                };
                getDialog(params).then(data => {
                    if (data.status === 200 && data.total > 0) {
                        this.onlineMessages = data.data;
                    }
                    this.page.total = data.total;
                    this.page.recordStartNo = Math.floor(this.page.total / this.page.pageRecordNum);
                }).finally(() => {
                    this.scrollBottom();
                    // 如果已经到顶部，则置为false
                    if (this.$refs['scrollLoader'].stopTopLoading) {
                        this.$refs['scrollLoader'].stopTopLoading = false;
                    }
                    // 如果数据已经全部加载完毕
                    if (this.isRefreshedAll) {
                        this.isRefreshedAll = false;
                    }
                });
            },
            upRefresh (done) {
                if (this.isUpperLoading) {
                    return;
                }
                if (this.isRefreshedAll) {
                    done(true);
                    this.isUpperLoading = false;
                    return;
                }
                // 已经加载到顶部
                if (this.page.recordStartNo <= 1) {
                    this.isRefreshedAll = true;
                    done(true);
                    return;
                }
                let params = {
                    recordStartNo: --this.page.recordStartNo,
                    pageRecordNum: this.page.pageRecordNum,
                    condition: {}
                };
                getDialog(params).then(data => {
                    if (data.status === 200) {
                        this.onlineMessages = data.data.concat(this.onlineMessages);
                        done();
                    }
                }).finally(() => {
                    this.isUpperLoading = false;
                });
            },
            handleEmotion (item) {
                this.$refs['contentEdit'].insertImg(item);
            },
            handleOpen () {
                // 等获取到userId在请求后台
                init.getBlogger().then(data => {
                    let obj = {
                        userId: data.userId,
                        online: 1
                    };
                    // 获取在线人数信息
                    wechat.webSocket.send(JSON.stringify(obj));
                });
            },
            handleMessage (data) {
                // 说明是 正常 接收消息
                if (data.userId) {
                    // 判断是 发送方 or 接收方
                    if (this.userId === data.userId) {
                        // 发送方
                        this.$set(this.loading, data.userId + data.updateTime, false);
                        this.scrollBottom();
                    } else {
                        // 接收方
                        this.onlineMessages.push(data);
                    }
                } else {
                    // 连接webSocket成功时， 获取 在线人数信息
                    // 获取 在线人数信息
                    this.onlineTotal = 0;
                    this.onlineMembers = [];
                    for (let key in data) {
                        data[key].headPortrait = init.getHeadPortrait(data[key].headPortrait);
                        if (data[key].userId === this.userId) {
                            this.onlineMembers.unshift(data[key]);
                        } else {
                            this.onlineMembers.push(data[key]);
                        }
                        if (data[key].online === 1) {
                            ++this.onlineTotal;
                        }
                    }
                }
            }
        }
    };
</script>

<style lang="scss">
    .wechat {
        position: relative;
        width: 100%;
        height: 100%;

        .frame-center {
            height: 90%;
            width: 100%;
            background-color: #f8f8f9;
            display: flex;
            justify-content: center;
            align-items: center;

            .chat-page {
                width: 40%;
                height: 80%;
                border: 1px solid #ddd;
                background-color: white;

                .chat-tabs {
                    width: 100%;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    border-bottom: 1px solid #eeeeee;
                    font-size: x-small;

                    .chat-tab {
                        float: left;
                        margin-left: 1.5rem;
                        color: #409EFF;
                        border-bottom: 1.5px solid #409EFF;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                .online-chat {
                    width: 100%;
                    height: calc(100% - 1.8rem - 1px);
                    // 清除子元素浮动
                    clear: both;

                    .online-members {
                        height: calc(100% - 1.6rem);
                        width: calc(22% - 1.6rem);
                        float: left;
                        margin: .8rem;
                        overflow: auto;

                        &::-webkit-scrollbar {
                            width: 3px;
                            height: 3px;
                        }

                        .member-info {
                            width: 100%;
                            height: 2.5rem;
                            position: relative;
                            box-sizing: border-box;
                            border: 1px solid #409EFF;
                            margin-bottom: .05rem;

                            &.not-online {
                                color: #c0c4cc;
                                border: 1px solid #c0c4cc;
                            }

                            &.member-first {
                                border: 1px solid #9eea6a;
                            }

                            .el-avatar {
                                height: 1.6rem;
                                width: 1.6rem;
                                position: absolute;
                                left: 20%;
                                top: 50%;
                                transform: translate(-50%, -50%);
                            }

                            .to-grey {
                                filter: grayscale(100%);
                            }

                            .member-name {
                                position: absolute;
                                left: 36%;
                                top: 50%;
                                transform: translate(0, -50%);
                                width: 4rem;
                                text-align: left;
                                font-size: .65rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }

                            &:hover {
                                cursor: pointer;
                            }
                        }
                    }

                    .group-message {
                        height: calc(70% - .8rem - 2px);
                        width: calc(78% - 0.8rem - 2px);
                        float: left;
                        margin: .8rem .8rem 0 0;
                        border: 1px solid #409EFF;

                        .online-total {
                            font-size: .65rem;
                            height: 1.5rem;
                            line-height: 1.5rem;
                            text-align: center;
                            position: relative;

                            span {
                                background: #ecf5ff;
                                border-color: #b3d8ff;
                                color: #409eff;
                                padding: .12rem .5rem;
                                margin: 0 .2rem;
                            }

                            .el-icon-refresh {
                                position: absolute;
                                font-size: .8rem;
                                top: 50%;
                                right: 0;
                                transform: translate(-50%, -50%);

                                &:hover {
                                    color: #409eff;
                                    cursor: pointer;
                                }
                            }
                        }
                    }

                    .extra-operate {
                        width: 78%;
                        height: 5%;
                        float: left;
                        padding-right: .8rem;
                        box-sizing: border-box;
                        position: relative;

                        .emotion-img {
                            position: absolute;
                            top: 50%;
                            left: 3%;
                            transform: translate(-50%, -50%);

                            &:hover {
                                cursor: pointer;
                            }
                        }
                    }

                    .send-message {
                        height: 25%;
                        width: 78%;
                        float: left;
                        padding: 0 .8rem .8rem 0;
                        box-sizing: border-box;
                        position: relative;

                        .el-button {
                            width: 4rem;
                            padding: .3rem .2rem;
                            position: absolute;
                            top: 5.1rem;
                            right: .8rem;
                        }
                    }
                }
            }
        }
    }

    .emotion-popover {
        width: 14rem;
        top: 18.8rem !important;
        left: 30.5rem !important;
        margin-bottom: unset !important;
    }

</style>
