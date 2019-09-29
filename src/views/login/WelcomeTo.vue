<template>
    <div class='welcome-to'>
        <div class='login-image'>
            <img src="../../assets/login.jpg">
        </div>
        <div class='login-info'>
            <el-row class='outer-image'>
                <el-row><img src='../../assets/头像.png'></el-row>
                <el-row>登陆</el-row>
            </el-row>
            <el-row class='name-image'>
                <el-input placeholder="请输入用户名" v-model="user.name" clearable>
                    <i slot="prefix" class="el-input__icon">
                        <img src='../../assets/头像inner.png'/></i>
                </el-input>
            </el-row>
            <el-row class='password-image'>
                <el-input placeholder="请输入密码" v-model="user.password" show-password>
                    <i slot="prefix" class="el-input__icon">
                        <img src='../../assets/密码.png'/></i>
                </el-input>
            </el-row>
            <el-row class='password-info'>
                <el-col :span='12'>
                    <el-checkbox v-model="remember">记住密码</el-checkbox>
                </el-col>
                <el-col :span='12'>
                    <el-link type="primary">忘记密码?</el-link>
                </el-col>
            </el-row>
            <el-row class='login-button'>
                <el-button type="primary" @click.native='switchRouter'>登陆</el-button>
            </el-row>
            <el-row class='register'>
                <el-link type="primary">立即注册</el-link>
            </el-row>
        </div>
    </div>
</template>

<script>

    import {loginBlog} from '../../service/request';

    export default {
        name: 'WelcomeTo',
        data () {
            return {
                user: {
                    name: 'test',
                    password: '123456'
                },
                remember: false,
                loading: false
            };
        },
        methods: {
            // 表单验证
            formCheck () {
                let scope = this;
                if (!scope.user.name) {
                    scope.$msg('用户名不能为空');
                    return false;
                }
                if (scope.user.name.length > 50) {
                    scope.$msg('用户名不符合规范');
                    return false;
                }
                if (!scope.user.password) {
                    scope.$msg('密码不能为空');
                    return false;
                }
                if (scope.user.password.length > 50) {
                    scope.$msg('密码不符合规范');
                    return false;
                }
                return true;
            },
            // 登陆
            switchRouter () {
                let scope = this;
                if (!scope.formCheck()) {
                    return;
                }
                scope.loading = true;
                let param = {
                    username: scope.user.name,
                    password: scope.user.password
                };
                // 如果存在token时，先删除
                if (localStorage.token) {
                    localStorage.removeItem('token');
                }
                sessionStorage.setItem('currentPage', 'first');
                loginBlog(param).then((data) => {
                    if (data.status === 200) {
                        // 保存用户名和密码
                        if (!localStorage.getItem('username')) {
                            localStorage.setItem('username', scope.user.name);
                        }
                        if (!localStorage.getItem('password')) {
                            localStorage.setItem('password', scope.user.password);
                        }
                        // 跳转路由
                        scope.$router.push(
                            {
                                path: '/home-page',
                                name: 'homePage'
                            }
                        );
                    }
                }).catch().finally(() => {
                    scope.loading = false;
                });
            }
        }
    };
</script>

<style lang="scss">
    .welcome-to {
        height: 100%;
        width: 100%;
        background-color: #e9eaef;
        display: flex;
        align-items: center;

        .login-image {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 50%;
        }

        .login-info {
            width: 384px;
            height: 384px;
            background-color: white;

            .outer-image {
                margin: 12.8px;

                img {
                    max-height: 48px;
                    max-width: 48px;
                }
            }

            .name-image {
                .el-input {
                    width: 80%;
                    margin: 6.4px;

                    .el-input__icon {
                        img {
                            max-height: 16px;
                            max-width: 16px;
                            padding-top: 13.1px;
                        }
                    }
                }
            }

            .password-image {
                .el-input {
                    width: 80%;
                    margin: 6.4px;

                    .el-input__icon {
                        img {
                            max-height: 16px;
                            max-width: 16px;
                            padding-top: 13.1px;
                        }
                    }
                }
            }

            .password-info {
                .el-checkbox:last-child {
                    margin-right: 32px;
                }

                .el-link.el-link--primary {
                    margin-left: 48px;
                }

            }

            .login-button {
                padding-top: 40px;

                .el-button {
                    width: 80%;
                }
            }

            .register {
                padding-top: 16px;
            }
        }
    }

</style>
