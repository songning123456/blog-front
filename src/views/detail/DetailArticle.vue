<template>
    <div class='detail-article'>
        <el-frameset :cols='"20%, * , 20%"'>
            <el-frame></el-frame>
            <el-frame class='read-detail'>
                <div class='title'>
                    <div></div>
                    <div></div>
                </div>
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

                div:nth-child(1) {

                }

                div:nth-child(2) {

                }
            }

            .content {
                width: 100%;
                height: 80%;

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
