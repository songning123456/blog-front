<template>
    <div class="hobby-video">
        <left-side-bar current-tab='hobbyVideo' kind="hobby"></left-side-bar>
        <div class="video-frame">
            <div class="video-left">
                <div class="frame-top">
                    <el-upload class="upload-demo" drag action='' :accept="'video/mp4'" :show-file-list="false"
                               :before-upload="beforeUpload" :disabled='loading'
                               :http-request='httpRequest'>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">仅支持<b>mp4</b>且编码<b>h.264</b>文件</div>
                    </el-upload>
                </div>
                <div class="frame-center">
                    <table-or-list ref='tableOrList' :display="displayVideos" @current="playVideo"></table-or-list>
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
            <div class="video-right">
                <video-player class="video-player"
                              ref="videoPlayer"
                              :playsinline="true"
                              :options="playerOptions"
                              :x5-video-player-fullscreen="true"
                              @ready="playerIsReady"
                ></video-player>
            </div>
        </div>
        <float-menu :menus="menu" @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import LeftSideBar from '../../components/public/LeftSideBar';
    import FloatMenu from '../../components/util/FloatMenu';
    import {getVideo} from '../../service/request';
    import {uploadByPieces} from '../../utils/UploadUtil';
    import config from '../../utils/ConfigUtil';
    import 'videojs-flash';
    import 'videojs-hotkeys';
    import TableOrList from './components/TableOrList';
    import ToolLoading from '../../components/util/ToolLoading';

    export default {
        name: 'HobbyVideo',
        components: {ToolLoading, TableOrList, LeftSideBar, FloatMenu},
        data() {
            return {
                menu: [
                    {
                        id: '退出',
                        image: require('../../assets/exit.svg'),
                        title: '返回首页'
                    }
                ],
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [],
                    //你的封面地址
                    poster: require('../../assets/aiqiyi.svg'),
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: true,
                        // 全屏按钮
                        fullscreenToggle: true
                    }
                },
                displayVideos: [],
                playVideos: [],
                loading: false, // 数据加载的时候同时禁止上传
                page: {
                    recordStartNo: 0,
                    pageRecordNum: 20,
                    total: 0
                }
            };
        },
        mounted() {
            this.queryData();
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player;
            }
        },
        methods: {
            chooseItem(menu) {
                if (menu.id === '退出') {
                    let labelName = sessionStorage.getItem('currentLabelName');
                    this.$router.push({path: '/read/' + labelName});
                }
            },
            // 覆盖action的动作
            httpRequest(file) {
                this.loading = true;
                uploadByPieces({
                    file: file.file,
                    success: data => {
                        if (data.isExist) {
                            this.$message.warning('文件已经上传');
                            this.loading = false;
                        }
                        if (data.shardMerge) {
                            this.queryData();
                        }
                    },
                    error: e => {
                        this.$message.error('分片上传视频失败 ' + e);
                        this.loading = false;
                    }
                });
            },
            //判断是否是视频格式
            beforeUpload(file) {
                // 可支持的视频格式
                let videoFormat = ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'];
                if (videoFormat.indexOf(file.type) === -1) {
                    this.$message.warning('上传文件格式错误');
                    return false;
                }
            },
            // 点击播放哪个视频
            playVideo(index) {
                this.playerOptions.sources = [this.playVideos[index]];
            },
            // 添加视频快捷键
            playerIsReady(player) {
                player.hotkeys({
                    volumeStep: 0.1,
                    seekStep: 5,
                    enableModifiersForNumbers: false,
                    // override fullscreen to trigger when pressing the F key or Ctrl+Enter
                    fullscreenKey: function (event, player) {
                        // override fullscreen to trigger when pressing the F key or Ctrl+Enter
                        return ((event.which === 70) || (event.ctrlKey && event.which === 13));
                    }
                });
            },
            // 转换查询的结果集
            analysis(list) {
                this.playVideos = list.map(item => {
                    let obj = {};
                    obj.src = config.getVideoOriginal() + encodeURIComponent(item.src);
                    obj.type = item.type;
                    return obj;
                });
                this.displayVideos = list.map((item, index) => {
                    let obj = {};
                    obj.$index = index;
                    obj.name = item.name;
                    obj.updateTime = item.updateTime;
                    obj.cover = config.getImageOriginal() + encodeURIComponent(item.cover);
                    return obj;
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
                getVideo(params).then(data => {
                    if (data.status === 200 && data.total > 0) {
                        this.page.total = data.total;
                        this.analysis(data.data);
                    } else {
                        this.$message.error(data.message);
                    }
                }).catch(e => {
                    this.$message.error(e);
                }).finally(() => {
                    if (this.loading) {
                        this.loading = false;
                    }
                    this.$refs.tableOrList.current.selection = 0;
                });
            },
            handleCurrentChange(index) {
                this.page.recordStartNo = index;
                this.queryData();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .hobby-video {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #f8f8f9;

        .video-frame {
            float: left;
            height: 100%;
            width: calc(100% - 2rem - 1px);
            top: 0;

            .video-left {
                width: 40%;
                height: 100%;
                float: left;

                .frame-top {
                    width: 100%;
                    height: 25%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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

            .video-right {
                width: 60%;
                height: 100%;
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;

                .video-player {
                    width: 90%;

                    /deep/ .vjs-big-play-button {
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
            }
        }
    }
</style>
