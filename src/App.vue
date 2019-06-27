<template>
    <div id="app" class="main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App'
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
