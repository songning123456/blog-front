<template>
    <div class='modify-blogger'>
        <div class="content">
            <div class="inner-title">
                <span>修改个人简介</span>
            </div>
            <div class="inner-content">
                <el-form ref="form" :modal="form" :label-width='labelWidth'>
                    <el-form-item label='头像'>
                        <div class="modify-form-content">
                            <div class="modify-headPortrait">
                                <el-avatar :src="avatar"></el-avatar>
                                <div class="headPortrait-upload">
                                    <el-upload accept="image/*" action='' :limit='1' v-if="!disabled.headPortrait"
                                               :before-upload="beforeUpload">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </div>
                            </div>
                            <div class="modify-icon-true" v-if="disabled.headPortrait">
                                <i class="el-icon-edit" @click="disabled.headPortrait = false"></i></div>
                            <div class="modify-icon-false" v-if="!disabled.headPortrait">
                                <span @click.stop="save('headPortrait')">保存</span>
                                <span @click.stop="cancel('headPortrait')">取消</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-for='(item, index) in display' :label="item.key" :key="index">
                        <div class="modify-form-content">
                            <el-input v-model="form[item.value]"
                                      :disabled="disabled[item.value]"></el-input>
                            <div class="modify-icon-true" v-if="disabled[item.value]">
                                <i class="el-icon-edit" @click="disabled[item.value] = false"></i></div>
                            <div class="modify-icon-false" v-if="!disabled[item.value]">
                                <span @click.stop="save(item.value)">保存</span>
                                <span @click.stop="cancel(item.value)">取消</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label='年龄'>
                        <div class="modify-form-content">
                            <el-slider v-model='form.age' show-input :min='18' :disabled="disabled.age"></el-slider>
                            <div class="modify-icon-true" v-if="disabled.age">
                                <i class="el-icon-edit" @click="disabled.age = false"></i></div>
                            <div class="modify-icon-false" v-if="!disabled.age">
                                <span @click.stop="save('age')">保存</span>
                                <span @click.stop="cancel('age')">取消</span>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label='性别'>
                        <div class="modify-form-content">
                            <el-radio-group v-model="form.gender" :disabled="disabled.gender">
                                <el-radio label="男">男</el-radio>
                                <el-radio label="女">女</el-radio>
                            </el-radio-group>
                            <div class="modify-icon-true" v-if="disabled.gender">
                                <i class="el-icon-edit" @click="disabled.gender = false"></i></div>
                            <div class="modify-icon-false" v-if="!disabled.gender">
                                <span @click.stop="save('gender')">保存</span>
                                <span @click.stop="cancel('gender')">取消</span>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <tool-loading :loading="loading" normal="spinner"></tool-loading>
    </div>
</template>

