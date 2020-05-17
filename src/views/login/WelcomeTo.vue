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
                              @keyup.enter.native='Login' @input='nameInput'></el-input>
                    <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="user.password" show-password
                              @keyup.enter.native='Login' @input='passwordInput'></el-input>
                    <div class="operate-password">
                        <el-checkbox v-model="remember" @change='checkbox'>记住密码</el-checkbox>
                        <div class="forget-password" @click="forgotPassword">忘记密码?</div>
                    </div>
                    <el-button type="primary" @click.native='Login' :loading="loading.normal">登陆
                    </el-button>
                    <div class="register" @click='$router.push({path: "/register"})'>立即注册</div>
                    <img class='github' src="../../assets/github.svg" @click='jumpGitHub'/>
                </div>
            </div>
        </div>
        <el-link type="primary" href='http://beian.miit.gov.cn' target="_blank">苏ICP备19071001号-1</el-link>
    </div>
</template>

<script>

    import {loginBlog} from '../../service/http';
    import uuidv1 from 'uuid/v1';
    import Util from '../../utils/Common';
    import Reg from '../../utils/Regular';

    let keyFlag = true;

    export default {
        name: 'WelcomeTo',
        data() {
            let uuid = uuidv1();
            return {
                user: {
                    name: '',
                    password: ''
                },
                remember: false,
                notify: null,
                loading: {
                    normal: false
                },
                gitHubForm: {
                    clientId: 'b53228209ce0f034e769',
                    clientSecret: '8b84be6298ffe9801b76bdb59d1c1f43afe11095',
                    state: uuid,
                    scope: 'read:user',
                    getCodeURL: 'https://github.com/login/oauth/authorize',
                    getProxyAccessTokenURL: '/github/login/oauth/access_token', // 前端代理
                    getAccessTokenURL: 'https://github.com/login/oauth/access_token',
                    getUserURL: 'https://api.github.com/user',
                    redirectURL: 'http://blog.sonin.cn/#/third-part',
                    frontOrServer: 'server' // 用前端还是后端去请求
                }
            };
        },
        activated() {
            // 绑定信息
            this.windowResize();
            document.addEventListener('keydown', this.handleKeyDown);
            document.addEventListener('keyup', this.handleKeyUp);
            window.addEventListener('resize', this.windowResize);
            // 如果存在token时，先删除
            if (localStorage.token) {
                localStorage.removeItem('token');
            }
            // 判断状态
            let unPwd = localStorage.getItem('UN_PWD');
            this.remember = !!unPwd;
            if (unPwd) {
                let obj = JSON.parse(unPwd);
                this.user.name = obj.username;
                this.user.password = obj.password;
            }
            // 提示信息
            this.notify = this.$notify.info({
                title: '提示',
                message: this.$createElement('p', null, [
                    this.$createElement('span', null, [
                        '如未注册,请尝试',
                        this.$createElement('strong', {
                            on: {
                                click: () => {
                                    this.user.name = 'tourists';
                                    this.user.password = 'tourists1234';
                                    let unPwd = localStorage.getItem('UN_PWD');
                                    if (unPwd) {
                                        let obj = {
                                            username: this.user.name,
                                            password: this.user.password
                                        };
                                        localStorage.setItem('UN_PWD', JSON.stringify(obj));
                                    }
                                }
                            },
                            class: 'tourist'
                        }, '游客'),
                        '登录'
                    ])
                ]),
                dangerouslyUseHTMLString: true,
                duration: 0
            });
        },
        deactivated() {
            // 关闭提示信息
            this.notify.close();
            document.removeEventListener('keydown', this.handleKeyDown);
            document.removeEventListener('keyup', this.handleKeyUp);
            window.removeEventListener('resize', this.windowResize);
        },
        methods: {
            windowResize() {
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
            formCheck() {
                if (!this.user.name) {
                    this.$message.warning('用户名不能为空');
                    return false;
                }
                if (!Reg.USERNAME.test(this.user.name)) {
                    this.$message.warning('用户名不符合规范');
                    return false;
                }
                if (!this.user.password) {
                    this.$message.warning('密码不能为空');
                    return false;
                }
                if (!Reg.PASSWORD.test(this.user.password)) {
                    this.$message.warning('密码不符合规范');
                    return false;
                }
                return true;
            },
            jumpGitHub() {
                let obj = {
                    client_id: this.gitHubForm.clientId,
                    state: this.gitHubForm.state,
                    redirect_uri: this.gitHubForm.redirectURL
                };
                let gitHub = {
                    clientId: this.gitHubForm.clientId,
                    clientSecret: this.gitHubForm.clientSecret,
                    getAccessTokenURL: this.gitHubForm.getAccessTokenURL,
                    getUserURL: this.gitHubForm.getUserURL,
                    frontOrServer: this.gitHubForm.frontOrServer,
                    getProxyAccessTokenURL: this.gitHubForm.getProxyAccessTokenURL,
                    type: 'gitHub'
                };
                sessionStorage.setItem('gitHub', JSON.stringify(gitHub));
                location.href = Util.GetString(this.gitHubForm.getCodeURL, obj);
            },
            // 登陆
            Login() {
                if (!this.formCheck()) {
                    return;
                }
                this.loading.normal = true;
                let param = new FormData();
                param.append('username', this.user.name);
                param.append('password', this.user.password);
                // 登陆时默认进入阅读
                loginBlog(param).then((data) => {
                    if (data.status === 200) {
                        // 跳转路由
                        this.$router.push(
                            {
                                path: '/read',
                                name: 'read'
                            }
                        );
                    }
                }).catch(e => {
                    console.error('错误用户: ', e);
                    this.$message.error('~~~请输入正确用户~~~');
                }).finally(() => {
                    this.loading.normal = false;
                });
            },
            nameInput(newVal) {
                let unPwd = localStorage.getItem('UN_PWD');
                if (unPwd) {
                    let obj = JSON.parse(unPwd);
                    obj.username = newVal;
                    localStorage.setItem('UN_PWD', JSON.stringify(obj));
                }
            },
            passwordInput(newVal) {
                let unPwd = localStorage.getItem('UN_PWD');
                if (unPwd) {
                    let obj = JSON.parse(unPwd);
                    obj.password = newVal;
                    localStorage.setItem('UN_PWD', JSON.stringify(obj));
                }
            },
            checkbox(newVal) {
                if (newVal) {
                    let unPwd = {
                        username: this.user.name,
                        password: this.user.password
                    };
                    localStorage.setItem('UN_PWD', JSON.stringify(unPwd));
                } else {
                    localStorage.removeItem('UN_PWD');
                }
            },
            forgotPassword() {
                this.$message.error('暂未开通此功能');
            },
            handleKeyDown(e) {
                let key = window.event.keyCode ? window.event.keyCode : window.event.which;
                if (key === 13) {
                    if (keyFlag) {
                        this.Login();
                        keyFlag = -false;
                    }
                    e.preventDefault();
                }
            },
            handleKeyUp(e) {
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
        position: relative;

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
                        width: 80%;
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

        .el-link {
            position: absolute;
            right: 5rem;
            bottom: 2rem;
        }
    }

    .tourist {
        color: #409EFF;
        padding: 0 .15rem;

        &:hover {
            cursor: pointer;
        }
    }

</style>
