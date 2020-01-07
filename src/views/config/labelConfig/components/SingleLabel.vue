<template>
    <div class='single-label' :class='isChosen ? "un-normal-border" : "normal-border"'>
        <div class='first'>
            <el-image :src='data.labelPhoto' lazy></el-image>
        </div>
        <div class='second'>
            <span>{{data.labelName}}</span>
        </div>
        <div class='third'>
            <span class='third-1'>
                <span>{{data.numOfAttention}}</span><span>关注</span>
            </span>
            <span class='third-2'>
                <span>{{data.numOfArticle}}</span><span>文章</span>
            </span>
        </div>
        <div class='fourth'>
            <attention-button :is-attention='data.isAttention' @click.native='modifyAttention'
                              :loading='loading.status'></attention-button>
        </div>
    </div>
</template>

<script>
    import AttentionButton from './AttentionButton';

    export default {
        name: 'SingleLabel',
        components: {AttentionButton},
        props: {
            data: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            isChosen: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                loading: {
                    status: false
                }
            };
        },
        methods: {
            modifyAttention () {
                let scope = this;
                scope.face.status = true;
                let attention;
                if (scope.data.isAttention === 1) {
                    attention = 0;
                } else {
                    attention = 1;
                }
                let form = {
                    attention: attention,
                    labelName: scope.data.labelName
                };
                let param = {
                    condition: form
                };
                scope.$emit('updateParam', param, scope.face);
            }
        }
    };
</script>

<style lang='scss' scoped>
    .single-label {
        height: 10rem;
        width: 9rem;
        float: left;
        margin: 0.65rem 0 0.65rem 1.3rem;
        cursor: pointer;

        &.normal-border {
            border: 1px solid #ddd;
        }

        &.un-normal-border {
            border: 1px solid #3cb40e;
        }

        .first {
            width: 100%;
            height: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .second {
            width: 100%;
            height: 15%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .third {
            width: 100%;
            height: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .7rem;
            color: #909090;

            .third-1 {
                width: 50%;
                float: left;
            }

            .third-2 {
                width: 50%;
                float: left;
            }
        }

        .fourth {
            width: 100%;
            height: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

</style>
