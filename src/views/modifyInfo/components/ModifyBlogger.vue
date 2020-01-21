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
                                <el-avatar :src="avatar">
                                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                </el-avatar>
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
                    <el-form-item label='性别'>
                        <div class="modify-form-content">
                            <el-input v-model="form.gender" :disabled="true" v-if="disabled.gender"></el-input>
                            <el-select v-model="form.gender" placeholder="请选择" v-if="!disabled.gender">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                           :value="item.value"
                                ></el-option>
                            </el-select>
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
        <tool-loading :loading="loading" category="spinner"></tool-loading>
    </div>
</template>

<script>
    import {getBloggerInfo, saveImage, updateBlogger} from '../../../service/request';
    import config from '../../../utils/ConfigUtil';
    import ToolLoading from '../../../components/util/ToolLoading';
    import Reg from '../../../utils/RegularUtil';

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
                    },
                    {
                        key: '年龄',
                        value: 'age'
                    }
                ],
                options: [{
                    value: '男',
                    label: '男'
                }, {
                    value: '女',
                    label: '女'
                }],
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
            this.getBlogger();
        },
        computed: {
            avatar () {
                let scope = this;
                if (scope.form.headPortrait !== '') {
                    if (scope.form.headPortrait.indexOf('https://') === -1 && scope.form.headPortrait.indexOf('http://') === -1) {
                        let src = config.getImageOriginal() + encodeURIComponent(scope.form.headPortrait);
                        return src;
                    } else {
                        return scope.form.headPortrait;
                    }
                } else {
                    return '';
                }
            }
        },
        methods: {
            getBlogger () {
                if (JSON.stringify(this.$store.state.blogger) !== '{}') {
                    this.form = Object.assign({}, this.$store.state.blogger);
                    for (let key in this.form) {
                        if (this.form[key] === null || this.form[key] === 'null') {
                            this.form[key] = '';
                        }
                    }
                    this.copy = Object.assign({}, this.form);
                } else {
                    getBloggerInfo({condition: {}}).then(data => {
                        this.$response(data, '获取个人简介').then(data => {
                            this.form = data.data[0];
                            for (let key in this.form) {
                                if (this.form[key] === null || this.form[key] === 'null') {
                                    this.form[key] = '';
                                }
                            }
                            this.copy = Object.assign({}, this.form);
                        });
                    });
                }
            },
            save (type) {
                let scope = this;
                scope.disabled[type] = true;
                switch (type) {
                    case 'author':
                        if (!scope.form.author.length || !Reg.AUTHOR.test(scope.form.author)) {
                            this.$message.warning('笔名必须符合汉字,英文');
                            return;
                        }
                        if (scope.form.author === scope.copy.author) {
                            this.$message.warning('作者信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'profession':
                        if (scope.form.profession === scope.copy.profession) {
                            this.$message.warning('职业信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'telephone':
                        if (!scope.form.telephone.length || !Reg.PHONE.test(scope.form.telephone)) {
                            this.$message.warning('以1开头的11位数字');
                            return;
                        }
                        if (scope.form.telephone === scope.copy.telephone) {
                            this.$message.warning('电话号码信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'email':
                        if (!scope.form.email.length || !Reg.EMAIL.test(scope.form.email)) {
                            this.$message.warning('电子邮件必须符合邮件规范');
                            return;
                        }
                        if (scope.form.email === scope.copy.email) {
                            this.$message.warning('电子邮件信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'motto':
                        if (!scope.form.motto.length) {
                            this.$message.warning('座右铭不能为空');
                            return;
                        }
                        if (scope.form.motto === scope.copy.motto) {
                            this.$message.warning('座右铭信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'realName':
                        if (scope.form.realName === scope.copy.realName) {
                            this.$message.warning('真实姓名信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'age':
                        if (scope.form.age.length) {
                            let temp = +(scope.form.age);
                            if (temp) {
                                if (temp > 120) {
                                    this.$message.warning('年龄不符合实际');
                                    return;
                                } else {
                                    scope.form.age = temp;
                                }
                            } else {
                                this.$message.warning('年龄信息格式错误');
                                return;
                            }
                        }
                        if (scope.form.age === scope.copy.age) {
                            this.$message.warning('年龄信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'gender':
                        if (scope.form.gender === scope.copy.gender) {
                            this.$message.warning('性别信息不能与原始信息相同');
                            return;
                        }
                        break;
                    case 'headPortrait':
                        if (!scope.form.headPortrait) {
                            this.$message.warning('头像url不能为空');
                            return;
                        }
                        if (scope.form.headPortrait === scope.copy.headPortrait) {
                            this.$message.warning('头像信息不能与原始信息相同');
                            return;
                        }
                        break;
                }
                let param = Object.create(null);
                param[type] = scope.form[type];
                let params = {
                    condition: param
                };
                scope.loading = true;
                updateBlogger(params).then(data => {
                    scope.$response(data, '更新个人简介').then(data => {
                        scope.form = data.data[0];
                    });
                }).catch(e => {
                    this.$message.error('更新失败 ' + e);
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
                        this.$message.error('上传图片失败 ' + data.message);
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

                            .el-input, .el-slider, .el-select, .modify-headPortrait {
                                width: 78%;
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
                                width: 22%;
                                height: 100%;
                                font-size: 1.2rem;
                                float: left;

                                :hover {
                                    color: #417BF1;
                                    cursor: pointer;
                                }
                            }

                            .modify-icon-false {
                                width: 22%;
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
