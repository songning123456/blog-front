<template>
    <div class="emotion-list">
        <div class="emotion-row" v-for="(row, index) in emotionList" :key="index">
            <single-emotion class="emotion-item" v-for="(item, i) in row" :key="i" @click.native="clickEmotion(item)"
                            v-html="item">
            </single-emotion>
        </div>
    </div>
</template>

<script>
    import SingleEmotion from './SingleEmotion';
    import Emotion from '../../utils/Emotion';

    export default {
        name: 'EmotionList',
        components: {SingleEmotion},
        data () {
            return {
                emotionList: []
            };
        },
        created () {
            this.emotionList = Emotion.dbEncryptArr;
        },
        methods: {
            clickEmotion (item) {
                let result = Emotion.encrypt2Img(item);
                this.$emit('emotion', result);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .emotion-list {
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
        padding: 5px;
        border: 1px solid #b4b4b4;
        overflow: hidden;
        overflow-y: auto;
        max-height: 13rem;

        &::-webkit-scrollbar {
            width: 4px;
        }

        .emotion-row {
            display: flex;

            .emotion-item {
                flex: 1;
                text-align: center;
                cursor: pointer;
            }
        }
    }

</style>
