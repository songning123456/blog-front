<template>
    <div class='side-menu-panel'>
        <div @mousedown.stop='sideBar.showing = !sideBar.showing' class='side-menu'>
            <img :src='imgSrc'/>
            <div class='text-style'><span>{{title}}</span></div>
        </div>
        <div class='menu-panel' :class='sideBar.showing ? "show-css" : ""'>
            <slot name='panel'></slot>
            <div class="side-shade" @click.stop="sideBar.showing = false">
                <div class='inner-icon' @click.stop="sideBar.showing = !sideBar.showing">
                    <i class="el-icon-arrow-left" v-if="sideBar.showing"></i>
                    <i class="el-icon-arrow-right" v-if="!sideBar.showing"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SideMenuPanel',
        props: {
            title: '',
            imgSrc: {
                type: String,
                default: ''
            },
            sideBar: {
                type: Object,
                // eslint-disable-next-line vue/require-valid-default-prop
                default: {
                    showing: false
                }
            }
        },
        data () {
            return {};
        },
        methods: {}
    };
</script>

<style lang="scss" scoped>
    .side-menu-panel {
        width: 2rem;
        height: 100%;
        float: left;
        cursor: pointer;

        .side-menu {
            color: #409EFF;
            padding-top: 1rem;
            position: relative;
            z-index: 110;
            height: 100%;
            box-shadow: 0 0 0.1rem 0 #ececec;
            background-color: white;

            img {
                display: inline-block;
                transform: scale(1.5);
            }

            .text-style {
                width: 100%;
                font-size: 1.1rem;
                word-wrap: break-word;
            }
        }

        .menu-panel {
            position: absolute;
            top: .5rem;
            height: 100%;
            width: 20.8rem;
            left: -18rem;
            box-sizing: border-box;
            z-index: 80;
            transition: all .4s ease-in-out;

            &.show-css {
                left: 2rem !important;
            }

            .side-shade {
                width: .8rem;
                height: 100%;
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                .inner-icon {
                    height: 8%;
                    width: 100%;
                    background: rgba(167, 177, 199, 1);
                    border-radius: 0 0.6rem 0.6rem 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    i {
                        color: white;
                    }
                }
            }
        }
    }
</style>
