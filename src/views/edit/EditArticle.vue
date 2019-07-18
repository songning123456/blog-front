<template>
    <div class='edit-article'>
        <el-frameset :cols='"3%, *"'>
            <!--侧栏-->
            <el-frame></el-frame>
            <el-frame>
                <el-frameset :rows='"8%, *"'>
                    <!--标题-->
                    <el-frame class='title'>
                        <span><el-input v-model="title" placeholder="请输入标题"></el-input></span>
                        <span>
                           <img src='../../assets/发布.svg' @click='publish' title="发布文章"/>
                        </span>
                        <span>
                            <img src='../../assets/返回.svg' @click='goback' title='返回首页'/>
                        </span>
                    </el-frame>
                    <el-frame>
                        <mavon-editor v-model='content'></mavon-editor>
                    </el-frame>
                </el-frameset>
            </el-frame>
        </el-frameset>
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import {publishArticle} from '@/service/request';
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';
    import ToolLoading from '@/components/util/ToolLoading';

    export default {
        name: 'EditArticle',
        components: {ToolLoading, ElFrame, ElFrameset},
        data () {
            return {
                content: '',
                title: '',
                loading: false,
                throttleFn: null
            };
        },
        created () {
            let scope = this;
            scope.throttleFn = scope.throttle(scope.updateArticle, 3000, 3000);
        },
        methods: {
            // 限定时间过后不执行
            throttle (fn, delay, duration) {
                let timer = null;
                let begin = +new Date();
                return function () {
                    let scope = this;
                    let args = arguments;
                    let current = +new Date();
                    clearTimeout(timer);
                    if (current - begin >= duration) {
                        fn.apply(scope, args);
                        begin = current;
                    }
                };
            },
            publish () {
                let scope = this;
                scope.throttleFn();
            },
            updateArticle () {
                let scope = this;
                if (!scope.title) {
                    scope.$message({
                        type: 'error',
                        message: '标题不能为空!'
                    });
                    return;
                }
                if (!scope.content) {
                    scope.$message({
                        type: 'error',
                        message: '文本不能为空!'
                    });
                    return;
                }
                let form = {
                    content: scope.content,
                    title: scope.title
                };
                let params = {
                    condition: form
                };
                scope.loading = true;
                publishArticle(params).then(() => {
                }).finally(() => {
                    scope.loading = false;
                });
            },
            goback () {
                let scope = this;
                scope.$router.push({path: '/home-page/read'});
            }
        }
    };
</script>

<style lang="scss">
    .edit-article {
        height: 100%;
        width: 100%;

        .title {
            display: flex;
            align-items: center;
            background-color: #f8f8f9;

            span:nth-child(1) {
                width: 35%;
                padding-left: .5rem;
            }

            span:nth-child(2) {
                width: 40%;
                text-align: right;

                img {
                    cursor: pointer;
                }
            }

            span:nth-child(3) {
                width: 25%;
                text-align: left;
                padding-left: 2rem;

                img {
                    cursor: pointer;
                }
            }
        }

        .markdown-body {
            height: 100%;
        }
    }

</style>
