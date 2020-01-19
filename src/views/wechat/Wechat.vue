<template>
    <div class="wechat">
        <main-head @futureTab='futureTab' current-tab="wechat" ref='mainHead'></main-head>
        <div class='frame-center'>
            <div class="chat-page">
                <div class="chat-tabs">
                    <div class="chat-tab" @click.stop="currentTab = 'systemInfo'"
                         :class="{'current-tab': currentTab === 'systemInfo'}">系统通知
                    </div>
                    <div class="chat-tab" @click.stop="currentTab = 'onlineChat'"
                         :class="{'current-tab': currentTab === 'onlineChat'}">在线聊天
                    </div>
                </div>
                <div class="system-info" v-show="currentTab === 'systemInfo'"></div>
                <div class="online-chat" v-show="currentTab === 'onlineChat'">
                    <div class="online-members">
                        <div class="member-info" v-for="item in onlineMembers" :key="item.userId">
                            <el-avatar :src="item.avatar"></el-avatar>
                            <div class='member-name' ref="memberName" :data-id='item.userId'>{{item.author}}</div>
                        </div>
                    </div>
                    <div class="group-message"></div>
                    <div class="send-message">
                        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="message"></el-input>
                        <el-button type="primary">发送</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import EmptyView from '../../components/util/EmptyView';

    export default {
        name: 'Wechat',
        components: {MainHead, EmptyView},
        data () {
            return {
                currentTab: 'onlineChat',
                nameScroll: {},
                onlineMembers: [
                    {userId: '121212', message: '121212122', avatar: '', author: 'AAAAAAAAAAAAAAAA'},
                    {userId: '1212121212', message: '12121212', avatar: '', author: 'BBBAAAAAA'},
                    {userId: 'sdsdsd1', message: '12121212', avatar: '', author: 'CCCAAAAAAA'},
                    {userId: 'ewewew2', message: '12121212', avatar: '', author: 'DDDAAAAAAAAA'},
                    {userId: 'ewewew3', message: '12121212', avatar: '', author: 'DDD'},
                    {userId: 'ewewew4', message: '12121212', avatar: '', author: 'DDD'},
                    {userId: 'ewewew5', message: '12121212', avatar: '', author: 'DDD'},
                    {userId: 'ewewew6', message: '12121212', avatar: '', author: 'DDD'},
                    {userId: 'ewewew7', message: '12121212', avatar: '', author: 'DDD'},
                    {userId: 'ewewew8', message: '12121212', avatar: '', author: 'DDD'},
                    {userId: 'ewewew9', message: '12121212', avatar: '', author: 'DDD'},
                    {userId: 'ewewew0', message: '12121212', avatar: '', author: 'DDD'},
                    {userId: 'ewewew11', message: '12121212', avatar: '', author: 'DDD'},
                    {userId: 'wewe22w12', message: '1212121212', avatar: '', author: 'EEE'}
                ],
                message: ''
            };
        },
        activated () {
            this.$nextTick(() => {
                let memberDoc = this.$refs['memberName'];
                for (let i = 0; i < memberDoc.length; i++) {
                    let dataId = memberDoc[i].getAttribute('data-id');
                    this.nameScroll[dataId] = memberDoc[i];
                    this.nameScroll[dataId].addEventListener('mousewheel', this.scrollName, true);
                }
            });
        },
        methods: {
            futureTab (tab) {
                this.$router.push({path: '/' + tab});
            },
            scrollName (event) {
                event.preventDefault();
                // eslint-disable-next-line no-unused-vars
                let dataId = event.target.getAttribute('data-id');
                if (event.deltaY > 0) {
                    this.nameScroll[dataId].scrollLeft += 10;
                } else {
                    this.nameScroll[dataId].scrollLeft -= 10;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
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

                        &.current-tab {
                            color: #409EFF;
                            border-bottom: 1.5px solid #409EFF;
                        }

                        &:hover {
                            cursor: pointer;
                            color: #409EFF;
                        }
                    }
                }

                .system-info {
                    width: 100%;
                    height: calc(100% - 1.8rem - 1px);
                }

                .online-chat {
                    width: 100%;
                    height: calc(100% - 1.8rem - 1px);

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
                            width: 96%;
                            height: 2.5rem;
                            position: relative;
                            box-sizing: border-box;
                            border: 1px solid #409EFF;
                            margin-bottom: .4rem;

                            .el-avatar {
                                height: 1.6rem;
                                width: 1.6rem;
                                position: absolute;
                                left: 20%;
                                top: 50%;
                                transform: translate(-50%, -50%);

                                &:hover {
                                    cursor: pointer;
                                }
                            }

                            .member-name {
                                display: inline-block;
                                position: absolute;
                                left: 36%;
                                top: 50%;
                                transform: translate(0, -50%);
                                width: 4rem;
                                overflow: auto;
                                user-select: none;
                                text-align: left;

                                &::-webkit-scrollbar {
                                    width: 1px;
                                    height: 1px;
                                }

                                &:hover {
                                    cursor: w-resize;
                                }
                            }
                        }
                    }

                    .group-message {
                        height: calc(75% - 1.6rem - 2px);
                        width: calc(78% - 0.8rem - 2px);
                        float: left;
                        margin: .8rem .8rem .8rem 0;
                        border: 1px solid #409EFF;
                    }

                    .send-message {
                        height: 25%;
                        width: 78%;
                        float: left;
                        padding: 0 .8rem .8rem 0;
                        box-sizing: border-box;
                        position: relative;

                        .el-button {
                            width: 6rem;
                            position: absolute;
                            top: 5rem;
                            right: .8rem;
                        }
                    }
                }
            }
        }
    }

</style>
