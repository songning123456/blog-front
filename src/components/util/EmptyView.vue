<template>
    <div class='empty-view'>
        <img src='../../assets/empty-data.png'/>
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
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            transform: scale(.5);
        }
    }

</style>
