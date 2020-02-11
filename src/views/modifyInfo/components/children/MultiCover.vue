<template>
    <div class="multi-cover">
        <single-cover v-for="(item, index) in videos" :key="index" :video="item"></single-cover>
    </div>
</template>

<script>
    import SingleCover from './SingleCover';

    export default {
        name: 'MultiCover',
        components: {SingleCover},
        props: {
            videos: {
                type: Array,
                default() {
                    return [];
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .multi-cover {
        margin: .5rem;
        width: calc(100% - 1rem);
        height: calc(100% - 1rem);
    }
</style>
