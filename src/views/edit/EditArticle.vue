<template>
    <div class='edit-article'>
        <mavon-editor v-model='content'></mavon-editor>
        <div class='sure-button'>
            <div class='submit'>
                <el-button type="primary">发布</el-button>
            </div>
            <div class='cancel'>
                <el-button type="primary" @click.native='goback'>返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EditArticle',
        data () {
            return {
                content: ''
            };
        },
        methods: {
            goback () {
                let scope = this;
                scope.$router.push({path: '/home-page/read'});
            }
        }
    };
</script>

<style lang="scss">
    @import '../../style/edit/editArticle';
</style>
