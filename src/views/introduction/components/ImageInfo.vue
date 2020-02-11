<template>
    <div class='image-info'>
        <div class="container" v-if="swiperList.length > 0">
            <image-swiper :swiper-list="swiperList"></image-swiper>
        </div>
        <empty-view v-if="swiperList.length === 0"></empty-view>
    </div>
</template>

<script>
    import {getAlbum} from '../../../service/request';
    import EmptyView from '../../../components/util/EmptyView';
    import ImageSwiper from '../../../components/public/ImageSwiper';
    import config from '../../../utils/ConfigUtil';

    export default {
        name: 'ImageInfo',
        components: {ImageSwiper, EmptyView},
        data() {
            return {
                swiperList: []
            };
        },
        mounted() {
            this.getBloggerAlbum();
        },
        methods: {
            getBloggerAlbum() {
                let form = {
                    userId: this.$route.query.userId
                };
                let param = {
                    condition: form
                };
                getAlbum(param).then(data => {
                    if (data.status === 200 && data.total > 0) {
                        this.swiperList = data.data.map(item => {
                            return config.getImageOriginal() + encodeURIComponent(item.imageSrc);
                        });
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .image-info {
        width: 100%;
        height: 100%;

        .container {
            width: 70%;
            height: 70%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
