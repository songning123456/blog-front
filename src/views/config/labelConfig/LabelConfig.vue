<template>
    <div class='label-config'>
        <div class='label-content'>
            <single-label v-for='(item, index) in result' :key='index' :label-name='item.labelName'
                          :label-photo='item.labelPhoto'></single-label>
        </div>
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import EmptyView from '../../../components/util/EmptyView';
    import SingleLabel from '../../../views/config/labelConfig/components/SingleLabel';
    import {getAllLabel} from '../../../service/request';
    import ToolLoading from '@/components/util/ToolLoading';

    export default {
        name: 'LabelConfig',
        components: {ToolLoading, SingleLabel, EmptyView},
        data () {
            return {
                result: [],
                loading: false
            };
        },
        mounted () {
            let scope = this;
            scope.loading = true;
            getAllLabel().then((data) => {
                scope.$response(data, '获取所有标签').then(data => {
                    scope.result = data.data;
                });
            }).finally(() => {
                scope.loading = false;
            });
        }
    };
</script>

<style lang='scss'>
    .label-config {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .label-content {
            width: 51%;
            height: 90%;
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

</style>
