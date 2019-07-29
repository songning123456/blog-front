<template>
    <div></div>
</template>

<script>
    export default {
        install (Vue, options) {
            Vue.prototype.COMMON_MAP = {
                'blog_label': [
                    {
                        value: 'first',
                        label: '热门'
                    },
                    {
                        value: 'second',
                        label: '关注'
                    },
                    {
                        value: 'third',
                        label: '前端'
                    },
                    {
                        value: 'fourth',
                        label: '后端'
                    },
                    {
                        value: 'fifth',
                        label: '数据库'
                    }
                ]
            };
        }
    };
</script>

