<template>
    <div class='label-config'>
        <empty-view></empty-view>
    </div>
</template>

<script>
    import EmptyView from '../../../components/util/EmptyView';
    export default {
        name: 'LabelConfig',
        components: {EmptyView}
    };
</script>

<style lang='scss'>
    .label-config {
        width: 100%;
        height: 100%;
    }

</style>
