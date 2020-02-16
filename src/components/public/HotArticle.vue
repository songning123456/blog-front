<template>
    <div class='hot-article' ref="hotArticle">
        <template v-if='result.length'>
            <div class='hot-title'><span><img :src='hotImage'/></span><span>热门文章</span></div>
            <div class='hot-content' v-for='(item, index) in result' :key='index' @click='getDetail(item.id)'>
                <div class='first'>
                    <span><img :src=getSrc(index) alt=''/></span>
                    <span :title='item.title'>{{item.title}}</span></div>
                <div class='second'>
                    <span @click.stop='getIntroduction(item.userId)'>{{item.author}}</span>
                    <span>{{' | '}}</span>
                    <span @click.stop="$router.push({path: '/world-clock'})">{{getUpdateTime(index)}}</span>
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
    import EmptyView from '../../components/util/EmptyView';
    import {getHotArticle} from '../../service/request';

    export default {
        name: 'HotArticle',
        components: {EmptyView},
        props: {
            kinds: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                hotImage: require('../../assets/fire/hot.svg'),
                result: []
            };
        },
        watch: {
            kinds: {
                handler (newVal, oldVal) {
                    if (newVal) {
                        let params = {
                            condition: {kinds: this.kinds},
                            recordStartNo: 0,
                            pageRecordNum: 5
                        };
                        getHotArticle(params).then((data) => {
                            this.result = data.data;
                        });
                    }
                },
                immediate: true
            }
        },
        methods: {
            getUpdateTime (index) {
                let scope = this;
                return DateUtil.formatDate(new Date(scope.result[index].updateTime));
            },
            getIntroduction (userId) {
                let routerData = this.$router.resolve({
                    path: '/author-personal',
                    name: 'authorPersonal',
                    query: {
                        userId: userId
                    }
                });
                window.open(routerData.href, '_blank');
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
        width: 18%;
        height: 50%;
        position: fixed;
        right: 10rem;
        top: 9rem;
        background: white;
        transition: all .4s ease-in-out;

        .hot-title {
            width: 100%;
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;

            span:nth-child(1) {
                padding-top: .4rem;
                padding-right: .5rem;

                img {
                    transform: scale(1.2);
                }
            }
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
                    width: 10%;

                    img {
                        padding-top: .25rem;
                        box-sizing: border-box;
                    }
                }

                span:nth-child(2) {
                    font-size: .9rem;
                    font-weight: 500;
                    width: 90%;
                    text-align: left;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                    &:hover {
                        text-decoration: underline;
                        color: #409eff;
                    }
                }
            }

            .second {
                height: 40%;
                width: 100%;
                font-size: .7rem;
                color: #d2d2d2;
                display: flex;
                justify-content: flex-start;

                span:nth-child(1) {
                    padding-left: 2rem;

                    &:hover {
                        color: #409eff;
                    }
                }

                span:nth-child(3) {
                    &:hover {
                        color: #409eff;
                    }
                }

                span:nth-child(2) {
                    padding: 0 .2rem;
                }
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
