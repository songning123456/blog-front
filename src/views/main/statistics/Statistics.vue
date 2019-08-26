<template>
    <div class='statistic global-css'>
        <side-menu-panel class='page-left' :side-bar='sideBar' title='大数据统计' :img-src='imgSrc'>
            <div slot='panel' class='slot-left'>
                <div class='left-content'>
                    <el-scrollbar>
                        <el-card class='box-card statistic-card' shadow="false">
                            <div slot='header'>
                                {{COMMON_MAP.DICTIONARY.CHOOSE_TIME}}
                            </div>
                            <tab-panel :tabs='time.choose' @rangeTime='rangeTime' ref='tabPanel'
                                       format='yyyy-MM-dd hh:mm:ss'></tab-panel>
                            <el-form ref='elForm' :model='form' label-width='5rem'>
                                <el-form-item label='开始时间'>
                                    <el-date-picker type='datetime' placeholder='请选择开始时间' v-model='form.startTime'
                                                    value-format='yyyy-MM-dd hh:mm:ss'></el-date-picker>
                                </el-form-item>
                                <el-form-item label='结束时间'>
                                    <el-date-picker type='datetime' placeholder='请选择开始时间' v-model='form.endTime'
                                                    value-format='yyyy-MM-dd hh:mm:ss'></el-date-picker>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-scrollbar>
                </div>
                <div class='left-query'>
                    <el-button type='primary' @click='query'>{{COMMON_MAP.DICTIONARY.QUERY}}</el-button>
                    <el-button type='warning' @click='reset'>{{COMMON_MAP.DICTIONARY.RESET}}</el-button>
                </div>
            </div>
        </side-menu-panel>
        <div @mousedown="sideBar.showing = false" class='page-right'></div>
    </div>
</template>

<script>
    import SideMenuPanel from '@/components/public/SideMenuPanel';
    import TabPanel from '@/components/public/TabPanel';

    export default {
        name: 'Statistics',
        components: {TabPanel, SideMenuPanel},
        data () {
            return {
                sideBar: {
                    showing: false
                },
                form: {
                    startTime: '',
                    endTime: ''
                },
                time: {
                    choose: [
                        {label: '近一天', value: '1'},
                        {label: '近三天', value: '3'},
                        {label: '近一周', value: '7'},
                        {label: '近一个月', value: '30'}
                    ]
                },
                imgSrc: require('../../../../static/statistic.svg')
            };
        },
        methods: {
            query () {

            },
            reset () {
                let scope = this;
                scope.$refs['tabPanel'].chooseType(0);
            },
            rangeTime (arg1, arg2) {
                let scope = this;
                scope.form.startTime = arg1;
                scope.form.endTime = arg2;
            }
        }
    };
</script>

<style lang="scss">
    @import '../../../style/main';

    .statistic {
        width: 100%;
        height: 100%;
        padding-top: .5rem;
        position: relative;
        box-sizing: border-box;

        .page-left {

            .slot-left {
                height: 100%;
                width: 100%;

                .left-content {
                    width: 100%;
                    height: 92%;

                    .statistic-card {
                        width: 90%;
                        margin: .4rem 0 .4rem 1rem;
                    }
                }

                .left-query {
                    width: 100%;
                    height: 8%;
                    line-height: 2.7rem;
                }
            }
        }

        .page-right {
            float: left;
            width: calc(100% - 2rem);
            height: 100%;
            position: relative;
            box-sizing: border-box;
        }
    }

</style>
