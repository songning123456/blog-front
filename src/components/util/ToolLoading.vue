<template>
    <div class='tool-lading' v-show='loading'>
        <img class='image' src='../../assets/loading.gif' alt=''>
    </div>
</template>

<script>
    export default {
        name: 'ToolLoading',
        props: {
            loading: {
                type: Boolean,
                default: false
            }
        }
    };
</script>

<style lang='scss'>
    .tool-lading {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        position: absolute;
        background-color: rgba(255, 255, 255, .8);

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
            background-image: url('../../assets/loading.gif');
        }
    }

</style>
