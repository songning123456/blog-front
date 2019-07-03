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
                <el-button type="primary">登陆</el-button>
            </el-row>
            <el-row class='register'>
                <el-link type="primary">立即注册</el-link>
            </el-row>
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
                },
                remember: false
            };
        }
    };
</script>

<style lang="scss">
    @import '../../style/login/welcomeTo.scss';
</style>
