<template>
    <div class="modify-video">
        <div class="video-left">
            <div class="frame-top">
                <el-upload class="upload-demo" drag action='' :accept="'video/*'" :show-file-list="false"
                           :before-upload="beforeUpload"
                           :http-request='httpRequest'>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传视频文件</div>
                </el-upload>
            </div>
            <div class="frame-bottom">
                <multi-cover :videos="displayVideos" @play="playVideo" v-if="displayVideos.length > 0"></multi-cover>
                <empty-view v-else></empty-view>
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

<script>
    import {getVideo} from '../../../service/request';
    import {uploadByPieces} from '../../../utils/UploadUtil';
    import config from '../../../utils/ConfigUtil';
    import MultiCover from './children/MultiCover';
    import 'videojs-flash';
    import 'videojs-hotkeys';
    import EmptyView from '../../../components/util/EmptyView';

    export default {
        name: 'ModifyVideo',
        components: {EmptyView, MultiCover},
        data() {
            return {
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: true, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [],
                    techOrder: ['flash'],
                    //你的封面地址
                    poster: require('../../../assets/aiqiyi.svg'),
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
                playVideos: []
            };
        },
        mounted() {
            getVideo({condition: {}}).then(data => {
                if (data.status === 200 && data.total > 0) {
                    this.playVideos = data.data.map(item => {
                        let obj = {};
                        obj.src = config.getVideoOriginal() + encodeURIComponent(item.src);
                        obj.type = item.type;
                        return obj;
                    });
                    this.displayVideos = data.data.map(item => {
                        let obj = {};
                        obj.name = item.name;
                        obj.cover = config.getImageOriginal() + encodeURIComponent(item.cover);
                        return obj;
                    });
                }
            });
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player;
            }
        },
        methods: {
            // 覆盖action的动作
            httpRequest(file) {
                uploadByPieces({
                    file: file.file,
                    success: data => {
                        if (data.message) {
                            this.$message.warning(data.message);
                        }
                        if (data.total > 0) {
                            this.playVideos = data.data.map(item => {
                                let obj = {};
                                obj.src = config.getVideoOriginal() + encodeURIComponent(item.src);
                                obj.type = item.type;
                                return obj;
                            });
                            this.displayVideos = data.data.map(item => {
                                let obj = {};
                                obj.name = item.name;
                                obj.cover = config.getImageOriginal() + encodeURIComponent(item.cover);
                                return obj;
                            });
                        }
                    },
                    error: e => {
                        console.log('分片上传视频失败');
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
            }
        }
    };
</script>

<style lang="scss" scoped>

    .modify-video {
        width: 100%;
        height: 100%;
        position: relative;

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

            .frame-bottom {
                width: 100%;
                height: 75%;

                .empty-view {
                    margin: .5rem;
                    width: calc(100% - 1rem);
                    height: calc(100% - 1rem);
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

</style>
