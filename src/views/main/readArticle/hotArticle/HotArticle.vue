<template>
    <div class='hot-article'>
        <column :data='data[0]'></column>
    </div>
</template>

<script>
    import Column from '@/components/public/Column';

    export default {
        name: 'HotArticle',
        components: {Column},
        data () {
            return {
                data: [
                    {
                        title: '初次写文章，请多多包含AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    },
                    {
                        title: '初次写文章，请多多包含',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    },
                    {
                        title: '初次写文章，请多多包含',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    },
                    {
                        title: '初次写文章，请多多包含',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    },
                    {
                        title: '初次写文章，请多多包含',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    },
                    {
                        title: '初次写文章，请多多包含',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    }, {
                        title: '初次写文章，请多多包含',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    }, {
                        title: '初次写文章，请多多包含',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    },
                    {
                        title: '初次写文章，请多多包含',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    },
                    {
                        title: '初次写文章，请多多包含',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    },
                    {
                        title: '初次写文章，请多多包含',
                        author: 'songning',
                        createTime: '2019-7-10 13:30:30',
                        updateTime: '2019-7-10 13:30:30'
                    }

                ]
            };
        },
        methods: {}
    };
</script>

<style lang='scss'>
    .hot-article {
        width: 100%;
        height: 100%;
    }

</style>
