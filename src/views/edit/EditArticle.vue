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
    </div>
</template>

<script>
    import {publishArticle} from '@/service/request';
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';

    export default {
        name: 'EditArticle',
        components: {ElFrame, ElFrameset},
        data () {
            return {
                content: '',
                title: ''
            };
        },
        methods: {
            publish () {
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
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                publishArticle(params).then(() => {
                }).finally(() => {
                    loading.close();
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
