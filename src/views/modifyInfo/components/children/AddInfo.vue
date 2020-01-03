<template>
    <div class="add-info">
        <div class="title"><span>新增记录</span></div>
        <div class="content">
            <el-form ref="form" :label-width="labelWidth" :modal="form">
                <el-form-item v-for="(item, index) in display" :key="index" :label="item.key">
                    <el-input v-model="form[item.value]" :type="item.value === 'introduction' ? 'textarea' : 'text'"
                              clearable placeholder='请输入信息'
                              v-if="item.value !== 'infoType' && item.value !== 'startTime' && item.value !== 'endTime'"></el-input>
                    <el-select v-model="form[item.value]" placeholder="请选择" v-else-if="item.value === 'infoType'">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                   :value="item.value"></el-option>
                    </el-select>
                    <el-date-picker v-else v-model="form[item.value]" type="date"
                                    placeholder="请输入日期" value-format="yyyy-MM-dd"
                                    :picker-options="item.value === 'startTime' ? pickerOptionsStart : pickerOptionsEnd"></el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div class="icon">
            <el-button type="primary" @click="save">确定</el-button>
            <el-button @click="reset">重置</el-button>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'AddInfo',
        data () {
            return {
                form: {
                    infoType: '',
                    mechanism: '',
                    position: '',
                    startTime: '',
                    endTime: '',
                    introduction: ''
                },
                // 开始时间不能大于结束时间
                pickerOptionsStart: {
                    disabledDate: time => {
                        if (this.form.endTime) {
                            return (
                                time.getTime() > new Date(this.form.endTime).getTime()
                            );
                        }
                    }
                },
                //结束时间不能小于开始时间
                pickerOptionsEnd: {
                    disabledDate: time => {
                        if (this.form.startTime) {
                            return (
                                time.getTime() < new Date(this.form.startTime).getTime()
                            );
                        }
                    }
                },
                labelWidth: '6.5rem',
                options: [
                    {
                        value: '教育经历',
                        label: '教育经历'
                    }, {
                        value: '工作经历',
                        label: '工作经历'
                    }
                ],
                display: [
                    {key: '信息类型', value: 'infoType'}, {key: '学校/公司', value: 'mechanism'},
                    {key: '职位', value: 'position'}, {key: '开始日期', value: 'startTime'}, {
                        key: '结束日期',
                        value: 'endTime'
                    }, {
                        key: '简介',
                        value: 'introduction'
                    }
                ]
            };
        },
        methods: {
            formCheck () {
                let scope = this;
                if (!scope.form.infoType) {
                    this.$message.warning('请选择信息类型');
                    return false;
                }
                if (!scope.form.mechanism) {
                    this.$message.warning('请填写学校/公司');
                    return false;
                }
                if (!scope.form.position) {
                    this.$message.warning('请填写职位');
                    return false;
                }
                if (!scope.form.startTime) {
                    this.$message.warning('请填写开始时间');
                    return false;
                }
                if (!scope.form.endTime) {
                    this.$message.warning('请填写结束时间');
                    return false;
                }
                if (!scope.form.introduction) {
                    this.$message.warning('请填写简介');
                    return false;
                }
                return true;
            },
            save () {
                let scope = this;
                if (!scope.formCheck()) {
                    return;
                }
                scope.$emit('add', scope.form);
            },
            reset () {
                let scope = this;
                scope.form = {
                    infoType: '',
                    mechanism: '',
                    position: '',
                    startTime: '',
                    endTime: '',
                    introduction: ''
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .add-info {
        width: 100%;
        height: 100%;

        .title {
            width: 100%;
            height: 12%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            font-size: 1.3rem;
        }

        .content {
            width: 100%;
            height: 78%;

            .el-form {
                width: 80%;

                /deep/ .el-input {
                    width: 15rem;
                }

                /deep/ textarea {
                    width: 15rem;
                }
            }
        }

        .icon {
            width: 100%;
            height: 10%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
        }
    }
</style>
