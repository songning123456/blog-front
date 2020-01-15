<template>
    <div class="read">
        <main-head @futureTab='futureTab' current-tab="read" ref='mainHead'></main-head>
        <div class="frame-center">
            <div class="top-frame">
                <label-panel :tabs="labelNames" ref='labelPanel' @current='chooseCurrent'
                             @iconClick='iconClick'></label-panel>
                <div class="label-icon" @click.stop='$router.push({path: "/label-config"})'>标签管理</div>
            </div>
            <keep-alive>
                <router-view :key="$route.path" class="bottom-frame"></router-view>
            </keep-alive>
        </div>
        <float-menu :menus='menus' @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import LabelPanel from '../../components/public/LabelPanel';
    import {getSelectedLabel} from '../../service/request';
    import EventUtil from '../../utils/EventUtil';
    import uuidv1 from 'uuid/v1';
    import FloatMenu from '../../components/util/FloatMenu';

    export default {
        name: 'Read',
        components: {FloatMenu, LabelPanel, MainHead},
        data () {
            let id1 = uuidv1();
            let id2 = uuidv1();
            let id3 = uuidv1();
            let id4 = uuidv1();
            return {
                labelNames: [],
                scrollLeft: '',
                isFirstEnter: true,
                menus: [
                    {
                        id: id1,
                        image: require('../../assets/time.svg'),
                        title: '休眠时钟'
                    },
                    {
                        id: id2,
                        image: require('../../assets/map.svg'),
                        title: '定位地图'
                    },
                    {
                        id: id3,
                        image: require('../../assets/email.svg'),
                        title: '写邮件'
                    }, {
                        id: id4,
                        image: require('../../assets/unknown.svg'),
                        title: '未知2'
                    }
                ]
            };
        },
        mounted () {
            this.getSelectedLabelNames();
        },
        activated () {
            if (!this.isFirstEnter) {
                this.defaultClick();
            }
            // 绑定横向滚动
            this.$nextTick(() => {
                this.scrollLeft = this.$refs['labelPanel'].$el.children[1];
                this.scrollLeft.addEventListener('mousewheel', this.mouseScroll, true);
            });
        },
        deactivated () {
            this.isFirstEnter = false;
            this.scrollLeft.removeEventListener('mousewheel', this.mouseScroll, true);
        },
        methods: {
            futureTab (tab) {
                this.$router.push({path: '/' + tab});
            },
            getSelectedLabelNames () {
                getSelectedLabel().then((data) => {
                    this.$response(data, '获取关注标签').then(data => {
                        data.data.forEach(item => {
                            this.labelNames.push(item.labelName);
                        });
                    }).finally(() => {
                        this.defaultClick();
                    });
                });
            },
            chooseCurrent (labelName) {
                sessionStorage.setItem('currentLabelName', labelName);
                this.$router.push({path: '/read/' + labelName});
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
                    case '写邮件':
                        scope.$router.push({path: '/email'});
                        break;
                    case '未知2':
                        this.$message.error('暂未开通此功能');
                        break;
                    default:
                        break;
                }
            },
            defaultClick () {
                let currentLabelName = sessionStorage.getItem('currentLabelName');
                if (currentLabelName && this.labelNames.indexOf(currentLabelName) > -1) {
                    this.$refs['labelPanel'].chooseLabel(currentLabelName);
                } else {
                    this.$refs['labelPanel'].chooseLabel(this.labelNames[0]);
                }
            },
            iconClick (arg0) {
                let scope = this;
                if (arg0 === 'before') {
                    scope.scrollLeft.scrollLeft -= 50;
                } else {
                    scope.scrollLeft.scrollLeft += 50;
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    .read {
        position: relative;
        width: 100%;
        height: 100%;

        .frame-center {
            width: 100%;
            height: 100%;

            .top-frame {
                width: 100%;
                height: 4%;

                .label-panel {
                    width: 60%;
                    height: 100%;
                    float: left;
                    position: relative;
                    left: 20%;
                }

                .label-icon {
                    font-size: 0.75rem;
                    float: right;
                    position: absolute;
                    right: 10%;
                    top: 10.9%;

                    &:hover {
                        cursor: pointer;
                        color: #409eff;
                    }
                }
            }

            .bottom-frame {
                height: 96%;
                width: 100%;
            }
        }
    }

</style>
