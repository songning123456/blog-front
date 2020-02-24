<template>
    <div class="hobby-music">
        <left-side-bar current-tab='hobbyMusic' kind="hobby"></left-side-bar>
        <div class="music-frame">
            <div class="music-left">
                <div class="frame-top">
                    <el-upload class="videoUpload-demo" drag action='' :accept="'audio/*'" :show-file-list="false"
                               :disabled='loading'
                               :http-request='httpRequest'>
                        <i class="el-icon-videoUpload"></i>
                        <div class="el-upload__text">将音乐拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">仅支持<b>audio/*</b>文件</div>
                    </el-upload>
                    <div class="begin-cancel-progress" v-show="progress.show">
                        <el-progress type="circle" :percentage="progress.percentage"></el-progress>
                    </div>
                </div>
                <div class="frame-center"></div>
                <div class="frame-bottom"></div>
            </div>
            <div class="music-right"></div>
        </div>
    </div>
</template>

<script>
    import LeftSideBar from '../../components/public/LeftSideBar';

    export default {
        name: 'HobbyMusic',
        components: {LeftSideBar},
        data () {
            return {
                loading: false,
                page: {
                    recordStartNo: 1,
                    pageRecordNum: 20,
                    total: 0
                },
                progress: {
                    percentage: 0,
                    show: false
                }
            };
        },
        methods: {
            httpRequest () {
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

                    .videoUpload-demo {
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

            .music-right {
                width: 60%;
                height: 100%;
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

</style>
