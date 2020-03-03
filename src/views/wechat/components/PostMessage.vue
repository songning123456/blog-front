<template>
    <div class="post-message">
        <div class="update-time"><span>{{post.updateTime}}</span></div>
        <el-avatar :src="postAvatar"></el-avatar>
        <div class="author-message">
            <div class="author">{{post.author}}</div>
            <div class="message" v-html="getMessage(post.message)"></div>
        </div>
        <img v-show='loading' v-if='loading' src='../../../assets/wechatSpinner.svg'/>
    </div>
</template>

<script>
    import init from '../../../utils/Init';
    import Emotion from '../../../utils/Emotion';

    export default {
        name: 'PostMessage',
        props: {
            post: {
                type: Object,
                default () {
                }
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            postAvatar () {
                return init.getHeadPortrait(this.post.headPortrait);
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
    .post-message {
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
            float: right;
            position: relative;

            .author {
                text-align: right;
                font-size: .6rem;
            }

            .message {
                margin: .2rem 0;
                min-height: 17px;
                font-size: .75rem;
                background-color: #9eea6a;
                border-radius: 5px;
                padding: .4rem;
                display: block;
                word-wrap: break-word;
                text-align: left;
                box-shadow: 0 1px 7px -5px #000;
            }

            .message:before {
                left: 100%;
                content: " ";
                position: absolute;
                border: 6px solid transparent;
                border-left-color: #9eea6a;
            }
        }

        .el-avatar {
            width: 1.6rem;
            height: 1.6rem;
            float: right;
            margin: 0 .5rem;
        }

        img {
            float: right;
            margin-right: .5rem;
            margin-top: .6rem;
        }
    }
</style>
