<template>
    <div class="statistics">
        <main-head current-tab="statistics" ref='mainHead'></main-head>
        <div class='frame-center global-css'>
            <side-menu-panel class='page-left' :side-bar='sideBar' title='大数据统计' :img-src='imgSrc'>
                <div slot='panel' class='slot-left'>
                    <div class='left-content'>
                        <el-scrollbar>
                            <el-card class='box-card statistic-card' shadow='false'>
                                <div slot='header'>
                                    {{COMMON_MAP.DICTIONARY.CHOOSE_TIME}}
                                </div>
                                <tab-panel :tabs='time.choose' @rangeTime='rangeTime' ref='tabPanel'
                                           format='yyyy-MM-dd hh:mm:ss' :index='3'></tab-panel>
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
                            <div class='content-title'></div>
                            <bl-charts :option='option.first'></bl-charts>
                        </div>
                        <div class='content-right'>
                            <div class='content-title'></div>
                            <bl-charts :option='option.second'></bl-charts>
                        </div>
                    </div>
                    <div class='content-bottom'>
                        <div class='content-left'>
                            <div class='content-title'></div>
                            <bl-charts :option='option.third'></bl-charts>
                        </div>
                        <div class='content-right'>
                            <div class='content-title'></div>
                            <bl-charts :option='option.fourth'></bl-charts>
                        </div>
                    </div>
                </div>
                <empty-view v-if='JSON.stringify(result) === "{}"'></empty-view>
            </div>
            <tool-loading :loading='loading'></tool-loading>
        </div>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import SideMenuPanel from '../../components/public/SideMenuPanel';
    import TabPanel from '../../components/public/TabPanel';
    import {getHadoop, insertHistoryInfo} from '../../service/http';
    import ToolLoading from '../../components/util/ToolLoading';
    import BlCharts from '../../components/public/BlCharts';
    import EmptyView from '../../components/util/EmptyView';

    export default {
        name: 'Statistics',
        components: {MainHead, EmptyView, BlCharts, ToolLoading, TabPanel, SideMenuPanel},
        data() {
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
                imgSrc: require('../../assets/statistic.svg')
            };
        },
        watch: {
            result: {
                handler(newVal, oldVal) {
                    if (Object.keys(newVal).length !== 0) {
                        let keyValues = newVal.map(item => {
                            let obj = {
                                name: item.xaxis,
                                value: item.yaxis
                            };
                            return obj;
                        });
                        let keys = newVal.map(item => item.xaxis);
                        let values = newVal.map(item => item.yaxis);

                        this.chartData.first.data = keyValues;
                        this.chartData.first.legend = keys;
                        keys.forEach((key, i) => {
                            this.chartData.first.legendSelected[keys[i]] = i < 8;
                        });
                        this.option.first = this.getFirstOption();

                        this.chartData.second.xAxisData = keys;
                        this.chartData.second.seriesData = values;
                        this.option.second = this.getSecondOption();

                        this.chartData.third.xAxisData = keys;
                        this.chartData.third.seriesData = values;
                        this.option.third = this.getThirdOption();

                        this.chartData.fourth.xAxisData = keys;
                        this.chartData.fourth.seriesData = values;
                        this.option.fourth = this.getFourth();
                    }
                },
                deep: true
            }
        },
        activated() {
            this.sideBar.showing = true;
        },
        methods: {
            formCheck() {
                if (!this.form.startTime) {
                    this.$message.error('开始时间不能为空!');
                    return false;
                }
                if (!this.form.endTime) {
                    this.$message.error('结束时间不能为空!');
                    return false;
                }
                if (Date.parse(this.form.endTime) <= Date.parse(this.form.startTime)) {
                    this.$message.error('开始时间不能大于结束时间!');
                    return false;
                }
                return true;
            },
            query() {
                this.sideBar.showing = false;
                this.result = {};
                this.loading = true;
                if (this.formCheck()) {
                    this.statistic();
                }
            },
            statistic() {
                let param = {
                    condition: this.form
                };
                getHadoop(param).then((data) => {
                    this.$response(data, '大数据统计').then(data => {
                        this.result = data.data;
                    });
                }).finally(() => {
                    this.loading = false;
                        // 插入历史信息
                        insertHistoryInfo({condition: {title: this.COMMON_MAP.HISTORY.STATISTIC}}).then(data => {
                            if (data.status !== 200) {
                                this.$message.error('插入历史信息失败!');
                            }
                        });
                    }
                );
            },
            reset() {
                this.form.type = 'kinds';
                this.$refs['tabPanel'].chooseType(0);
            },
            rangeTime(arg1, arg2) {
                this.form.startTime = arg1;
                this.form.endTime = arg2;
            },
            getFirstOption() {
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
                        data: this.chartData.first.legend,
                        selected: this.chartData.first.legendSelected
                    },
                    series: {
                        name: '大数据统计(饼状图)',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: this.chartData.first.data,
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
            getSecondOption() {
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
                            data: this.chartData.second.xAxisData,
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
                            data: this.chartData.second.seriesData,
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
                        end: parseInt(this.chartData.second.xAxisData.length / 30),
                        handleSize: 8
                    }]
                };
            },
            getThirdOption() {
                return {
                    xAxis: {
                        type: 'category',
                        data: this.chartData.third.xAxisData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.chartData.third.seriesData,
                        type: 'line',
                        smooth: true
                    }],
                    dataZoom: [{ //添加X轴滚动条
                        type: 'slider',
                        show: true,
                        start: 0,
                        end: parseInt(this.chartData.third.xAxisData.length / 10),
                        handleSize: 8
                    }]
                };
            },
            getFourth() {
                return {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.chartData.fourth.xAxisData
                    },
                    yAxis: {
                        name: '数量',
                        type: 'value'
                    },
                    series: [{
                        data: this.chartData.fourth.seriesData,
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
                        end: parseInt(this.chartData.fourth.xAxisData.length / 4),
                        handleSize: 8
                    }]
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .statistics {
        position: relative;
        width: 100%;
        height: 100%;

        .frame-center {
            width: 100%;
            height: 90%;
            padding-top: .5rem;
            position: relative;
            box-sizing: border-box;

            .page-left {

                .slot-left {
                    height: 100%;
                    width: calc(100% - .8rem);
                    float: left;
                    background: white;

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
                    width: calc(50% - 1.1rem);
                    height: calc(100% - 1.1rem);
                    margin: .5rem;
                    float: left;
                    border: 0.05rem solid #f0f2f9;
                }

                .content-right {
                    width: calc(50% - 1.1rem);
                    height: calc(100% - 1.1rem);
                    margin: .5rem;
                    float: left;
                    border: 0.05rem solid #f0f2f9;
                }

                .content-title {
                    height: 2rem;
                    width: 100%;
                    float: left;
                    background-color: #f0f2f9;
                }

                .bl-charts {
                    height: calc(100% - 2.1rem);
                }
            }
        }

        .global-css {
            // 表单
            /deep/ .el-form {
                /deep/ .el-form-item {
                    margin-bottom: .3rem;

                    /deep/ .el-form-item__label {
                        font-size: .7rem;
                        line-height: 2rem;
                        padding: 0 .6rem 0 0;
                    }

                    /deep/ .el-form-item__content {
                        line-height: 2rem;
                        font-size: .7rem;
                    }
                }
            }

            // 按钮
            .el-button {
                padding: .6rem 1.8rem;
            }

            /deep/ .el-card {
                border: unset;

                /deep/ .el-card__header {
                    background-color: #d8edff;
                    padding: .3rem 1rem;
                    border-radius: 0.2rem 0.2rem 0 0;
                    font-size: 0.75rem;
                    font-weight: bold;
                    color: #427BF1;
                }

                /deep/ .el-card__body {
                    background-color: #ecf6ff;
                    padding: .5rem;
                }
            }

            .el-date-editor {
                font-size: .7rem;
            }

            .el-input {
                width: 11rem;

                input {
                    height: 2rem;

                    &.el-input__inner {
                        padding-left: 1.5rem;
                        padding-right: 1.5rem;
                    }
                }

                .el-input__prefix {
                    left: 0.25rem;

                    .el-input__icon {
                        line-height: 2rem;
                        width: 1.25rem;
                    }
                }
            }
        }
    }
</style>
