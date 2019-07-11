<template>
    <div class='tool-lading'>
        <template v-show='loading'>
            <img src='../../assets/loading.gif'>
        </template>
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
        z-index: 8;
        position: absolute;
        background-color: rgba(255, 255, 255, .8);
    }

</style>
