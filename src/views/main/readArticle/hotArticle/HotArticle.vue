<template>
    <div class='hot-article'>
        <div v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='50'>
            <column v-for='(item, index) in data' :key='index' :data='item'></column>
        </div>
    </div>
</template>

<script>
    import Column from '@/components/public/Column';

    export default {
        name: 'HotArticle',
        components: {Column},
        data () {
            return {
                busy: false,
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
        methods: {
            loadMore: function () {
                this.busy = true;
                setTimeout(() => {
                    for (let i = 0, j = 10; i < j; i++) {
                        this.data.push({
                            title: '滚动加载',
                            author: 'songning',
                            createTime: '2019-7-18 13:30:30',
                            updateTime: '2019-7-18 13:30:30'
                        });
                    }
                    this.busy = false;
                }, 1000);
            }
        }
    };
</script>

<style lang='scss'>
    .hot-article {
        width: 100%;
        height: 100%;
    }

</style>
