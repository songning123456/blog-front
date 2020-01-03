<template>
    <div class='welcome-to'>
        <div class='frame-set'>
            <div class='left-frame'>
                <img src="../../assets/login.jpg"/>
            </div>
            <div class='right-frame'>
                <div class="frame-center">
                    <img src='../../assets/loginAvatar.svg'/>
                    <div class='login-txt'>登陆</div>
                    <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="user.name" clearable
                              @keyup.enter.native='switchRouter'></el-input>
                    <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="user.password" show-password
                              @keyup.enter.native='switchRouter'></el-input>
                    <div class="operate-password">
                        <el-checkbox v-model="remember">记住密码</el-checkbox>
                        <div class="forget-password" @click="forgotPassword">忘记密码?</div>
                    </div>
                    <el-button type="primary" @click.native='switchRouter' :loading="loading">登陆</el-button>
                    <div class="register" @click='register'>立即注册</div>
                    <img class='github' src="../../assets/github.svg" @click='jumpGitHub'/>
                </div>
            </div>
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
        activated () {
            let scope = this;
            scope.windowResize();
            document.addEventListener('keydown', scope.handleKeyDown);
            document.addEventListener('keyup', scope.handleKeyUp);
            window.addEventListener('resize', scope.windowResize);
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
        deactivated () {
            let scope = this;
            document.removeEventListener('keydown', scope.handleKeyDown);
            document.removeEventListener('keyup', scope.handleKeyUp);
            window.removeEventListener('resize', scope.windowResize);
        },
        methods: {
            windowResize () {
                let height = document.body.offsetHeight || document.body.clientHeight;
                this.$nextTick(() => {
                    // 1920 * 1080
                    let doc = document.getElementsByClassName('frame-center')[0];
                    if (height < 1000) {
                        doc.style.height = '74%';
                    } else if (height < 800) {
                        // 1366 * 768
                        doc.style.height = '70%';
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
                            sessionStorage.setItem('username', scope.user.name);
                        }
                        // 跳转路由
                        scope.$router.push(
                            {
                                path: '/read',
                                name: 'read'
                            }
                        );
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
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #e9eaef;

        .frame-set {
            width: 70%;
            height: 66%;

            .left-frame {
                width: 50%;
                height: 100%;
                float: left;
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }

            .right-frame {
                width: 50%;
                height: 100%;
                float: left;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .frame-center {
                    width: 60%;
                    height: 85%;
                    float: left;
                    padding: 1.5rem;
                    box-sizing: border-box;
                    background: white;

                    .login-txt {
                        font-size: 1.5em;
                        font-weight: bold;
                    }

                    .el-input {
                        margin-top: 1rem;
                    }

                    .operate-password {
                        margin: 1rem 0;

                        .el-checkbox {
                            width: 50%;
                            font-size: .7rem;
                            display: inline-flex;
                            align-items: center;
                            justify-content: flex-start;
                        }

                        .forget-password {
                            font-size: .7rem;
                            width: 50%;
                            float: right;
                            text-align: right;

                            &:hover {
                                color: #409EFF;
                                cursor: pointer;
                                text-decoration: underline;
                            }
                        }
                    }

                    .el-button {
                        display: block;
                        width: 80%;
                        margin-left: 10%;
                    }

                    .register {
                        font-size: .7rem;
                        margin: 1rem 0;

                        &:hover {
                            color: #409EFF;
                            cursor: pointer;
                            text-decoration: underline;
                        }
                    }

                    .github:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }

</style>
