<template>
    <div class='edit-article'>
        <div class="title">
            <div class="first">
                <el-form :model='form' :label-width="labelWidth">
                    <el-form-item label='文章标题'>
                        <el-input v-model="form.title" placeholder='请输入文章标题' clearable></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="success" plain @click="dialog.label = true" icon="el-icon-price-tag">选择标签</el-button>
            </div>
            <div class="second">
                <el-button type="primary" plain @click="publishArticle" icon="el-icon-thumb">发布</el-button>
                <el-button type="info" plain @click="$homePage('read')" icon="el-icon-position">返回</el-button>
            </div>
        </div>
        <mavon-editor v-model='form.content' @imgAdd='addImage' @imgDel='delImage' ref="md"></mavon-editor>
        <el-dialog title='标签' :visible.sync='dialog.label' width='50%' :close-on-click-modal='false'
                   :before-close='cancelLabel' class='summary-dialog' top="8vh">
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
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import FloatMenu from '../../components/util/FloatMenu';
    import MultiLabel from '../../components/public/MultiLabel';
    import ToolLoading from '../../components/util/ToolLoading';
    import Config from '../../utils/ConfigUtil';
    import {publishArticle, getBloggerInfo, saveImage, deleteImage} from '../../service/request';

    export default {
        name: 'EditArticle',
        components: {ToolLoading, MultiLabel, FloatMenu},
        data () {
            return {
                labelWidth: '5rem',
                dialog: {
                    label: false
                },
                img: [],
                form: {
                    title: '',
                    content: '',
                    labelName: '',
                    labelFuzzyName: '',
                    author: ''
                },
                loading: false
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
            formCheck (type) {
                let scope = this;
                if (type === 1 && !scope.form.title) {
                    scope.$msg('标题不能为空');
                    return false;
                }
                if (type === 2 && !scope.form.labelName) {
                    scope.$msg('标签不能为空');
                    return false;
                }
                if (type === 3 && !scope.form.content) {
                    scope.$msg('正文不能为空');
                    return false;
                }
                return true;
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
            addImage (pos, file) {
                let scope = this;
                let formData = new FormData();
                formData.append('file', file, file.filename);
                formData.append('dir', 'article');
                saveImage(formData).then(data => {
                    if (data.status === 200 && data.total > 0) {
                        let src = Config.getImageOriginal() + data.data[0].imageSrc;
                        scope.$refs['md'].$img2Url(pos, src);
                    }
                });
            },
            delImage (params) {
                let scope = this;
                let url = params[0];
                let imageName = url.split('\\')[5];
                deleteImage({condition: {imageName: imageName}}).then(data => {
                    if (data.status === 200) {
                        scope.$msg('删除图片成功', 'success');
                    } else {
                        scope.$msg(data.message);
                    }
                });
            },
            publishArticle () {
                let scope = this;
                if (!scope.formCheck(1)) {
                    return;
                }
                if (!scope.formCheck(2)) {
                    return;
                }
                if (!scope.formCheck(3)) {
                    return;
                }
                scope.loading = true;
                let form = {
                    title: scope.form.title,
                    content: scope.form.content,
                    readTimes: 0,
                    author: scope.form.author,
                    kinds: scope.form.labelName
                };
                let params = {
                    condition: form
                };
                publishArticle(params).then(() => {
                    scope.$msg('文章发布成功!', 'success');
                }).finally(() => {
                    scope.loading = false;
                    scope.form = {};
                });
            },
            // 根据username 获取 author, 发布文章时直接使用
            getBlogger () {
                let scope = this;
                getBloggerInfo({condition: {}}).then((data) => {
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
        position: relative;

        .title {
            height: 8%;
            width: 100%;
            background: url("../../assets/articleBg.png");

            .first {
                width: 50%;
                height: 100%;
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;

                .el-form {
                    padding-right: 1rem;

                    .el-form-item {
                        margin-bottom: unset;
                    }
                }
            }

            .second {
                width: 50%;
                height: 100%;
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .markdown-body {
            height: 92%;
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
                            height: 30rem;
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
