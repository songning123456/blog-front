<template>
    <div class="modify-personal">
        <left-side-bar current-tab='modifyPersonal'></left-side-bar>
        <div class="personal-frame">
            <div class="layout-left">
                <el-button type="success" plain @click='choose(1)'>预览</el-button>
                <el-button type="warning" plain @click='choose(2)'>新增</el-button>
            </div>
            <div class="layout-right">
                <div class="content" v-if="current === 1">
                    <el-scrollbar>
                        <single-info v-for="(item, index) in result" :key="index" :info="item"
                                     @update="updateInfo"></single-info>
                    </el-scrollbar>
                </div>
                <div class="add" v-else-if="current === 2">
                    <add-info @add="addInfo"></add-info>
                </div>
                <div class="finished" v-else-if="current === 3">
                    <div class="first-content">
                        <img src="../../assets/registerSuccess.svg"/>
                    </div>
                    <div class="second-content">
                        <span>{{second}}s 是否继续新增?</span>
                    </div>
                    <div class="third-content">
                        <el-button type="primary" size="small" @click="jump('yes')">是</el-button>
                        <el-button size="small" @click="jump('no')">否</el-button>
                    </div>
                </div>
            </div>
            <tool-loading :loading="loading" category="spinner"></tool-loading>
        </div>
        <float-menu :menus="menu" @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import LeftSideBar from '../../components/public/LeftSideBar';
    import SingleInfo from './components/SingleInfo';
    import EmptyView from '../../components/util/EmptyView';
    import {addMyInfo, getMyInfo, updatePersonalInformation} from '../../service/http';
    import ToolLoading from '../../components/util/ToolLoading';
    import AddInfo from './components/AddInfo';
    import FloatMenu from '../../components/util/FloatMenu';

    export default {
        name: 'ModifyPersonal',
        components: {LeftSideBar, AddInfo, ToolLoading, EmptyView, SingleInfo, FloatMenu},
        data() {
            return {
                menu: [
                    {
                        id: '退出',
                        image: require('../../assets/exit.svg'),
                        title: '返回首页'
                    }
                ],
                current: 0, // 空白展示
                loading: false,
                result: [],
                second: 3,
                timer: null
            };
        },
        mounted() {
            let scope = this;
            scope.choose(1);
        },
        methods: {
            chooseItem(menu) {
                if (menu.id === '退出') {
                    let labelName = sessionStorage.getItem('currentLabelName');
                    this.$router.push({path: '/read/' + labelName});
                }
            },
            choose(type) {
                let scope = this;
                if (type === 1 && scope.current !== 1) {
                    scope.loading = true;
                    getMyInfo({condition: {}}).then(data => {
                        if (data.status === 200 && data.total > 0) {
                            scope.result = data.data;
                        }
                    }).finally(() => {
                        scope.loading = false;
                    });
                }
                scope.current = type;
                if (type === 3) {
                    scope.autoJump();
                }
            },
            jump(type) {
                let scope = this;
                clearInterval(scope.timer);
                scope.timer = null;
                if (type === 'yes') {
                    scope.choose(2);
                } else if (type === 'no') {
                    scope.choose(1);
                }
            },
            autoJump() {
                let scope = this;
                const TIME_COUNT = 3;
                if (!scope.timer) {
                    scope.second = TIME_COUNT;
                    scope.timer = setInterval(() => {
                        if (scope.second > 0 && scope.second <= TIME_COUNT) {
                            scope.second--;
                        } else {
                            clearInterval(scope.timer);
                            scope.timer = null;
                            scope.choose(1);
                        }
                    }, 1000);
                }
            },
            updateInfo(form) {
                let scope = this;
                scope.loading = true;
                updatePersonalInformation({condition: form}).then(data => {
                    scope.$response(data, '更新个人信息').then(data => {
                        scope.result = data.data;
                    });
                }).finally(() => {
                    scope.loading = false;
                });
            },
            addInfo(form) {
                let scope = this;
                scope.loading = true;
                addMyInfo({condition: form}).then(data => {
                    if (data.status === 200) {
                        this.$message.success('添加信息成功');
                    }
                }).finally(() => {
                    scope.loading = false;
                    scope.current = 3;
                    scope.autoJump();
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .modify-personal {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f8f8f9;

        .personal-frame {
            float: left;
            height: 100%;
            width: calc(100% - 2rem - 1px);
            top: 0;

            .layout-left {
                height: 100%;
                width: 8%;
                float: left;

                .el-button:first-child {
                    position: relative;
                    top: 34%;
                    width: 50%;
                }

                .el-button:nth-child(2) {
                    position: relative;
                    top: 37%;
                    width: 50%;
                    margin-left: unset;
                }
            }

            .layout-right {
                height: 100%;
                width: 92%;
                float: left;

                display: flex;
                justify-content: center;
                align-items: center;

                .content {
                    width: 40%;
                    height: 90%;
                }

                .add {
                    width: 25rem;
                    height: 25rem;
                    background: white;
                }

                .finished {
                    width: 25rem;
                    height: 8rem;
                    background: white;

                    .first-content {
                        height: 30%;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: flex-end;
                    }

                    .second-content {
                        height: 30%;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .third-content {
                        height: 40%;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }

</style>
