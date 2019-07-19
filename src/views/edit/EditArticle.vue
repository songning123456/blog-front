<template>
    <div class='edit-article'>
        <el-frameset :cols='"3%, *"'>
            <!--侧栏-->
            <el-frame></el-frame>
            <el-frame>
                <el-frameset :rows='"8%, *"'>
                    <!--标题-->
                    <el-frame class='title'>
                        <span><el-input v-model="title" placeholder="请输入标题">
                              <i slot="suffix" class="el-input__icon el-icon-error" v-show='title !== ""'
                                 @click='deleteTitle'></i>
                        </el-input></span>
                        <span><img src='../../assets/标签.svg' @click='chooseLabel' title="选择标签"></span>
                        <span>
                           <img src='../../assets/发布.svg' @click='publish' title="发布文章"/>
                        </span>
                        <span>
                            <img src='../../assets/返回.svg' @click='goback' title='返回首页'/>
                        </span>
                    </el-frame>
                    <el-frame>
                        <mavon-editor v-model='content'></mavon-editor>
                    </el-frame>
                </el-frameset>
            </el-frame>
        </el-frameset>
        <el-dialog title='标签选择' :visible.sync='enableLabel' width='18%' top='30vh'>
            <div v-for='(item, index) in COMMON_MAP["blog_label"]' :key='index' class='label-choose'>
                <div><span>{{item.label}}</span></div>
                <div>
                    <el-switch v-model='labels[item.label]' active-color="#13ce66"></el-switch>
                </div>
            </div>
        </el-dialog>
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import {publishArticle} from '@/service/request';
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';
    import ToolLoading from '@/components/util/ToolLoading';

    export default {
        name: 'EditArticle',
        components: {ToolLoading, ElFrame, ElFrameset},
        data () {
            return {
                content: '',
                title: '',
                loading: false,
                throttleFn: null,
                enableLabel: false,
                labels: {}
            };
        },
        created () {
            let scope = this;
            scope.throttleFn = scope.throttle(scope.updateArticle, 3000, 3000);
        },
        methods: {
            // 限定时间过后不执行
            throttle (fn, delay, duration) {
                let timer = null;
                let begin = +new Date();
                return function () {
                    let scope = this;
                    let args = arguments;
                    let current = +new Date();
                    clearTimeout(timer);
                    if (current - begin >= duration) {
                        fn.apply(scope, args);
                        begin = current;
                    }
                };
            },
            chooseLabel () {
                let scope = this;
                scope.enableLabel = true;
            },
            deleteTitle () {
                let scope = this;
                scope.title = '';
            },
            publish () {
                let scope = this;
                scope.throttleFn();
            },
            updateArticle () {
                let scope = this;
                if (!scope.title) {
                    scope.$message({
                        type: 'error',
                        message: '标题不能为空!',
                        duration: 1000
                    });
                    return;
                }
                if (!scope.content) {
                    scope.$message({
                        type: 'error',
                        message: '文本不能为空!',
                        duration: 1000
                    });
                    return;
                }
                if (JSON.stringify(scope.labels) === '{}') {
                    scope.$message({
                        type: 'error',
                        message: '请至少选择一种标签!',
                        duration: 1000
                    });
                    return;
                }
                let form = {
                    content: scope.content,
                    title: scope.title,
                    readTimes: 0
                };
                // 设置标签
                let arr = [];
                for (let key in scope.labels) {
                    if (scope.labels[key]) {
                        arr.push(key);
                    }
                }
                form.kinds = arr.join(',');
                // 设置摘要
                if (scope.content.length > 25) {
                    form.summary = scope.content.slice(0, 25);
                } else {
                    form.summary = scope.content;
                }
                let params = {
                    condition: form
                };
                scope.loading = true;
                publishArticle(params).then(() => {
                }).finally(() => {
                    scope.loading = false;
                });
            },
            goback () {
                let scope = this;
                scope.$router.push({path: '/home-page/read'});
            }
        }
    };
</script>

<style lang="scss">
    .edit-article {
        height: 100%;
        width: 100%;

        .title {
            display: flex;
            align-items: center;
            background-color: #f8f8f9;

            span:nth-child(1) {
                width: 35%;
                padding-left: .5rem;

                .el-input {
                    span {
                        width: unset;
                        padding-left: unset;
                        text-align: unset;
                    }
                }
            }

            span:nth-child(2) {
                width: 30%;
                text-align: left;
                padding-left: .5rem;

                img {
                    cursor: pointer;
                }
            }

            span:nth-child(3) {
                width: 20%;
                text-align: right;

                img {
                    cursor: pointer;
                }
            }

            span:nth-child(4) {
                width: 15%;
                text-align: left;
                padding-left: 2rem;

                img {
                    cursor: pointer;
                }
            }
        }

        .markdown-body {
            height: 100%;
        }

        .label-choose {
            height: 1.5rem;

            div:nth-child(1) {
                float: left;
                width: 50%;
                height: 100%;
                line-height: 1.4rem;
            }

            div:nth-child(2) {
                float: right;
                width: 50%;
                height: 100%;
                line-height: 1.4rem;
            }
        }
    }

</style>
