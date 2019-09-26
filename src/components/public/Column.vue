<template>
    <div class='column'>
        <div class='tag'>
            <div class='like-tag' v-if="likeTag === 1" @click="sureTag"><img
                src="../../assets/like.svg"/><span>{{sum}}</span></div>
            <div class="dislike-tag" v-else @click="sureTag"><img src="../../assets/dislike.svg"><span>{{sum}}</span>
            </div>
        </div>
        <div class='title'><span @click="detail">{{data.title}}</span></div>
        <div class='info'>
            <span @click.stop='getIntroduction'>{{data.author}}</span>
            <span>{{' | '}}</span>
            <span>{{getRecentTime()}}</span>
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
            }
        },
        data () {
            return {
                likeTag: 0,
                sum: 0
            };
        },
        mounted () {
            let scope = this;
            let form = {
                username: localStorage.getItem('username'),
                articleId: scope.data.id
            };
            let param = {
                condition: form
            };
            getTag(param).then((data) => {
                if (data.status === 200) {
                    scope.likeTag = data.data[0].love;
                    scope.sum = data.dataExt.tags;
                }
            }).catch().finally();
        },
        methods: {
            sureTag () {
                let scope = this;
                let form = {
                    username: localStorage.getItem('username'),
                    articleId: scope.data.id,
                    love: scope.likeTag
                };
                let param = {
                    condition: form
                };
                updateTag(param).then((data) => {
                    if (data.status === 200) {
                        scope.likeTag = data.data[0].love;
                        scope.sum = data.dataExt.tags;
                    }
                }).catch().finally();
            },
            getRecentTime () {
                let scope = this;
                let result = DateUtil.formatDate(new Date(scope.data.updateTime));
                return result;
            },
            // 点击标题进入文章详情
            detail () {
                let scope = this;
                scope.$emit('detail', scope.data.id);
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
            align-items: flex-end;
            justify-content: flex-start;
            padding-left: 1.2rem;

            .like-tag {
                border: 1px solid #ddd;
                height: 70%;

                img {
                    padding: 0 .1rem;
                }

                span {
                    font-size: .7rem;
                    position: relative;
                    bottom: .1rem;
                    color: #6cbd45;
                    padding: 0 .1rem 0 0;
                }
            }

            .dislike-tag {
                border: 1px solid #ddd;
                height: 70%;

                img {
                    padding: 0 .1rem;
                }

                span {
                    font-size: .7rem;
                    position: relative;
                    bottom: .1rem;
                    padding: 0 .1rem 0 0;
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

                &:hover {
                    color: #409eff;
                    text-decoration: underline;
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
        }
    }
</style>
