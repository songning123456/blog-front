<template>
    <div class="post-message">
        <el-avatar :src="postAvatar"></el-avatar>
        <div class="author-message">
            <div class="author">{{post.author}}</div>
            <div class="message" v-html="getMessage(post.message)"></div>
        </div>
        <img v-show='loading' v-if='loading' src='../../../assets/wechatSpinner.svg' />
    </div>
</template>

<script>
    import config from '../../../utils/Config';

    export default {
        name: 'PostMessage',
        props: {
            post: {
                type: Object,
                default() {
                }
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            postAvatar() {
                return config.getImageOriginal() + encodeURIComponent(this.post.avatar);
            }
        },
        methods: {
            getMessage(message) {
                let result = '';
                let length = message.length;
                for (let i = 0, j = 1; i < length; i++, j++) {
                    if (length === 20) {
                        result += message[i];
                    } else if (i && j % 20 === 0) {
                        result += '<br/>';
                    } else {
                        result += message[i];
                    }
                }
                return result;
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

        .author-message {
            width: auto;
            height: auto;
            float: right;

            .author {
                text-align: right;
                font-size: .6rem;
            }

            .message {
                margin-top: .2rem;
                font-size: .75rem;
                background-color: #91cef5;
                border-radius: 5px;
                padding: .4rem;
                display: block;
                word-wrap: break-word;
                text-align: left;
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
