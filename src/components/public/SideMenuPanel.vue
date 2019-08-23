<template>
    <div class='side-menu-panel'>
        <div @mouseenter='changeStatus(true)' @mousedown='changeStatus(false)' class='side-menu'>
            <img src='@/assets/statistic.svg'/>
            <div class='text-style'><span>{{title}}</span></div>
        </div>
        <div class='menu-panel' :class='sideBar.showing ? "show-css" : ""'>
            <slot name='panel'></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SideMenuPanel',
        props: {
            title: '',
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
        methods: {
            changeStatus (status) {
                let scope = this;
                scope.sideBar.showing = status;
            }
        }
    };
</script>

<style lang="scss">
    .side-menu-panel {
        width: 2rem;
        height: 100%;
        float: left;
        cursor: pointer;

        .side-menu {
            color: #409EFF;
            margin-top: 1rem;
            position: relative;
            z-index: 110;
            height: 100%;

            img {
                display: inline-block;
            }

            .text-style {
                width: 100%;
                font-size: 1.1rem;
                word-wrap: break-word;
            }
        }

        .menu-panel {
            position: absolute;
            top: 0;
            height: 100%;
            box-shadow: 0 0 0.1rem 0 #ececec;
            width: 20rem;
            left: -20rem;
            background: #29ff00;
            box-sizing: border-box;
            z-index: 80;
            transition: all .4s ease-in-out;

            &.show-css {
                left: 0 !important;
            }
        }
    }
</style>
