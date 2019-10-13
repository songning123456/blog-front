<template>
    <div class='label-config'>
        <div class='title'><span>标签配置</span></div>
        <div class='search'>
            <div class='content'>
                <el-form :inline="true" :model='form'>
                    <el-form-item label='标签名称'>
                        <el-input v-model='form.labelName' placeholder='标签名称' clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="query">查询</el-button>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class='display'>
            <div class='label-content'>
                <multiple-label :data='result' ></multiple-label>
            </div>
        </div>
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import EmptyView from '../../../components/util/EmptyView';
    import SingleLabel from '../../../views/config/labelConfig/components/SingleLabel';
    import {getAllLabel} from '../../../service/request';
    import ToolLoading from '../../../components/util/ToolLoading';
    import MultipleLabel from './components/MultipleLabel';

    export default {
        name: 'LabelConfig',
        components: {MultipleLabel, ToolLoading, SingleLabel, EmptyView},
        data () {
            return {
                result: [],
                loading: false,
                form: {
                    labelName: ''
                }
            };
        },
        mounted () {
            let scope = this;
            scope.search();
        },
        methods: {
            query () {
                let scope = this;
                let form = {
                    labelName: scope.form.labelName
                };
                let param = {
                    condition: form
                };
                scope.search(param);
            },
            reset () {
                let scope = this;
                scope.form = {
                    labelName: ''
                };
                let param = {
                    condition: scope.form
                };
                scope.search(param);
            },
            search (param = {condition: {labelName: ''}}) {
                let scope = this;
                scope.loading = true;
                scope.result = [];
                getAllLabel(param).then(data => {
                    scope.$response(data, '获取所有标签').then(data => {
                        scope.result = data.data;
                    });
                }).finally(() => {
                    scope.loading = false;
                });
            }
        }
    };
</script>

<style lang='scss'>
    .label-config {
        width: 100%;
        height: 100%;
        padding: 0 .5rem;
        box-sizing: border-box;

        .title {
            width: 100%;
            height: 5%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 1.2rem;
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
            height: 85%;
            display: flex;
            justify-content: center;
            align-items: flex-start;

            .label-content {
                width: 51%;
                height: 98%;
                overflow: auto;
                border: 1px solid #f9f9f9;

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
        }
    }

</style>
