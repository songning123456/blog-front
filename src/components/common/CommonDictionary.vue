<template>
    <div></div>
</template>

<script>
    export default {
        install (Vue, options) {
            Vue.prototype.COMMON_MAP = {
                'DICTIONARY': {
                    QUERY: '查询',
                    RESET: '重置',
                    CHOOSE_TIME: '时间段选择',
                    STATISTIC_TYPE: '统计类型'
                },
                'HISTORY': {
                    READ_ARTICLE: '阅读文章',
                    SIMPLE_CLOCK: '休眠时钟',
                    SIMPLE_MAP: '定位地图',
                    STATISTIC: '大数据统计',
                    REGISTER: '注冊用戶信息'
                }
            };
        }
    };
</script>

