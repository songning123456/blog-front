<template>
    <div class='tool-lading'>
        <template v-if='loading'>
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

    }

</style>
