<template>
    <div class='tool-loading' v-show='loading'>
        <img class='image' v-if='normal === "vehicle"' :src=url alt=''>
        <img class='image' v-if='normal === "spinner"' :src=url2 alt=''>
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
            normal: {
                type: String,
                default: 'vehicle'
            }
        },
        data () {
            return {
                url: require('../../assets/loading.gif'),
                url2: require('../../assets/spinner.gif')
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
        background-color: white;

        .image {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 255px;
            height: 170px;
            margin: auto;
            position: absolute;
            background-size: 100% 100%;
        }
    }

</style>
