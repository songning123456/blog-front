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
                            <el-button type="primary" @click.native='publish'>发布文章</el-button>
                        </span>
                        <span>
                            <el-button type="primary" @click.native='goback'>返回首页</el-button>
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
            throttle2 (fn, delay, duration) {
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
                    } else {
                        timer = setTimeout(function () {
                            fn.apply(scope, args);
                        }, delay);
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
            }

            span:nth-child(3) {
                width: 25%;
                text-align: left;
                padding-left: 2rem;
            }
        }

        .markdown-body {
            height: 100%;
        }
    }

</style>
