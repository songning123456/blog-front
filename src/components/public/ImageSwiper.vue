<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in swiperList" :key="index">
                <div class="swiper-zoom-container">
                    <img :src="item" alt="暂无图片"/>
                </div>
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination swiper-pagination-white" id="swiper-spit" v-if="options.pagination"></div>
        <div class="swiper-button-prev" v-if="options.navigation.prevEl"></div>
        <div class="swiper-button-next" v-if="options.navigation.nextEl"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import 'swiper/dist/js/swiper.min.js';

    export default {
        name: 'ImageSwiper',
        props: {
            swiperList: {
                type: Array,
                default() {
                    return [];
                }
            },
            options: {
                type: Object,
                default() {
                    let scope = this;
                    return {
                        // 滑动速度
                        speed: 1000,
                        // 修改swiper自己或子元素时，自动初始化swiper
                        observer: true,
                        // 修改swiper的父元素时，自动初始化swiper
                        observeParents: true,
                        // 开启鼠标滚轮控制Swiper切换
                        mousewheel: true,
                        // 开启焦距功能：双击slide会放大/缩小，并且在手机端可双指触摸缩放
                        zoom: true,
                        // 开启键盘控制Swiper切换
                        keyboard: true,
                        //循环
                        loop: true,
                        /*autoplay: {
                            delay: 2000,
                            stopOnLastSlide: false,
                            disableOnInteraction: true
                        },*/
                        // 鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
                        grabCursor: true,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        on: {
                            slideChange: function (event) {
                                scope.$emit('slideChange', this.realIndex);
                            }
                        }
                    };
                }
            }
        },
        data() {
            return {
                swiper: null
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                setTimeout(() => {
                    this.swiper = new Swiper('.swiper-container', this.options);
                }, 100);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .swiper-container {
        width: 100%;
        height: 100%;
    }
</style>
