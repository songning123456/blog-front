<template>
    <div class='read-article'>
        <div class='label-info'>
            <div class='choose-tabs'>
                <label-panel :tabs="labelNames" ref='labelPanel' @current='chooseCurrent'
                             @iconClick='iconClick'></label-panel>
            </div>
        </div>
        <div class='circle-info'>
            <div style='height: 100%; width: 100%' v-for='(item, index) in labelNames' :key='index'
                 v-if='currentContent === item'>
                <el-frameset :cols='"30%, *, 30%"' class='content-info' id='contentInfo'>
                    <el-frame></el-frame>
                    <el-frame>
                        <kind-article :kinds='item' @hotShow='showHot'></kind-article>
                    </el-frame>
                    <el-frame>
                        <hot-article :result='hotResult' v-show='hotShow'></hot-article>
                    </el-frame>
                </el-frameset>
            </div>
        </div>
        <float-ball></float-ball>
    </div>
</template>

<script>
    import ElFrameset from '../../../components/layout/el-frameset';
    import ElFrame from '../../../components/layout/el-frame';
    import KindArticle from '../../../components/public/KindArticle';
    import ToolLoading from '../../../components/util/ToolLoading';
    import HotArticle from '../../../components/public/HotArticle';
    import {getHotArticle, getAllLabelName} from '../../../service/request';
    import EventUtil from '../../../utils/EventUtil';
    import FloatBall from '../../../components/util/FloatBall';
    import LabelPanel from '../../../components/public/LabelPanel';

    export default {
        name: 'ReadArticle',
        components: {LabelPanel, FloatBall, HotArticle, KindArticle, ToolLoading, ElFrame, ElFrameset},
        data() {
            return {
                // 当前分类
                currentContent: '',
                // 各分类热门文章结果集
                hotResult: [],
                // 判断热门文章是否显示
                hotShow: false,
                labelNames: [],
                scrollLeft: '',
                resolveHidden: true
            };
        },
        mounted() {
            let scope = this;
            getAllLabelName().then((data) => {
                if (data.status === 200) {
                    if (data.total > 0) {
                        data.data.forEach(item => {
                            scope.labelNames.push(item.labelName);
                        });
                    } else {
                        scope.$message.error('查询为空');
                    }
                } else {
                    scope.$message.error(data.message ? data.message : '查询出错');
                }
            }).catch().finally(() => {
                scope.$refs['labelPanel'].chooseLabel(0);
            });
            // 绑定横向滚动
            scope.$nextTick(() => {
                scope.scrollLeft = scope.$refs['labelPanel'].$el.children[1];
                scope.scrollLeft.addEventListener('mousewheel', scope.mouseScroll, true);
            });
        },
        watch: {
            currentContent(newVal, oldVal) {
                let scope = this;
                // 绑定竖向滚动(吸附头部)
                setTimeout(() => {
                    document.getElementById('contentInfo').addEventListener('mousewheel', scope.handleHeadScroll);
                }, 100);
            }
        },
        methods: {
            // 等分类的文章加载完毕 右侧的热门文章才显示
            showHot() {
                let scope = this;
                scope.hotShow = true;
            },
            iconClick(arg0) {
                let scope = this;
                if (arg0 === 'before') {
                    scope.scrollLeft.scrollLeft -= 50;
                } else {
                    scope.scrollLeft.scrollLeft += 50;
                }
            },
            chooseCurrent(arg0) {
                let scope = this;
                scope.currentContent = arg0;
                let form;
                form = {
                    kinds: arg0
                };
                if (document.getElementsByClassName('above-info')[0].style.marginTop !== '0rem') {
                    scope.resolveHidden = false;
                }
                let param = {
                    condition: form,
                    recordStartNo: 0,
                    pageRecordNum: 5
                };
                getHotArticle(param).then((data) => {
                    scope.hotResult = data.data;
                }).finally(() => {
                });
            },
            // 横向滚动
            mouseScroll(event) {
                let scope = this;
                let e = EventUtil.getEvent(event);
                e.preventDefault();
                // eslint-disable-next-line no-unused-vars
                if (e.deltaY > 0) {
                    scope.scrollLeft.scrollLeft += 50;
                } else {
                    scope.scrollLeft.scrollLeft -= 50;
                }
            },
            // 处理头部消失滚动
            handleHeadScroll() {
                let scope = this;
                let height = document.getElementById('contentInfo').scrollTop;
                if (scope.$store.state.showInfo) {
                    scope.$store.commit('setShowInfo', false);
                }
                if (height > 100) {
                    document.getElementsByClassName('above-info')[0].style.marginTop = '-' + document.body.clientHeight / 200 + 'rem';
                    document.getElementsByClassName('hot-article')[0].style.top = 9 - document.body.clientHeight / 200 + 'rem';
                    scope.resolveHidden = true;
                }
                if (height === 0 && scope.resolveHidden) {
                    document.getElementsByClassName('above-info')[0].style.marginTop = '0rem';
                    document.getElementsByClassName('hot-article')[0].style.top = 9 + 'rem';
                }
            }
        }
    };
</script>

<style lang="scss">
    .read-article {
        height: 100%;
        width: 100%;

        .label-info {
            height: 6%;
            width: 100%;
            display: flex;
            justify-content: center;

            .choose-tabs {
                width: 60%;

                .el-tabs {

                    display: flex;
                    align-items: center;
                    padding-top: .3rem;

                    .el-tabs__header {
                        margin: unset;
                        width: 100%;
                    }

                    .el-tabs__item {
                        padding: 0 1.5rem;
                        font-size: .8rem;
                    }

                    .el-tabs__nav-scroll {
                        /*overflow-x: auto;*/
                    }

                    .el-tabs__active-bar {
                        background-color: white;
                    }

                    .el-tabs__nav-wrap::after {
                        background-color: white;
                    }
                }
            }
        }

        .circle-info {
            height: 94%;
            width: 100%;

            .content-info {
                background-color: #f8f8f9;

                &.el-frameset {
                    overflow: auto;

                    .el-frame {
                        overflow: unset;
                    }
                }
            }

            /*隐藏滚动条*/
            .content-info::-webkit-scrollbar {
                width: 0;
            }
        }
    }
</style>
