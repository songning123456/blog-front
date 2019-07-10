<template>
    <el-frameset :rows='"6%, *"' class='read-article'>
        <el-frame class='label-info'>
            <el-tabs v-model='currentContent'>
                <el-tab-pane v-for='(tab, index) in tabs' :label='tab.label' :name='tab.name'
                             :key='index'></el-tab-pane>
            </el-tabs>
        </el-frame>
        <el-frame>
            <el-frameset :cols='"30%, *, 30%"' class='content-info'>
                <el-frame></el-frame>
                <el-frame>
                    <template v-if='currentContent === "first"'>
                        <hot-article></hot-article>
                    </template>
                </el-frame>
                <el-frame></el-frame>
            </el-frameset>
        </el-frame>
    </el-frameset>
</template>

<script>
    import ElFrameset from '@/components/layout/el-frameset';
    import ElFrame from '@/components/layout/el-frame';
    import HotArticle from '@/views/current/readArticle/HotArticle';

    export default {
        name: 'ReadArticle',
        components: {HotArticle, ElFrame, ElFrameset},
        data () {
            return {
                tabs: [
                    {label: '热门', name: 'first'},
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
