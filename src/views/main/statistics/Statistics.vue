<template>
    <div class='statistic global-css'>
        <side-menu-panel class='page-left' :side-bar='sideBar' title='大数据统计' :img-src='imgSrc'>
            <div slot='panel' class='slot-left'>
                <div class='left-content'>
                    <el-scrollbar>
                        <el-card class='box-card statistic-card' shadow='false'>
                            <div slot='header'>
                                {{COMMON_MAP.DICTIONARY.CHOOSE_TIME}}
                            </div>
                            <tab-panel :tabs='time.choose' @rangeTime='rangeTime' ref='tabPanel'
                                       format='yyyy-MM-dd hh:mm:ss'></tab-panel>
                            <el-form :model='form' label-width='5rem'>
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
                        <el-card class='box-card statistic-card' shadow='false'>
                            <div slot='header'>
                                {{COMMON_MAP.DICTIONARY.STATISTIC_TYPE}}
                            </div>
                            <el-form :model='form' label-width='5rem'>
                                <el-form-item label='按类型统计'>
                                    <el-select v-model='form.type' placeholder='请选择类型'>
                                        <el-option label='作者' value='author'></el-option>
                                        <el-option label='种类' value='kinds'></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-scrollbar>
                </div>
                <div class='left-query'>
                    <el-button type='primary' @click='query' :loading='loading'>{{COMMON_MAP.DICTIONARY.QUERY}}
                    </el-button>
                    <el-button type='warning' plain @click='reset'>{{COMMON_MAP.DICTIONARY.RESET}}</el-button>
                </div>
            </div>
        </side-menu-panel>
        <div @mousedown="sideBar.showing = false" class='page-right statistic-layout'>
            <div class='content-top'>
                <div class='content-left'>
                    <e-charts :option='option'></e-charts>
                </div>
                <div class='content-right'>
                    <e-charts></e-charts>
                </div>
            </div>
            <div class='content-bottom'>
                <div class='content-left'>
                    <e-charts></e-charts>
                </div>
                <div class='content-right'>
                    <e-charts></e-charts>
                </div>
            </div>
        </div>
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import SideMenuPanel from '@/components/public/SideMenuPanel';
    import TabPanel from '@/components/public/TabPanel';
    import {getHadoop} from '@/service/request';
    import ToolLoading from '@/components/util/ToolLoading';
    import ECharts from '@/components/public/ECharts';

    export default {
        name: 'Statistics',
        components: {ECharts, ToolLoading, TabPanel, SideMenuPanel},
        data () {
            return {
                sideBar: {
                    showing: false
                },
                form: {
                    startTime: '',
                    endTime: '',
                    type: 'author'
                },
                loading: false,
                time: {
                    choose: [
                        {label: '近一天', value: '1'},
                        {label: '近三天', value: '3'},
                        {label: '近一周', value: '7'},
                        {label: '近一个月', value: '30'}
                    ]
                },
                option: {
                    first: {}
                },
                charData: {
                    first: {
                        legend: [],
                        data: [],
                        legendSelected: {}
                    }
                },
                imgSrc: require('../../../../static/statistic.svg')
            };
        },
        methods: {
            formCheck () {
                let scope = this;
                if (!scope.form.startTime) {
                    scope.$message.error('开始时间不能为空!');
                    return false;
                }
                if (!scope.form.endTime) {
                    scope.$message.error('结束时间不能为空!');
                    return false;
                }
                if (Date.parse(scope.form.endTime) <= Date.parse(scope.form.startTime)) {
                    scope.$message.error('开始时间不能大于结束时间');
                    return false;
                }
                return true;
            },
            query () {
                let scope = this;
                scope.sideBar.showing = false;
                scope.loading = true;
                if (scope.formCheck()) {
                    scope.statistic();
                }
            },
            statistic () {
                let scope = this;
                let param = {
                    condition: scope.form
                };
                getHadoop(param).then((data) => {
                    if (data.status === 200) {
                        if (data.total > 0) {
                            scope.chartData.first.data = data.data.map(item => {
                                let obj = {
                                    name: item.xAxis,
                                    value: item.yAxis
                                };
                                return obj;
                            });
                            scope.char.first.legend = data.data.map(item => item.xAxis);
                        } else {
                            scope.$message.error('查询为空');
                        }
                    } else {
                        scope.$message.error(data.message ? data.message : '查询出错');
                    }
                }).catch().finally(() => {
                        scope.loading = false;
                    }
                );
            },
            reset () {
                let scope = this;
                scope.$refs['tabPanel'].chooseType(0);
            },
            rangeTime (arg1, arg2) {
                let scope = this;
                scope.form.startTime = arg1;
                scope.form.endTime = arg2;
            },
            getFirstOption () {
                let scope = this;
                return {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: scope
                    }
                };
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

            &.statistic-layout {
                padding: 0 1rem 1rem 1rem;
                box-sizing: border-box;
            }

            .content-top {
                width: 100%;
                height: 50%;
            }

            .content-bottom {
                width: 100%;
                height: 50%;
            }

            .content-left {
                width: 50%;
                height: 100%;
                float: left;
                padding: 1rem;
                box-sizing: border-box;
            }

            .content-right {
                width: 50%;
                height: 100%;
                float: left;
                padding: 1rem;
                box-sizing: border-box;
            }
        }
    }

</style>
