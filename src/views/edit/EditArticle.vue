<template>
    <div class='edit-article'>
        <el-frameset :rows='"8%, *"'>
            <!--标题-->
            <el-frame class='title'>
                <span class='span-first'>
                    <img src='../../assets/article-title.svg' alt=""/>
                    <el-input v-model="title" placeholder="请输入标题">
                              <i slot="suffix" class="el-input__icon el-icon-error" v-show='title !== ""'
                                 @click='deleteTitle'></i>
                    </el-input>
                </span>
                <span class='span-second'>
                    <img src='../../assets/标签.svg' alt=""/>
                    <el-select v-model='selected' placeholder='请选择标签' clearable>
                        <el-option-group v-for='(group, index) in options' :key='index' :label='group.label'>
                            <el-option v-for='item in group.options' :key='item.value' :label='item.label'
                                       :value='item.value'></el-option>
                        </el-option-group>
                    </el-select>
                </span>
                <span class='span-third'>
                    <img src='../../assets/发布.svg' @click='publish' title="发布文章" alt=""/>
                </span>
                <span class='span-fourth'>
                    <img src='../../assets/返回.svg' @click='goback' title='返回首页' alt=""/>
                </span>
            </el-frame>
            <el-frame>
                <mavon-editor v-model='content'></mavon-editor>
            </el-frame>
        </el-frameset>
        <el-dialog title='标签选择' :visible.sync='enableLabel' width='18%' top='30vh'>

        </el-dialog>
        <tool-loading :loading='loading'></tool-loading>
    </div>
</template>

<script>
    import {publishArticle, getGroupCache} from '@/service/request';
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
                selected: '',
                options: []
            };
        },
        created () {
            let scope = this;
            scope.throttleFn = scope.throttle(scope.updateArticle, 3000, 3000);
        },
        mounted () {
            let scope = this;
            getGroupCache().then((data) => {
                scope.options = data.data;
            }).finally();
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
                if (!scope.selected) {
                    scope.$message({
                        type: 'error',
                        message: '请选择标签!',
                        duration: 1000
                    });
                    return;
                }
                let form = {
                    content: scope.content,
                    title: scope.title,
                    readTimes: 0,
                    author: 'songning'
                };
                form.kinds = scope.selected;
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

            .span-first {
                width: 35%;
                padding-left: .5rem;
                display: flex;
                align-items: center;

                img {
                    transform: scale(.8);
                }

                .el-input {
                    width: 90%;
                    margin-left: .3rem;

                    span {
                        width: unset;
                        padding-left: unset;
                        text-align: unset;
                    }
                }
            }

            .span-second {
                width: 30%;
                text-align: left;
                padding-left: .5rem;
                display: flex;
                align-items: center;

                img {
                    cursor: pointer;
                }

                .el-select {
                    margin-left: .2rem;
                }
            }

            .span-third {
                width: 20%;
                text-align: right;

                img {
                    cursor: pointer;
                }
            }

            .span-fourth {
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
