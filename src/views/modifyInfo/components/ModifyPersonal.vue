<template>
    <div class="modify-personal">
        <div class="layout-left">
            <el-button type="success" plain @click='choose(1)'>预览</el-button>
            <el-button type="warning" plain @click='choose(2)'>新增</el-button>
        </div>
        <div class="layout-right">
            <div class="content" v-if="current === 1">
                <el-scrollbar>
                    <single-info v-for="i in 10" :key="i"></single-info>
                </el-scrollbar>
            </div>
            <empty-view v-if="current === 0"></empty-view>
        </div>
    </div>
</template>

<script>
    import SingleInfo from './children/SingleInfo';
    import EmptyView from '../../../components/util/EmptyView';

    export default {
        name: 'ModifyPersonal',
        components: {EmptyView, SingleInfo},
        data () {
            return {
                current: 1 // 空白展示
            };
        },
        methods: {
            choose (type) {
                let scope = this;
                scope.current = type;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .modify-personal {
        width: 100%;
        height: 100%;
        position: relative;

        .layout-left {
            height: 100%;
            width: 8%;
            float: left;

            .el-button:first-child {
                position: relative;
                top: 34%;
                width: 50%;
            }

            .el-button:nth-child(2) {
                position: relative;
                top: 37%;
                width: 50%;
                margin-left: unset;
            }
        }

        .layout-right {
            height: 100%;
            width: 92%;
            float: left;

            display: flex;
            justify-content: center;
            align-items: center;

            .content {
                width: 40%;
                height: 90%;
            }
        }
    }
</style>
