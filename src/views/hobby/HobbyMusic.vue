<template>
    <div class="hobby-music">
        <left-side-bar current-tab='hobbyMusic' kind="hobby"></left-side-bar>
        <div class="music-frame">
            <div class="music-left">
                <div class="frame-top">
                    <el-upload class="upload-demo" drag action='' :accept="'audio/*'" :show-file-list="false"
                               :disabled='loading'
                               :http-request='httpRequest'>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将音乐拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">仅支持<b>audio/*</b>文件</div>
                    </el-upload>
                    <div class="begin-cancel-progress" v-show="progress.show">
                        <el-progress type="circle" :percentage="progress.percentage"></el-progress>
                    </div>
                </div>
                <div class="frame-center">
                    <table-or-list ref='tableOrList' :display="displayMusics" error-cover="wangyiyun"
                                   @current="playMusic"></table-or-list>
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
                <audio-player ref='audioPlayer' class="audio-player" :audio-list="playMusics" @play-prev='audioPrev'
                              @play-next='audioNext'></audio-player>
                <img src="../../assets/musicBg.jpg"/>
            </div>
        </div>
        <float-menu :menus="menu" @itemClick="chooseItem"></float-menu>
    </div>
</template>

<script>
    import LeftSideBar from '../../components/public/LeftSideBar';
    import FloatMenu from '../../components/util/FloatMenu';
    import {uploadByPieces} from '../../utils/Upload';
    import {getFile} from '../../service/http';
    import config from '../../utils/Config';
    import TableOrList from '../../components/tableOrList/TableOrList';
    import ToolLoading from '../../components/util/ToolLoading';
    import AudioPlayer from '../../components/util/AudioPlayer';

    export default {
        name: 'HobbyMusic',
        components: {AudioPlayer, ToolLoading, TableOrList, FloatMenu, LeftSideBar},
        data () {
            return {
                menu: [
                    {
                        id: '退出',
                        image: require('../../assets/exit.svg'),
                        title: '返回首页'
                    }
                ],
                loading: false,
                page: {
                    recordStartNo: 1,
                    pageRecordNum: 20,
                    total: 0
                },
                progress: {
                    percentage: 0,
                    show: false
                },
                displayMusics: [],
                playMusics: []
            };
        },
        mounted () {
            this.queryData();
        },
        methods: {
            chooseItem (menu) {
                if (menu.id === '退出') {
                    let labelName = sessionStorage.getItem('currentLabelName');
                    this.$router.push({path: '/read/' + labelName});
                }
            },
            // 覆盖action的动作
            httpRequest (file) {
                this.loading = true;
                uploadByPieces({
                    file: file.file,
                    fileType: 'music',
                    pieceSize: 5,
                    success: data => {
                        if (data.isExist) {
                            this.$message.warning('文件已经上传');
                            this.loading = false;
                        }
                        // 合并分片成功后重新查询一次数据
                        if (data.shardMerge) {
                            this.queryData();
                        }
                        // 显示 上传进度条
                        if (data.showProgress) {
                            this.progress.show = true;
                        }
                        // 隐藏 上传进度条
                        if (data.hideProgress) {
                            setTimeout(() => {
                                this.progress.show = false;
                                this.progress.percentage = 0;
                            }, 1000);
                        }
                    },
                    error: e => {
                        this.$message.error('分片上传视频失败 ' + e);
                        this.loading = false;
                    },
                    progress: data => {
                        this.progress.percentage = data;
                    }
                });
            },
            playMusic (index) {
                this.$refs.audioPlayer.playSome(index);
            },
            audioPrev (index) {
                this.$refs.tableOrList.current.selection = index;
            },
            audioNext (index) {
                this.$refs.tableOrList.current.selection = index;
            },
            // 转换查询的结果集
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
                let params = {
                    recordStartNo: this.page.recordStartNo - 1,
                    pageRecordNum: this.page.pageRecordNum,
                    condition: {
                        fileType: 'music'
                    }
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
    .hobby-music {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f8f8f9;

        .music-frame {
            float: left;
            height: 100%;
            width: calc(100% - 2rem - 1px);
            top: 0;

            .music-left {
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

                    .begin-cancel-progress {
                        width: 8rem;
                        position: absolute;
                        top: 50%;
                        left: 88%;
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
                    width: 70%;
                }
            }
        }
    }

</style>
