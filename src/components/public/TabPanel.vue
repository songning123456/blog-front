<template>
    <div class='tab-panel'>
        <div v-for='(item, index) in tabs' :key='index'
             class='single-tab' :class="activeIndex === index ? 'active' : ''"
             @click='chooseType(index)' :style="'width: calc(100% / ' + tabs.length + ')'">
            <span>{{item.label}}</span>
        </div>
    </div>
</template>

<script>
    import DateUtil from '../../utils/DateUtil';

    export default {
        name: 'TabPanel',
        props: {
            // 显示的值
            tabs: {
                type: Array,
                // eslint-disable-next-line vue/require-valid-default-prop
                default: []
            },
            // 转换格式
            format: {
                type: String,
                default: 'yyyyMMddHHmmss'
            }
        },
        data () {
            return {
                time: {
                    start: '',
                    end: ''
                },
                activeIndex: 0
            };
        },
        methods: {
            chooseType (index) {
                let scope = this;
                scope.activeIndex = index;
                scope.chooseTime(index);
                scope.$emit('rangeTime', scope.time.start, scope.time.end);
            },
            chooseTime (index) {
                let scope = this;
                let start = new Date();
                scope.tabs.forEach((item, i) => {
                    if (index === i) {
                        start.setDate(start.getDate() - item.value);
                    }
                });
                let end = new Date();
                end.setDate(end.getDate());
                // 判断是否需要转换
                if (scope.format === 'none') {
                    scope.time.start = start;
                    scope.time.end = end;
                } else if (scope.format === 'yyyy-MM-dd hh:mm:ss') {
                    scope.time.start = DateUtil.formatDate(start);
                    scope.time.end = DateUtil.formatDate(end);
                } else if (scope.format === 'yyyyMMddHHmmss') {
                } else {
                    // ...
                }
            }
        },
        mounted () {
            let scope = this;
            // 默认执行
            scope.chooseType(0);
        }
    };
</script>

<style lang='scss'>
    .tab-panel {
        height: 2rem;
        padding-left: .8rem;
        padding-bottom: .2rem;
        box-sizing: border-box;

        .single-tab {
            height: 100%;
            float: left;
            box-sizing: border-box;
            border-left: 1px solid #4980F2;
            border-top: 1px solid #4980F2;
            border-bottom: 1px solid #4980F2;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: #4980F2;
            background: white;

            span {
                font-size: .8rem;
            }

            &.active {
                background: #4980F2;
                color: white;
            }
        }


        .single-tab:first-child {
            border-radius: 4px 0 0 4px;
        }

        .single-tab:last-child {
            border-radius: 0 4px 4px 0;
            border: 1px solid #4980F2;
        }
    }

</style>
