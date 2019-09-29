<template>
    <div class='popover-float'>
        <input type="checkbox" id="check">
        <div class="target" v-drag>
            <label class="main-ball el-icon-rank" for="check"></label>
            <div class='inner-content'>
                <slot name='popoverInfo'></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PopoverFloat',
        // 自定义指令
        directives: {
            drag (el, bindings) {
                el.onmousedown = function (e) {
                    let disX = e.pageX - el.offsetLeft;
                    let disY = e.pageY - el.offsetTop;
                    document.onmousemove = function (e) {
                        let left = e.pageX - disX;
                        let top = e.pageY - disY;
                        if (top < -20) {
                            top = -20;
                        } else if (top > 800) {
                            top = 800;
                        }
                        if (left < -1800) {
                            left = -1800;
                        } else if (left > 25) {
                            left = 25;
                        }
                        el.style.left = left + 'px';
                        el.style.top = top + 'px';
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
    .popover-float {
        height: 0;
        padding-top: 100px;
        width: 180px;
        position: absolute;
        right: -10px;
        top: 50px;

        /*剪裁绝对定位元素*/
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

            .main-ball {
                z-index: 3;
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
                }
            }
        }

        :checked + .target .main-ball {
            background-color: #417BF1;
            color: white;
            animation: jello 1s;
            cursor: pointer;
        }

        .target .inner-content {
            opacity: 0;
            width: 200px;
            height: 200px;
            background-color: white;
            border-radius: 12px;
            transform: scale(1) translate(-15px, -210px);
            transition: opacity .3s linear;
        }

        :checked + .target .inner-content {
            opacity: 1;
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
