<template>
    <div class='simple-map'>
        <tool-loading :loading='loading'></tool-loading>
        <div id='simpleMap'></div>
        <popover-float>
            <div slot='popoverInfo' class='map-info'>
                <el-form :model='city' label-width='50px'>
                    <el-form-item label='省份'>
                        <el-input :value='city.province || "暂无"' :readonly='true'></el-input>
                    </el-form-item>
                    <el-form-item label='城市'>
                        <el-input :value='city.name || "暂无"' :readonly='true'></el-input>
                    </el-form-item>
                    <el-form-item label='精度'>
                        <el-input :value='city.longitude || "暂无"' :readonly='true'></el-input>
                    </el-form-item>
                    <el-form-item label='维度'>
                        <el-input :value='city.latitude || "暂无"' :readonly='true'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <img title='切换样式' class='switch' src='../../assets/switch.svg' @click='switchStyle'/>
                        <img title='退出' class='exit' src='../../assets/exitMap.svg' @click='exitMap'/>
                    </el-form-item>
                </el-form>
            </div>
        </popover-float>
    </div>
</template>

<script>
    import BMap from 'BMap';
    import PopoverFloat from '@/components/util/PopoverFloat';
    import ToolLoading from '@/components/util/ToolLoading';

    export default {
        name: 'SimpleMap',
        components: {ToolLoading, PopoverFloat},
        data () {
            return {
                city: {
                    province: '', // 省份
                    name: '', // 市名
                    latitude: '', // 维度
                    longitude: '' // 精度
                },
                loading: false
            };
        },
        mounted () {
            let scope = this;
            scope.sureCity().then((data) => {
                scope.initMap(data);
            }).catch((error) => {
                scope.$message.error({message: error, duration: 1000});
            }).finally(() => {
                scope.loading = false;
            });
        },
        methods: {
            sureCity () {
                // 定义获取城市方法
                const geolocation = new BMap.Geolocation();
                let scope = this;
                scope.loading = true;
                let promise = new Promise((resolve, reject) => {
                    geolocation.getCurrentPosition((position) => {
                        scope.city.province = position.address.province;
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
            switchStyle () {

            },
            exitMap () {
                let scope = this;
                scope.$router.push({path: '/home-page/read'});
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

        .map-info {
            width: 100%;
            height: 100%;

            .el-form {
                .el-form-item {
                    margin-bottom: 1px;

                    .el-input {
                        width: 85%;

                        .el-input__inner {
                            height: 30px;
                        }
                    }

                    img {

                        cursor: pointer;

                        &.switch {
                            position: relative;
                            right: 2rem;
                            transform: scale(1.5);
                        }

                        &.exit {
                            position: relative;
                            transform: scale(1.2);
                        }
                    }
                }
            }
        }
    }

</style>
