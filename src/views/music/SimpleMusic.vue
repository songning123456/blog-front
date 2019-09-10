<template>
    <div class='simple-music' v-if='listenMusic'>
        <div class='music-header' :class='fullscreen ? "header-full" : "header-no-full"'>
            <span title='小屏' @click='narrow'><img src='../../assets/smallScreen.svg'/></span>
            <span title='全屏' @click="screenfullClick"><img src='../../assets/fullScreen.svg'/></span>
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
                default: 'https://www.cnblogs.com/dudu123/p/10148578.html'
            }
        },
        data () {
            return {
                fullscreen: false,
                smallscreen: false
            };
        },
        methods: {
            // 缩小音乐盒子
            narrow () {

            },
            // 退出音乐
            exit () {
                let scope = this;
                scope.$store.commit('setListenMusic', false);
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
        width: 100%;
        height: 100%;
        z-index: 1000;
        position: absolute;
        top: 0;
        left: 0;

        .music-header {
            width: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: flex-end;
            align-items: center;

            span {
                padding: 0 18px;
                cursor: pointer;

                img {
                    transform: scale(1.4);
                }
            }
        }

        .header-full {
            height: 0;
            visibility: hidden;
        }

        .header-no-full {
            height: 40px;
            visibility: visible;
        }

        .body-full {
            height: 100%;
        }

        .body-no-full {
            height: calc(100% - 40px);
        }

        .music-body {
            width: 100%;

            .music-iframe {
                background-color: rgba(0, 0, 0, 0.8);
                /*padding: 0 .2rem 0 .2rem;*/
                /*box-sizing: border-box;*/
            }
        }
    }
</style>
