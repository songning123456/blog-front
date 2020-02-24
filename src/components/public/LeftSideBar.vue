<template>
    <div class="left-side-bar">
        <div class="main-col">
            <img :src=mainImage[kind] alt=""/>
        </div>
        <div class="info-col" :class="{'active': currentTab === item.name}" v-for="(item, index) in sideBar[kind]"
             :key='index' @click.stop="$router.push({path: item.path})">
            <img :src="item.image" alt=""/>
            <span>{{item.title}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LeftSideBar',
        props: {
            kind: {
                type: String,
                default: 'modify'
            },
            currentTab: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                sideBar: {
                    'modify': [
                        {
                            image: require('../../assets/modifyPassword.svg'),
                            title: '修改密码',
                            name: 'modifyPassword',
                            path: '/modify-password'
                        },
                        {
                            image: require('../../assets/modifyBlogger.svg'),
                            title: '修改简介',
                            name: 'modifyBlogger',
                            path: '/modify-blogger'
                        },
                        {
                            image: require('../../assets/modifyPersonal.svg'),
                            title: '修改经历',
                            name: 'modifyPersonal',
                            path: '/modify-personal'
                        }
                    ],
                    'hobby': [
                        {
                            image: require('../../assets/hobbyImage.svg'),
                            title: '图片搜集',
                            name: 'hobbyImage',
                            path: '/hobby-image'
                        },
                        {
                            image: require('../../assets/hobbyVideo.svg'),
                            title: '视频收集',
                            name: 'hobbyVideo',
                            path: '/hobby-video'
                        },
                        {
                            image: require('../../assets/hobbyMusic.svg'),
                            title: '音乐收集',
                            name: 'hobbyMusic',
                            path: '/hobby-music'
                        }
                    ]
                },
                mainImage: {
                    'modify': require('../../assets/modify.svg'),
                    'hobby': require('../../assets/hobby.svg')
                }
            };
        }
    };
</script>

<style lang="scss" scoped>
    .left-side-bar {
        background: #fff;
        width: 2rem;
        height: 100%;
        border-right: 1px solid #f0f2f9;
        cursor: pointer;
        float: left;

        .main-col {
            text-align: center;
            width: 100%;
            padding: 0.8rem 0;
            border-bottom: 1px solid #f0f2f9;

            img {
                width: 1.6rem;
                height: 1.6rem;
            }
        }

        .info-col {
            height: auto;
            padding: 13px 0;
            text-align: center;

            img {
                height: 1.2rem;
                width: 1.2rem;
            }

            &:hover, &.active {
                background: #e2efff;

                span {
                    color: #3776ff;
                }
            }

            span {
                writing-mode: vertical-lr;
                font-size: .7rem;
                color: #606266;
                letter-spacing: .25rem;
                padding-top: .5rem;
            }
        }
    }

</style>
