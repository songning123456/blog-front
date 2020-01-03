<template>
    <div class='blogger-info'>
        <div class="avatar">
            <div class='inner-border'>
                <el-avatar shape="square" :src="avatar">
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
            </div>
        </div>
        <div class='simple-info'>
            <div class='inner-info'>
                <div v-for='(item, index) in display' :key='index' class='circle-display'
                     :style='{height: 100 / display.length + "%"}'>
                    <div class='key'>{{item.key}}</div>
                    <div class='value'>{{result[item.value]}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../../utils/ConfigUtil';
    import {getBloggerInfo} from '../../../service/request';

    export default {
        name: 'BloggerInfo',
        data () {
            return {
                result: {},
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
        mounted () {
            this.getBlogger();
        },
        computed: {
            avatar () {
                let scope = this;
                if (JSON.stringify(scope.result) !== '{}') {
                    if (scope.result.headPortrait.indexOf('https://') === -1 && scope.result.headPortrait.indexOf('http://') === -1) {
                        return config.getImageOriginal() + encodeURIComponent(scope.result.headPortrait);
                    } else {
                        return scope.result.headPortrait;
                    }
                } else {
                    return '';
                }
            }
        },
        methods: {
            getBlogger () {
                let scope = this;
                let form = {
                    userId: scope.$route.query.userId
                };
                let param = {
                    condition: form
                };
                getBloggerInfo(param).then((data) => {
                    if (data.status === 200) {
                        if (data.total > 0) {
                            scope.result = data.data[0];
                        } else {
                            this.$message.error('查询结果为空');
                        }
                    } else {
                        this.$message.error('查询异常! ' + data.message);
                    }
                }).catch().finally();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .blogger-info {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 2rem 1.5rem;

        .avatar {
            height: 30%;
            width: 100%;

            display: flex;
            justify-content: center;
            align-items: center;

            .inner-border {
                height: 80%;
                width: 80%;

                display: flex;
                justify-content: center;
                align-items: center;

                border: 1px solid white;

                .el-avatar {
                    height: 7.5rem;
                    width: 7.5rem;
                }
            }
        }

        .simple-info {
            height: 70%;
            width: 100%;

            .inner-info {
                width: 100%;
                height: 100%;
                padding: 1.8rem;
                box-sizing: border-box;

                .circle-display {
                    width: 100%;

                    .key {
                        width: 100%;
                        height: 50%;
                        text-align: left;

                        font-size: 1.2rem;
                        font-weight: 600;
                        color: white;
                    }

                    .value {
                        width: 100%;
                        height: 50%;
                        text-align: left;
                        padding-left: 1rem;
                    }
                }
            }
        }

    }

</style>
