<template>
    <div class='float-menu'>
        <div class="target" :class="{'checked': checked}" v-drag>
            <div class="main-ball" @mouseup="checkedStatus"
                 :style="menus.length===1 ? 'background-image: url(' + menus[0].image + ')' : ''"
                 :class="{'el-icon-more': menus.length !== 1}"
                 :title='menus.length===1 ? menus[0].title : "展开"'>
            </div>
            <div class='icon-item' @click='itemClicked(menu)' v-for="(menu, index) in menus" :key="index"
                 v-if="menus.length > 1"
                 :style="checked ? 'pointer-events: auto;transform: scale(1) translate(' + getCoordinate(index + 1) + ')' : ''">
                <a :title='menu.title' :style="'background-image: url(' + menu.image + ')'"></a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FloatMenu',
        props: {
            menus: {
                type: Array,
                default: function () {
                    return [{
                        id: 'main',
                        image: '',
                        title: '',
                        loading: {
                            status: false
                        }
                    }];
                }
            }
        },
        data () {
            return {
                checked: false
            };
        },
        methods: {
            itemClicked (menu) {
                this.$emit('itemClick', menu);
            },
            checkedStatus () {
                if (this.menus.length === 1) {
                    this.itemClicked(this.menus[0]);
                } else {
                    this.checked = !this.checked;
                }
            },
            getCoordinate (index) {
                let r = 100;
                let angle = 180 / (this.menus.length + 1);
                let y = r * Math.sin((270 - angle * index) * Math.PI / 180);
                let x = r * Math.cos((270 - angle * index) * Math.PI / 180);
                return x + 'px, ' + y + 'px';
            }
        },
        // 自定义指令
        directives: {
            drag (el, bindings) {
                el.onmousedown = function (e) {
                    let disx = e.pageX - el.offsetLeft;
                    let disy = e.pageY - el.offsetTop;
                    let xs = e.x;
                    let ys = e.y;
                    document.onmousemove = function (e) {
                        let left = e.pageX - disx;
                        let top = e.pageY - disy;
                        let diffX = xs - e.x;
                        let diffY = ys - e.y;
                        if (Math.abs(diffX) > 20 || Math.abs(diffY) > 20) {
                            el.getElementsByClassName('main-ball')[0].style.pointerEvents = 'none';
                        }
                        el.style.left = left + 'px';
                        el.style.top = top + 'px';
                        e.preventDefault();
                        e.stopPropagation();
                    };
                    document.onmouseup = function (e) {
                        let disx = e.pageX - el.offsetLeft;
                        let disy = e.pageY - el.offsetTop;
                        let left = e.pageX - disx;
                        let top = e.pageY - disy;
                        if (left !== 0) {
                            let timeout = 1 / 8 * Math.abs(left);
                            el.style.transition = 'all ' + timeout + 'ms ease-out';
                            el.style.left = 70 + 'px';
                            setTimeout(() => {
                                el.style.transition = 'unset';
                            }, timeout - 100 / timeout);
                        }
                        let maxHeight = document.getElementsByTagName('html')[0].offsetHeight - 230;
                        if (top < 20 || top > maxHeight) {
                            el.style.top = top < 20 ? 20 + 'px' : maxHeight + 'px';
                        } else {
                            el.style.top = top + 'px';
                        }
                        e.preventDefault();
                        e.stopPropagation();
                        document.onmousemove = document.onmouseup = null;
                        el.getElementsByClassName('main-ball')[0].style.pointerEvents = 'auto';
                    };
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .float-menu {
        height: 0;
        width: 180px;
        position: absolute;
        right: -0.6rem;
        top: 3.5rem;
        z-index: 2002;
        pointer-events: none;

        .target {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 180px;
            width: 180px;
            text-align: center;
            position: absolute;
            top: 20px;
            left: 70px;

            .main-ball, .icon-item {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                width: 40px;
                height: 40px;
                background-color: white;
                color: #BCBCBC;
                font-size: 16px;
                border-radius: 50%;
                transition: transform .5s;
                margin: auto;
                box-shadow: 0 1px 6px 0 rgba(125, 125, 125, 0.6);

                &:hover {
                    background-color: #417BF1;
                    color: white;
                }
            }

            .main-ball {
                z-index: 201;
                pointer-events: auto;
                width: 45px;
                height: 45px;
                box-shadow: 0 1px 6px 0 rgba(125, 125, 125, 1);
                background-size: 20px;
                background-repeat: no-repeat;
                background-position: center;
                transition: all .2s ease;
            }

            .icon-item {
                z-index: 200;

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

        .checked.target {
            .main-ball {
                background-color: #417BF1;
                color: white;
                animation: jello .8s;
            }
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
