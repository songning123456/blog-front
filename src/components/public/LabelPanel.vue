<template>
    <div class='label-panel'>
        <div class='left-icon' @click='before' v-show="showIcon"><i class='el-icon-arrow-left'></i></div>
        <div class='label-center'>
            <div class='label-content' v-for='(item, index) in tabs' :key='index' @click="chooseLabel(index)"
                 :class='currentIndex === index ? "content-color" : "" '>
                {{item}}
            </div>
        </div>
        <div class='right-icon' @click='after' v-show="showIcon"><i class='el-icon-arrow-right'></i></div>
    </div>
</template>

<script>
    export default {
        name: 'LabelPanel',
        props: {
            tabs: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        data () {
            return {
                oldTab: '',
                currentIndex: -1,
                showIcon: false
            };
        },
        watch: {
            tabs: {
                handler (newVal, oldVal) {
                    let scope = this;
                    let total = document.getElementsByClassName('label-center')[0].offsetWidth;
                    let all = 0;
                    setTimeout(() => {
                        let array = [...document.getElementsByClassName('label-content')];
                        array.forEach(item => {
                            all += (item.offsetWidth + 20);
                        });
                        scope.showIcon = all > total;
                    }, 100);
                },
                deep: true
            }
        },
        methods: {
            chooseLabel (index) {
                let scope = this;
                scope.currentIndex = index;
                // 确定只能点击一次
                if (scope.oldTab === scope.tabs[index]) {
                    return;
                }
                scope.oldTab = scope.tabs[index];
                scope.$emit('current', scope.tabs[index]);
            },
            before () {
                this.$emit('iconClick', 'before');
            },
            after () {
                this.$emit('iconClick', 'after');
            }
        }
    };
</script>

<style lang='scss'>
    .label-panel {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .left-icon {
            float: left;
            width: 5%;
        }

        .label-center {
            float: left;
            width: 90%;
            white-space: nowrap;
            overflow: auto;
            padding-bottom: .2rem;

            .label-content {
                font-size: 0.75rem;
                padding: 0 .5rem;
                text-align: center;
                display: inline-block;
                box-sizing: border-box;

                &.content-color {
                    color: #409EFF;
                }

                &:hover {
                    color: #409EFF;
                }
            }
        }

        // 隐藏横向滚动条
        .label-center::-webkit-scrollbar {
            display: none
        }

        .right-icon {
            float: left;
            width: 5%;
        }
    }
</style>
