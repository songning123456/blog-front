<template>
    <div class='edit-article'>
        <mavon-editor v-model='form.content'></mavon-editor>
        <el-dialog title='标题简介' :visible.sync='dialog.title' width='25%' top='24vh' :close-on-click-modal='false'
                   :before-close='cancelTitle' class='title-dialog'>
            <el-form :model='form' :label-width="labelWidth">
                <el-form-item label='文章标题'>
                    <el-input v-model="form.title" placeholder='请输入文章标题'></el-input>
                </el-form-item>
                <el-form-item label="文章简介">
                    <el-input type='textarea' v-model='form.summary' placeholder='请输入文章简介'></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer'>
                <el-button @click='cancelTitle'>取消</el-button>
                <el-button type="primary" @click='sureTitle'>确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title='标签' :visible.sync='dialog.label' width='50%' :close-on-click-modal='false'
                   :before-close='cancelLabel' class='summary-dialog' top="5vh">
            <multi-label @chosen='(arg0) => form.labelName = arg0' ref='multiLabel'></multi-label>
            <span slot='footer'>
                <el-input placeholder='搜索标签' v-model='form.labelFuzzyName' @keyup.enter.native='queryLabel'>
                    <i slot="suffix" class='el-icon-search'></i>
                </el-input>
                <el-input placeholder='请选择标签' v-model='form.labelName' :disabled='true'></el-input>
                <el-button @click='cancelLabel'>取消</el-button>
                <el-button type="primary" @click='sureLabel'>确定</el-button>
            </span>
        </el-dialog>
        <float-menu :menus='menus' @itemClick='chooseItem'></float-menu>
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import FloatMenu from '../../components/util/FloatMenu';
    import uuidv1 from 'uuid/v1';
    import MultiLabel from '../../components/public/MultiLabel';
    import ToolLoading from '../../components/util/ToolLoading';
    import {publishArticle, getBloggerInfo} from '../../service/request';

    export default {
        name: 'EditArticle',
        components: {ToolLoading, MultiLabel, FloatMenu},
        data () {
            let id1 = uuidv1();
            let id2 = uuidv1();
            let id3 = uuidv1();
            let id4 = uuidv1();
            return {
                labelWidth: '4rem',
                dialog: {
                    title: false,
                    label: false
                },
                form: {
                    title: '',
                    summary: '',
                    content: '',
                    labelName: '',
                    labelFuzzyName: '',
                    author: ''
                },
                loading: false,
                menus: [
                    {
                        id: id1,
                        image: require('../../assets/edit/article.svg'),
                        title: '标题简介'
                    },
                    {
                        id: id2,
                        image: require('../../assets/edit/label.svg'),
                        title: '文章标签'
                    },
                    {
                        id: id3,
                        image: require('../../assets/edit/publish.svg'),
                        title: '发布文章'
                    }, {
                        id: id4,
                        image: require('../../assets/edit/return.svg'),
                        title: '返回首页'
                    }]
            };
        },
        mounted () {
            let scope = this;
            let doc = document.getElementsByClassName('el-input__suffix')[0];
            doc.addEventListener('click', scope.queryLabel);
            scope.getBlogger();
        },
        destroyed () {
            let scope = this;
            let doc = document.getElementsByClassName('el-input__suffix')[0];
            doc.removeEventListener('click', scope.queryLabel);
        },
        methods: {
            chooseItem (menu) {
                let scope = this;
                switch (menu.title) {
                    case '标题简介':
                        scope.dialog.title = true;
                        break;
                    case '文章标签':
                        scope.dialog.label = true;
                        break;
                    case '发布文章':
                        scope.publishArticle();
                        break;
                    case '返回首页':
                        scope.$homePage('read');
                        break;
                    default:
                        break;
                }
            },
            formCheck (type) {
                let scope = this;
                if (type === 1 && !scope.form.title) {
                    scope.$msg('标题不能为空');
                    return false;
                }
                if (type === 1 && !scope.form.summary) {
                    scope.$msg('摘要不能为空');
                    return false;
                }
                if (type === 2 && !scope.form.labelName) {
                    scope.$msg('标签不能为空');
                    return false;
                }
                return true;
            },
            sureTitle () {
                let scope = this;
                if (!scope.formCheck(1)) {
                    return;
                }
                scope.dialog.title = false;
            },
            cancelTitle () {
                let scope = this;
                scope.dialog.title = false;
                setTimeout(() => {
                    scope.form.title = '';
                    scope.form.summary = '';
                }, 300);
            },
            sureLabel () {
                let scope = this;
                if (!scope.formCheck(2)) {
                    return;
                }
                scope.dialog.label = false;
            },
            cancelLabel () {
                let scope = this;
                scope.dialog.label = false;
                setTimeout(() => {
                    scope.form.labelFuzzyName = '';
                    scope.form.labelName = '';
                }, 300);
            },
            queryLabel () {
                let scope = this;
                scope.$refs['multiLabel'].query(scope.form.labelFuzzyName);
            },
            publishArticle () {
                let scope = this;
                if (!scope.formCheck(1) || !scope.formCheck(2)) {
                    return;
                }
                scope.loading = true;
                let form = {
                    title: scope.form.title,
                    summary: scope.form.summary,
                    content: scope.form.content,
                    readTimes: 0,
                    author: scope.form.author,
                    kinds: scope.form.labelName
                };
                let params = {
                    condition: form
                };
                publishArticle(params).then(() => {
                    scope.$msg('文章发布成功!');
                }).finally(() => {
                    scope.loading = false;
                    scope.form = {};
                });
            },
            // 根据username 获取 author, 发布文章时直接使用
            getBlogger () {
                let scope = this;
                let form = {
                    username: localStorage.getItem('username')
                };
                let param = {
                    condition: form
                };
                getBloggerInfo(param).then((data) => {
                    scope.$response(data, '获取作者信息').then(data => {
                        scope.form.author = data.data[0].author;
                    });
                });
            }
        }
    };
</script>

<style lang='scss' scoped>
    .edit-article {
        width: 100%;
        height: 100%;

        .markdown-body {
            height: 100%;
        }

        .title-dialog {
            &.el-dialog__wrapper {
                /deep/ .el-dialog {
                    /deep/ .el-dialog__body {
                        padding: 15px 10px 0 10px;
                    }

                    /deep/ .el-dialog__footer {
                        padding: 0 20px 20px;
                    }
                }
            }
        }

        .summary-dialog {
            overflow: hidden;

            &.el-dialog__wrapper {
                /deep/ .el-dialog {
                    /deep/ .el-dialog__body {
                        .multi-label {
                            height: 34rem;
                            overflow: auto;

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

                            .single-label {
                                margin-left: 1.8rem;
                            }
                        }
                    }

                    /deep/ .el-dialog__footer {
                        padding: 0 20px 20px;

                        .el-input {
                            width: 39%;

                            .el-input__suffix {
                                width: 6%;
                                line-height: 2rem;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }

        }
    }
</style>
