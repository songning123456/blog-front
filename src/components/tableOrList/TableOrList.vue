<template>
    <div class="table-or-list">
        <div class="choose-type" v-show="display.length > 0">
            <i class="el-icon-s-fold" :class="{'to-blue': kind === 'list'}" @click="kind = 'list'"></i>
            <i class="el-icon-s-unfold" :class="{'to-blue': kind === 'table'}" @click="kind = 'table'"></i>
        </div>
        <div class="display-info" v-show="display.length > 0">
            <show-list ref='showList' :list="display" :current='current' v-show='kind === "list"'></show-list>
            <show-table ref='showTable' :table='display' :current='current' v-show="kind === 'table'"></show-table>
        </div>
        <empty-view v-show="display.length === 0"></empty-view>
    </div>
</template>

<script>
    import ShowList from './ShowList';
    import ShowTable from './ShowTable';
    import EmptyView from '../util/EmptyView';

    export default {
        name: 'TableOrList',
        components: {ShowList, ShowTable, EmptyView},
        props: {
            display: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                kind: 'list',
                current: {selection: -1}
            };
        },
        watch: {
            current: {
                handler(newVal, oldVal) {
                    this.$refs.showTable.$refs.elTable.setCurrentRow(this.display[newVal.selection]);
                    this.$emit('current', newVal.selection);
                },
                deep: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .table-or-list {
        /*margin: .5rem;*/
        margin-left: .5rem;
        border: 1px solid #efefef;
        width: calc(100% - 0.5rem - 2px);
        height: calc(100% - 2px);

        .choose-type {
            width: 100%;
            height: 2rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 1.3rem;

            i {
                padding-left: 1%;

                &.to-blue {
                    color: #417BF1;
                }

                &:hover {
                    cursor: pointer;
                    color: #417BF1;
                }
            }
        }

        .display-info {
            width: 100%;
            height: calc(100% - 2rem);
            overflow: auto;

            &::-webkit-scrollbar {
                width: 3px;
                height: 3px;
            }
        }
    }
</style>
