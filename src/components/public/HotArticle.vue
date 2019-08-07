<template>
    <div class='hot-article'>
        <template v-if='result.length'>
            <div class='hot-title'><span>热门文章</span></div>
            <div class='hot-content' v-for='(item, index) in result' :key='index' @click='getDetail(item.id)'>
                <div class='first'><span><img :src=getSrc(index) alt=''/></span><span
                    :title='item.title'>{{item.title}}</span></div>
                <div class='second'><span>{{item.author + '&nbsp;&nbsp;|&nbsp;&nbsp;' + getUpdateTime(index)}}</span>
                </div>
            </div>
        </template>
        <template v-else>
            <div class='hot-image'>
                <img src="../../assets/empty.png"/>
            </div>
        </template>
    </div>
</template>

<script>
    import DateUtil from '../../utils/DateUtil';
    import EmptyView from '@/components/util/EmptyView';

    export default {
        name: 'HotArticle',
        components: {EmptyView},
        props: {
            result: {
                type: Array,
                default: () => []
            }
        },
        mounted () {
        },
        methods: {
            getUpdateTime (index) {
                let scope = this;
                return DateUtil.formatDate(new Date(scope.result[index].updateTime));
            },
            getSrc (index) {
                return require('../../assets/fire/fire' + index + '.svg');
            },
            getDetail (id) {
                let scope = this;
                let routerData = scope.$router.resolve({
                    path: '/detail',
                    query: {
                        id: id
                    }
                });
                window.open(routerData.href, '_blank');
            }
        }
    }
    ;
</script>

<style lang='scss'>
    .hot-article {
        width: 13%;
        height: 50%;
        position: fixed;
        right: 16rem;
        top: 8rem;
        background: white;

        .hot-title {
            width: 100%;
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }

        .hot-content {
            width: 100%;
            height: 18%;
            border-top: 1px solid rgba(180, 180, 180, 0.36);

            :hover {
                cursor: pointer;
            }

            .first {
                height: 60%;
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                span:nth-child(1) {
                    width: 15%;
                }

                span:nth-child(2) {
                    width: 85%;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .second {
                height: 40%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: .7rem;
                color: #d2d2d2;
            }
        }

        .hot-image {
            width: 100%;
            height: 100%;

            img {
                width: 95%;
                height: 50%;
                position: relative;
                top: 6rem;
            }
        }
    }

</style>
