<template>
    <div class='register'>
        <div class='register-first' v-if='step === "first"'>
            <h2>登陆信息</h2>
            <el-form ref='elForm' :model='form' :label-width='labelWidth'>
                <popover-item label-name='用户名' :show='warning.username.show' :title='warning.username.title'>
                    <el-input slot='popoverItem' v-model='form.username' placeholder='用户名' clearable></el-input>
                </popover-item>
                <popover-item label-name='密码' :show='warning.password.show' :title='warning.password.title'>
                    <el-input slot='popoverItem' v-model='form.password' placeholder='密码' clearable
                              show-password></el-input>
                </popover-item>
                <popover-item label-name='确认密码' :show='warning.password2.show' :title='warning.password2.title'>
                    <el-input slot='popoverItem' v-model='form.password2' placeholder='确认密码' clearable
                              show-password></el-input>
                </popover-item>
            </el-form>
            <div class='register-button'>
                <el-button>上一步</el-button>
                <el-button type="primary" @click='nextStep'>下一步</el-button>
            </div>
        </div>
        <div class='register-second' v-else-if='step === "second"'></div>
    </div>
</template>

<script>
    import PopoverItem from '../../components/public/PopoverItem';
    import {existUser} from '../../service/request';

    export default {
        name: 'Register',
        components: {PopoverItem},
        data () {
            return {
                form: {
                    username: '',
                    password: '',
                    password2: ''
                },
                labelWidth: '4rem',
                step: 'first',
                warning: {
                    username: {
                        title: '用户名必须符合0-9,a-z,A-Z且长度>8,<20',
                        show: false
                    },
                    password: {
                        title: '密码必须符合0-9,a-z,A-Z且长度>8,<20',
                        show: false
                    },
                    password2: {
                        title: '确定是输入的密码?',
                        show: false
                    }
                }
            };
        },
        watch: {
            form: {
                handler (newVal, oldVal) {
                    let scope = this;
                    let reg = /^[0-9a-zA-Z]{8,20}$/;
                    scope.warning.username.show = !reg.test(newVal.username);
                    scope.warning.password.show = !reg.test(newVal.password);
                    if (!(newVal.password && !newVal.password2)) {
                        scope.warning.password2.show = newVal.password !== newVal.password2;
                    } else {
                        scope.warning.password2.show = !!newVal.password2;
                    }
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            nextStep () {
                let scope = this;
                scope.formCheck().then(res => {
                    if (res) {
                        scope.step = 'second';
                    }
                });
            },
            formCheck () {
                let scope = this;
                let reg = /^[0-9a-zA-Z]{8,20}$/;
                return new Promise((resolve) => {
                    if (!reg.test(scope.form.username)) {
                        scope.$msg('用户名不符合规范');
                        resolve(false);
                    }
                    if (!reg.test(scope.form.password)) {
                        scope.$msg('密码不符合规范');
                        resolve(false);
                    }
                    if (scope.form.password !== scope.form.password2) {
                        scope.$msg('两次输入密码不一致');
                        resolve(false);
                    }
                    existUser({condition: {username: scope.form.username}}).then(data => {
                        scope.$response(data).then(data => {
                            if (data.data[0].isExist) {
                                scope.$msg('用户名已存在');
                                resolve(false);
                            } else {
                                resolve(true);
                            }
                        });
                    });
                });
            }
        }
    };
</script>

<style lang='scss'>
    .register {
        width: 100%;
        height: 100%;

        .register-first {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            h2 {
                position: relative;
                bottom: 15rem;
                left: 17rem;
            }

            .el-form {
                width: 28rem;
                position: relative;
                bottom: 5rem;
                float: left;
            }

            .register-button {
                position: relative;
                top: 8rem;
                right: 18rem;
            }
        }

        .register-second {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>
