<template>
    <div class='scroll-loader' ref='scrollLoader'>
        <div class="loading" v-if="topLoading">
            <div class="loader">加载中...</div>
        </div>
        <div class='slot-attribute' :style="{minHeight: dialogHeight + 'px'}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ScrollLoader',
        data () {
            return {
                dialogHeight: 700,
                topLoading: false,
                stopTopLoading: false // 是否停止传播滚动到顶部事件
            };
        },
        mounted () {
            this.dialogHeight = this.$refs.scrollLoader.offsetHeight;
            this.listenScroll();
        },
        methods: {
            topDone (stopTopLoading) {
                this.topLoading = false;
                if (stopTopLoading) {
                    this.stopTopLoading = true;
                } else {
                    this.$nextTick(() => {
                        let doc = this.$refs['scrollLoader'];
                        doc.scrollTop += this.dialogHeight / 2;
                    });
                }
            },
            listenScroll () {
                setTimeout(() => {
                    let scrollLoader = this.$refs.scrollLoader;
                    scrollLoader.onscroll = () => {
                        if (scrollLoader.scrollTop <= 0 && !this.stopTopLoading) {
                            if (this.topLoading) {
                                return;
                            }
                            this.topLoading = true;
                            this.$emit('scrollToTop', this.topDone);
                        }
                    };
                }, 50);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .scroll-loader {
        overflow: auto;
        height: calc(100% - 1.5rem);
        width: 100%;
        background: #f8f8f9;

        &::-webkit-scrollbar {
            width: 2px;
        }

        .loading {
            width: 100%;
            height: 40px;
            position: relative;
            overflow: hidden;
            text-align: center;
            margin: 5px 0;
            color: #999;
            font-size: 13px;

            .loader {
                font-size: 10px;
                margin: 8px auto;
                text-indent: -9999em;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #999;
                background: -moz-linear-gradient(left, #999 10%, rgba(255, 255, 255, 0) 42%);
                background: -webkit-linear-gradient(left, #999 10%, rgba(255, 255, 255, 0) 42%);
                background: -o-linear-gradient(left, #999 10%, rgba(255, 255, 255, 0) 42%);
                background: -ms-linear-gradient(left, #999 10%, rgba(255, 255, 255, 0) 42%);
                background: linear-gradient(to right, #999 10%, rgba(255, 255, 255, 0) 42%);
                position: relative;
                -webkit-animation: load3 1s infinite linear;
                animation: load3 1s infinite linear;

                &:before {
                    width: 50%;
                    height: 50%;
                    background: #999;
                    border-radius: 100% 0 0 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    content: '';
                }

                &:after {
                    background: #f5f5f5;
                    width: 72%;
                    height: 75%;
                    border-radius: 68%;
                    content: '';
                    margin: auto;
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                }
            }
        }

        .slot-attribute {
            overflow-x: unset;
        }

        @-webkit-keyframes load3 {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }

        @keyframes load3 {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
    }
</style>
