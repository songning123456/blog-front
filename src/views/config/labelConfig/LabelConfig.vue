<template>
    <div class='label-config'>
        <div class='label-content'>
            <single-label v-for='(item, index) in result' :key='index' :label-name='item.labelName'
                          :label-photo='item.labelPhoto'></single-label>
        </div>
    </div>
</template>

<script>
    import EmptyView from '../../../components/util/EmptyView';
    import SingleLabel from '../../../views/config/labelConfig/components/SingleLabel';
    import {getAllLabel} from '../../../service/request';
    import ResponseUtil from '../../../utils/ResponseUtil';

    export default {
        name: 'LabelConfig',
        components: {SingleLabel, EmptyView},
        data () {
            return {
                result: []
            };
        },
        mounted () {
            let scope = this;
            getAllLabel().then((data) => {
                ResponseUtil.response(data, '获取所有标签').then(data => {
                    scope.result = data.data;
                }).catch(message => {
                    scope.$msg(message);
                });
            }).finally();
        }
    };
</script>

<style lang='scss'>
    .label-config {
        width: 100%;
        height: 100%;

        .label-content {
            width: 100%;
            height: 100%;
            overflow: auto;
        }
    }

</style>
