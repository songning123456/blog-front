<template>
    <div class="receive-message">
        <el-avatar :src="isSystem ? require('../../../assets/robot.svg') : receive.avatar"></el-avatar>
        <div class="author-message">
            <div class="author">{{isSystem ? '系统通知' : receive.author}}</div>
            <div class="message" v-html="getMessage(receive.message)"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ReceiveMessage',
        props: {
            receive: {
                type: Object,
                default() {}
            },
            isSystem: {
                type: Boolean,
                default: false
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
    .receive-message {
        width: 100%;
        margin: .4rem 0;
        height: auto;
        overflow: auto;

        .author-message {
            width: auto;
            height: auto;
            float: left;

            .author {
                text-align: left;
                font-size: .6rem;
            }

            .message {
                margin-top: .2rem;
                font-size: .75rem;
                background-color: white;
                border-radius: 5px;
                padding: .4rem;
                display: block;
                word-wrap:break-word;
                text-align: left;
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
