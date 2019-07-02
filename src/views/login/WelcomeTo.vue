<template>
    <div class='welcome-to'>
        <div class='login-image'>
            <img src="../../assets/login.jpg">
        </div>
        <div class='login-info'>
            <el-col>
                <el-row class='inner-image'>
                    <el-row><img src='../../assets/头像.png'></el-row>
                    <el-row>登陆</el-row>
                </el-row>
                <el-row>
                    <el-input placeholder="请输入用户名" v-model="user.name" clearable></el-input>
                    <img src='../../assets/头像inner.png'>
                </el-row>
                <el-row>
                    <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
                </el-row>
            </el-col>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'WelcomeTo',
        data () {
            return {
                user: {
                    name: '',
                    password: ''
                }
            };
        }
    };
</script>

<style lang="scss">
    @import '../../style/login/welcomeTo.scss';
</style>
