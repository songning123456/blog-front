<template>
    <div class='column' @click="detail">
        <div class='tag'>
            <div class='like-tag' v-if="article.tag.love === 1" @click.stop="modifyLoveOfTag(0)"><img
                src="../../assets/like.svg"/><span>{{article.tag.sum}}</span></div>
            <div class="dislike-tag" v-if="!article.tag.love" @click.stop="modifyLoveOfTag(1)"><img
                src="../../assets/dislike.svg"><span>{{article.tag.sum}}</span>
            </div>
            <i class="el-icon-delete" v-if="showDelete" @click.stop="$emit('delete', article.id)"></i>
        </div>
        <div class='title'><span class='modify-txt'
                                 :class="{'is-read': article.tag.hasRead}"><span
            v-html="getQueryText(article.title)"></span></span>
        </div>
        <div class='info'>
            <span @click.stop='getIntroduction' v-html="getQueryText(article.author)"></span>
            <span>{{' | '}}</span>
            <span @click.stop='jumpClock'>{{article.updateTime}}</span>
        </div>
    </div>
</template>

<script>
    import {updateTag} from '../../service/http';

    export default {
        name: 'Column',
        props: {
            article: {
                type: Object,
                default() {
                    return {};
                }
            },
            showDelete: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            modifyLoveOfTag(love) {
                let param = {
                    condition: {
                        articleId: this.article.id,
                        love: love
                    }
                };
                updateTag(param).then((data) => {
                    if (data.status === 200) {
                        this.article.tag.love = data.data[0].love;
                        this.article.tag.sum = data.dataExt.tags;
                    }
                });
            },
            // 点击标题进入文章详情
            detail() {
                let params = {
                    condition: {
                        articleId: this.article.id,
                        hasRead: 1
                    }
                };
                updateTag(params).then(data => {
                    if (data.status === 200) {
                        this.article.tag.hasRead = data.data[0].hasRead;
                    }
                });
                let routerData = this.$router.resolve({
                    path: '/detail',
                    query: {
                        id: this.article.id
                    }
                });
                window.open(routerData.href, '_blank');
            },
            getIntroduction() {
                let routerData = this.$router.resolve({
                    path: '/author-personal',
                    name: 'authorPersonal',
                    query: {
                        userId: this.article.userId
                    }
                });
                window.open(routerData.href, '_blank');
            },
            jumpClock() {
                let scope = this;
                scope.$router.push({path: '/world-clock'});
            },
            getQueryText(text) {
                let chosen = `<em>${this.$store.state.query.param}</em>`;
                let reg = new RegExp(this.$store.state.query.param, 'g');
                let result = text.replace(reg, chosen);
                return result;
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

        &:hover {
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
                margin-left: 1.2rem;

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

        em {
            font-style: normal;
            color: #e8001c;
        }
    }
</style>
