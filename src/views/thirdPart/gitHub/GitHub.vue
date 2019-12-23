<template>
    <div class='git-hub'>
        <div class="content">
            <div class='image'>
                <img src="../../../assets/github2.svg"/>
                <img src="../../../assets/rotate.svg"/>
                <img src='../../../assets/simpleBlog.svg'/>
            </div>
            <div class='info'>
                <el-form ref="form" :model="form" label-width="6.5rem">
                    <el-form-item label="Client ID">
                        <el-input v-model="form.clientId" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="Client Secret">
                        <el-input v-model="form.clientSecret" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="loginBtn" :loading="loading">确认登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import uuidv1 from 'uuid/v1';
    import Util from '../../../utils/FunctionUtil';

    export default {
        name: 'GitHub',
        data() {
            let uuid = uuidv1();
            return {
                form: {
                    clientId: 'b53228209ce0f034e769',
                    clientSecret: '8b84be6298ffe9801b76bdb59d1c1f43afe11095',
                    state: uuid,
                    scope: 'read:user',
                    getCodeURL: 'https://github.com/login/oauth/authorize',
                    getAccessTokenURL: '/github/login/oauth/access_token',
                    getUserURL: 'https://api.github.com/user',
                    redirectURL: 'http://simple-blog.xyz/#/third-part'
                },
                loading: false
            };
        },
        methods: {
            loginBtn() {
                let scope = this;
                scope.loading = true;
                let obj = {
                    client_id: scope.form.clientId,
                    state: scope.form.state,
                    redirect_uri: scope.form.redirectURL
                };
                let gitHub = {
                    clientId: scope.form.clientId,
                    clientSecret: scope.form.clientSecret,
                    getAccessTokenURL: scope.form.getAccessTokenURL,
                    getUserURL: scope.form.getUserURL,
                    type: 'gitHub'
                };
                sessionStorage.setItem('gitHub', JSON.stringify(gitHub));
                location.href = Util.GetString(scope.form.getCodeURL, obj);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .git-hub {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
            width: 25%;
            height: 70%;

            .image {
                height: 40%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                img:nth-child(1) {
                    margin-right: 3rem;
                }

                img:nth-child(3) {
                    margin-left: 3rem;
                }
            }

            .info {
                height: 60%;
                width: 100%;

                .el-form {
                    .el-button {
                        margin-right: 3.25rem;
                    }
                }
            }
        }
    }

</style>
