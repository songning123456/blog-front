<template>
    <div class="third-part" :class='JSON.stringify(form) === "{}" && !loading ? "" : "exist-data"'>
        <div class='empty-info' v-if='JSON.stringify(form) === "{}" && !loading'>
            <empty-view></empty-view>
        </div>
        <div class='load-info' v-if='loading'>
            <tool-loading :loading='loading' category="spinner"></tool-loading>
        </div>
        <float-menu :menus='menus' @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import axios from 'axios';
    import EmptyView from '../../components/util/EmptyView';
    import ToolLoading from '../../components/util/ToolLoading';
    import FloatMenu from '../../components/util/FloatMenu';
    import uuidv1 from 'uuid/v1';
    import {gitHubUser, loginBlog} from '../../service/http';

    export default {
        name: 'ThirdPart',
        components: {FloatMenu, ToolLoading, EmptyView},
        activated () {
            // github 登陆时的回调
            if (location.href.indexOf('?code=') > -1 && location.href.indexOf('&state=') > -1) {
                this.loading = true;
                let codeStart = location.href.indexOf('?code=');
                let codeEnd = location.href.indexOf('&state=');
                let code = location.href.slice(codeStart + 6, codeEnd);
                let param = JSON.parse(sessionStorage.getItem('gitHub'));
                param.code = code;
                sessionStorage.setItem('gitHub', JSON.stringify(param));
                let deleteEnd = location.href.indexOf('#');
                let url = location.href.slice(0, codeStart) + '#/' + location.href.slice(deleteEnd + 2);
                location.href = url;
            } else {
                this.callback();
            }
        },
        data () {
            let id = uuidv1();
            return {
                form: {},
                type: '',
                loading: false,
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
                this.$router.push({path: '/'});
            },
            callback () {
                // 回调之后再次进入 获取信息
                let param = JSON.parse(sessionStorage.getItem('gitHub'));
                if (Object.keys(param).length > 0 && param.clientId && param.clientSecret && param.code && param.getProxyAccessTokenURL && param.getAccessTokenURL) {
                    this.loading = true;
                    this.type = param.type;
                    // 通过前端代理直接请求， 解决跨域问题
                    if (param.frontOrServer === 'front') {
                        let obj = {
                            client_id: param.clientId,
                            client_secret: param.clientSecret,
                            code: param.code
                        };
                        axios.post(param.getProxyAccessTokenURL, obj).then((response) => {
                            let accessToken = response.data.split('&')[0].slice(13);
                            axios.get(param.getUserURL, {params: {access_token: accessToken}}).then(response => {
                                this.form = response.data;
                            }).finally(() => {
                                sessionStorage.removeItem('gitHub');
                                this.loading = false;
                            });
                        }).catch(error => {
                            console.error(error);
                        });
                    } else if (param.frontOrServer === 'server') {
                        // 通过后台请求，无跨域问题
                        let params = {
                            clientId: param.clientId,
                            clientSecret: param.clientSecret,
                            code: param.code,
                            accessTokenURL: param.getAccessTokenURL,
                            userURL: param.getUserURL
                        };
                        gitHubUser({condition: params}).then(data => {
                            if (data.status === 200) {
                                this.form = data.dataExt;
                                this.login();
                            }
                        }).finally(() => {
                            sessionStorage.removeItem('gitHub');
                            this.loading = false;
                        });
                    }
                }
            },
            login () {
                let param = new FormData();
                let username = 'gitHubUn' + this.form.id;
                let password = 'gitHubPd' + this.form.id;
                param.append('username', username);
                param.append('password', password);
                // 如果存在token时，先删除
                if (localStorage.token) {
                    localStorage.removeItem('token');
                }
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
                    this.loading = false;
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .third-part {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        &.exist-data {
            background-color: #f8f8f9;
        }

        .empty-info {
            width: 100%;
            height: 100%;
        }

        .display-info {
            overflow: auto;
            width: 40%;
            height: 90%;
            background: white;

            .el-form {
                width: 95%;
            }
        }

        .load-info {
            width: 100%;
            height: 100%;
        }
    }
</style>
