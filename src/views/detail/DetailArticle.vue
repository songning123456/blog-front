<template>
    <div class='detail-article'>
        <div class='article-content'>
            <div class='title'>
                <div class='top'>{{result.title}}</div>
                <div class='bottom'>
                        <span>
                        {{result.author + '&nbsp;&nbsp;|&nbsp;&nbsp;' + updateTime}}
                    </span>
                </div>
            </div>
            <div class='content'>
                <mavon-editor v-model='content' :defaultOpen='"preview"' :editable='false' :subfield='false'
                              :toolbarsFlag='false' :boxShadow='false' :shortCut='false'></mavon-editor>
            </div>
        </div>
        <el-backtop target=".detail-article" :visibility-height='50'></el-backtop>
        <tool-loading :loading="loading"></tool-loading>
    </div>
</template>

<script>
    import {getContent} from '../../service/request.js';
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';
    import DateUtil from '../../utils/DateUtil';
    import EmptyView from '@/components/util/EmptyView';
    import ToolLoading from '@/components/util/ToolLoading';

    export default {
        name: 'DetailArticle',
        components: {ToolLoading, EmptyView, ElFrame, ElFrameset},
        data () {
            return {
                result: {},
                loading: false
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
            scope.loading = true;
            getContent(param).then((data) => {
                if (data.status === 200) {
                    if (data.total > 0) {
                        scope.result = data.data[0];
                    }
                }
            }).catch(() => {
            }).finally(() => {
                scope.loading = false;
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
        overflow: auto;

        // 修改滚动条样式
        &::-webkit-scrollbar {
            width: 10px;
            height: 15px;
        }

        &::-webkit-scrollbar-track {
            background-color: rgb(239, 239, 239);
            border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb {
            background: #bfbfbf;
            border-radius: 10px;

            &:hover {
                background: #a5a5a5;
            }
        }

        &::-webkit-scrollbar-corner {
            background: #179a16;
        }

        .article-content {
            width: 50%;
            height: 100%;
            margin-left: 25%;

            .title {
                width: 100%;
                height: 10%;

                .top {
                    height: 70%;
                    width: 100%;
                    font-size: 1.5rem;
                    font-weight: 700;
                    line-height: 5rem;
                }

                .bottom {
                    height: 30%;
                    width: 100%;
                    font-size: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .content {
                width: 100%;
                height: 90%;
            }
        }
    }
</style>
