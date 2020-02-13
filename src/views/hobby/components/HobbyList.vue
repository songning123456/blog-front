<template>
    <div class="hobby-list">
        <hobby-card v-for="item in list" :key="item.$index" :card="item"
                    @click.native="currentChange(item.$index)" :class="{'high-light': chosen === item.$index}"></hobby-card>
    </div>
</template>

<script>
    import HobbyCard from './HobbyCard';

    export default {
        name: 'HobbyList',
        components: {HobbyCard},
        props: {
            list: {
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
            currentChange(index) {
                if (this.chosen !== index) {
                    this.chosen = index;
                    this.$emit('currentSelection', index);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .hobby-list {
        width: 100%;
        height: 100%;

        .high-light {
            border: 1px solid #3776ff;
        }
    }
</style>
