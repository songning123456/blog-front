<template>
    <div class="show-list">
        <show-card v-for="item in list" :key="item.$index" :card="item"
                    @click.native="currentChange(item.$index)"
                    :class="{'high-light': current.selection === item.$index}"></show-card>
    </div>
</template>

<script>
    import ShowCard from './ShowCard';

    export default {
        name: 'ShowList',
        components: {ShowCard},
        props: {
            list: {
                type: Array,
                default() {
                    return [];
                }
            },
            current: {
                type: Object,
                default() {
                    return {
                        selection: 0
                    };
                }
            }
        },
        methods: {
            currentChange(index) {
                if (this.current.selection !== index) {
                    this.current.selection = index;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .show-list {
        width: 100%;
        height: 100%;

        .high-light {
            border: 1px solid #3776ff;
        }
    }
</style>
