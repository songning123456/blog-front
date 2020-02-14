<template>
    <div class="hobby-table">
        <el-table :data="table" ref='elTable' style="width: 100%" @current-change='currentChange' highlight-current-row>
            <el-table-column label="序号" width="100" align="center"><span slot-scope="scope">{{ scope.$index + 1}}</span>
            </el-table-column>
            <el-table-column prop="name" label="标题" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="时间" width="180" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'HobbyTable',
        props: {
            current: {
                type: Object,
                default() {
                    return {
                        selection: 0
                    };
                }
            },
            table: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        methods: {
            currentChange(currentRow, oldCurrentRow) {
                this.current.selection = currentRow.$index;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .hobby-table {
        width: 100%;
        height: 100%;

        /deep/ .el-table {
            height: 100%;
        }
    }
</style>
