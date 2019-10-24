<template>
    <div class='register'>
        <div class='register-first' v-if='step === 1'>
            <h2>登陆信息</h2>
            <el-form :model='form' :label-width='labelWidth'>
                <popover-item v-for='(item, index) in menu[0]' :key='index' :label-name='item.label'
                              :show='warning[item.value].show'
                              :title='warning[item.value].title'>
                    <el-input slot='popoverItem' v-model='form[item.value]' :placeholder='item.label'
                              clearable="" :show-password="item.value.indexOf('password') > -1"></el-input>
                </popover-item>
            </el-form>
            <div class='register-button'>
                <el-button>上一步</el-button>
                <el-button type="primary" @click='nextStep'>下一步</el-button>
            </div>
        </div>
        <div class='register-second' v-else-if='step === 2'>
            <h2>个人信息</h2>
            <el-upload class='avatar-uploader' action="https://jsonplaceholder.typicode.com/posts/">
                <img v-if="form.headPortrait" :src="form.headPortrait" class="avatar" alt=""/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form :model='form' :label-width="labelWidth">
                <popover-item v-for='(item, index) in menu[1]' :key='index' :label-name='item.label'
                              :show='warning[item.value].show'
                              :title='warning[item.value].title'>
                    <el-input slot='popoverItem' v-model='form[item.value]' :placeholder='item.label'
                              clearable="" :show-password="item.value.indexOf('password') > -1"></el-input>
                </popover-item>
                <el-form-item label='年龄'>
                    <el-slider v-model='form.age' show-input :min='18'></el-slider>
                </el-form-item>
                <el-form-item label='性别'>
                    <span class='register-gender'>
                        <el-radio v-model="form.gender" label="男">男</el-radio>
                        <el-radio v-model="form.gender" label="女">女</el-radio>
                    </span>
                </el-form-item>
            </el-form>
            <div class='register-button'>
                <el-button>上一步</el-button>
                <el-button type="primary" @click='nextStep'>下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import PopoverItem from '../../components/public/PopoverItem';
    import {existUser} from '../../service/request';

    // 正则表达式
    const REG1 = /^[0-9a-zA-Z]{8,20}$/;
    const REG2 = /^([\u4e00-\u9fa5]|[a-zA-Z0-9]){1,20}$/;
    const REG3 = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/;
    const REG4 = /^1[3456789]\d{9}$/;

    export default {
        name: 'Register',
        components: {PopoverItem},
        data () {
            return {
                form: {
                    username: '',
                    password: '',
                    password2: '',
                    realName: '',
                    author: '',
                    email: '',
                    introduction: '',
                    profession: '',
                    telephone: '',
                    age: 25,
                    gender: '男',
                    headPortrait: ''

                },
                labelWidth: '4rem',
                step: 2,
                menu: [[{label: '用户名', value: 'username'}, {label: '密码', value: 'password'}, {
                    label: '确认密码',
                    value: 'password2'
                }], [{label: '真实姓名', value: 'realName'}, {label: '笔名', value: 'author'}, {
                    label: '电子邮件',
                    value: 'email'
                }, {
                    label: '座右铭',
                    value: 'introduction'
                }, {label: '职业', value: 'profession'}, {label: '电话', value: 'telephone'}]],
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
                    },
                    realName: {
                        title: '真实姓名必须符合汉字,英文',
                        show: false
                    },
                    author: {
                        title: '笔名必须符合汉字,英文',
                        show: false
                    },
                    email: {
                        title: '电子邮件必须符合邮件规范',
                        show: false
                    },
                    introduction: {
                        title: '简介不能为空',
                        show: false
                    },
                    profession: {
                        title: '请填写相关职位',
                        show: false
                    },
                    telephone: {
                        title: '以1开头的11位数字',
                        show: false
                    }
                }
            };
        },
        watch: {
            form: {
                handler (newVal, oldVal) {
                    let scope = this;
                    // 登陆信息
                    scope.warning.username.show = !REG1.test(newVal.username);
                    scope.warning.password.show = !REG1.test(newVal.password);
                    if (!(newVal.password && !newVal.password2)) {
                        scope.warning.password2.show = newVal.password !== newVal.password2;
                    } else {
                        scope.warning.password2.show = !!newVal.password2;
                    }
                    scope.warning.realName.show = !newVal.realName.length || !REG2.test(newVal.realName);
                    scope.warning.author.show = !newVal.author.length || !REG2.test(newVal.author);
                    scope.warning.email.show = !newVal.email.length || !REG3.test(newVal.email);
                    scope.warning.introduction.show = !newVal.introduction.length || !REG2.test(newVal.introduction);
                    scope.warning.profession.show = !newVal.profession.length || !REG2.test(newVal.profession);
                    scope.warning.telephone.show = !newVal.telephone.length || !REG4.test(newVal.telephone);
                },
                deep: true
            }
        },
        methods: {
            nextStep () {
                let scope = this;
                scope.formCheck().then(res => {
                    if (res) {
                        scope.step = 2;
                    }
                });
            },
            formCheck () {
                let scope = this;
                return new Promise((resolve) => {
                    if (!REG1.test(scope.form.username)) {
                        scope.$msg('用户名不符合规范');
                        resolve(false);
                    }
                    if (!REG1.test(scope.form.password)) {
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

            .avatar-uploader {

                position: relative;
                bottom: 13.5rem;
                left: 13rem;

                .el-upload {
                    border: 1px dashed #d9d9d9;
                    border-radius: 6px;
                    cursor: pointer;
                    overflow: hidden;

                    &:hover {
                        border-color: #409EFF;
                    }
                }

                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }

                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }

            }

            h2 {
                position: relative;
                bottom: 20rem;
                left: 20rem;
            }

            .el-form {
                position: relative;
                right: 5rem;
                top: 5rem;

                .register-gender {
                    padding-right: 18rem;
                }
            }

            .register-button {
                position: relative;
                top: 20rem;
                right: 24rem;
            }
        }
    }

</style>
