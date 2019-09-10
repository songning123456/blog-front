<template>
    <div class='simple-music' v-if='listenMusic' :class='getSimpleMusicCss()'>
        <div class='music-header' :class='fullscreen ? "header-full" : "header-no-full"'>
            <span title='小屏' @click='narrow'><img src='../../assets/smallScreen.svg'/></span>
            <span v-if='!smallscreen' title='全屏' @click="screenfullClick"><img
                src='../../assets/fullScreen.svg'/></span>
            <span title='退出' @click='exit'><img src='../../assets/musicExit.svg'/></span>
        </div>
        <div class='music-body' :class='fullscreen ? "body-full" : "body-no-full"'>
            <iframe name='simpleMusic' id='myMusic' :src='musicSrc' width='100%' height='100%' frameborder='0'
                    scrolling='yes' class='music-iframe' style='overflow-x: scroll; overflow-y: scroll'></iframe>
        </div>
    </div>
</template>

<script>
    import screenfull from 'screenfull';

    export default {
        name: 'SimpleMusic',
        props: {
            listenMusic: {
                type: Boolean,
                default: false
            },
            musicSrc: {
                type: String,
                default: 'https://y.qq.com/'
            }
        },
        data () {
            return {
                fullscreen: false,
                smallscreen: null
            };
        },
        methods: {
            // 缩小音乐盒子
            narrow () {
                let scope = this;
                scope.smallscreen = !scope.smallscreen;
            },
            // 退出音乐
            exit () {
                let scope = this;
                scope.smallscreen = null;
                scope.$store.commit('setListenMusic', false);
            },
            getSimpleMusicCss () {
                let scope = this;
                if (scope.smallscreen === true) {
                    return 'music-narrow';
                } else if (scope.smallscreen === false) {
                    return 'music-normal';
                } else {
                    return 'music-size';
                }
            },
            // 是否全屏
            screenfullClick () {
                let scope = this;
                if (!screenfull.enabled) {
                    scope.$message({
                        type: 'warning',
                        message: 'Your browser does not support!',
                        duration: 1000
                    });
                    return false;
                }
                if (scope.smallscreen) {
                    scope.$message({
                        type: 'warning',
                        message: '请先切换至正常大小!',
                        duration: 1000
                    });
                    return;
                }
                screenfull.toggle();
                screenfull.on('change', () => {
                    scope.fullscreen = screenfull.isFullscreen;
                });
            }
        }
    };
</script>

<style lang="scss">
    .simple-music {
        z-index: 1000;
        position: absolute;
        right: 0;
        bottom: 0;

        &.music-size {
            width: 100%;
            height: 100%;
        }

        &.music-normal {
            animation: go_out .4s forwards;
        }

        &.music-narrow {
            animation: go_in .4s forwards;
        }

        .music-header {
            width: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: flex-end;
            align-items: center;

            span {
                padding: 0 .9rem;
                cursor: pointer;

                img {
                    transform: scale(1.1);
                }
            }
        }

        .header-full {
            height: 0;
            visibility: hidden;
        }

        .header-no-full {
            height: 2rem;
            visibility: visible;
        }

        .body-full {
            height: 100%;
        }

        .body-no-full {
            height: calc(100% - 2rem);
        }

        .music-body {
            width: 100%;

            .music-iframe {
                background-color: rgba(0, 0, 0, 0.8);
            }
        }
    }

    @keyframes go_in {
        0% {
            width: 100%;
            height: 100%;
        }
        100% {
            width: 12rem;
            height: 8rem;
        }
    }

    @keyframes go_out {
        0% {
            width: 12rem;
            height: 8rem;
        }
        100% {
            width: 100%;
            height: 100%;
        }
    }
</style>
