<template>
    <div></div>
</template>

<script>
    export default {
        install (Vue, options) {
            Vue.prototype.COMMON_MAP = {
                'blog_label': [
                    {
                        'value': 0,
                        'label': '未分类'
                    },
                    {
                        'value': 1,
                        'label': '前端'
                    },
                    {
                        'value': 2,
                        'label': '后端'
                    }
                ]
            };
        }
    };
</script>

