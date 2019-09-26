<template>
    <el-popover placement='right' width='400' trigger='hover' popper-class="popover-column" :visible-arrow='false'>
        <el-table :data='results' :header-cell-style="{background:'#eef1f6',color:'#606266'}" max-height="400">
            <el-table-column width="60" property='index' label='序号' align="center"></el-table-column>
            <el-table-column label='查询结果' align="center">
                <template slot-scope="scope">
                    <span v-html="scope.row.value"></span>
                </template>
            </el-table-column>
        </el-table>
        <column slot='reference' :data='data' @detail="getDetail" class='column-popover'></column>
    </el-popover>
</template>

<script>
    import Column from '@/components/public/Column';

    export default {
        name: 'ColumnPopover',
        components: {Column},
        props: {
            data: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        computed: {
            results () {
                let scope = this;
                return scope.data.searchResult.map((item, index) => {
                    let obj = {};
                    obj.index = index;
                    obj.value = item;
                    return obj;
                });
            }
        },
        methods: {
            getDetail (id) {
                let scope = this;
                scope.$emit('detail', id);
            }
        }
    };
</script>

<style lang="scss">
    .column-popover {
        width: 40rem;
        margin-left: 28rem;
    }

    .popover-column {
        .el-table__body-wrapper::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        .el-table__body-wrapper::-webkit-scrollbar-thumb {
            background-color: #a1a3a9;
            border-radius: 3px;
        }
    }

</style>
