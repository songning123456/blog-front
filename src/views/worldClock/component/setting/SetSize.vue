<template>
    <div class='set-size'>
        <div class="set-title">
            {{ $t('settingData.zoom.title') }} :<span>0px</span>
        </div>
        <slider></slider>
    </div>
</template>

<script>
    import Slider from '../config/Slider';

    export default {
        name: 'SetSize',
        components: {Slider}
    };
</script>

