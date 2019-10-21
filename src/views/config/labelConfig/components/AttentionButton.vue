<template>
    <div class='attention-button'>
        <div v-if='!loading' class='no-loading'>
            <div class='no-attention' v-if='!isAttention'>
                <span>关注</span>
            </div>
            <div class='yes-attention' v-else>
                <span>已关注</span>
            </div>
        </div>
        <div v-else class='yes-loading'>
            <div class='loading'>
                <img src='../../../../assets/attentionLoading.gif' />
            </div>
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
            },
            // 是否正在加载
            loading: {
                type: Boolean,
                default: false
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

        .no-loading {
            width: 100%;
            height: 100%;

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

        .yes-loading {
            width: 100%;
            height: 100%;

            .loading {
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
    }

</style>
