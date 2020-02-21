<template>
    <div class="modify-password">
        <left-side-bar current-tab='modifyPassword'></left-side-bar>
        <div class="password-frame">
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
            <tool-loading :loading="loading" category="spinner"></tool-loading>
        </div>
        <float-menu :menus="menu" @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import LeftSideBar from '../../components/public/LeftSideBar';
    import {modifyUser} from '../../service/http';
    import ToolLoading from '../../components/util/ToolLoading';
    import Reg from '../../utils/Regular';
    import FloatMenu from '../../components/util/FloatMenu';

    export default {
        name: 'ModifyPassword',
        components: {LeftSideBar, ToolLoading, FloatMenu},
        data() {
            let validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原始密码'));
                } else if (!Reg.PASSWORD.test(value)) {
                    callback(new Error('密码由6~12字母和数字组合'));
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else if (!Reg.PASSWORD.test(value)) {
                    callback(new Error('密码必须符合0-9,a-z,A-Z且长度>8,<20'));
                } else {
                    if (this.form.checkPassword !== '') {
                        this.$refs.ruleForm.validateField('checkPassword');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                menu: [
                    {
                        id: '退出',
                        image: require('../../assets/exit.svg'),
                        title: '返回首页'
                    }
                ],
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
            chooseItem(menu) {
                if (menu.id === '退出') {
                    let labelName = sessionStorage.getItem('currentLabelName');
                    this.$router.push({path: '/read/' + labelName});
                }
            },
            submit() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let params = {
                            condition: {
                                oldPassword: this.form.oldPassword,
                                password: this.form.password
                            }
                        };
                        this.loading = true;
                        modifyUser(params).then(data => {
                            if (data.status === 200) {
                                this.$message.success('修改成功');
                                let unPwd = localStorage.getItem('UN_PWD');
                                if (unPwd) {
                                    let obj = JSON.parse(unPwd);
                                    obj.password = this.form.password;
                                    localStorage.setItem('UN_PWD', JSON.stringify(obj));
                                }
                            } else {
                                this.$message.error('修改失败 ' + data.message);
                            }
                        }).catch(e => {
                            this.$message.error('修改失败 ' + e);
                        }).finally(() => {
                            this.loading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            reset() {
                let scope = this;
                scope.$refs['ruleForm'].resetFields();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .modify-password {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f8f8f9;

        .password-frame {
            float: left;
            height: 100%;
            width: calc(100% - 2rem - 1px);
            top: 0;
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
    }
</style>
