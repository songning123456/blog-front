<template>
    <div class='set-left'>
        <div class="set-title">
            {{ $t("settingData.level.title") }} :<span>0px</span>
        </div>
        <slider></slider>
    </div>
</template>

<script>
    import Slider from '../config/Slider';
    export default {
        name: 'SetLeft',
        components: {Slider}
    };
</script>
