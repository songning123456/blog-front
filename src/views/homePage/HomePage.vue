<template>
    <el-frameset :rows='"10%, *"' class='home-page'>
        <el-frame>
            <el-row :gutter='20' class='row-flex'>
                <el-col :span='8' class='title-info'>
                <span class='title-image'>
                    <img src='../../assets/notebook.png'/>
                </span>
                    <span class='title-font'>simple</span>
                </el-col>
                <el-col :span='8' class='tabs-info'>
                    <el-tabs v-model='currentPage' @tab-click='handleClick'>
                        <el-tab-pane v-for='(tab, index) in tabs' :label='tab.label' :name='tab.name'
                                     :key='index'></el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span='8' class='article-info'>
                    <el-button type="primary" @click.native='writeArticle'>写文章</el-button>
                </el-col>
            </el-row>
        </el-frame>
        <el-frame>
            <router-view></router-view>
        </el-frame>
    </el-frameset>
</template>

<script>
    import ReadArticle from '@/views/current/ReadArticle';
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';

    export default {
        name: 'HomePage',
        components: {ElFrame, ElFrameset, ReadArticle},
        data () {
            return {
                tabs: [
                    {label: '阅读', name: 'first'},
                    {label: '话题', name: 'second'},
                    {label: '历史', name: 'third'},
                    {label: '成长', name: 'fourth'}
                ],
                currentPage: 'first'
            };
        },
        methods: {
            writeArticle () {
                let scope = this;
                scope.$router.push({path: '/edit'});
            },
            handleClick () {
                let scope = this;
                if (scope.currentPage === 'first') {
                    scope.$router.push({path: '/home-page/read'});
                } else if (scope.currentPage === 'second') {
                    scope.$router.push({path: '/home-page/topic'});
                } else if (scope.currentPage === 'third') {
                    scope.$router.push({path: '/home-page/history'});
                } else if (scope.currentPage === 'fourth') {
                    scope.$router.push({path: '/home-page/growth'});
                } else {
                    // ...
                }
            }
        }
    };
</script>

<style lang='scss'>
    @import '~@/style/homePage/homePage';

</style>
