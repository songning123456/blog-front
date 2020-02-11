<template>
    <div class="single-cover">
        <div class="cover-src">
            <image-swiper :swiper-list="[video.cover]" :options="options"></image-swiper>
        </div>
        <div class="cover-name" :class="video.name.length >= 14 ? 'more-than' : 'less-than'">{{video.name}}</div>
    </div>
</template>

<script>
    import ImageSwiper from '../../../../components/public/ImageSwiper';

    export default {
        name: 'SingleCover',
        components: {ImageSwiper},
        props: {
            video: {
                type: Object,
                default() {
                }
            }
        },
        data() {
            return {
                options: {
                    // 滑动速度
                    speed: 1000,
                    // 修改swiper自己或子元素时，自动初始化swiper
                    observer: true,
                    // 修改swiper的父元素时，自动初始化swiper
                    observeParents: true,
                    // 开启鼠标滚轮控制Swiper切换
                    mousewheel: false,
                    // 开启焦距功能：双击slide会放大/缩小，并且在手机端可双指触摸缩放
                    zoom: true,
                    // 开启键盘控制Swiper切换
                    keyboard: false,
                    //循环
                    loop: false,
                    autoplay: {
                        delay: 2000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true
                    },
                    // 鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
                    grabCursor: true
                }
            };
        },
        methods: {}
    };
</script>

<style lang="scss" scoped>
    .single-cover {
        width: 23%;
        margin: 1%;
        padding: 1%;
        box-sizing: border-box;
        height: auto;
        overflow: auto;
        float: left;
        cursor: pointer;
        background: white;
        border: 1px solid #f5f5f5;
        border-radius: .2rem;

        .cover-src {
            height: 7rem;
            width: 100%;

            .el-image {

            }
        }

        .cover-name {
            height: 1.6rem;
            width: 100%;
            font-size: .6rem;

            // 文本长度>=14
            &.more-then {
                word-break: break-all;
                text-align: left;
                line-height: .8rem;
            }

            // 文本长度<14
            &.less-than {
                line-height: 1.6rem;
                text-align: center;
            }
        }
    }
</style>
