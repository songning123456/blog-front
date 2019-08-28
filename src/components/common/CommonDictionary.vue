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
                }
            };
        }
    };
</script>

