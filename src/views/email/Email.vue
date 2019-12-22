<template>
    <div class='email'>
        <div class="paper">
            <div class="title">
                <span>Email</span>
            </div>
            <div class='content'>
                <el-form ref="form" :model="form" :label-width=labelWidth>
                    <el-form-item label="收件人">
                        <el-input v-model="form.recipient"></el-input>
                    </el-form-item>
                    <el-form-item label="邮件主题">
                        <el-input v-model="form.subject"></el-input>
                    </el-form-item>
                </el-form>
                <el-upload
                    class="email-upload" multiple :limit="5"
                    action="" :before-upload="beforeUpload">
                    <el-link icon="el-icon-paperclip">邮件附件(不超过10M) | 支持excel,image,txt...</el-link>
                </el-upload>
                <quill-editor v-model="form.content" ref="myQuillEditor"></quill-editor>
                <el-form ref="form" :model="form" :label-width=labelWidth class="email-form">
                    <el-form-item label="发件人">
                        <el-input v-model="form.sender"></el-input>
                    </el-form-item>
                    <el-form-item label="授权码">
                        <el-input v-model="form.password" show-password></el-input>
                    </el-form-item>
                    <el-popover
                        placement="top-start"
                        title="如何设置邮箱授权码"
                        width="200"
                        trigger="hover">
                        <el-link href="https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28"
                                 target="_blank">QQ邮箱类型: @qq.com授权码
                        </el-link>
                        <br>
                        <el-link href="https://jingyan.baidu.com/article/ce09321b862ed12bff858fd9.html" target="_blank">
                            163邮箱类型: @163.com授权码
                        </el-link>
                        <el-link slot="reference" :underline="false">什么是授权码?</el-link>
                    </el-popover>
                </el-form>
                <div class="email-button">
                    <el-button type="success" plain @click.native="sendMail">发送</el-button>
                    <el-button type="info" plain @click.native='save'>保存为草稿</el-button>
                </div>
            </div>
        </div>
        <tool-loading :loading="loading" normal="spinner"></tool-loading>
        <float-menu :menus="menus" @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import FloatMenu from '../../components/util/FloatMenu';
    import uuidv1 from 'uuid/v1';
    import ToolLoading from '../../components/util/ToolLoading';
    import {sendSimpleMail, saveEmailDraft} from '../../service/request';

    export default {
        name: 'Email',
        components: {ToolLoading, FloatMenu},
        data () {
            let id = uuidv1();
            return {
                form: {
                    sender: 'sn_15850682191@163.com',
                    recipient: '1457065857@qq.com',
                    subject: 'company 测试 email 是否 有用',
                    content: 'company 测试 email 是否 有用',
                    password: '772805406sn23'
                },
                files: [],
                loading: false,
                labelWidth: '5rem',
                menus: [
                    {
                        id: id,
                        image: require('../../assets/exit.svg'),
                        title: '返回首页'
                    }
                ]
            };
        },
        methods: {
            chooseItem (menu) {
                let scope = this;
                scope.$homePage('read');
            },
            // 上传操作
            beforeUpload (file) {
                let scope = this;
                scope.files.push(file);
                return false;
            },
            checkForm () {
                let scope = this;
                // 如果用 同一个 匹配规则，第二次会报错???
                let reg1 = /^([a-zA-Z]|[0-9])(\w|\\-|_)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/g;
                let reg2 = /^([a-zA-Z]|[0-9])(\w|\\-|_)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/g;
                // let reg2 = /^([0-9A-Za-z_\\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                if (!reg1.test(scope.form.recipient)) {
                    scope.$msg('邮件收件人格式错误', 'warning');
                    return false;
                }
                if (!scope.form.subject) {
                    scope.$msg('邮件主题不能为空', 'warning');
                    return false;
                }
                if (!scope.form.content) {
                    scope.$msg('邮件文本不能为空', 'warning');
                    return false;
                }
                if (!reg2.test((scope.form.sender))) {
                    scope.$msg('邮件发件人格式错误', 'warning');
                    return false;
                }
                if (!scope.form.password) {
                    scope.$msg('发件人授权码不能为空', 'warning');
                    return false;
                }
                return true;
            },
            save () {
                let scope = this;
                if (!scope.checkForm()) {
                    return;
                }
                let form = {
                    recipient: scope.form.recipient,
                    subject: scope.form.subject,
                    content: scope.form.content,
                    sender: scope.form.sender,
                    password: scope.form.password
                };
                let param = {
                    condition: form
                };
                scope.loading = true;
                saveEmailDraft(param).then(data => {
                    if (data.status === 200) {
                        scope.$msg('邮件保存成功', 'success');
                    } else {
                        scope.$msg('邮件保存失败');
                    }
                }).finally(() => {
                    scope.loading = false;
                });
            },
            sendMail () {
                let scope = this;
                if (!scope.checkForm()) {
                    return;
                }
                let form = {
                    recipient: scope.form.recipient,
                    subject: scope.form.subject,
                    content: scope.form.content,
                    sender: scope.form.sender,
                    password: scope.form.password
                };
                let param = {
                    condition: form
                };
                scope.loading = true;
                let formData = new FormData();
                formData.append('jsonData', JSON.stringify(param));
                scope.files.forEach(item => {
                    formData.append('file', item);
                });
                sendSimpleMail(formData).then((data) => {
                    if (data.status === 200) {
                        scope.$msg('邮件发送成功', 'success');
                    } else {
                        scope.$msg('邮件发送失败');
                    }
                }).catch(() => {
                    scope.$msg('邮件发送失败');
                }).finally(() => {
                    scope.loading = false;
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .email {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f8f8f9;
        display: flex;

        .paper {
            margin: auto;
            width: 45%;
            height: 90%;
            background: white;

            .title {
                width: 100%;
                height: 10%;
                display: flex;
                font-size: large;
                font-weight: 600;
                justify-content: center;
                align-items: center;
            }

            .content {
                width: 100%;
                height: 90%;

                .el-form {
                    width: 97.5%;

                    /deep/ .el-input {
                        .el-input__inner {
                            border-top-width: 0;
                            border-left-width: 0;
                            border-right-width: 0;
                            border-bottom-width: 1px;
                            outline: medium;
                        }
                    }
                }

                .email-form {
                    margin-top: 0.2rem;
                    height: 2.2rem;

                    .el-form-item {
                        width: 40%;
                        float: left;
                        margin-bottom: unset;
                    }

                    .el-link {
                        margin-top: .6rem;
                    }
                }

                .email-upload {
                    height: 1.8rem;
                    text-align: left;
                    margin-left: 1rem;
                }

                .quill-editor {
                    width: 95%;
                    margin-left: 2.5%;
                    height: 20rem;
                    font-family: 'Avenir', Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-align: center;
                    color: #2c3e50;

                    /deep/ .ql-toolbar {
                        height: 3.4rem;
                    }

                    /deep/ .ql-container {
                        height: calc(100% - 3.4rem);
                    }
                }

                .email-button {
                    width: 98%;
                    height: 5rem;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
            }
        }
    }
</style>
