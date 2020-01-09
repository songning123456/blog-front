<template>
    <div class='modify-image'>
        <div class="image-left">
            <el-upload class="upload-demo" drag action='' multiple accept="image/*" :before-upload="beforeUpload">
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

    export default {
        name: 'ModifyImage',
        components: {ImageSwiper, EmptyView},
        data () {
            return {
                // 上传的头像
                image: {
                    imgBlob: '',
                    filename: '',
                    files: ''
                },
                swiperList: []
            };
        },
        mounted () {
            let scope = this;
            getAlbum({condition: {}}).then(data => {
                if (data.status === 200 && data.total > 0) {
                    scope.swiperList = data.data;
                }
            });
        },
        methods: {
            beforeUpload (file) {
                let scope = this;
                const extension = file.name.split('.')[1];
                if (!(extension === 'png' || extension === 'jpg')) {
                    this.$message.warning('上传模板只能是jpg/png格式!');
                    return;
                }
                scope.image.imgBlob = URL.createObjectURL(file);
                scope.image.filename = file.name;
                scope.image.files = file;
                let formData = new FormData();
                formData.append('file', scope.image.files, scope.image.filename);
                formData.append('dir', 'album');
                operateAlbum(formData).then(data => {
                    if (data.status === 200 && data.total > 0) {
                        this.$message.success('上传图片成功');
                        scope.swiperList = data.data;
                    } else {
                        this.$message.error('上传图片失败 ' + data.message);
                    }
                });
                // 阻止默认上传地址
                return false;
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
