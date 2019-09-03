<template>
    <div class='simple-map'>
        <div id='simpleMap'></div>
    </div>
</template>

<script>
    import BMap from 'BMap';

    export default {
        name: 'SimpleMap',
        data () {
            return {
                city: {
                    name: '',
                    latitude: '', // 维度
                    longitude: '' // 精度
                }
            };
        },
        mounted () {
            let scope = this;
            scope.sureCity().then((data) => {
                scope.initMap(data);
            }).catch((error) => {
                scope.$message.error({message: error, duration: 1000});
            });
        },
        methods: {
            sureCity () {
                // 定义获取城市方法
                const geolocation = new BMap.Geolocation();
                let scope = this;
                let promise = new Promise((resolve, reject) => {
                    geolocation.getCurrentPosition((position) => {
                        scope.city.name = position.address.city;
                        scope.city.latitude = position.latitude;
                        scope.city.longitude = position.longitude;
                        resolve(scope.city);
                    }, () => {
                        reject('定位失败');
                    });
                });
                return promise;
            },
            initMap (data) {
                // 创建地图实例
                let map = new BMap.Map('simpleMap');
                // 创建点坐标
                let point = new BMap.Point(data.longitude, data.latitude);
                // 初始化地图，设置中心点坐标和地图级别
                map.centerAndZoom(point, 15);
                // 开启鼠标滚轮缩放
                map.enableScrollWheelZoom(true);
                // 添加地图类型控件
                // 添加默认缩放平移控件
                map.addControl(new BMap.NavigationControl());
                // 比例尺
                map.addControl(new BMap.ScaleControl());
                // 鹰眼图
                map.addControl(new BMap.OverviewMapControl());
                // 混合图
                map.addControl(new BMap.MapTypeControl());
                // 仅当设置城市信息时，MapTypeControl的切换功能才能可用
                map.setCurrentCity(data.name);
                //地图风格
                map.setMapStyle({style: 'midnight'});
            },
            floatingTap () {

            }
        }
    };
</script>

<style lang="scss">
    .simple-map {
        width: 100%;
        height: 100%;
        overflow: hidden;

        #simpleMap {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }

</style>
