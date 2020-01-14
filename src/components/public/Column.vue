<template>
    <div class='column' @click="detail">
        <div class='tag'>
            <div class='like-tag' v-if="love === 1" @click.stop="sureTag"><img
                src="../../assets/like.svg"/><span>{{sum}}</span></div>
            <div class="dislike-tag" v-if="!love" @click.stop="sureTag"><img
                src="../../assets/dislike.svg"><span>{{sum}}</span>
            </div>
            <i class="el-icon-delete" v-if="showDelete" @click.stop="deleteArticle"></i>
        </div>
        <div class='title'><span class='modify-txt'
                                 :class="{'is-read': hasRead}"><span>{{data.title}}</span></span></div>
        <div class='info'>
            <span @click.stop='getIntroduction'>{{data.author}}</span>
            <span>{{' | '}}</span>
            <span @click.stop='jumpClock'>{{getRecentTime()}}</span>
        </div>
    </div>
</template>

<script>
    import DateUtil from '../../utils/DateUtil';
    import {getTag, updateTag} from '../../service/request';

    export default {
        name: 'Column',
        props: {
            data: {
                type: Object,
                default () {
                    return {};
                }
            },
            showDelete: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                love: 0,
                hasRead: 0,
                sum: 0
            };
        },
        mounted () {
            let param = {
                condition: {
                    articleId: this.data.id
                }
            };
            getTag(param).then((data) => {
                if (data.status === 200) {
                    this.love = data.data[0].love;
                    this.hasRead = data.data[0].hasRead;
                    this.sum = data.dataExt.tags;
                }
            });
        },
        methods: {
            sureTag () {
                let form = {
                    articleId: this.data.id,
                    love: this.love
                };
                let param = {
                    condition: form
                };
                updateTag(param).then((data) => {
                    if (data.status === 200) {
                        this.love = data.data[0].love;
                        this.sum = data.dataExt.tags;
                    }
                });
            },
            getRecentTime () {
                let result = DateUtil.formatDate(new Date(this.data.updateTime));
                return result;
            },
            // 点击标题进入文章详情
            detail () {
                let params = {
                    condition: {
                        articleId: this.data.id
                    }
                };
                updateTag(params).then(data => {
                    if (data.status === 200) {
                        this.hasRead = 1;
                    }
                });
                this.$emit('detail', this.data.id);
            },
            deleteArticle () {
                this.$emit('delete', this.data.id);
            },
            getIntroduction () {
                let scope = this;
                let routerData = scope.$router.resolve({
                    path: '/introduction',
                    query: {
                        userId: scope.data.userId
                    }
                });
                window.open(routerData.href, '_blank');
            },
            jumpClock () {
                let scope = this;
                scope.$router.push({path: '/world-clock'});
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
            align-items: flex-end;
            justify-content: flex-start;
            padding-left: 1.2rem;
            box-sizing: border-box;
            position: relative;

            .like-tag {
                border: 1px solid #ddd;
                height: 65%;
                padding: .1rem;

                img {
                    padding: 0 .1rem;
                    position: relative;
                    bottom: .08rem;
                }

                span {
                    font-size: .7rem;
                    position: relative;
                    bottom: .2rem;
                    color: #6cbd45;
                    padding: 0 .1rem 0 0;
                }
            }

            .dislike-tag {
                border: 1px solid #ddd;
                height: 65%;
                padding: .1rem;

                img {
                    padding: 0 .1rem;
                    position: relative;
                    bottom: .08rem;
                }

                span {
                    font-size: .7rem;
                    position: relative;
                    bottom: .2rem;
                    padding: 0 .1rem 0 0;
                }
            }

            .el-icon-delete {
                position: absolute;
                right: 1rem;
                bottom: .1rem;

                &:hover {
                    color: #409eff;
                }
            }

        }

        .title {
            width: 100%;
            height: 40%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .modify-txt {
                text-align: left;
                font-size: 1rem;
                font-weight: 600;
                padding-left: 1.2rem;
                width: 85%;
                overflow: hidden; /*内容会被修剪，并且其余内容是不可见的*/
                text-overflow: ellipsis; /*显示省略符号来代表被修剪的文本。*/
                white-space: nowrap; /*文本不换行*/

                &.is-read {
                    color: grey;
                }

                span {
                    &:hover {
                        color: #409eff;
                        text-decoration: underline;
                    }
                }
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

            span:nth-child(3) {
                &:hover {
                    color: #409eff;
                }
            }
        }
    }
</style>
