<template>
    <div class='email-info'>
        <div class='email-head'>
            联系 && 交流
        </div>
        <el-form ref='emailForm' :model='emailForm' label-width='8rem'>
            <el-form-item v-for='(item, index) in emailInfo' :key='index' :label='item.key'>
                <el-input v-model='emailForm[item.value]'
                          :type='item.key === "邮件内容" ? "textarea" : "text"'></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" class='email-tail' @click='sendMail'>Send</el-button>
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import {sendSimpleMail} from '../../../service/request';
    import ToolLoading from '../../../components/util/ToolLoading';

    export default {
        name: 'EmailInfo',
        components: {ToolLoading},
        data() {
            return {
                emailInfo: [
                    {key: '发件人', value: 'sender'},
                    {key: '收件人', value: 'recipient'},
                    {key: '邮件主题', value: 'subject'},
                    {key: '邮件内容', value: 'content'},
                    {key: '邮件附件', value: ''}
                ],
                emailForm: {
                    sender: '',
                    recipient: '',
                    subject: '',
                    content: ''
                },
                loading: false
            };
        },
        methods: {
            checkForm() {
                let scope = this;
                // let reg = /^([0-9A-Za-z_\\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                let reg = /^([a-zA-Z]|[0-9])(\w|\\-|_)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/g;
                if (!scope.emailForm.sender) {
                    scope.$msg('邮件发件人不能为空', 'warning');
                    return false;
                } else if (!reg.test(scope.emailForm.sender)) {
                    scope.$msg('邮件格式错误', 'warning');
                    return false;
                } else if (!scope.emailForm.subject) {
                    scope.$msg('邮件主题不能为空', 'warning');
                    return false;
                } else if (!scope.emailForm.content) {
                    scope.$msg('邮件文本不能为空', 'warning');
                    return false;
                }
                return true;
            },
            sendMail() {
                let scope = this;
                if (!scope.checkForm()) {
                    return;
                }
                let form = {
                    sender: scope.emailForm.sender,
                    recipient: scope.emailForm.recipient,
                    subject: scope.emailForm.subject,
                    content: scope.emailForm.content
                };
                let param = {
                    condition: form
                };
                scope.loading = true;
                sendSimpleMail(param).then((data) => {
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
    .email-info {
        width: 100%;
        height: 100%;

        .email-head {
            height: 2.5rem;
            width: 20rem;
            background: orange;
            line-height: 2.9rem;
            float: left;
            font-size: 1.7rem;
            color: white;
            margin: 1rem 0;
            border-radius: .2rem;
        }

        .el-form {
            clear: both;
            width: 70%;
            float: left;
        }

        .email-tail {
            width: 12rem;
            float: left;
            font-size: 1.7rem;
            color: white;
            clear: both;
            margin-left: 8rem;
        }
    }

</style>
