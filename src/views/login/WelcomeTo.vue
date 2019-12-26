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
                <el-input placeholder="请输入用户名" v-model="user.name" clearable @keyup.enter.native='switchRouter'>
                    <i slot="prefix" class="el-input__icon">
                        <img src='../../assets/头像inner.png'/></i>
                </el-input>
            </el-row>
            <el-row class='password-image'>
                <el-input placeholder="请输入密码" v-model="user.password" show-password @keyup.enter.native='switchRouter'>
                    <i slot="prefix" class="el-input__icon">
                        <img src='../../assets/密码.png'/></i>
                </el-input>
            </el-row>
            <el-row class='password-info'>
                <el-col :span='12'>
                    <el-checkbox v-model="remember">记住密码</el-checkbox>
                </el-col>
                <el-col :span='12'>
                    <el-link type="primary" @click="forgotPassword">忘记密码?</el-link>
                </el-col>
            </el-row>
            <el-row class='login-button'>
                <el-button type="primary" @click.native='switchRouter' :loading="loading">登陆</el-button>
            </el-row>
            <el-row class='register'>
                <el-link type="primary" @click='register'>立即注册</el-link>
            </el-row>
            <el-row class="third-party">
                <el-col :span="8">
                    <img src="../../assets/github.svg" @click='jumpGitHub'/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>

    import {loginBlog} from '../../service/request';
    import uuidv1 from 'uuid/v1';
    import Util from '../../utils/FunctionUtil';
    import Reg from '../../utils/RegularUtil';

    let keyFlag = true;

    export default {
        name: 'WelcomeTo',
        data () {
            let uuid = uuidv1();
            return {
                user: {
                    name: '',
                    password: ''
                },
                remember: false,
                loading: false,
                gitHubForm: {
                    clientId: 'b53228209ce0f034e769',
                    clientSecret: '8b84be6298ffe9801b76bdb59d1c1f43afe11095',
                    state: uuid,
                    scope: 'read:user',
                    getCodeURL: 'https://github.com/login/oauth/authorize',
                    getProxyAccessTokenURL: '/github/login/oauth/access_token', // 前端代理
                    getAccessTokenURL: 'https://github.com/login/oauth/access_token',
                    getUserURL: 'https://api.github.com/user',
                    redirectURL: 'http://simple-blog.xyz/#/third-part',
                    frontOrServer: 'server' // 用前端还是后端去请求
                }
            };
        },
        created () {
            let scope = this;
            scope.windowResize();
            document.addEventListener('keydown', scope.handleKeyDown);
            document.addEventListener('keyup', scope.handleKeyUp);
            window.addEventListener('resize', scope.windowResize);
        },
        destroyed () {
            let scope = this;
            document.removeEventListener('keydown', scope.handleKeyDown);
            document.removeEventListener('keyup', scope.handleKeyUp);
            window.removeEventListener('resize', scope.windowResize);
        },
        mounted () {
            let scope = this;
            // 回到登录页面时, 判断是否记住密码
            if (localStorage.getItem('username')) {
                scope.user.name = localStorage.getItem('username');
            }
            if (localStorage.getItem('password')) {
                scope.user.password = localStorage.getItem('password');
            }
            if (localStorage.getItem('username') && localStorage.getItem('password')) {
                scope.remember = true;
            }
        },
        methods: {
            windowResize () {
                let width = document.body.offsetWidth || document.body.clientWidth;
                this.$nextTick(() => {
                    // 1920 * 1080
                    let doc = document.getElementsByClassName('login-info')[0];
                    if (width > 1800) {
                        doc.style.height = '20rem';
                    } else if (width > 1000) {
                        // 1366 * 768
                        doc.style.height = '24rem';
                    }
                });
            },
            // 表单验证
            formCheck () {
                let scope = this;
                if (!scope.user.name) {
                    scope.$msg('用户名不能为空');
                    return false;
                }
                if (!Reg.USERNAME.test(scope.user.name)) {
                    scope.$msg('用户名不符合规范');
                    return false;
                }
                if (!scope.user.password) {
                    scope.$msg('密码不能为空');
                    return false;
                }
                if (!Reg.PASSWORD.test(scope.user.password)) {
                    scope.$msg('密码不符合规范');
                    return false;
                }
                return true;
            },
            jumpGitHub () {
                let scope = this;
                // scope.$router.push({path: '/git-hub'});
                let obj = {
                    client_id: scope.gitHubForm.clientId,
                    state: scope.gitHubForm.state,
                    redirect_uri: scope.gitHubForm.redirectURL
                };
                let gitHub = {
                    clientId: scope.gitHubForm.clientId,
                    clientSecret: scope.gitHubForm.clientSecret,
                    getAccessTokenURL: scope.gitHubForm.getAccessTokenURL,
                    getUserURL: scope.gitHubForm.getUserURL,
                    frontOrServer: scope.gitHubForm.frontOrServer,
                    getProxyAccessTokenURL: scope.gitHubForm.getProxyAccessTokenURL,
                    type: 'gitHub'
                };
                sessionStorage.setItem('gitHub', JSON.stringify(gitHub));
                location.href = Util.GetString(scope.gitHubForm.getCodeURL, obj);
            },
            // 登陆
            switchRouter () {
                let scope = this;
                if (!scope.formCheck()) {
                    return;
                }
                scope.loading = true;
                let param = new FormData();
                param.append('username', scope.user.name);
                param.append('password', scope.user.password);
                // 如果存在token时，先删除
                if (localStorage.token) {
                    localStorage.removeItem('token');
                }
                // 登陆时默认进入阅读
                sessionStorage.setItem('homePage', 'read');
                loginBlog(param).then((data) => {
                    if (data.status === 200) {
                        // 保存用户名和密码
                        if (scope.remember) {
                            localStorage.setItem('username', scope.user.name);
                            localStorage.setItem('password', scope.user.password);
                        } else {
                            // 如果不记住密码， 则删除 记住密码时保存的 用户名 和 密码
                            if (localStorage.getItem('username')) {
                                localStorage.removeItem('username');
                            }
                            if (localStorage.getItem('password')) {
                                localStorage.removeItem('password');
                            }
                            // 临时保存 用户名(home-page 获取个人头像)
                            sessionStorage.setItem('username', scope.user.name);
                        }
                        if (scope.$route.query.redirect) {
                            scope.$router.push(scope.$route.query.redirect);
                        } else {
                            // 跳转路由
                            scope.$router.push(
                                {
                                    path: '/home-page',
                                    name: 'homePage'
                                }
                            );
                        }
                    }
                }).catch(e => {
                    console.error('错误用户: ', e);
                    scope.$msg('~~~请输入正确用户~~~');
                }).finally(() => {
                    scope.loading = false;
                });
            },
            forgotPassword () {
                let scope = this;
                scope.$msg('暂未开通此功能');
            },
            register () {
                let scope = this;
                scope.$router.push({path: '/register'});
            },
            handleKeyDown (e) {
                let scope = this;
                let key = window.event.keyCode ? window.event.keyCode : window.event.which;
                if (key === 13) {
                    if (keyFlag) {
                        scope.switchRouter();
                        keyFlag = -false;
                    }
                    e.preventDefault();
                }
            },
            handleKeyUp (e) {
                let key = window.event.keyCode ? window.event.keyCode : window.event.which;
                if (key === 13) {
                    keyFlag = true;
                    e.preventDefault();
                }
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
            height: 20rem;
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
                            padding-top: 0.6rem;
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
                            padding-top: 0.6rem;
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

            .third-party {
                padding: .5rem 0;

                img:hover {
                    cursor: pointer;
                }
            }
        }
    }

</style>
