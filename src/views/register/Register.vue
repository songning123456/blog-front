<template>
    <div class='register'>
        <div class='register-first' v-if='step === 1'>
            <div class='header'>登陆信息</div>
            <el-form :model='form' :label-width='labelWidth'>
                <popover-item v-for='(item, index) in menu[0]' :key='index' :label-name='item.label'
                              :show='warning[item.value].show' :required="item.required"
                              :title='warning[item.value].title'>
                    <el-input slot='popoverItem' v-model='form[item.value]' :placeholder='item.label'
                              clearable="" :show-password="item.value.indexOf('password') > -1"
                              @change="promptInfo(item.value)"></el-input>
                </popover-item>
            </el-form>
            <div class='register-button'>
                <el-button @click='previousStep(0)'>上一步</el-button>
                <el-button type="primary" @click='nextStep(2)'>下一步</el-button>
            </div>
        </div>
        <div class='register-second' v-else-if='step === 2'>
            <div class='header'>个人信息</div>
            <el-upload class='avatar-uploader' accept="image/*" action='' :limit='1'
                       :before-upload="beforeUpload">
                <img v-if="image.imgBlob" :src="image.imgBlob" class="avatar" alt=""/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form :model='form' :label-width="labelWidth">
                <popover-item v-for='(item, index) in menu[1]' :key='index' :label-name='item.label'
                              :show='warning[item.value].show' :required="item.required"
                              :title='warning[item.value].title'>
                    <el-input slot='popoverItem' v-model='form[item.value]' :placeholder='item.label'
                              clearable="" :show-password="item.value.indexOf('password') > -1"
                              @change="promptInfo(item.value)"></el-input>
                </popover-item>
                <el-form-item label='性别'>
                    <el-select v-model="form.gender" placeholder="请选择" clearable>
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                                   clearable></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class='register-button'>
                <el-button @click='previousStep(1)'>上一步</el-button>
                <el-button type="primary" @click='nextStep(3)'>下一步</el-button>
            </div>
        </div>
        <div class='register-third' v-else-if='step === 3'>
            <div class='header'>标签选择</div>
            <el-table :data='tableData'>
                <el-table-column prop="index" label="ID"></el-table-column>
                <el-table-column prop="labelName" label="标签名称"></el-table-column>
                <el-table-column label="是否关注">
                    <template slot-scope='scope'>
                        <el-switch v-model="scope.row.attention"></el-switch>
                    </template>
                </el-table-column>
            </el-table>
            <div class='register-button'>
                <el-button @click='previousStep(2)'>上一步</el-button>
                <el-button type="primary" @click='nextStep(0)'>保存信息</el-button>
            </div>
        </div>
        <tool-loading :loading="loading" normal="spinner"></tool-loading>
        <div class='register-success' v-if='register.success'>
            <div class='count-down'>
                <span class='digital'>{{second}}</span>
                <span class='text'>s后自动跳转到主页...</span>
            </div>
            <img src='../../assets/registerSuccess.svg'/>
            <h4>注册成功</h4>
        </div>
        <div class='register-fail' v-if='register.fail'>
            <div class='count-down'>
                <span class='digital'>{{second}}</span>
                <span class='text'>s后自动跳转到主页...</span>
            </div>
            <img src='../../assets/registerFail.svg'/>
            <h4>注册失败</h4>
        </div>
    </div>
</template>

