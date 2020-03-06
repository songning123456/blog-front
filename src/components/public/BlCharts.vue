<template>
    <div class='bl-charts' ref='ECharts'></div>
</template>

<script>
    import echarts from 'echarts';
    import elementResizeDetectorMaker from 'element-resize-detector';

    export default {
        name: 'BlCharts',
        components: echarts,
        data () {
            return {
                chart: null,
                data: {}
            };
        },
        props: {
            option: Object,
            autoClear: {
                type: Boolean,
                default: true
            }
        },
        mounted () {
            let scope = this;
            this.$nextTick(() => {
                if (!scope.chart) {
                    scope.init();
                }
            });
        },
        watch: {
            option: {
                // 图表数据改变后的回调
                handler (newVal, oldVal) {
                    let scope = this;
                    if (scope.chart) {
                        if (scope.autoClear) {
                            scope.chart.clear();
                        }
                        if (newVal) {
                            scope.chart.setOption(newVal);
                        } else {
                            scope.chart.setOption(oldVal);
                        }
                    }
                },
                deep: true
            }
        },
        methods: {
            init () {
                this.chart = echarts.init(this.$refs['ECharts'], 'light');
                let scope = this;
                scope.chart.setOption(scope.option);
                scope.chart.on('click', function (param) {
                    scope.data = {
                        name: param.name,
                        value: param.data
                    };
                    scope.$emit('dataClicked', self.data);
                });
                scope.chart.on('legendselectchanged', function (param) {
                    scope.$emit('legendselectchanged', param);
                });
                // 监听某个div的变化，然后执行相应的事件
                let erd = elementResizeDetectorMaker();
                erd.listenTo(this.$refs['ECharts'], () => {
                    if (scope.chart) {
                        scope.chart.resize();
                    }
                });
            }
        }
    };
</script>

<style lang="scss">
    .bl-charts {
        width: 100%;
        height: 100%;
    }

</style>
