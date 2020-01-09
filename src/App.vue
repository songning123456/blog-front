<template>
    <div id="app" class="main">
        <keep-alive>
            <router-view v-if="!$route.meta.notKeepAlive"></router-view>
        </keep-alive>
        <router-view v-if="$route.meta.notKeepAlive"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        methods: {
            resize () {
                document.documentElement.style.fontSize = document.documentElement.offsetWidth / (1920 / 20) + 'px';
            }
        },
        mounted () {
            this.resize();
            window.addEventListener('resize', this.resize);
        }
    };
</script>

<style lang="scss">
    .main {
        width: 100%;
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
