<template>
    <div class='detail-article'>
        <el-frameset :cols='"20%, * , 20%"'>
            <el-frame></el-frame>
            <el-frame class='read-detail'>
                <div class='title'>
                    <div class='top'>{{result.title}}</div>
                    <div class='bottom'>
                        <span>
                        {{result.author + '&nbsp;&nbsp;|&nbsp;&nbsp;' + updateTime}}
                    </span>
                    </div>
                </div>
                <div class='interval'></div>
                <div class='content'>
                    <mavon-editor v-model='content' :defaultOpen='"preview"' :editable='false' :subfield='false'
                                  :toolbarsFlag='false' :boxShadow='false' :shortCut='false'></mavon-editor>
                </div>
            </el-frame>
            <el-frame></el-frame>
        </el-frameset>
        <el-backtop target=".read-detail" :visibility-height='50'></el-backtop>
    </div>
</template>

<script>
    import {getContent} from '../../service/request.js';
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';
    import DateUtil from '../../utils/DateUtil';

    export default {
        name: 'DetailArticle',
        components: {ElFrame, ElFrameset},
        data () {
            return {
                result: {}
            };
        },
        mounted () {
            let scope = this;
            let form = {
                id: scope.$route.query.id
            };
            let param = {
                condition: form
            };
            getContent(param).then((data) => {
                if (data.status === 200) {
                    if (data.total > 0) {
                        scope.result = data.data[0];
                    }
                }
            }).catch(() => {
            }).finally(() => {
            });
        },
        computed: {
            content: {
                get () {
                    let scope = this;
                    return scope.result.content;
                },
                set () {
                }
            },
            updateTime () {
                let scope = this;
                return DateUtil.formatDate(new Date(scope.result.updateTime));
            }
        }
    };
</script>

<style lang="scss">
    .detail-article {
        width: 100%;
        height: 100%;

        .read-detail {
            .title {
                width: 100%;
                height: 20%;
                background-image: url("../../assets/detail-article.png");
                background-position: 1.5rem -2.25rem;

                .top {
                    height: 80%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 30px;
                }

                .bottom {
                    height: 20%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 15px;

                    span {
                        padding-left: 7rem;
                    }
                }
            }

            .interval {
                width: 100%;
                height: 2%;
            }

            .content {
                width: 100%;
                height: 78%;

                .v-note-wrapper {
                    .v-note-panel {
                        border: unset;

                        .v-note-show {
                            .v-show-content {
                                background: unset;
                            }
                        }
                    }
                }
            }
        }

        .read-detail::-webkit-scrollbar {
            width: 0;
        }
    }
</style>
