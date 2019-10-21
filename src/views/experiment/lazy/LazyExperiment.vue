<template>
    <div class='lazy-experiment'>
        <blog-lazy-component v-for="i in 20" :key='i'>
            <origin-lazy></origin-lazy>
            <skeleton-lazy slot='skeleton'></skeleton-lazy>
        </blog-lazy-component>
    </div>
</template>

<script>
    import BlogLazyComponent from '../../../components/util/BlogLazyComponent';
    import OriginLazy from './components/OriginLazy';
    import SkeletonLazy from './components/SkeletonLazy';

    export default {
        name: 'LazyExperiment',
        components: {SkeletonLazy, OriginLazy, BlogLazyComponent}
    };
</script>

<style lang='scss' scoped>
    .lazy-experiment {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>
