<template>
    <div class='experiment'>
        <div class='experiment-left'>
            <div class='top'>
                <label-button v-for='(item, index) in tabsForm' :key='index' :label='item.label'
                              @click.native='chooseType(index)'
                              :normal='!(chooseTab === tabsForm[index].path)'></label-button>
            </div>
            <div class='bottom'>
                <el-button type="warning" plain @click.native='goback'>返回首页</el-button>
            </div>
        </div>
        <div class='experiment-right'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import LabelButton from '../../components/util/LabelButton';

    export default {
        name: 'Experiment',
        components: {LabelButton},
        data () {
            return {
                chooseTab: '',
                tabsForm: [
                    {label: '懒加载', path: 'lazy-experiment'},
                    {label: '实验1', path: 'one-experiment'},
                    {label: '实验2', path: 'two-experiment'},
                    {label: '实验3', path: 'three-experiment'},
                    {label: '实验4', path: 'four-experiment'}
                ]
            };
        },
        mounted () {
            let scope = this;
            scope.chooseType(0);
        },
        methods: {
            chooseType (index) {
                let scope = this;
                if (index === 0) {
                    scope.chooseTab = scope.tabsForm[index].path;
                    scope.$router.push({path: '/experiment/' + scope.tabsForm[index].path});
                } else {
                    scope.$msg('暂时不可用', 'warning');
                }
            },
            goback () {
                let scope = this;
                scope.$homePage('read');
            }
        }
    };
</script>

<style lang='scss' scoped>
    .experiment {
        width: 100%;
        height: 100%;
        background-color: #f0f2f5;
        padding: .5rem;
        box-sizing: border-box;

        .experiment-left {
            width: 10%;
            height: 100%;
            background-color: white;
            float: left;

            .top {
                width: 100%;
                height: 92%;
                overflow: auto;
            }

            .bottom {
                width: 100%;
                height: 8%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .experiment-right {
            width: calc(90% - .5rem);
            height: 100%;
            background-color: white;
            float: left;
            margin-left: .5rem;
        }
    }
</style>
