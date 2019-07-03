<template>
    <div class='home-page'>
        <el-row :gutter='20' class='row-flex'>
            <el-col :span='8' class='title-info'>
                <span class='title-image'>
                    <img src='../../assets/notebook.png'/>
                </span>
                <span class='title-font'>simple</span>
            </el-col>
            <el-col :span='8' class='tabs-info'>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for='(tab, index) in tabs' :label='tab.label' :name='tab.name'
                                 :key='index'></el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span='8' class='article-info'>
                <el-button type="primary">写文章</el-button>
            </el-col>
        </el-row>
        <el-row>

        </el-row>
        <el-row></el-row>
    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        data () {
            return {
                tabs: [
                    {label: '首页', name: 'first'},
                    {label: '话题', name: 'second'},
                    {label: '历史', name: 'third'}
                ]
            };
        }
    };
</script>

<style lang='scss'>
    @import '../../style/homePage/homePage';

</style>
