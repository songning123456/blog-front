<template>
    <div class='edit-article'>
        <mavon-editor v-model='form.content'></mavon-editor>
        <el-dialog title='标题简介' :visible.sync='dialog.title' width='25%' top='24vh' :close-on-click-modal='false'
                   :before-close='cancelTitle'>
            <el-form :model='form' :label-width="labelWidth">
                <el-form-item label='文章标题'>
                    <el-input v-model="form.title" placeholder='请输入文章标题'></el-input>
                </el-form-item>
                <el-form-item label="文章简介">
                    <el-input type='textarea' v-model='form.summary' placeholder='请输入文章简介'></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer'>
                <el-button @click='cancelTitle'>取消</el-button>
                <el-button type="primary" @click='sureTitle'>确定</el-button>
            </span>
        </el-dialog>
        <el-dialog title='标签' :visible.sync='dialog.label' width='70%'></el-dialog>
        <float-menu :menus='menus' @itemClick='chooseItem'></float-menu>
    </div>
</template>

<script>
    import FloatMenu from '../../components/util/FloatMenu';
    import uuidv1 from 'uuid/v1';

    export default {
        name: 'EditArticle',
        components: {FloatMenu},
        data () {
            let id1 = uuidv1();
            let id2 = uuidv1();
            let id3 = uuidv1();
            let id4 = uuidv1();
            return {
                labelWidth: '4rem',
                dialog: {
                    title: false,
                    label: false
                },
                form: {
                    title: '',
                    summary: '',
                    content: ''
                },
                menus: [
                    {
                        id: id1,
                        image: require('../../assets/edit/article.svg'),
                        title: '标题简介'
                    },
                    {
                        id: id2,
                        image: require('../../assets/edit/label.svg'),
                        title: '文章标签'
                    },
                    {
                        id: id3,
                        image: require('../../assets/edit/publish.svg'),
                        title: '发布文章'
                    }, {
                        id: id4,
                        image: require('../../assets/edit/return.svg'),
                        title: '返回首页'
                    }]
            };
        },
        methods: {
            chooseItem (menu) {
                let scope = this;
                switch (menu.title) {
                    case '标题简介':
                        scope.dialog.title = true;
                        break;
                    case '文章标签':
                        //...
                        break;
                    case '发布文章':
                        //...
                        break;
                    case '返回首页':
                        scope.$homePage('read');
                        break;
                    default:
                        break;
                }
            },
            cancelTitle () {
                let scope = this;
                scope.dialog.title = false;
                setTimeout(() => {
                    scope.form.title = '';
                    scope.form.summary = '';
                }, 300);
            },
            formCheck () {
                let scope = this;
                if (!scope.form.title) {
                    scope.$msg('标题不能为空');
                    return false;
                }
                if (!scope.form.summary) {
                    scope.$msg('摘要不能为空');
                    return false;
                }
                return true;
            },
            sureTitle () {
                let scope = this;
                if (!scope.formCheck()) {
                    return;
                }
                scope.dialog.title = false;
            }
        }
    };
</script>

<style lang='scss' scoped>
    .edit-article {
        width: 100%;
        height: 100%;

        .markdown-body {
            height: 100%;
        }

        .el-dialog__wrapper {
            /deep/ .el-dialog {
                /deep/ .el-dialog__body {
                    padding: 15px 10px 0 10px;
                }

                /deep/ .el-dialog__footer {
                    padding: 0 20px 20px;
                }
            }
        }
    }
</style>
