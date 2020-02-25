<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="author-music">
        <author-basic current-tab="music">
            <template v-slot:container>
                <div class="music-container">
                    <div class="music-left">
                        <div class="frame-top">
                            <table-or-list ref="tableOrList" :display="displayMusics" error-cover="wangyiyun"
                                           @current='playMusic'></table-or-list>
                            <tool-loading :loading="loading"></tool-loading>
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
                    <div class="music-right">
                        <audio-player ref='audioPlayer' class="audio-player" :audio-list="playMusics"
                                      @play-prev='audioPrev'
                                      @play-next='audioNext'></audio-player>
                        <img src="../../assets/musicBg.jpg"/>
                    </div>
                </div>
            </template>
        </author-basic>
    </div>
</template>

<script>
    import AuthorBasic from '../../views/authorInfo/components/AuthorBasic';
    import TableOrList from '../../components/tableOrList/TableOrList';
    import {getFile} from '../../service/http';
    import ToolLoading from '../../components/util/ToolLoading';
    import config from '../../utils/Config';
    import AudioPlayer from '../../components/util/AudioPlayer';

    export default {
        name: 'AuthorMusic',
        components: {ToolLoading, TableOrList, AuthorBasic, AudioPlayer},
        data () {
            return {
                displayMusics: [],
                playMusics: [],
                loading: false, // 数据加载的时候同时禁止上传
                page: {
                    recordStartNo: 1,
                    pageRecordNum: 20,
                    total: 0
                }
            };
        },
        mounted () {
            this.queryData();
        },
        methods: {
            playMusic (index) {
                this.$refs.audioPlayer.playSome(index);
            },
            audioPrev (index) {
                this.$refs.tableOrList.current.selection = index;
            },
            audioNext (index) {
                this.$refs.tableOrList.current.selection = index;
            },
            analysis (list) {
                this.displayMusics = list.map((item, index) => {
                    let obj = {};
                    obj.$index = index;
                    obj.name = item.fileName;
                    obj.updateTime = item.updateTime;
                    obj.cover = config.getImageOriginal() + encodeURIComponent(item.coverSrc);
                    return obj;
                });
                this.playMusics = list.map(item => {
                    return config.getMusicOriginal() + encodeURIComponent(item.fileSrc);
                });
            },
            queryData () {
                if (!this.loading) {
                    this.loading = true;
                }
                let form = {
                    userId: this.$route.query.userId,
                    fileType: 'music'
                };
                let params = {
                    recordStartNo: this.page.recordStartNo - 1,
                    pageRecordNum: this.page.pageRecordNum,
                    condition: form
                };
                getFile(params).then(data => {
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
            handleCurrentChange (index) {
                this.page.recordStartNo = index;
                this.queryData();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .author-music {
        width: 100%;
        height: 100%;
        position: relative;

        .music-container {
            width: 100%;
            height: 100%;
            background-color: #f8f8f9;

            .music-left {
                width: 40%;
                height: 100%;
                float: left;

                .frame-top {
                    width: 100%;
                    height: calc(100% - 3.2rem);
                    position: relative;
                    padding-top: 1rem;
                    box-sizing: border-box;
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

            .music-right {
                width: 60%;
                height: 100%;
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                .audio-player {
                    position: absolute;
                    z-index: 1;
                    left: 50%;
                    bottom: 25%;
                }

                img {
                    filter: blur(1px);
                    width: 80%;
                }
            }
        }
    }

</style>
