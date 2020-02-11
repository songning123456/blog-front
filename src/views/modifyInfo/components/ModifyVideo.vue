<template>
    <div class="modify-video">
        <div class="video-left">
            <div class="frame-top">
                <el-upload class="upload-demo" drag action='' :show-file-list="false" :before-upload="beforeUpload"
                           :http-request='httpRequest'>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传视频文件</div>
                </el-upload>
            </div>
            <div class="frame-bottom"></div>
        </div>
        <div class="video-right">
            <video-player class="video-player"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions"
                          :x5-video-player-fullscreen="true"
                          @pause="onPlayerPause($event)"
                          @play="onPlayerPlay($event)"
                          @click="fullScreen"
            ></video-player>
        </div>
    </div>
</template>

<script>
    import {operateVideo} from '../../../service/request';
    import config from '../../../utils/ConfigUtil';

    export default {
        name: 'ModifyVideo',
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
                    poster: require('../../../assets/videoCover.jpg'),
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        // 全屏按钮
                        fullscreenToggle: true
                    }
                }
            };
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player;
            }
        },
        methods: {
            httpRequest(file) {
                let formData = new FormData();
                formData.append('file', file.file, file.file.name);
                formData.append('dir', 'video');
                operateVideo(formData).then(data => {
                    if (data.status === 200 && data.total > 0) {
                        let videos = data.data.map(item => {
                            let obj = {};
                            obj.src = config.getImageOriginal() + encodeURIComponent(item.src);
                            obj.type = item.type;
                            return obj;
                        });
                        this.playerOptions.sources = videos;
                    }
                });
            },
            beforeUpload(file) {
                // 可支持的视频格式
                let videoFormat = ['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'];
                if (videoFormat.indexOf(file.type) === -1) {
                    this.$message.warning('上传文件格式错误');
                    return false;
                }
            },
            fullScreen() {
                let player = this.$refs.videoPlayer.player;
                player.requestFullscreen(); //调用全屏api方法
                player.isFullscreen(true);
                player.play();
            },
            onPlayerPlay(player) {
                player.play();
            },
            onPlayerPause(player) {
                // alert("pause");
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
