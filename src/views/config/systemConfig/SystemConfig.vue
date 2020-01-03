<template>
    <div class='system-config'>
        <div class='title'><span>系统配置</span></div>
        <div class="search">
            <div class='content'>
                <el-form :inline="true" :model='formInline'>
                    <el-form-item label='配置项key'>
                        <el-input v-model='formInline.configKey' placeholder='配置项key' clearable></el-input>
                    </el-form-item>
                    <el-form-item label='配置项value'>
                        <el-input v-model='formInline.configValue' placeholder='配置项value' clearable></el-input>
                    </el-form-item>
                    <el-form-item label='配置项描述'>
                        <el-input v-model='formInline.valueDescription' placeholder='配置项描述' clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="display">
            <el-table :data='result.data' v-if='page.total !== 0'>
                <el-table-column label='序号' align='center'>
                    <template slot-scope='scope'>
                        <span> {{page.recordStartNo * page.pageRecordNum + scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop='configKey' label='配置项key' align='center'></el-table-column>
                <el-table-column prop='configValue' label='配置项value' align='center'></el-table-column>
                <el-table-column prop='valueDescription' label='配置项描述' align='center'></el-table-column>
                <el-table-column label='操作' align='center'>
                    <template slot-scope='scope'>
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <empty-view v-else></empty-view>
        </div>
        <div class='page'>
            <el-pagination layout="prev, pager, next, jumper" :current-page='page.recordStartNo'
                           :total='page.total'></el-pagination>
        </div>
        <tool-loading :loading="loading"></tool-loading>
        <el-dialog title='编辑系统配置' :visible.sync='dialogVisible' center width='30%' top='30vh'>
            <el-form :model='dialogForm'>
                <el-form-item label='系统配置key' :label-width='dialogLabelWidth'>
                    <el-input v-model='dialogForm.configKey' :disabled='dialogForm.configKey === "dataBase"'></el-input>
                </el-form-item>
                <el-form-item label='系统配置value' :label-width='dialogLabelWidth'>
                    <el-select v-if='dialogForm.configKey === "dataBase"' v-model='dialogForm.configValue'>
                        <el-option label='MYSQL' value='MYSQL'></el-option>
                        <el-option label='ES' value='ES'></el-option>
                    </el-select>
                    <el-input v-else v-model='dialogForm.configValue'></el-input>
                </el-form-item>
                <el-form-item label='系统配置描述' :label-width='dialogLabelWidth'>
                    <el-input v-model='dialogForm.valueDescription'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click='sureUpdate'>确 定</el-button>
                <el-button @click='dialogVisible = false'>取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ToolLoading from '../../../components/util/ToolLoading';
    import EmptyView from '../../../components/util/EmptyView';
    import {getSystemConfigLike, updateSystemConfig} from '../../../service/request';

    export default {
        name: 'SystemConfig',
        components: {ToolLoading, EmptyView},
        data () {
            return {
                formInline: {
                    configKey: '',
                    configValue: '',
                    valueDescription: ''
                },
                result: {
                    data: []
                },
                page: {
                    recordStartNo: 0,
                    pageRecordNum: 20,
                    total: 0
                },
                loading: false,
                dialogVisible: false,
                dialogForm: {},
                dialogLabelWidth: '6rem'
            };
        },
        mounted () {
            let scope = this;
            scope.onSubmit();
        },
        methods: {
            onSubmit () {
                let scope = this;
                let form = {
                    configKey: scope.formInline.configKey,
                    configValue: scope.formInline.configValue,
                    valueDescription: scope.formInline.valueDescription
                };
                scope.page = {
                    recordStartNo: 0,
                    pageRecordNum: 20,
                    total: 0
                };
                let param = {
                    recordStartNo: scope.page.recordStartNo,
                    pageRecordNum: scope.page.pageRecordNum,
                    condition: form
                };
                scope.query(param);
            },
            reset () {
                let scope = this;
                scope.formInline = {
                    configKey: '',
                    configValue: '',
                    valueDescription: ''
                };
                scope.page = {
                    recordStartNo: 0,
                    pageRecordNum: 20,
                    total: 0
                };
                let param = {
                    recordStartNo: scope.page.recordStartNo,
                    pageRecordNum: scope.page.pageRecordNum,
                    condition: scope.formInline
                };
                scope.query(param);
            },
            refresh () {
                let scope = this;
                let form = {
                    configKey: '',
                    configValue: '',
                    valueDescription: ''
                };
                scope.page = {
                    recordStartNo: 0,
                    pageRecordNum: 20,
                    total: 0
                };
                let param = {
                    recordStartNo: scope.page.recordStartNo,
                    pageRecordNum: scope.page.pageRecordNum,
                    condition: form
                };
                scope.query(param);
            },
            query (param) {
                let scope = this;
                scope.loading = true;
                scope.result.data = [];
                getSystemConfigLike(param).then((data) => {
                    if (data.status === 200) {
                        if (data.total !== 0) {
                            scope.result.data = data.data;
                            scope.page.total = data.total;
                        } else {
                            this.$message.error('查询结果为空');
                        }
                    } else {
                        this.$message.error('查询异常! ' + data.message);
                    }
                }).catch().finally(() => {
                    scope.loading = false;
                });
            },
            handleEdit (index, row) {
                let scope = this;
                scope.dialogVisible = true;
                scope.dialogForm = {
                    configKey: row.configKey,
                    configValue: row.configValue,
                    valueDescription: row.valueDescription
                };
            },
            formCheck () {
                let scope = this;
                if (!scope.dialogForm.configKey) {
                    this.$message.warning('系统配置key不能为空');
                    return false;
                }
                if (!scope.dialogForm.configValue) {
                    this.$message.warning('系统配置value不能为空');
                    return false;
                }
                if (!scope.dialogForm.valueDescription) {
                    this.$message.warning('系统配置描述不能为空');
                    return false;
                }
                return true;
            },
            sureUpdate () {
                let scope = this;
                if (!scope.formCheck()) {
                    return;
                }
                let form = {
                    configKey: scope.dialogForm.configKey,
                    configValue: scope.dialogForm.configValue,
                    valueDescription: scope.dialogForm.valueDescription
                };
                let param = {
                    condition: form
                };
                scope.loading = true;
                updateSystemConfig(param).then((data) => {
                    if (data.status === 200) {
                        this.$message.success('更新成功!');
                        scope.refresh();
                    } else {
                        this.$message.error('更新失败! ' + data.message);
                    }
                }).catch().finally(() => {
                    scope.loading = false;
                    scope.dialogVisible = false;
                });
            }
        }
    };
</script>

<style lang="scss">
    .system-config {
        width: 100%;
        height: 100%;
        padding: 0 .5rem;
        box-sizing: border-box;

        .title {
            width: 100%;
            height: 7%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 1rem;
            font-family: PingFangSC-Regular;
            font-weight: 400;
        }

        .search {
            width: 100%;
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;

            .content {
                width: 100%;

                .el-form {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    padding: .8rem 0 .8rem 0;
                    background: #eaf5ff;

                    .el-form-item {
                        margin-bottom: 0;
                        padding-left: 1rem;
                    }

                    .el-form-item:not(:last-child) {

                        .el-form-item__content {
                            width: 15rem;
                        }
                    }
                }
            }
        }

        .display {
            width: 100%;
            height: 77%;

            .el-table {
                height: 100%;
            }
        }

        .page {
            width: 100%;
            height: 6%;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .el-dialog__wrapper {
            .el-dialog {
                .el-dialog__body {
                    padding: 20px 20px 0 20px;

                    .el-form-item {
                        margin-bottom: 12px;

                        .el-form-item__content {
                            .el-select {
                                width: 100%;
                            }
                        }
                    }
                }

                .el-dialog__footer {
                    padding: 0 20px 20px;
                }
            }
        }
    }

</style>
