<template>
    <div class="author-album">
        <author-basic current-tab="album">
            <template v-slot:container>
                <div class="album-container">
                    <div class="album-left">
                        <div class="frame-top">
                            <table-or-list ref='tableOrList' :display="displayImages"
                                           @current="playImage"></table-or-list>
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
                    <div class="album-right">
                        <div class="container">
                            <tool-loading :loading="loading" category="spinner"></tool-loading>
                            <image-swiper ref='imageSwiper' :swiper-list="swiperList" @slideChange='slideChange'
                                          v-show="swiperList.length > 0"></image-swiper>
                            <empty-view v-show="swiperList.length === 0"></empty-view>
                        </div>
                    </div>
                </div>
            </template>
        </author-basic>
    </div>
</template>

<script>
    import AuthorBasic from './components/AuthorBasic';
    import TableOrList from '../../components/tableOrList/TableOrList';
    import ToolLoading from '../../components/util/ToolLoading';
    import {getAlbum} from '../../service/http';
    import config from '../../utils/Config';
    import ImageSwiper from '../../components/public/ImageSwiper';
    import EmptyView from '../../components/util/EmptyView';


    export default {
        name: 'AuthorAlbum',
        components: {EmptyView, ImageSwiper, ToolLoading, TableOrList, AuthorBasic},
        data() {
            return {
                displayImages: [],
                swiperList: [],
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
                let form = {
                    userId: this.$route.query.userId
                };
                let params = {
                    recordStartNo: this.page.recordStartNo - 1,
                    pageRecordNum: this.page.pageRecordNum,
                    condition: form
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
    .author-album {
        width: 100%;
        height: 100%;
        position: relative;

        .album-container {
            width: 100%;
            height: 100%;
            background-color: #f8f8f9;

            .album-left {
                width: 40%;
                height: 100%;
                float: left;
                padding-top: 1rem;
                box-sizing: border-box;

                .frame-top {
                    width: 100%;
                    height: calc(100% - 3.2rem);
                    position: relative;
                }

                .frame-bottom {
                    width: 100%;
                    height: 3.2rem;
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

            .album-right {
                width: 60%;
                height: 100%;
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;

                .container {
                    width: 80%;
                    height: 80%;
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
