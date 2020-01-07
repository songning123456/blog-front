<template>
    <div class='tool-loading' v-show='loading'>
        <img class='image' v-if='category === "face"' :src=faceUrl alt=''>
        <img class='image' v-if='category === "spinner"' :src=spinnerUrl alt=''>
    </div>
</template>

<script>
    export default {
        name: 'ToolLoading',
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            category: {
                type: String,
                default: 'face'
            }
        },
        data () {
            return {
                faceUrl: require('../../assets/face.gif'),
                spinnerUrl: require('../../assets/spinner.gif')
            };
        }
    };
</script>

<style lang='scss'>
    .tool-loading {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        position: absolute;
        background-color: #ffffffcf;

        .image {
            top: 0;
            left: 0;
            right: 0;
            bottom: 3rem;
            margin: auto;
            position: absolute;
        }
    }

</style>
