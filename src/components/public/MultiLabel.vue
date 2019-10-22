<template>
    <div class='multi-label'>
        <single-label v-for='(item, index) in result' :key='index' :data='item' :is-chosen='isChosen === index'
                      @click.native='sureChosen(item,index)' @updateParam='updateIsAttention'></single-label>
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import SingleLabel from '../../views/config/labelConfig/components/SingleLabel';
    import {getAllLabel, updateAttention} from '../../service/request';
    import ToolLoading from '../../components/util/ToolLoading';

    export default {
        name: 'MultiLabel',
        components: {ToolLoading, SingleLabel},
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
            query (labelFuzzyName) {
                let scope = this;
                scope.form.labelFuzzyName = labelFuzzyName;
                let form = {
                    labelFuzzyName: labelFuzzyName
                };
                let param = {
                    condition: form
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
            },
            sureChosen (item, index) {
                let scope = this;
                scope.isChosen = index;
                scope.$emit('chosen', item.labelName);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .multi-label {
        width: 100%;
        height: 100%;
    }
</style>
