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
        <div class='fourth'>
            <attention-button :is-attention='isAttention'></attention-button>
        </div>
    </div>
</template>

<script>
    import {labelStatistic} from '../../../../service/request';
    import AttentionButton from './AttentionButton';

    export default {
        name: 'SingleLabel',
        components: {AttentionButton},
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
                numOfArticle: 0,
                isAttention: 0
            };
        },
        mounted () {
            let scope = this;
            let form = {
                labelName: scope.labelName
            };
            let param = {
                condition: form
            };
            labelStatistic(param).then(data => {
                scope.$response(data).then(data => {
                    scope.numOfAttention = data.data[0].attentionTotal;
                    scope.numOfArticle = data.data[0].articleTotal;
                    scope.isAttention = data.data[0].isAttention;
                });
            });
        }
    };
</script>

<style lang='scss' scoped>
    .single-label {
        height: 10rem;
        width: 9rem;
        border: 1px solid #ddd;
        float: left;
        margin: 0.65rem 0 0.65rem 1.3rem;
        cursor: pointer;

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
            font-size: .8rem;

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
