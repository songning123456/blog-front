<template>
    <div class='column'>
        <div class='title'><span>{{data.title}}</span></div>
        <div class='info'><span>{{data.author + ' | ' + getRecentTime()}}</span></div>
    </div>
</template>

<script>
    import DateUtil from '../../utils/DateUtil';

    export default {
        name: 'Column',
        props: {
            data: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        methods: {
            getRecentTime () {
                let scope = this;
                let result = DateUtil.formatDate(new Date(scope.data.updateTime));
                return result;
            }
        }
    };
</script>

<style lang='scss'>
    .column {
        width: 100%;
        height: 6rem;
        background: white;
        margin: .2rem 0;

        &.column:hover {
            background-color: #f8f8f9;
            cursor: pointer;
        }

        .title {
            width: 100%;
            height: 70%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            span {
                text-align: left;
                padding-left: 2rem;
                padding-top: 1.5rem;
                font-size: larger;
                font-weight: 600;
                width: 65%;
                overflow: hidden; /*内容会被修剪，并且其余内容是不可见的*/
                text-overflow: ellipsis; /*显示省略符号来代表被修剪的文本。*/
                white-space: nowrap; /*文本不换行*/
            }
        }

        .info {
            width: 100%;
            height: 30%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            span {
                font-size: .7rem;
                color: #d2d2d2;
                padding-left: 3rem;
            }
        }
    }
</style>
