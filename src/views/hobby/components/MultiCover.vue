<template>
    <div class="multi-cover">
        <single-cover v-for="(item, index) in videos" :key="index" :video="item"
                      @click.native="highLight(index)" :class="{'high-light': chosen === index}"></single-cover>
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
        },
        data() {
            return {
                chosen: -1
            };
        },
        methods: {
            highLight(index) {
                if (this.chosen !== index) {
                    this.chosen = index;
                    this.$emit('play', index);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .multi-cover {
        margin: .5rem;
        border: 1px solid #efefef;
        width: calc(100% - 1rem - 2px);
        height: calc(100% - 1rem - 2px);
        overflow: auto;

        &::-webkit-scrollbar {
            width: 3px;
            height: 3px;
        }

        .high-light {
            border: 1px solid #3776ff;
        }
    }
</style>
