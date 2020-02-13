<template>
    <div class="single-cover">
        <div class="cover-src">
            <el-image :src="video.cover" lazy></el-image>
        </div>
        <div class="cover-name" :class="video.name.length >= 14 ? 'more-than' : 'less-than'">{{video.name}}</div>
    </div>
</template>

<script>

    export default {
        name: 'SingleCover',
        props: {
            video: {
                type: Object,
                default() {
                }
            }
        },
        data() {
            return {};
        },
        methods: {}
    };
</script>

<style lang="scss" scoped>
    .single-cover {
        width: 23%;
        margin: 1%;
        padding: 1%;
        box-sizing: border-box;
        height: auto;
        overflow: auto;
        float: left;
        cursor: pointer;
        background: white;
        border: 1px solid #f5f5f5;
        border-radius: .2rem;

        .cover-src {
            height: 7rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .el-image {

            }
        }

        .cover-name {
            height: 1.6rem;
            width: 100%;
            font-size: .6rem;

            // 文本长度>=14
            &.more-than {
                word-break: break-all;
                text-align: left;
                line-height: .8rem;
            }

            // 文本长度<14
            &.less-than {
                line-height: 1.6rem;
                text-align: center;
            }
        }
    }
</style>
