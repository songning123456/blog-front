<template>
    <div class="single-emotion">
        <slot></slot>
    </div>
</template>

<script>
    import Emotion from '../../utils/Emotion';

    export default {
        name: 'SingleEmotion',
        mounted () {
            let encrypt = this.$el.innerHTML;
            let imgHTML = Emotion.encrypt2Img(encrypt);
            this.$nextTick(() => {
                this.$el.innerHTML = imgHTML;
            });
        }
    };
</script>

<style lang="scss" scoped>
    .single-emotion {
        width: 1.2rem;
        height: 1.2rem;
        display: inline-block;
    }

</style>
