<template>
    <div class="third-part" :class='JSON.stringify(form) === "{}" && !loading ? "" : "exist-data"'>
        <div class='empty-info' v-if='JSON.stringify(form) === "{}" && !loading'>
            <empty-view></empty-view>
        </div>
        <div class="display-info" v-if='JSON.stringify(form) !== "{}" && !loading'>
            <h2>{{type}}用户数据</h2>
            <el-form :modal='form' label-width="7rem">
                <el-form-item v-for="(value, key) in form" :key="key" :label='key'>
                    <el-input :value="value + ''" readonly></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class='load-info' v-if='loading'>
            <tool-loading :loading='loading'></tool-loading>
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
    import {gitHubUser} from '../../service/request';

    export default {
        name: 'ThirdPart',
        components: {FloatMenu, ToolLoading, EmptyView},
        created () {
            // github 登陆时的回调
            if (location.href.indexOf('?code=') > -1 && location.href.indexOf('&state=') > -1) {
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
                let scope = this;
                scope.$router.push({path: '/'});
            },
            callback() {
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
                            }
                        }).finally(() => {
                            sessionStorage.removeItem('gitHub');
                            this.loading = false;
                        });
                    }
                }
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
