<template>
    <div class="hobby-image">
        <left-side-bar current-tab='hobbyImage' kind='hobby'></left-side-bar>
        <div class="image-frame">
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
        <float-menu :menus="menu" @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import LeftSideBar from '../../components/public/LeftSideBar';
    import FloatMenu from '../../components/util/FloatMenu';
    import {operateAlbum, getAlbum} from '../../service/request';
    import EmptyView from '../../components/util/EmptyView';
    import ImageSwiper from '../../components/public/ImageSwiper';
    import config from '../../utils/ConfigUtil';

    export default {
        name: 'HobbyImage',
        components: {LeftSideBar, FloatMenu, ImageSwiper, EmptyView},
        data() {
            return {
                menu: [
                    {
                        id: '退出',
                        image: require('../../assets/exit.svg'),
                        title: '返回首页'
                    }
                ],
                infoCol: [
                    {
                        image: require('../../assets/hobbyImage.svg'),
                        title: '图片搜集',
                        name: 'hobbyImage',
                        path: '/hobby-image'
                    },
                    {
                        image: require('../../assets/hobbyVideo.svg'),
                        title: '视频收集',
                        name: 'hobbyVideo',
                        path: '/hobby-video'
                    }
                ],
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
            chooseItem(menu) {
                if (menu.id === '退出') {
                    let labelName = sessionStorage.getItem('currentLabelName');
                    this.$router.push({path: '/read/' + labelName});
                }
            },
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
    .hobby-image {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f8f8f9;

        .image-frame {
            float: left;
            height: 100%;
            width: calc(100% - 2rem - 1px);
            top: 0;

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
    }
</style>
