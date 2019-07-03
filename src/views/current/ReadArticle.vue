<template>
    <div class='read-article'>
        <el-row class='label-info'>
            <el-tabs v-model='currentContent'>
                <el-tab-pane v-for='(tab, index) in tabs' :label='tab.label' :name='tab.name'
                             :key='index'></el-tab-pane>
            </el-tabs>
        </el-row>
        <el-row class='content-info'>
            <el-col :span='6'></el-col>
            <el-col :span='12'>
                <el-scrollbar wrap-class="max-height" wrap-style="color: red;" view-style="font-weight: bold;"
                              view-class="view-box" :native="false">
                    <div v-for="value in 100" :key="value">
                        {{value}}
                    </div>
                </el-scrollbar>
            </el-col>
            <el-col :span='6'></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'ReadArticle',
        data () {
            return {
                tabs: [
                    {label: '推荐', name: 'first'},
                    {label: '关注', name: 'second'},
                    {label: '后端', name: 'third'},
                    {label: '前端', name: 'fourth'},
                    {label: '代码人生', name: 'fifth'}
                ],
                currentContent: 'first'
            };
        }
    };
</script>

<style lang="scss">
    @import '../../style/current/readArticle';

</style>
