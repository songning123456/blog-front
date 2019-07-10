<template>
    <div class='column'>
        <div class='title'>{{title}}</div>
        <div class='info'>{{author + '|' + createTime}}</div>
    </div>
</template>

<script>
    export default {
        name: 'Column',
        props: {
            title: {
                type: String,
                default () {
                    return '';
                }
            },
            author: {
                type: String,
                default () {
                    return '';
                }
            },
            createTime: {
                type: String,
                default () {
                    return '';
                }
            },
            updateTime: {
                type: String,
                default () {
                    return '';
                }
            }
        },
        methods: {
            getRecentTime () {
                let scope = this;
                if () {

                }
            }
        }
    };
</script>

<style lang='scss'>
    .column {
        width: 100%;
        height: 100%;

        .title {
            width: 100%;
            height: 60%;
        }

        .info {
            width: 100%;
            height: 40%;
        }
    }
</style>
