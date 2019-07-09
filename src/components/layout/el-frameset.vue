<template>
    <div :class='elFrameset'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'el-frameset',
        props: {
            cols: {
                type: String,
                default: ''
            },
            rows: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                cols_: [],
                rows_: [],
                elFrameset: ['el-frameset']
            };
        },
        created () {
            // 根据窗口大小变换页面自适应
            let scope = this;
            scope.resize();
            window.onresize = function () {
                console.log('onresize>>>');
                scope.resize();
            };
        },
        mounted () {
            this.init();
        },
        watch: {
            cols () {
                this.init();
            },
            rows () {
                this.init();
            }
        },
        methods: {
            resize () {
                let fontSize = document.body.clientWidth / (1920 / 20);
                document.documentElement.style.fontSize = fontSize + 'px';
            },
            init () {
                let scope = this;
                let children = scope.$children;
                if (scope.cols) {
                    scope.cols_ = scope.cols.split(',');
                    let leftIndex = [];
                    for (let i = 0; i < scope.cols_.length; i++) {
                        scope.cols_[i] = scope.cols_[i].trim();
                        // 数字，没有提供单位
                        if (!isNaN(Number(scope.cols_[i]))) {
                            //默认单位是%
                            scope.cols_[i] = scope.cols_[i] + '%';
                            // * 表示剩余的空间全给它，只能出现一个*
                        } else if (scope.cols_[i] === '*') {
                            leftIndex.push(i);
                        }
                    }
                    for (let i = 0; i < scope.cols_.length; i++) {
                        if (i < children.length) {
                            //默认高度都设置为100%
                            children[i].$el.style.height = '100%';
                            if (leftIndex.indexOf(i) < 0) {
                                children[i].$el.style.width = scope.cols_[i];
                            } else {
                                // i in leftIndex
                                // calc expression
                                let calcExp = '100%';
                                for (let j = 0; j < scope.cols_.length; j++) {
                                    if (leftIndex.indexOf(j) < 0) {
                                        calcExp = calcExp + ' - ' + scope.cols_[j];
                                    }
                                }
                                calcExp = `(${calcExp}) / ${leftIndex.length}`;
                                console.log('calcExp>>>>>>>>>>>>>>>>>>>' + calcExp);
                                children[i].$el.style.width = `calc(${calcExp})`;
                            }
                        }
                    }
                } else if (this.rows) {
                    scope.elFrameset = ['el-frameset', 'vertical'];
                    scope.rows_ = scope.rows.split(',');
                    let leftIndex = [];
                    for (let i = 0; i < scope.rows_.length; i++) {
                        scope.rows_[i] = scope.rows_[i].trim();
                        // 数字，没有提供单位
                        if (!isNaN(scope.rows_[i])) {
                            //默认单位是%
                            scope.rows_[i] = scope.rows_[i] + '%';
                            // * 表示剩余的空间全给它，只能出现一个*
                        } else if (scope.rows_[i] === '*') {
                            leftIndex.push(i);
                        }
                    }
                    for (let i = 0; i < scope.rows_.length; i++) {
                        if (i < children.length) {
                            //默认高度都设置为100%
                            children[i].$el.style.width = '100%';
                            if (leftIndex.indexOf(i) < 0) {
                                children[i].$el.style.height = scope.rows_[i];
                            } else {
                                // i in leftIndex
                                let calcExp = '100%';//calc expression
                                for (let j = 0; j < scope.rows_.length; j++) {
                                    if (leftIndex.indexOf(j) < 0) {
                                        calcExp = calcExp + ' - ' + scope.rows_[j];
                                    }
                                }
                                calcExp = `(${calcExp}) / ${leftIndex.length}`;
                                console.log('calcExp>>>>>>>>>>>>>>>>>>>' + calcExp);
                                children[i].$el.style.height = `calc(${calcExp})`;
                            }
                        }
                    }
                }
            }
        }

    };
</script>

<style scoped>
    .el-frameset {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
        position: relative;
        display: -webkit-box;
        box-sizing: border-box;
        -moz-box-sizing: border-box; /* Firefox */
        -webkit-box-sizing: border-box; /* Safari */
    }

    .el-frameset.vertical {
        -webkit-box-orient: vertical;
        box-orient: vertical;
    }

    html, body {
        width: 100%;
        height: 100%;
        background: #f8f8fc;
    }

    * {
        padding: 0;
        margin: 0;
    }
</style>
