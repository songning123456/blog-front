<template>
    <div id='simpleMap' class='simple-map'>
    </div>
</template>

<script>
    import BMap from 'BMap';

    export default {
        name: 'SimpleMap',
        data () {
            return {
                locationCity: ''
            };
        },
        mounted () {
            let scope = this;
            scope.city();
            scope.initMap();
        },
        methods: {
            city () {
                // 定义获取城市方法
                const geolocation = new BMap.Geolocation();
                let scope = this;
                geolocation.getCurrentPosition((position) => {
                    scope.locationCity = position.address.city;
                }, () => {
                    scope.locationCity = '定位失败';
                });
            },
            initMap () {
                // 创建地图实例
                let map = new BMap.Map('simpleMap');
                // 创建点坐标
                let point = new BMap.Point(116.331398, 39.897445);
                // 初始化地图，设置中心点坐标和地图级别
                map.centerAndZoom(point, 15);
                // 开启鼠标滚轮缩放
                map.enableScrollWheelZoom(true);

                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                map.addControl(new BMap.OverviewMapControl());
                map.addControl(new BMap.MapTypeControl());
                // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
                map.setCurrentCity('武汉');
                //地图风格
                map.setMapStyle({style: 'midnight'});
            }
        }
    };
</script>

<style lang="scss">
    .simple-map {
        width: 100%;
        height: 100%;
    }

</style>
