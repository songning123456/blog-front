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
                                        <el-option label='种类' value='kinds'></el-option>
                                        <el-option label='作者' value='author'></el-option>
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
            <div style='width: 100%;height: 100%' v-if='JSON.stringify(result) !== "{}"'>
                <div class='content-top'>
                    <div class='content-left'>
                        <e-charts :option='option.first'></e-charts>
                    </div>
                    <div class='content-right'>
                        <e-charts :option='option.second'></e-charts>
                    </div>
                </div>
                <div class='content-bottom'>
                    <div class='content-left'>
                        <e-charts :option='option.third'></e-charts>
                    </div>
                    <div class='content-right'>
                        <e-charts :option='option.fourth'></e-charts>
                    </div>
                </div>
            </div>
            <empty-view v-if='JSON.stringify(result) === "{}"'></empty-view>
        </div>
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import SideMenuPanel from '../../../components/public/SideMenuPanel';
    import TabPanel from '../../../components/public/TabPanel';
    import {getHadoop, insertHistoryInfo} from '../../../service/request';
    import ToolLoading from '../../../components/util/ToolLoading';
    import ECharts from '../../../components/public/ECharts';
    import EmptyView from '../../../components/util/EmptyView';

    export default {
        name: 'Statistics',
        components: {EmptyView, ECharts, ToolLoading, TabPanel, SideMenuPanel},
        data () {
            return {
                sideBar: {
                    showing: false
                },
                form: {
                    startTime: '',
                    endTime: '',
                    type: 'kinds'
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
                    first: {},
                    second: {},
                    third: {},
                    fourth: {}
                },
                chartData: {
                    first: {
                        legend: [],
                        data: [],
                        legendSelected: {}
                    },
                    second: {
                        xAxisData: [],
                        seriesData: []
                    },
                    third: {},
                    fourth: {
                        xAxisData: [],
                        seriesData: []
                    }
                },
                result: {},
                imgSrc: require('../../../assets/statistic.svg')
            };
        },
        watch: {
            result: {
                handler (newVal, oldVal) {
                    if (Object.keys(newVal).length !== 0) {
                        let scope = this;
                        let keyValues = newVal.map(item => {
                            let obj = {
                                name: item.xaxis,
                                value: item.yaxis
                            };
                            return obj;
                        });
                        let keys = newVal.map(item => item.xaxis);
                        let values = newVal.map(item => item.yaxis);

                        scope.chartData.first.data = keyValues;
                        scope.chartData.first.legend = keys;
                        keys.forEach((key, i) => {
                            if (i < 8) {
                                scope.chartData.first.legendSelected[keys[i]] = true;
                            } else {
                                scope.chartData.first.legendSelected[keys[i]] = false;
                            }
                        });
                        scope.option.first = scope.getFirstOption();

                        scope.chartData.second.xAxisData = keys;
                        scope.chartData.second.seriesData = values;
                        scope.option.second = scope.getSecondOption();

                        scope.chartData.third.xAxisData = keys;
                        scope.chartData.third.seriesData = values;
                        scope.option.third = scope.getThirdOption();

                        scope.chartData.fourth.xAxisData = keys;
                        scope.chartData.fourth.seriesData = values;
                        scope.option.fourth = scope.getFourth();
                    }
                },
                deep: true
            }
        },
        mounted () {
            let scope = this;
            scope.statistic();
            insertHistoryInfo({condition: {title: scope.COMMON_MAP.HISTORY.STATISTIC}}).then(data => {
                if (data.status !== 200) {
                    scope.$msg('插入历史信息失败!');
                }
            });
        },
        methods: {
            formCheck () {
                let scope = this;
                if (!scope.form.startTime) {
                    scope.$msg('开始时间不能为空!');
                    return false;
                }
                if (!scope.form.endTime) {
                    scope.$msg('结束时间不能为空!');
                    return false;
                }
                if (Date.parse(scope.form.endTime) <= Date.parse(scope.form.startTime)) {
                    scope.$msg('开始时间不能大于结束时间!');
                    return false;
                }
                return true;
            },
            query () {
                let scope = this;
                scope.sideBar.showing = false;
                scope.result = {};
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
                    scope.$response(data, '大数据统计').then(data => {
                        scope.result = data.data;
                    });
                }).finally(() => {
                        scope.loading = false;
                    }
                );
            },
            reset () {
                let scope = this;
                scope.form.type = 'kinds';
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
                        type: 'scroll',
                        orient: 'vertical',
                        top: 0,
                        left: 'left',
                        pageButtonPosition: 'end',
                        data: scope.chartData.first.legend,
                        selected: scope.chartData.first.legendSelected
                    },
                    series: {
                        name: '大数据统计(饼状图)',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: scope.chartData.first.data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                };
            },
            getSecondOption () {
                let scope = this;
                return {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    grid: {
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: scope.chartData.second.xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 15
                            }
                        }
                    ],
                    yAxis: {
                        name: '数量',
                        interVal: 0,
                        formatter: (value) => {
                            return (value.length > 6 ? (value.slice(0, 6) + '...') : value);
                        }
                    },
                    series: [
                        {
                            name: '大数据统计',
                            type: 'bar',
                            barWidth: '60%',
                            data: scope.chartData.second.seriesData,
                            itemStyle: {
                                //通常情况下：
                                normal: {
                                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                    color: function (params) {
                                        let colorList = ['#65d186', '#f67287', '#f29e3c', '#c05bdd', '#7a65f2']; //每根柱子的颜色
                                        return colorList[params.dataIndex % colorList.length];
                                    }
                                },
                                //鼠标悬停时：
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ],
                    dataZoom: [{ //添加X轴滚动条
                        type: 'slider',
                        show: true,
                        start: 0,
                        end: parseInt(scope.chartData.second.xAxisData.length / 30),
                        handleSize: 8
                    }]
                };
            },
            getThirdOption () {
                let scope = this;
                return {
                    angleAxis: {
                        type: 'category',
                        data: scope.chartData.third.xAxisData,
                        z: 10
                    },
                    radiusAxis: {},
                    polar: {},
                    series: [{
                        type: 'bar',
                        data: scope.chartData.third.seriesData,
                        coordinateSystem: 'polar',
                        // name: scope.form.type,
                        // stack: scope.form.type,
                        color: function (params) {
                            let colorList = ['#65d186', '#f67287', '#f29e3c', '#c05bdd', '#7a65f2']; //每根柱子的颜色
                            return colorList[params.dataIndex % colorList.length];
                        }
                    }],
                    legend: {
                        show: true,
                        data: [scope.form.type]
                    }
                };
            },
            getFourth () {
                let scope = this;
                return {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: scope.chartData.fourth.xAxisData
                    },
                    yAxis: {
                        name: '数量',
                        type: 'value'
                    },
                    series: [{
                        data: scope.chartData.fourth.seriesData,
                        type: 'line',
                        color: ['#58afed'], //折线颜色
                        areaStyle: {
                            color: '#3bcec6' //折线下方色块颜色
                        }
                    }],
                    dataZoom: [{ //添加X轴滚动条
                        type: 'slider',
                        show: true,
                        start: 0,
                        end: parseInt(scope.chartData.fourth.xAxisData.length / 4),
                        handleSize: 8
                    }]
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