<script>
    import PopoverItem from '../../components/public/PopoverItem';
    import {
        existUser,
        saveImage,
        getLabelConfig,
        registerAll,
        insertHistoryInfo
    } from '../../service/request';
    import ToolLoading from '../../components/util/ToolLoading';
    import Reg from '../../utils/RegularUtil';

    export default {
        name: 'Register',
        components: {ToolLoading, PopoverItem},
        data () {
            return {
                form: {
                    username: '',
                    password: '',
                    password2: '',
                    realName: '',
                    author: '',
                    email: '',
                    motto: '',
                    profession: '',
                    telephone: '',
                    age: '',
                    gender: '',
                    headPortrait: ''
                },
                // (第三步的)标签信息
                labelInfo: {
                    result: [],
                    total: ''
                },
                // 注册 成功 还是 失败
                register: {
                    success: false,
                    fail: false
                },
                //倒计时 秒
                second: '',
                // 上传的头像
                image: {
                    imgBlob: '',
                    filename: '',
                    files: ''
                },
                labelWidth: '5rem',
                // 步骤
                step: 1,
                options: [{
                    value: '男',
                    label: '男'
                }, {
                    value: '女',
                    label: '女'
                }],
                //总的加载状况
                loading: false,
                // label信息
                menu: [[{label: '用户名', value: 'username', required: true}, {
                    label: '密码',
                    value: 'password',
                    required: true
                }, {
                    label: '确认密码',
                    value: 'password2',
                    required: true
                }], [{label: '笔名', value: 'author', required: true}, {label: '真实姓名', value: 'realName'}, {
                    label: '电子邮件',
                    value: 'email'
                },
                    {label: '座右铭', value: 'motto'}, {label: '职业', value: 'profession'}, {
                        label: '电话',
                        value: 'telephone'
                    }, {
                        label: '年龄',
                        value: 'age'
                    }]],
                // 右侧的警告信息
                warning: {
                    username: {
                        title: '用户名由4-20位字母,数字,下划线,减号,点组合',
                        show: false
                    },
                    password: {
                        title: '密码由6-12位字母加数字组合',
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
                        title: '笔名必须符合汉字,英文,数字,下划线,减号,点组合',
                        show: false
                    },
                    email: {
                        title: '电子邮件必须符合邮件规范',
                        show: false
                    },
                    motto: {
                        title: '座右铭不能为空',
                        show: false
                    },
                    profession: {
                        title: '请填写相关职位',
                        show: false
                    },
                    telephone: {
                        title: '以1开头的11位数字',
                        show: false
                    },
                    age: {
                        title: '年龄必须符合规范',
                        show: false
                    }
                }
            };
        },
        computed: {
            tableData () {
                let scope = this;
                let result = scope.labelInfo.result.map((item, index) => {
                    return {
                        index: index + 1,
                        labelName: item.labelName,
                        attention: false
                    };
                });
                return result;
            }
        },
        methods: {
            // 0,1; 0 跳转到登录页 1返回上一步
            previousStep (type) {
                let scope = this;
                if (type === 0) {
                    scope.$router.push({path: '/'});
                } else {
                    scope.step = type;
                }
            },
            // 2，0; 2 继续下一步
            nextStep (type) {
                let scope = this;
                scope.formCheck(type).then(res => {
                    if (res.value) {
                        if (type === 0) {
                            scope.saveBtn();
                        } else if (type === 3) {
                            scope.labelInfo = {
                                result: res.data,
                                total: res.total
                            };
                            scope.step = type;
                        } else {
                            scope.step = type;
                        }
                    } else {
                        scope.$msg(res.message);
                    }
                });
            },
            // 自动跳转页面 type => success, fail
            autoJump (type) {
                let scope = this;
                const TIME_COUNT = 3;
                if (!scope.timer) {
                    scope.second = TIME_COUNT;
                    scope.register[type] = true;
                    scope.timer = setInterval(() => {
                        if (scope.second > 0 && scope.second <= TIME_COUNT) {
                            scope.second--;
                        } else {
                            scope.register[type] = false;
                            clearInterval(scope.timer);
                            scope.timer = null;
                            scope.$router.push({path: '/'});
                        }
                    }, 1000);
                }
            },
            saveBtn () {
                let scope = this;
                scope.loading = true;
                if (scope.image.filename !== '') {
                    // 在服务器中生成 图片文件
                    let formData = new FormData();
                    formData.append('file', scope.image.files, scope.image.filename);
                    formData.append('dir', 'avatar');
                    saveImage(formData).then(data => {
                        if (data.status === 200 && data.total > 0) {
                            // 获取服务器中图片路径
                            scope.form.headPortrait = data.data[0].imageSrc;
                            scope.registerInfo();
                        } else {
                            scope.loading = false;
                            scope.autoJump('fail');
                        }
                    }).catch(e => {
                        scope.loading = false;
                        scope.autoJump('fail');
                    });
                } else {
                    scope.registerInfo();
                }
            },
            registerInfo () {
                let scope = this;
                scope.form.labelVOS = scope.tableData.map(item => {
                    let obj = {};
                    obj.labelName = item.labelName;
                    if (item.attention) {
                        obj.attention = 1;
                    } else {
                        obj.attention = 0;
                    }
                    return obj;
                });
                registerAll({condition: scope.form}).then(data => {
                    scope.loading = false;
                    if (data.status === 200) {
                        let param = {
                            condition: {
                                title: scope.COMMON_MAP.HISTORY.REGISTER,
                                username: scope.form.username
                            }
                        };
                        insertHistoryInfo(param).then(data => {
                            if (data.status !== 200) {
                                scope.$msg('插入历史信息失败!');
                            }
                        });
                        scope.autoJump('success');
                    } else {
                        scope.autoJump('fail');
                    }
                }).catch(e => {
                    scope.loading = false;
                    scope.autoJump('fail');
                });
            },
            // 上传操作
            beforeUpload (file) {
                let scope = this;
                scope.image.imgBlob = URL.createObjectURL(file);
                scope.image.filename = file.name;
                scope.image.files = file;
                // 组织默认上传地址
                return false;
            },
            // 警告信息
            promptInfo (type) {
                let scope = this;
                switch (type) {
                    case 'username':
                        scope.warning.username.show = !Reg.USERNAME.test(scope.form.username);
                        break;
                    case 'password':
                        scope.warning.password.show = !Reg.PASSWORD.test(scope.form.password);
                        break;
                    case 'password2':
                        if (!(scope.form.password && !scope.form.password2)) {
                            scope.warning.password2.show = scope.form.password !== scope.form.password2;
                        } else {
                            scope.warning.password2.show = !!scope.form.password2;
                        }
                        break;
                    case 'author':
                        scope.warning.author.show = !scope.form.author.length || !Reg.AUTHOR.test(scope.form.author);
                        break;
                    case 'email':
                        scope.warning.email.show = !!(scope.form.email.length && !Reg.EMAIL.test(scope.form.email));
                        break;
                    case 'telephone':
                        scope.warning.telephone.show = !!(scope.form.telephone.length && !Reg.PHONE.test(scope.form.telephone));
                        break;
                    case 'age':
                        scope.warning.age.show = !!(scope.form.age.length && !(+(scope.form.age) > 0 && +(scope.form.age) < 120));
                        break;
                }
            },
            //表单验证
            formCheck (type) {
                let scope = this;
                if (type === 2) {
                    return new Promise((resolve) => {
                        if (!scope.form.username || !Reg.USERNAME.test(scope.form.username)) {
                            resolve({
                                message: '用户名格式不符合规范',
                                value: false
                            });
                            return;
                        }
                        if (!scope.form.password || !Reg.PASSWORD.test(scope.form.password)) {
                            resolve({
                                message: '密码格式不符合规范',
                                value: false
                            });
                            return;
                        }
                        if (scope.form.password !== scope.form.password2) {
                            resolve({
                                message: '两次输入密码不一致',
                                value: false
                            });
                            return;
                        }
                        // 判断用户是否存在
                        existUser({condition: {username: scope.form.username}}).then(data => {
                            scope.$response(data, '判断用户是否存在').then(data => {
                                if (data.data[0].isExist) {
                                    resolve({
                                        message: '用户名已存在',
                                        value: false
                                    });
                                } else {
                                    resolve({
                                        value: true
                                    });
                                }
                            });
                        });
                    });
                } else if (type === 3) {
                    return new Promise((resolve) => {
                        if (!scope.form.author.length || !Reg.AUTHOR.test(scope.form.author)) {
                            resolve({
                                message: '笔名必须符合汉字,英文,数字组合',
                                value: false
                            });
                            return;
                        }
                        if (scope.form.email.length && !Reg.EMAIL.test(scope.form.email)) {
                            resolve({
                                message: '电子邮件格式不符合规范',
                                value: false
                            });
                            return;
                        }
                        if (scope.form.telephone.length && !Reg.PHONE.test(scope.form.telephone)) {
                            resolve({
                                message: '以1开头的11位电话号码',
                                value: false
                            });
                            return;
                        }
                        if (scope.form.age.length) {
                            let temp = +(scope.form.age);
                            if (temp) {
                                if (temp > 120) {
                                    scope.$msg('年龄不符合实际');
                                    return;
                                } else {
                                    scope.form.age = temp;
                                }
                            } else {
                                scope.$msg('年龄信息格式错误');
                                return;
                            }
                        }
                        // 获取标签配置
                        getLabelConfig().then(data => {
                            scope.$response(data, '获取标签配置').then(data => {
                                resolve({
                                    data: data.data,
                                    total: data.total,
                                    value: true
                                });
                            });
                        });
                    });
                } else if (type === 0) {
                    return new Promise(resolve => {
                        let attentions = scope.tableData.filter(item => {
                            return item.attention === true;
                        });
                        if (attentions.length === 0) {
                            resolve({
                                message: '请先选择关注标签',
                                value: false
                            });
                        } else {
                            resolve({
                                value: true
                            });
                        }
                    });
                }
            }
        }
    };
