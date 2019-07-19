<template>
    <div></div>
</template>

<script>
    export default {
        install (Vue, options) {
            Vue.prototype.COMMON_MAP = {
                'blog_label': [
                    {
                        'value': 'first',
                        'label': '前端'
                    },
                    {
                        'value': 'second',
                        'label': '后端'
                    },
                    {
                        'value': 'third',
                        'label': '数据库'
                    }
                ]
            };
        }
    };
</script>

