<template>
    <div class="author-video">
        <author-basic current-tab="video">
            <template v-slot:container>
                <div class="video-container">
                    <div class="video-left">
                        <div class="frame-top">
                            <table-or-list ref='tableOrList' :display="displayVideos"
                                           @current="playVideo"></table-or-list>
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
            </template>
        </author-basic>
    </div>
</template>

<script>
    import AuthorBasic from './components/AuthorBasic';
    import {getVideo} from '../../service/request';
    import config from '../../utils/ConfigUtil';
    import 'videojs-flash';
    import 'videojs-hotkeys';
    import TableOrList from '../../components/tableOrList/TableOrList';
    import ToolLoading from '../../components/util/ToolLoading';

    export default {
        name: 'AuthorVideo',
        components: {AuthorBasic, TableOrList, ToolLoading},
        data() {
            return {
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
                    recordStartNo: 1,
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
                let form = {
                    userId: this.$route.query.userId
                };
                let params = {
                    recordStartNo: this.page.recordStartNo - 1,
                    pageRecordNum: this.page.pageRecordNum,
                    condition: form
                };
                getVideo(params).then(data => {
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    .author-video {
        width: 100%;
        height: 100%;
        position: relative;

        .video-container {
            width: 100%;
            height: 100%;
            background-color: #f8f8f9;

            .video-left {
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