</script>

<style lang='scss' scoped>
    .register {
        width: 100%;
        height: 100%;

        .register-first {
            width: 100%;
            height: 100%;
            padding: 0 24rem;
            box-sizing: border-box;

            .header {
                height: 25%;
                text-align: center;
                line-height: 15rem;
                font-weight: bold;
                font-size: 1.2rem;
            }

            /deep/ .el-form {
                height: 25%;
                margin-left: 15%;
                width: 70%;

                .el-form-item {
                    margin-bottom: 1.1rem;
                }
            }

            .register-button {
                height: 50%;
                text-align: center;
            }
        }

        .register-second {
            width: 100%;
            height: 100%;
            padding: 0 24rem;
            box-sizing: border-box;

            .header {
                height: 5%;
                text-align: center;
                font-weight: bold;
                font-size: 1.2rem;
                line-height: 2.4rem;
            }

            /deep/ .avatar-uploader {
                height: 25%;
                text-align: center;

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
                    font-size: 1.4rem;
                    color: #8c939d;
                    width: 8.9rem;
                    height: 8.9rem;
                    line-height: 8.9rem;
                    text-align: center;
                }

                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }

            }

            /deep/ .el-form {

                height: 56%;
                width: 70%;
                margin-left: 15%;

                .el-form-item {
                    margin-bottom: 1.1rem;

                    .el-select {
                        width: 100%;
                    }
                }

                .register-gender {
                    padding-right: 18rem;
                }
            }

            .register-button {
                text-align: center;
            }
        }

        .register-third {
            width: 100%;
            height: 100%;
            padding: 0 24rem;
            box-sizing: border-box;

            .header {
                height: 5%;
                text-align: center;
                line-height: 2.5rem;
                font-weight: bold;
                font-size: 1.2rem;
            }

            /deep/ .el-table {
                height: 88%;
                overflow: auto;

                // 修改滚动条样式
                &::-webkit-scrollbar {
                    width: 10px;
                    height: 15px;
                }

                &::-webkit-scrollbar-track {
                    background-color: white;
                    border-radius: 2px;
                }

                &::-webkit-scrollbar-thumb {
                    background: #bfbfbf;
                    border-radius: 10px;

                    &:hover {
                        background: #a5a5a5;
                    }
                }
            }

            .register-button {
                height: 7%;
                text-align: center;
                padding-top: .5rem;
            }
        }

        .register-success, .register-fail {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2000;
            position: absolute;
            background-color: rgb(255, 255, 255);

            .count-down {
                height: 5rem;
                position: absolute;
                top: 12rem;
                left: 0;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;

                .digital {
                    font-size: 3rem;
                    padding: 0 1rem;
                }

                .text {
                    padding-top: 1rem;
                }
            }

            img {
                top: 0;
                left: 0;
                right: 0;
                bottom: 3rem;
                margin: auto;
                position: absolute;
            }

            h4 {
                height: 1.2rem;
                top: 0;
                left: 0;
                right: 0;
                bottom: -1rem;
                margin: auto;
                position: absolute;
            }
        }
    }

</style>
