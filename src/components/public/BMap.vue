<template>
    <div class='b-map'>
        <div>{{locationCity}}</div>
    </div>
</template>

<script>
    import BMap from 'BMap';

    export default {
        name: 'BMap',
        data () {
            return {
                locationCity: ''
            };
        },
        mounted () {

        },
        methods: {
            city () { // 定义获取城市方法
                const geolocation = new BMap.Geolocation();
                let scope = this;
                geolocation.getCurrentPosition(function getInfo (position) {
                        let city = position.address.city; // 获取城市信息
                        // let province = position.address.province // 获取省份信息
                        scope.LocationCity = city;
                    },
                    () => {
                        scope.LocationCity = '定位失败';
                    },
                    {provider: 'baidu'});
            }
        }
    };
</script>

<style lang="scss">
    .b-map {
        width: 100%;
        height: 100%;
    }

</style>
