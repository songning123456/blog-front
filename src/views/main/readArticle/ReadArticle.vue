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
        <float-menu :menus='menus' @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import ElFrameset from '../../../components/layout/el-frameset';
    import ElFrame from '../../../components/layout/el-frame';
    import KindArticle from '../../../components/public/KindArticle';
    import ToolLoading from '../../../components/util/ToolLoading';
    import HotArticle from '../../../components/public/HotArticle';
    import {getHotArticle, getSelectedLabel} from '../../../service/request';
    import EventUtil from '../../../utils/EventUtil';
    import LabelPanel from '../../../components/public/LabelPanel';
    import uuidv1 from 'uuid/v1';
    import FloatMenu from '../../../components/util/FloatMenu';

    export default {
        name: 'ReadArticle',
        components: {FloatMenu, LabelPanel, HotArticle, KindArticle, ToolLoading, ElFrame, ElFrameset},
        data () {
            let id1 = uuidv1();
            let id2 = uuidv1();
            let id3 = uuidv1();
            let id4 = uuidv1();
            return {
                // 当前分类
                currentContent: '',
                // 各分类热门文章结果集
                hotResult: [],
                // 判断热门文章是否显示
                hotShow: false,
                labelNames: [],
                scrollLeft: '',
                resolveHidden: true,
                menus: [
                    {
                        id: id1,
                        image: require('../../../assets/time.svg'),
                        title: '休眠时钟'
                    },
                    {
                        id: id2,
                        image: require('../../../assets/map.svg'),
                        title: '定位地图'
                    },
                    {
                        id: id3,
                        image: require('../../../assets/unknown.svg'),
                        title: '未知1'
                    }, {
                        id: id4,
                        image: require('../../../assets/unknown.svg'),
                        title: '未知2'
                    }
                ]
            };
        },
        mounted () {
            let scope = this;
            getSelectedLabel().then((data) => {
                scope.$response(data, '获取关注标签').then(data => {
                    data.data.forEach(item => {
                        scope.labelNames.push(item.labelName);
                    });
                });
            }).finally(() => {
                scope.$refs['labelPanel'].chooseLabel(0);
            });
            // 绑定横向滚动
            scope.$nextTick(() => {
                scope.scrollLeft = scope.$refs['labelPanel'].$el.children[1];
                scope.scrollLeft.addEventListener('mousewheel', scope.mouseScroll, true);
            });
        },
        watch: {
            currentContent (newVal, oldVal) {
                let scope = this;
                // 绑定竖向滚动(吸附头部)
                setTimeout(() => {
                    document.getElementById('contentInfo').addEventListener('mousewheel', scope.handleHeadScroll);
                }, 100);
            }
        },
        methods: {
            // 等分类的文章加载完毕 右侧的热门文章才显示
            showHot () {
                let scope = this;
                scope.hotShow = true;
            },
            iconClick (arg0) {
                let scope = this;
                if (arg0 === 'before') {
                    scope.scrollLeft.scrollLeft -= 50;
                } else {
                    scope.scrollLeft.scrollLeft += 50;
                }
            },
            chooseCurrent (arg0) {
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
            chooseItem (menu) {
                let scope = this;
                switch (menu.title) {
                    case '休眠时钟':
                        scope.$router.push({path: '/world-clock'});
                        break;
                    case '定位地图':
                        scope.$router.push({path: '/simple-map'});
                        break;
                    case '未知1':
                        scope.$msg('暂未开通此功能1');
                        break;
                    case '未知2':
                        scope.$msg('暂未开通此功能2');
                        break;
                    default:
                        break;
                }
            },
            // 横向滚动
            mouseScroll (event) {
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
            handleHeadScroll () {
                let scope = this;
                let height = document.getElementById('contentInfo').scrollTop;
                if (scope.$store.state.showInfo) {
                    scope.$store.commit('setShowInfo', false);
                }
                if (height > 100) {
                    let size = document.getElementsByTagName('html')[0].style.fontSize.slice(0, -2) * 10;
                    document.getElementsByClassName('above-info')[0].style.marginTop = '-' + document.body.clientHeight / size + 'rem';
                    document.getElementsByClassName('hot-article')[0].style.top = 9 - document.body.clientHeight / size + 'rem';
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
            height: 4%;
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
            height: 96%;
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
