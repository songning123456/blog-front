<template>
    <div class='read-article'>
        <div class='top-frame'>
            <div class='choose-tabs'>
                <label-panel :tabs="labelNames" ref='labelPanel' @current='chooseCurrent'
                             @iconClick='iconClick'></label-panel>
            </div>
        </div>
        <div class='bottom-frame'>
            <keep-alive>
                <router-view :key="$route.path"></router-view>
            </keep-alive>
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
    import {getSelectedLabel} from '../../../service/request';
    import EventUtil from '../../../utils/EventUtil';
    import LabelPanel from '../../../components/public/LabelPanel';
    import uuidv1 from 'uuid/v1';
    import FloatMenu from '../../../components/util/FloatMenu';

    export default {
        name: 'ReadArticle',
        components: {FloatMenu, LabelPanel, HotArticle, KindArticle, ToolLoading, ElFrame, ElFrameset},
        data() {
            let id1 = uuidv1();
            let id2 = uuidv1();
            let id3 = uuidv1();
            let id4 = uuidv1();
            return {
                // 当前分类
                currentContent: '',
                labelNames: [],
                scrollLeft: '',
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
                        image: require('../../../assets/email.svg'),
                        title: '写邮件'
                    }, {
                        id: id4,
                        image: require('../../../assets/unknown.svg'),
                        title: '未知2'
                    }
                ]
            };
        },
        activated() {
            let scope = this;
            getSelectedLabel().then((data) => {
                scope.$response(data, '获取关注标签').then(data => {
                    data.data.forEach(item => {
                        scope.labelNames.push(item.labelName);
                    });
                });
            }).finally(() => {
                let label = sessionStorage.getItem('homePageRead');
                if (label) {
                    this.$refs['labelPanel'].chooseLabel(label);
                } else {
                    this.$refs['labelPanel'].chooseLabel(this.labelNames[0]);
                }
            });
            // 绑定横向滚动
            scope.$nextTick(() => {
                scope.scrollLeft = scope.$refs['labelPanel'].$el.children[1];
                scope.scrollLeft.addEventListener('mousewheel', scope.mouseScroll, true);
            });
        },
        deactivated() {
            this.scrollLeft.removeEventListener('mousewheel', this.mouseScroll, true);
        },
        methods: {
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
                sessionStorage.setItem('homePageRead', arg0);
                this.$router.push({path: '/home-page/read/' + scope.currentContent});
            },
            chooseItem(menu) {
                let scope = this;
                switch (menu.title) {
                    case '休眠时钟':
                        scope.$router.push({path: '/world-clock'});
                        break;
                    case '定位地图':
                        scope.$router.push({path: '/simple-map'});
                        break;
                    case '写邮件':
                        scope.$router.push({path: '/email'});
                        break;
                    case '未知2':
                        scope.$msg('暂未开通此功能');
                        break;
                    default:
                        break;
                }
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
            }
        }
    };
</script>

<style lang="scss">
    .read-article {
        height: 100%;
        width: 100%;

        .top-frame {
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

        .bottom-frame {
            height: 96%;
            width: 100%;
        }
    }
</style>
