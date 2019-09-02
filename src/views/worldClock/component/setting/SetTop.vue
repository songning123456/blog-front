<template>
    <div class='set-top'>
        <div class="set-title">
            {{ $t('settingData.vertical.title') }} :<span>0px</span>
        </div>
        <slider></slider>
    </div>
</template>

<script>
    import Slider from '../config/Slider';

    export default {
        name: 'SetTop',
        components: {Slider}
    };
</script>

<style scoped>

</style>
