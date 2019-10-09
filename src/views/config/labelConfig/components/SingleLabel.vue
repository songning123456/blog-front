<template>
    <div class='single-label'>
        <div class='first'>
            <el-image :src='labelPhoto' lazy></el-image>
        </div>
        <div class='second'>
            <span>{{labelName}}</span>
        </div>
        <div class='third'>
            <span class='third-1'>
                <span>{{numOfAttention}}</span><span>关注</span>
            </span>
            <span class='third-2'>
                <span>{{numOfArticle}}</span><span>文章</span>
            </span>
        </div>
        <div class='fourth'></div>
    </div>
</template>

<script>
    export default {
        name: 'SingleLabel',
        props: {
            labelName: {
                type: String,
                default: ''
            },
            labelPhoto: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                numOfAttention: 0,
                numOfArticle: 0
            };
        }
    };
</script>

<style lang='scss' scoped>
    .single-label {
        height: 10rem;
        width: 9rem;
        border: 1px solid #ddd;
        float: left;
        margin: 0.6rem 0 0.6rem 1.2rem;
        cursor: pointer;

        .first {
            width: 100%;
            height: 40%;
        }

        .second {
            width: 100%;
            height: 20%;
        }

        .third {
            width: 100%;
            height: 20%;

            .third-1 {
                width: 50%;
            }

            .third-2 {
                width: 100%;
            }
        }

        .fourth {
            width: 100%;
            height: 20%;
        }
    }

</style>
