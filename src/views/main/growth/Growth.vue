<template>
    <div class='growth'>
        <empty-view></empty-view>
    </div>
</template>

<script>
    import EmptyView from '../../../components/util/EmptyView';

    export default {
        name: 'Growth',
        components: {EmptyView}
    };
</script>

<style lang="scss">
    .growth {
        width: 100%;
        height: 100%;
    }
</style>
