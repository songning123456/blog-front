<template>
    <div class='empty-view'>
        <img src='../../assets/empty.png'/>
    </div>
</template>

<script>
    export default {
        name: 'EmptyView'
    };
</script>

<style lang="scss">
    .empty-view {
        width: 100%;
        height: 100%;
        background: white;

        img {
            transform: scale(.5);
        }
    }

</style>
