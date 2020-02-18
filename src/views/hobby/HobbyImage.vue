<template>
    <div class="hobby-image">
        <left-side-bar current-tab='hobbyImage' kind='hobby'></left-side-bar>
        <div class="image-frame">
            <div class="image-left">
                <div class="frame-top">
                    <el-upload class="upload-demo" action="" drag :show-file-list="false" accept="image/jpeg,image/png"
                               :before-upload="beforeUpload" :disabled='loading'
                               :http-request='httpRequest'>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
                    </el-upload>
                </div>
                <div class="frame-center">
                    <table-or-list ref='tableOrList' :display="displayImages" @current="playImage"></table-or-list>
                    <tool-loading :loading="loading" category="spinner"></tool-loading>
                </div>
                <div class="frame-bottom">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="page.recordStartNo"
                        :page-size="page.pageRecordNum"
                        layout="total, prev, pager, next"
                        :total="page.total" :disabled="loading">
                    </el-pagination>
                </div>
            </div>
            <div class="image-right">
                <div class="container">
                    <tool-loading :loading="loading" category="spinner"></tool-loading>
                    <image-swiper ref='imageSwiper' :swiper-list="swiperList" @slideChange='slideChange'
                                  v-show="swiperList.length > 0"></image-swiper>
                    <empty-view v-show="swiperList.length === 0"></empty-view>
                </div>
            </div>
        </div>
        <float-menu :menus="menu" @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import LeftSideBar from '../../components/public/LeftSideBar';
    import FloatMenu from '../../components/util/FloatMenu';
    import {saveAlbum, getAlbum} from '../../service/http';
    import EmptyView from '../../components/util/EmptyView';
    import ImageSwiper from '../../components/public/ImageSwiper';
    import config from '../../utils/Config';
    import TableOrList from '../../components/tableOrList/TableOrList';
    import ToolLoading from '../../components/util/ToolLoading';

    export default {
        name: 'HobbyImage',
        components: {ToolLoading, TableOrList, LeftSideBar, FloatMenu, ImageSwiper, EmptyView},
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
                swiperList: [],
                displayImages: [],
                loading: false,
                page: {
                    recordStartNo: 1,
                    pageRecordNum: 20,
                    total: 0
                }
            };
        },
        mounted() {
            this.queryData();
        },
        methods: {
            chooseItem(menu) {
                if (menu.id === '退出') {
                    let labelName = sessionStorage.getItem('currentLabelName');
                    this.$router.push({path: '/read/' + labelName});
                }
            },
            httpRequest(file) {
                this.loading = true;
                let formData = new FormData();
                formData.append('file', file.file, file.file.name);
                formData.append('dir', 'album');
                saveAlbum(formData).then(data => {
                    if (data.status === 200) {
                        this.queryData();
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
            },
            analysis(list) {
                this.displayImages = list.map((item, index) => {
                    let obj = {};
                    obj.$index = index;
                    obj.name = item.name;
                    obj.updateTime = item.updateTime;
                    obj.cover = config.getImageOriginal() + encodeURIComponent(item.imageSrc);
                    return obj;
                });
                this.swiperList = list.map(item => {
                    return config.getImageOriginal() + encodeURIComponent(item.imageSrc);
                });
            },
            queryData() {
                if (!this.loading) {
                    this.loading = true;
                }
                let params = {
                    recordStartNo: this.page.recordStartNo - 1,
                    pageRecordNum: this.page.pageRecordNum,
                    condition: {}
                };
                getAlbum(params).then(data => {
                    if (data.status === 200 && data.total > 0) {
                        this.page.total = data.total;
                        this.analysis(data.data);
                    }
                }).catch(e => {
                    this.$message.error(e);
                }).finally(() => {
                    if (this.loading) {
                        this.loading = false;
                    }
                    if (this.page.total > 0) {
                        this.$refs.tableOrList.current = {selection: 0};
                    }
                });
            },
            handleCurrentChange(index) {
                this.page.recordStartNo = index;
                this.queryData();
            },
            playImage(index) {
                setTimeout(() => {
                    this.$refs.imageSwiper.swiper.slideToLoop(index, 1000, 0);
                }, 1);
            },
            slideChange(index) {
                this.$refs.tableOrList.current.selection = index;
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

                .frame-top {
                    width: 100%;
                    height: 25%;
                    position: relative;

                    .upload-demo {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }

                .frame-center {
                    width: 100%;
                    height: calc(75% - 3.2rem);
                    position: relative;
                }

                .frame-bottom {
                    height: 3.2rem;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    /deep/ .el-pagination {
                        .btn-next, .btn-prev {
                            background: unset;
                        }

                        .el-pager {
                            li {
                                background: unset;
                            }
                        }
                    }
                }
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
                    position: relative;
                    background: white;
                }
            }
        }
    }
</style>
