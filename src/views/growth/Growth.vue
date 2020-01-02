<template>
    <div class="growth">
        <main-head @futureTab='futureTab' current-tab="growth" ref='mainHead'></main-head>
        <empty-view></empty-view>
    </div>
</template>

<script>
    import MainHead from '../../components/public/MainHead';
    import EmptyView from '../../components/util/EmptyView';

    export default {
        name: 'Growth',
        components: {MainHead, EmptyView},
        methods: {
            futureTab (tab) {
                this.$router.push({path: '/' + tab});
            }
        }
    };
</script>

<style lang="scss" scoped>
    .growth {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
