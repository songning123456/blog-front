<template>
    <div class="blog-config">
        <main-head @futureTab='futureTab' ref='mainHead'></main-head>
        <div class='frame-center'>
            <div class='config-left'>
                <div class="refresh-cache">
                    <div class="button" @click="refresh"><span>刷新缓存</span></div>
                </div>
                <label-button v-for='(item, index) in tabsForm' :key='index' :label='item.label'
                              @click.native='chooseType(index)'
                              :normal='!(chooseTab === tabsForm[index].name)'></label-button>
            </div>
            <div class='config-right'>
                <system-config v-if='chooseTab === tabsForm[0].name'></system-config>
            </div>
            <el-dialog :close-on-click-modal='false' title="请选择缓存刷新" :visible.sync="refreshModal" width="20%"
                       top="25vh">
                <el-form ref="form" :model="form" :label-width="labelWidth">
                    <el-form-item label="标签配置缓存" v-if="permission === 'ADMIN'">
                        <el-switch v-model="form.labelConfig" @change="changeStatus($event, 'labelConfig')"></el-switch>
                    </el-form-item>
                    <el-form-item v-for='(item, index) in cacheForm' :key="index" :label="item.label"
                                  :style="item.name === 'all' ? 'font-weight:600' : ''">
                        <el-switch v-model="form[item.name]" @change="changeStatus($event, item.name)"></el-switch>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
    <el-button @click="refreshModal = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="sureCache" size="mini">确 定</el-button>
  </span>
            </el-dialog>
            <tool-loading :loading="loading" category="spinner"></tool-loading>
        </div>
    </div>
</template>

<script>

    import SystemConfig from '../../views/config/systemConfig/SystemConfig';
    import LabelButton from '../../components/util/LabelButton';
    import {getUserPermission, refreshCache} from '../../service/request';
    import ToolLoading from '../../components/util/ToolLoading';
    import MainHead from '../../components/public/MainHead';

    export default {
        name: 'BlogConfig',
        components: {MainHead, ToolLoading, LabelButton, SystemConfig},
        data () {
            return {
                chooseTab: 'systemConfig',
                tabsForm: [
                    {label: '系统配置', name: 'systemConfig'}
                ],
                cacheForm: [
                    {label: '系统配置缓存', name: 'systemConfig'},
                    {label: '关注标签缓存', name: 'personalAttentionLabel'},
                    {label: '以上全部', name: 'all'}
                ],
                form: {
                    systemConfig: false,
                    labelConfig: false,
                    personalAttentionLabel: false,
                    all: false
                },
                loading: false,
                selected: false,
                refreshModal: false,
                labelWidth: '7rem',
                permission: ''
            };
        },
        created () {
            let scope = this;
            getUserPermission({condition: {}}).then(data => {
                scope.$response(data, '获取权限').then(data => {
                    scope.permission = data.data[0].permission;
                });
            });
        },
        methods: {
            futureTab (tab) {
                this.$router.push({path: '/' + tab});
            },
            chooseType (index) {
                let scope = this;
                scope.chooseTab = scope.tabsForm[index].name;
            },
            refresh () {
                let scope = this;
                scope.form = {
                    systemConfig: false,
                    labelConfig: false,
                    personalAttentionLabel: false,
                    all: false
                };
                scope.refreshModal = true;
            },
            formCheck () {
                let scope = this;
                if (!scope.form.systemConfig && !scope.form.labelConfig && !scope.form.personalAttentionLabel) {
                    this.$message.warning('请先选择缓存内容');
                    return false;
                }
                return true;
            },
            sureCache () {
                let scope = this;
                if (!scope.formCheck()) {
                    return;
                }
                scope.refreshModal = false;
                scope.loading = true;
                refreshCache({condition: scope.form}).then(data => {
                    if (data.status === 200) {
                        this.$message.success('刷新成功');
                    } else {
                        this.$message.error('刷新失败');
                    }
                }).finally(() => {
                    scope.loading = false;
                });
            },
            changeStatus ($event, type) {
                let scope = this;
                if (type === 'all') {
                    if ($event) {
                        if (!scope.form.systemConfig) {
                            setTimeout(() => {
                                scope.form.systemConfig = true;
                            }, 200);
                        }
                        if (!scope.form.labelConfig) {
                            setTimeout(() => {
                                scope.form.labelConfig = true;
                            }, 200);
                        }
                        if (!scope.form.personalAttentionLabel) {
                            setTimeout(() => {
                                scope.form.personalAttentionLabel = true;
                            }, 200);
                        }
                    } else {
                        if (scope.form.systemConfig) {
                            setTimeout(() => {
                                scope.form.systemConfig = false;
                            }, 200);
                        }
                        if (scope.form.labelConfig) {
                            setTimeout(() => {
                                scope.form.labelConfig = false;
                            }, 200);
                        }
                        if (scope.form.personalAttentionLabel) {
                            setTimeout(() => {
                                scope.form.personalAttentionLabel = false;
                            }, 200);
                        }
                    }
                } else {
                    if (scope.form.labelConfig && scope.form.systemConfig && scope.form.personalAttentionLabel) {
                        setTimeout(() => {
                            scope.form.all = true;
                        }, 200);
                    }
                    if (!scope.form.labelConfig && !scope.form.systemConfig && !scope.form.personalAttentionLabel) {
                        setTimeout(() => {
                            scope.form.all = false;
                        }, 200);
                    }
                    if (!$event && scope.form.all === true) {
                        setTimeout(() => {
                            scope.form.all = false;
                        }, 200);
                    }
                }
            }
        }
    };
</script>

<style lang='scss' scoped>
    .blog-config {
        width: 100%;
        height: 100%;
        position: relative;

        .frame-center {
            width: 100%;
            height: 90%;
            background-color: #f0f2f5;
            padding: .5rem;
            box-sizing: border-box;

            .config-left {
                width: 10%;
                height: 100%;
                background-color: white;
                float: left;

                .refresh-cache {
                    height: 2.5rem;
                    width: 85%;
                    padding: 7.5%;
                    border-bottom: 1px solid #ddd;

                    .button {
                        width: 100%;
                        height: 100%;
                        background: #bfbfbf;
                        border-radius: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: .75rem;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: white;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }
            }

            .config-right {
                width: calc(90% - .5rem);
                height: 100%;
                background-color: white;
                float: left;
                margin-left: .5rem;
            }

            .el-dialog {

                .el-dialog__body {
                    padding: 0.5rem 1rem 0.5rem 1rem;

                    .el-form {
                        .el-form-item {
                            margin-bottom: unset;
                        }
                    }
                }
            }
        }
    }
</style>
