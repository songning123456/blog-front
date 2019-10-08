<template>
    <div class='blog-config'>
        <div class='config-left'>
            <label-button v-for='(item, index) in tabsForm' :key='index' :label='item.label'
                          @click.native='chooseType(index)'
                          :normal='!(chooseTab === tabsForm[index].name)'></label-button>
        </div>
        <div class='config-right'>
            <system-config v-if='chooseTab === tabsForm[0].name'></system-config>
            <label-config v-else-if='chooseTab === tabsForm[1].name'></label-config>
        </div>
    </div>
</template>

<script>

    import SystemConfig from '../../views/config/systemConfig/SystemConfig';
    import LabelButton from '../../components/util/LabelButton';
    import LabelConfig from '@/views/config/labelConfig/LabelConfig';

    export default {
        name: 'BlogConfig',
        components: {LabelConfig, LabelButton, SystemConfig},
        data () {
            return {
                chooseTab: 'systemConfig',
                tabsForm: [
                    {label: '系统配置', name: 'systemConfig'},
                    {label: '标签配置', name: 'labelConfig'}
                ],
                selected: false
            };
        },
        methods: {
            chooseType (index) {
                let scope = this;
                scope.chooseTab = scope.tabsForm[index].name;
            }
        }
    };
</script>

<style lang='scss'>
    .blog-config {
        width: 100%;
        height: 100%;
        background-color: #f0f2f5;
        padding: .5rem;
        box-sizing: border-box;

        .config-left {
            width: 10%;
            height: 100%;
            background-color: white;
            float: left;
        }

        .config-right {
            width: calc(90% - .5rem);
            height: 100%;
            background-color: white;
            float: left;
            margin-left: .5rem;
        }
    }
</style>
