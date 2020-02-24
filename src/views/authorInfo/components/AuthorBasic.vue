<template>
    <div class="author-basic">
        <div class="left-frame">
            <div class="avatar-frame">
                <el-avatar shape="square" :src='result.headPortrait'>
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                </el-avatar>
            </div>
            <div v-for='(item, index) in display' :key='index' class='display-frame'>
                <div class='key'>{{item.key}}</div>
                <div class='value'>{{result[item.value]}}</div>
            </div>
        </div>
        <div class="right-frame">
            <div class="header">
                <span v-for='(tab, index) in tabs' :key='index' :class='{"current-tab": currentTab === tab.name}'
                      @click='tabClick(tab.name)'>{{tab.label}}</span>
            </div>
            <div class="container">
                <slot name='container'></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../../utils/Config';
    import {getBlogger} from '../../../service/http';

    export default {
        name: 'AuthorBasic',
        props: {
            currentTab: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                result: {},
                tabs: [
                    {label: '成长经历', name: 'personal'},
                    {label: '个性相册', name: 'image'},
                    {
                        label: '个性视频', name: 'video'
                    }],
                display: [
                    {
                        key: '作者',
                        value: 'author'
                    },
                    {
                        key: '性别',
                        value: 'gender'
                    },
                    {
                        key: '年龄',
                        value: 'age'
                    },
                    {
                        key: '职位',
                        value: 'profession'
                    },
                    {
                        key: '电话',
                        value: 'telephone'
                    },
                    {
                        key: '电子邮箱',
                        value: 'email'
                    }
                ]
            };
        },
        created() {
            let param = {
                condition: {userId: this.$route.query.userId}
            };
            getBlogger(param).then((data) => {
                if (data.status === 200 && data.total > 0) {
                    this.result = this.analysis(data.data[0]);
                }
            });
        },
        methods: {
            analysis(data) {
                let result = {};
                for (let key in data) {
                    // 判断结果值是否存在
                    if (!data[key] || data[key] === 'null') {
                        result[key] = '暂无';
                    } else {
                        // key 是否为headPortrait，是的话则转换
                        if (key === 'headPortrait') {
                            if (data.headPortrait.indexOf('https://') === -1 && data.headPortrait.indexOf('http://') === -1) {
                                result[key] = config.getImageOriginal() + encodeURIComponent(data.headPortrait);
                            } else {
                                result[key] = data.headPortrait;
                            }
                        } else {
                            result[key] = data[key];
                        }
                    }
                }
                return result;
            },
            tabClick(tab) {
                if (this.currentTab !== tab) {
                    this.$router.push({
                        path: '/author-' + tab,
                        query: {
                            userId: this.$route.query.userId
                        }
                    });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .author-basic {
        width: 100%;
        height: 100%;
        position: relative;

        .left-frame {
            height: 100%;
            width: 20%;
            float: left;
            box-sizing: border-box;
            background: #6ecadc;

            .avatar-frame {
                width: 10rem;
                height: 10rem;
                margin-left: calc((100% - 10rem) / 2);
                display: flex;

                .el-avatar {
                    margin: auto;
                    width: 70%;
                    height: 70%;
                }
            }

            .display-frame {
                margin: .8rem 0 .8rem 5rem;

                .key {
                    text-align: left;
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: white;
                    padding: .3rem 0;
                }

                .value {
                    text-align: left;
                    padding-left: 1rem;
                    box-sizing: border-box;
                }
            }
        }

        .right-frame {
            height: 100%;
            width: 80%;
            float: left;
            box-sizing: border-box;

            .header {
                height: 2rem;
                line-height: 2rem;
                border: 1px solid #f2f2f2;

                span {
                    margin: 0 2rem;

                    &:hover {
                        cursor: pointer;
                        color: #409EFF;
                    }

                    &.current-tab {
                        color: #409EFF;
                    }
                }
            }

            .container {
                width: 100%;
                height: calc(100% - 2rem - 1px);
            }
        }
    }
</style>
