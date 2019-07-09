<template>
    <div class='el-frame'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'el-frame'
    };
</script>

<style scoped>
    .el-frame {
        overflow: auto;
    }

    ::-webkit-scrollbar {
        width: 0.3rem;
    }

    ::-webkit-scrollbar-track {
        background-color: #f5f7fa;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #cccccc;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #cccccc
    }

    ::-webkit-scrollbar-thumb:active {
        background-color: #cccccc
    }
</style>
