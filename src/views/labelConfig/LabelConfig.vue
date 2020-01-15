<template>
    <div class='label-config'>
        <main-head @futureTab='futureTab' ref='mainHead'></main-head>
        <div class="top-frame">
            <el-form :inline="true" :model='form'>
                <el-form-item label='标签名称'>
                    <el-input v-model='form.labelFuzzyName' placeholder='标签名称' clearable @keyup.enter.native='query'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.stop="query">查询</el-button>
                    <el-button @click.stop="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="bottom-frame">
            <single-label v-for='(item, index) in result' :key='index' :data='item' :is-chosen='isChosen === index'
                          @click.native='isChosen = index' @updateParam='updateIsAttention'></single-label>
        </div>
        <tool-loading :loading='loading' category="spinner"></tool-loading>
    </div>
</template>

<script>
    import EmptyView from '../../components/util/EmptyView';
    import SingleLabel from './components/SingleLabel';
    import {getAllLabel, updateAttention} from '../../service/request';
    import ToolLoading from '../../components/util/ToolLoading';
    import MainHead from '../../components/public/MainHead';

    export default {
        name: 'LabelConfig',
        components: {MainHead, ToolLoading, SingleLabel, EmptyView},
        data () {
            return {
                result: [],
                loading: false,
                form: {
                    labelFuzzyName: ''
                },
                isChosen: ''
            };
        },
        mounted () {
            let scope = this;
            scope.search();
        },
        methods: {
            futureTab (tab) {
                this.$router.push({path: '/' + tab});
            },
            query () {
                let scope = this;
                let form = {
                    labelFuzzyName: scope.form.labelFuzzyName
                };
                let param = {
                    condition: form
                };
                scope.search(param);
            },
            reset () {
                let scope = this;
                scope.form = {
                    labelFuzzyName: ''
                };
                let param = {
                    condition: scope.form
                };
                scope.search(param);
            },
            search (param = {condition: {labelFuzzyName: ''}}) {
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
            },
            updateIsAttention (param, loading) {
                let scope = this;
                param.condition.labelFuzzyName = scope.form.labelFuzzyName || '';
                updateAttention(param).then(data => {
                    scope.$response(data, '更新关注标签').then(data => {
                        scope.result = data.data;
                    });
                }).finally(() => {
                    loading.status = false;
                });
            }
        }
    };
</script>

<style lang='scss'>
    .label-config {
        width: 100%;
        height: 100%;

        .top-frame {
            width: 100%;
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;

            .el-form {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: .8rem 0 .8rem 0;

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

        .bottom-frame {
            width: 56%;
            float: left;
            position: absolute;
            left: 20%;
            height: 80%;
            overflow: auto;
            border: 1px solid #f9f9f9;
        }
    }

</style>
