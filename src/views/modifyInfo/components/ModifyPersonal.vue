<template>
    <div class="modify-personal">
        <div class="layout-left">
            <el-button type="success" plain @click='choose(1)'>预览</el-button>
            <el-button type="warning" plain @click='choose(2)'>新增</el-button>
        </div>
        <div class="layout-right">
            <div class="content" v-show="current === 1">
                <el-scrollbar>
                    <single-info v-for="(item, index) in result" :key="index" :info="item"
                                 @update="updateInfo"></single-info>
                </el-scrollbar>
            </div>
            <empty-view v-show="current === 0"></empty-view>
        </div>
        <tool-loading :loading="loading" normal="spinner"></tool-loading>
    </div>
</template>

<script>
    import SingleInfo from './children/SingleInfo';
    import EmptyView from '../../../components/util/EmptyView';
    import {getMyInfo, updatePersonalInformation} from '../../../service/request';
    import ToolLoading from '../../../components/util/ToolLoading';

    export default {
        name: 'ModifyPersonal',
        components: {ToolLoading, EmptyView, SingleInfo},
        data () {
            return {
                current: 1, // 空白展示
                loading: false,
                result: []
            };
        },
        mounted () {
            let scope = this;
            getMyInfo({condition: {}}).then(data => {
                scope.$response(data).then(data => {
                    scope.result = data.data;
                });
            });
        },
        methods: {
            choose (type) {
                let scope = this;
                scope.current = type;
            },
            updateInfo (form) {
                let scope = this;
                scope.loading = true;
                updatePersonalInformation({condition: form}).then(data => {
                    scope.$response(data, '更新个人信息').then(data => {
                        scope.$response(data).then(data => {
                            scope.result = data.data;
                        });
                    });
                }).finally(() => {
                    scope.loading = false;
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .modify-personal {
        width: 100%;
        height: 100%;
        position: relative;

        .layout-left {
            height: 100%;
            width: 8%;
            float: left;

            .el-button:first-child {
                position: relative;
                top: 34%;
                width: 50%;
            }

            .el-button:nth-child(2) {
                position: relative;
                top: 37%;
                width: 50%;
                margin-left: unset;
            }
        }

        .layout-right {
            height: 100%;
            width: 92%;
            float: left;

            display: flex;
            justify-content: center;
            align-items: center;

            .content {
                width: 40%;
                height: 90%;
            }
        }
    }
</style>
