<template>
    <div class='attention-button'>
        <div class='no-attention' v-if='isAttention === 0'>
            <span>关注</span>
        </div>
        <div class='yes-attention' v-else>
            <span>已关注</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AttentionButton',
        props: {
            // 是否关注，默认为否
            isAttention: {
                type: Number,
                default: 0
            }
        }
    };
</script>

<style lang='scss' scoped>
    .attention-button {
        width: 3.6rem;
        height: 1.5rem;
        float: left;
        font-size: .65rem;

        .yes-attention {
            width: 100%;
            height: 100%;
            border: 1px solid #3cb40e;
            background-color: #3cb40e;
            color: white;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .no-attention {
            width: 100%;
            height: 100%;
            border: 1px solid #3cb40e;
            box-sizing: border-box;
            color: #3cb40e;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>