<script>
    import {getBloggerInfo, saveImage, updateBlogger} from '../../../service/request';
    import config from '../../../utils/ConfigUtil';
    import ToolLoading from '../../../components/util/ToolLoading';

    // 正则表达式
    // const REG1 = /^[0-9a-zA-Z]{8,20}$/;
    const REG2 = /^([\u4e00-\u9fa5]|[a-zA-Z0-9]){1,20}$/;
    const REG3 = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/;
    const REG4 = /^1[3456789]\d{9}$/;

    export default {
        name: 'ModifyBlogger',
        components: {ToolLoading},
        data () {
            return {
                display: [
                    {
                        key: '真实姓名',
                        value: 'realName'
                    },
                    {
                        key: '笔名',
                        value: 'author'
                    },
                    {
                        key: '职位',
                        value: 'profession'
                    },
                    {
                        key: '座右铭',
                        value: 'motto'
                    },
                    {
                        key: '电话',
                        value: 'telephone'
                    },
                    {
                        key: '电子邮箱',
                        value: 'email'
                    }
                ],
                labelWidth: '5rem',
                form: {
                    author: '',
                    gender: '',
                    age: 18,
                    profession: '',
                    telephone: '',
                    email: '',
                    headPortrait: '',
                    motto: '',
                    realName: ''
                },
                copy: {},
                disabled: {
                    author: true,
                    gender: true,
                    age: true,
                    profession: true,
                    telephone: true,
                    email: true,
                    headPortrait: true,
                    motto: true,
                    realName: true
                },
                // 上传的头像
                image: {
                    imgBlob: '',
                    filename: '',
                    files: ''
                },
                loading: false
            };
        },
        mounted () {
            let scope = this;
            getBloggerInfo({condition: {}}).then(data => {
                scope.$response(data, '获取个人简介').then(data => {
                    scope.form = data.data[0];
                    scope.copy = Object.assign({}, scope.form);
                });
            }).finally();
        },
        computed: {
            avatar () {
                let scope = this;
                if (scope.form.headPortrait !== '') {
                    let src = config.getImageOriginal() + encodeURIComponent(scope.form.headPortrait);
                    return src;
                } else {
                    return '';
                }
            }
        },
        methods: {
            save (type) {
                let scope = this;
                scope.disabled[type] = true;
                switch (type) {
                    case 'author':
                        if (!scope.form.author.length || !REG2.test(scope.form.author)) {
                            scope.$msg('笔名必须符合汉字,英文');
                            return;
                        }
                        if (scope.form.author === scope.copy.author) {
                            scope.$msg('作者信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'profession':
                        if (!scope.form.profession.length || !REG2.test(scope.form.profession)) {
                            scope.$msg('请填写相关职位');
                            return;
                        }
                        if (scope.form.profession === scope.copy.profession) {
                            scope.$msg('职业信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'telephone':
                        if (!scope.form.telephone.length || !REG4.test(scope.form.telephone)) {
                            scope.$msg('以1开头的11位数字');
                            return;
                        }
                        if (scope.form.telephone === scope.copy.telephone) {
                            scope.$msg('电话号码信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'email':
                        if (!scope.form.email.length || !REG3.test(scope.form.email)) {
                            scope.$msg('电子邮件必须符合邮件规范');
                            return;
                        }
                        if (scope.form.email === scope.copy.email) {
                            scope.$msg('电子邮件信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'motto':
                        if (!scope.form.motto.length) {
                            scope.$msg('座右铭不能为空');
                            return;
                        }
                        if (scope.form.motto === scope.copy.motto) {
                            scope.$msg('座右铭信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'realName':
                        if (!scope.form.realName.length || !REG2.test(scope.form.realName)) {
                            scope.$msg('真实姓名必须符合汉字,英文');
                            return;
                        }
                        if (scope.form.realName === scope.copy.realName) {
                            scope.$msg('真实姓名信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'age':
                        if (scope.form.age === scope.copy.age) {
                            scope.$msg('年龄信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'gender':
                        if (scope.form.gender === scope.copy.gender) {
                            scope.$msg('性别信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'headPortrait':
                        if (!scope.form.headPortrait) {
                            scope.$msg('头像url不能为空');
                            return;
                        }
                        if (scope.form.headPortrait === scope.copy.headPortrait) {
                            scope.$msg('头像信息不能与原始信息相同');
                            return;
                        }
                        break;
                }
                let params = {
                    condition: scope.form
                };
                scope.loading = true;
                updateBlogger(params).then(data => {
                    scope.$response(data, '更新个人简介').then(data => {
                        scope.form = data.data[0];
                    });
                }).catch(e => {
                    scope.$msg('更新失败 ' + e);
                }).finally(() => {
                    scope.loading = false;
                });
            },
            cancel (type) {
                let scope = this;
                scope.disabled[type] = true;
                scope.form[type] = scope.copy[type];
            },
            beforeUpload (file) {
                let scope = this;
                scope.image.imgBlob = URL.createObjectURL(file);
                scope.image.filename = file.name;
                scope.image.files = file;
                let formData = new FormData();
                formData.append('file', scope.image.files, scope.image.filename);
                formData.append('dir', 'avatar');
                saveImage(formData).then(data => {
                    if (data.status === 200 && data.total > 0) {
                        // 获取服务器中图片路径
                        scope.form.headPortrait = data.data[0].imageSrc;
                    } else {
                        scope.$msg('上传图片失败 ' + data.message);
                    }
                });
                // 阻止默认上传地址
                return false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .modify-blogger {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .content {
            width: 40%;
            height: 85%;
            background-color: white;

            .inner-title {
                height: 3rem;
                font-weight: 500;
                font-size: 1.3rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .inner-content {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                height: calc(100% - 3rem);

                .el-form {
                    width: 60%;
                    margin-top: 1.5rem;

                    .el-form-item {
                        margin-bottom: 1rem;

                        .modify-form-content {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;

                            .el-input, .el-slider, .el-radio-group, .modify-headPortrait {
                                width: 80%;
                                float: left;
                            }

                            .modify-headPortrait {
                                .el-avatar {
                                    float: left;
                                    margin-left: 1rem;
                                }

                                .headPortrait-upload {
                                    width: calc(100% - 3rem);
                                    float: left;
                                }
                            }

                            .modify-icon-true {
                                width: 20%;
                                height: 100%;
                                font-size: 1.2rem;
                                float: left;

                                :hover {
                                    color: #417BF1;
                                    cursor: pointer;
                                }
                            }

                            .modify-icon-false {
                                width: 20%;
                                height: 100%;
                                float: left;

                                span:hover {
                                    color: #417BF1;
                                    cursor: pointer;

                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
