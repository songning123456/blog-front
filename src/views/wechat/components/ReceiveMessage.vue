<template>
    <div class="receive-message">
        <div class="update-time"><span>{{receive.updateTime}}</span></div>
        <el-avatar :src="isSystem ? require('../../../assets/robot.svg') : receiveAvatar"></el-avatar>
        <div class="author-message">
            <div class="author">{{isSystem ? '系统通知' : receive.author}}</div>
            <div class="message" v-html="getMessage(receive.message)"></div>
        </div>
    </div>
</template>

<script>
    import init from '../../../utils/Init';
    import Emotion from '../../../utils/Emotion';

    export default {
        name: 'ReceiveMessage',
        props: {
            receive: {
                type: Object,
                default () {
                }
            },
            isSystem: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            receiveAvatar () {
                return init.getHeadPortrait(this.receive.headPortrait);
            }
        },
        methods: {
            // 把所有md5加密信息 转换成 图片
            getMessage (message) {
                return Emotion.text2Img(message);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .receive-message {
        width: 100%;
        margin: .4rem 0;
        height: auto;
        overflow: auto;

        .update-time {
            font-size: .6rem;
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                color: #fff;
                border-radius: 2px;
                background-color: #dadada;
                padding: .2rem .4rem;
            }
        }

        .author-message {
            max-width: 45%;
            width: auto;
            height: auto;
            float: left;
            position: relative;

            .author {
                text-align: left;
                font-size: .6rem;
            }

            .message {
                margin: .2rem 0;
                font-size: .75rem;
                background-color: white;
                border-radius: 5px;
                padding: .4rem;
                display: block;
                word-wrap: break-word;
                text-align: left;
                box-shadow: 0 1px 7px -5px #000;
            }

            .message:before {
                right: 100%;
                content: " ";
                position: absolute;
                border: 6px solid transparent;
                border-right-color: white;
            }
        }

        .el-avatar {
            width: 1.6rem;
            height: 1.6rem;
            float: left;
            margin: 0 .5rem;
        }
    }
</style>
