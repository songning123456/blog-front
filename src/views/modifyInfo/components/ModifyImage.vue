<template>
    <div class='modify-image'>
        <div class="image-left">
            <el-upload class="upload-demo" action="" drag multiple :show-file-list="false" accept="image/*"
                       :before-upload="beforeUpload"
                       :http-request='httpRequest'>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
            </el-upload>
        </div>
        <div class="image-right">
            <div class="container">
                <image-swiper :swiper-list="swiperList" v-if="swiperList.length > 0"></image-swiper>
                <empty-view v-else></empty-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {operateAlbum, getAlbum} from '../../../service/request';
    import EmptyView from '../../../components/util/EmptyView';
    import ImageSwiper from '../../../components/public/ImageSwiper';
    import config from '../../../utils/ConfigUtil';

    export default {
        name: 'ModifyImage',
        components: {ImageSwiper, EmptyView},
        data() {
            return {
                swiperList: []
            };
        },
        mounted() {
            let scope = this;
            getAlbum({condition: {}}).then(data => {
                if (data.status === 200 && data.total > 0) {
                    scope.swiperList = data.data.map(item => {
                        return config.getImageOriginal() + encodeURIComponent(item.imageSrc);
                    });
                }
            });
        },
        methods: {
            httpRequest(file) {
                let formData = new FormData();
                formData.append('file', file.file, file.file.name);
                formData.append('dir', 'album');
                operateAlbum(formData).then(data => {
                    if (data.status === 200 && data.total > 0) {
                        this.$message.success('上传图片成功');
                        this.swiperList = data.data.map(item => {
                            return config.getImageOriginal() + encodeURIComponent(item.imageSrc);
                        });
                    } else {
                        this.$message.error('上传图片失败 ' + data.message);
                    }
                });
            },
            beforeUpload(file) {
                const extension = file.name.split('.')[1];
                if (!(extension === 'png' || extension === 'jpg')) {
                    this.$message.warning('上传模板只能是jpg/png格式!');
                    return false;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .modify-image {
        width: 100%;
        height: 100%;
        position: relative;

        .image-left {
            width: 40%;
            height: 100%;
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .image-right {
            width: 60%;
            height: 100%;
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;

            .container {
                width: 70%;
                height: 70%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

</style>
