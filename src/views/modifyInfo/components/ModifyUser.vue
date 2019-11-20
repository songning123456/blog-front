<template>
    <div class='modify-user'>
        <div class="content">
            <div class="inner-title">
                <span>修改密码</span>
            </div>
            <div class="inner-content">
                <el-form :model="form" status-icon :rules="rules" ref="ruleForm" :label-width='labelWidth'>
                    <el-form-item label="原始密码" prop="oldPassword">
                        <el-input type="password" v-model="form.oldPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword">
                        <el-input type="password" v-model="form.checkPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">提交</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <tool-loading :loading="loading" normal="spinner"></tool-loading>
    </div>
</template>

<script>
    import {modifyUser} from '../../../service/request';
    import ToolLoading from '../../../components/util/ToolLoading';

    const REG = /^[0-9a-zA-Z]{8,20}$/;

    export default {
        name: 'ModifyUser',
        components: {ToolLoading},
        data () {
            let scope = this;
            let validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原始密码'));
                } else if (!REG.test(value)) {
                    callback(new Error('密码必须符合0-9,a-z,A-Z且长度>8,<20'));
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if (!REG.test(value)) {
                    callback(new Error('密码必须符合0-9,a-z,A-Z且长度>8,<20'));
                } else {
                    if (scope.form.checkPassword !== '') {
                        scope.$refs.ruleForm.validateField('checkPassword');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== scope.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    oldPassword: '',
                    password: '',
                    checkPassword: ''
                },
                loading: false,
                labelWidth: '5rem',
                rules: {
                    oldPassword: [
                        {validator: validateOldPass, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPassword: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submit () {
                let scope = this;
                scope.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let params = {
                            condition: {
                                oldPassword: scope.form.oldPassword,
                                password: scope.form.password
                            }
                        };
                        scope.loading = true;
                        modifyUser(params).then(data => {
                            if (data.status === 200) {
                                scope.$msg('修改成功', 'success');
                                localStorage.setItem('username', '');
                                localStorage.setItem('password', '');
                            } else {
                                scope.$msg('修改失败 ' + data.message);
                            }
                        }).catch(e => {
                            scope.$msg('修改失败 ' + e);
                        }).finally(() => {
                            scope.loading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            reset () {
                let scope = this;
                scope.$refs['ruleForm'].resetFields();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .modify-user {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
            width: 40%;
            height: 40%;
            background-color: white;

            .inner-title {
                height: 3rem;
                font-weight: 500;
                font-size: 1.3rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .inner-content {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                height: calc(100% - 3rem);

                .el-form {
                    width: 60%;
                    margin-top: 1.5rem;

                    .el-form-item {
                        margin-bottom: 1rem;
                    }
                }
            }
        }
    }

</style>
