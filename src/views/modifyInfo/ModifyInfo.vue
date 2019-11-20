<template>
    <div class="modify-info">
        <div class="sub-menu">
            <div class="main-col">
                <img src="../../assets/modifyInfo.svg" alt=""/>
            </div>
            <div class="info-col" @click.stop="changeSubMenu(0)" :class='currentMenu===0 ? "active":""'>
                <img src="../../assets/modifyUser.svg" alt=""/>
                <span>注册信息</span>
            </div>
            <div class="info-col" @click.stop="changeSubMenu(1)" :class='currentMenu===1 ? "active":""'>
                <img src="../../assets/modifyBlogger.svg" alt=""/>
                <span>个人简介</span>
            </div>
            <div class="info-col" @click.stop="changeSubMenu(2)" :class='currentMenu===2 ? "active":""'>
                <img src="../../assets/modifyPersonal.svg" alt=""/>
                <span>工作经历</span>
            </div>
        </div>
        <div class="content-panel">
            <modify-user v-show="currentMenu===0"></modify-user>
            <modify-blogger v-show="currentMenu===1"></modify-blogger>
            <modify-personal v-show="currentMenu===2"></modify-personal>
        </div>
        <float-menu :menus="menu" @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import FloatMenu from '../../components/util/FloatMenu';
    import ModifyUser from './components/ModifyUser';
    import ModifyBlogger from './components/ModifyBlogger';
    import ModifyPersonal from './components/ModifyPersonal';

    export default {
        name: 'ModifyInfo',
        components: {ModifyPersonal, ModifyBlogger, ModifyUser, FloatMenu},
        data () {
            return {
                currentMenu: 0,
                menu: [
                    {
                        id: '退出',
                        image: require('../../assets/exit.svg'),
                        title: '返回首页'
                    }
                ]
            };
        },
        methods: {
            changeSubMenu (current) {
                let scope = this;
                scope.currentMenu = current;
            },
            chooseItem (menu) {
                let scope = this;
                if (menu.id === '退出') {
                    scope.$homePage('read');
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .modify-info {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f8f8f9;

        .sub-menu {
            background: #fff;
            position: relative;
            width: 40px;
            height: 100%;
            z-index: 110;
            border-top: 1px solid #f0f2f9;
            border-right: 1px solid #f0f2f9;
            cursor: pointer;
            float: left;

            .info-col {
                height: auto;
                padding: 13px 0;
                text-align: center;

                img {
                    height: 1.2rem;
                    width: 1.2rem;
                }

                &:hover,
                &.active {
                    background: #e2efff;

                    span {
                        color: #3776ff;
                    }
                }

                span {
                    writing-mode: vertical-lr;
                    font-size: .7rem;
                    color: #606266;
                    letter-spacing: .25rem;
                    padding-top: .5rem;
                }
            }

            .main-col {
                text-align: center;
                width: 100%;
                padding: 0.8rem 0;
                border-bottom: 1px solid #f0f2f9;

                img {
                    width: 1.6rem;
                    height: 1.6rem;
                }
            }
        }

        .content-panel {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
        }
    }

</style>
