<template>
    <div class='float-ball'>
        <input type="checkbox" id="check">
        <div class="target" v-drag>
            <label class="main-ball el-icon-more" for="check"></label>
            <div class='icon-item-table' @click='itemClicked("first")'><a class='table'></a></div>
            <div class='icon-item-card' @click='itemClicked("second")'><a class='card'></a></div>
            <div class='icon-item-download-all' @click='itemClicked("third")'><a class='download-all'></a></div>
            <div class='icon-item-download-selected' @click='itemClicked("fourth")'><a class='download-selected'></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {},
        data () {
            return {};
        },
        methods: {
            itemClicked (type) {
                this.$emit('itemClick', type);
            }
        },
        // 自定义指令
        directives: {
            drag (el, bindings) {
                el.onmousedown = function (e) {
                    // var disx = e.pageX - el.offsetLeft;
                    let disy = e.pageY - el.offsetTop;
                    document.onmousemove = function (e) {
                        // let left = e.pageX - disx;
                        let top = e.pageY - disy;
                        if (top < 0) {
                            top = 0;
                        } else if (top > 600) {
                            top = 600;
                        }
                        // el.style.left = left + 'px';
                        let size = document.getElementsByTagName('html')[0].style.fontSize.slice(0, -2);
                        el.style.top = top / size + 'rem';
                        e.preventDefault();
                        e.stopPropagation();
                    };
                    document.onmouseup = function () {
                        document.onmousemove = document.onmouseup = null;
                    };
                };
            }
        }
    };
</script>

<style lang="scss">
    .float-ball {
        height: 0;
        padding-top: 100px;
        width: 180px;
        position: absolute;
        right: -10px;
        top: 50px;
        /*pointer-events: none;*/

        #check {
            position: absolute;
            clip: rect(0 0 0 0);
        }

        .target {
            height: 180px;
            width: 180px;
            max-width: 180px;
            text-align: center;
            position: absolute;
            top: 0;
            transform: rotate(90deg);

            .main-ball, [class*="icon-item-"] {
                display: block;
                position: absolute;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background-color: white;
                color: #BCBCBC;
                font-size: 16px;
                border-radius: 50%;
                transition: transform .5s;
                top: 0;
                left: 0;
                right: 0;
                margin: auto;
                box-shadow: 0px 1px 6px 0 rgba(125, 125, 125, 0.2);

                &:hover {
                    background-color: #417BF1;
                    color: white;
                    transform: rotate(-90deg);
                }
            }

            .main-ball {
                z-index: 3;
            }

            [class*="icon-item-"] {
                z-index: 2;

                .table {
                    background-image: url('../../assets/wallpaper.svg');
                }

                .card {
                    background-image: url('../../assets/time.svg');
                }

                .download-all {
                    background-image: url('../../assets/unknown.svg');
                }

                .download-selected {
                    background-image: url('../../assets/unknown.svg');
                }

                a {
                    display: block;
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    top: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    transform: rotate(-90deg);
                    background-size: 20px;
                    background-repeat: no-repeat;
                    background-position: center;

                    &:after {
                        top: -3px;
                        left: -3px;
                        padding: 3px;
                        box-shadow: 0 0 0 4px #417BF1;
                        transition: transform .2s, opacity .2s;
                        transform: scale(.8);
                        opacity: 0;
                        pointer-events: none;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        content: '';
                        box-sizing: content-box;
                    }

                    &:hover:after {
                        transform: scale(1);
                        opacity: 1;
                    }

                    &:active:after {
                        transform: scale(1.05);
                        opacity: 1;
                    }
                }

            }

        }

        :checked + .target .main-ball {
            background-color: #417BF1;
            color: white;
            animation: jello 1s;
        }

        :checked + .target .icon-item-table {
            transform: scale(1) translate(-60px, 15px);
        }

        :checked + .target .icon-item-card {
            transform: scale(1) translate(-28px, 60px);
        }

        :checked + .target .icon-item-download-all {
            transform: scale(1) translate(28px, 60px);
        }

        :checked + .target .icon-item-download-selected {
            transform: scale(1) translate(60px, 15px);
        }

        .jello {
            -webkit-animation-name: jello;
            animation-name: jello;
            -webkit-transform-origin: center;
            transform-origin: center;
            animation-fill-mode: forwards;
        }

        @keyframes jello {
            from,
            11.1%,
            to {
                -webkit-transform: translate3d(0, 0, 0, -90deg);
                transform: translate3d(0, 0, 0, -90deg);
            }

            22.2% {
                -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);
                transform: skewX(-12.5deg) skewY(-12.5deg);
            }

            33.3% {
                -webkit-transform: skewX(6.25deg) skewY(6.25deg);
                transform: skewX(6.25deg) skewY(6.25deg);
            }

            44.4% {
                -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);
                transform: skewX(-3.125deg) skewY(-3.125deg);
            }

            55.5% {
                -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);
                transform: skewX(1.5625deg) skewY(1.5625deg);
            }

            66.6% {
                -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);
                transform: skewX(-0.78125deg) skewY(-0.78125deg);
            }

            77.7% {
                -webkit-transform: skewX(0.390625deg) skewY(0.390625deg);
                transform: skewX(0.390625deg) skewY(0.390625deg);
            }

            88.8% {
                -webkit-transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
                transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
            }
        }
    }
</style>
