<template>
    <div class='column'>
        <div class='tag'>
            <el-badge :value="12">
                <el-button size="mini"><img src="../../assets/like.svg"/></el-button>
            </el-badge>
            <el-badge :value="5">
                <el-button size="mini"><img src="../../assets/dislike.svg"></el-button>
            </el-badge>
        </div>
        <div class='title'><span>{{data.title}}</span></div>
        <div class='info'>
            <span @click.stop='getIntroduction'>{{data.author}}</span>
            <span>{{' | '}}</span>
            <span>{{getRecentTime()}}</span>
        </div>
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
            },
            getIntroduction () {
                let scope = this;
                let routerData = scope.$router.resolve({
                    path: '/introduction',
                    query: {
                        author: scope.data.author
                    }
                });
                window.open(routerData.href, '_blank');
            }
        }
    };
</script>

<style lang='scss'>
    .column {
        width: 100%;
        height: 5rem;
        background: white;
        margin: .2rem 0;

        &.column:hover {
            background-color: #fbfbfc;
            cursor: pointer;
        }

        .tag {
            width: 100%;
            height: 30%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .el-bag {
                padding: 0 .5rem;

                img:nth-child(1) {
                    transform: scale(1.5);
                }

                img:nth-child(2) {
                    transform: scale(1.8);
                }
            }

        }

        .title {
            width: 100%;
            height: 40%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            span {
                text-align: left;
                font-size: 1rem;
                font-weight: 600;
                padding-left: 1.2rem;
                width: 85%;
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
                padding-left: .5rem;
            }

            span:nth-child(1) {
                padding-left: 1.2rem;

                &:hover {
                    color: #409eff;
                }
            }
        }
    }
</style>
