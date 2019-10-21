<template>
    <div class='skeleton-lazy'>
        <span></span>
        <span></span>
    </div>
</template>

<script>
    export default {
        name: 'SkeletonLazy',
        mounted () {
            console.error('skeleton lazy');
        }
    };
</script>

<style scoped>
    .skeleton-lazy {
        width: 12rem;
        height: 24rem;
    }
</style>
