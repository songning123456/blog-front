<template>
    <div class="table-or-list">
        <div class="choose-type" v-show="display.length > 0">
            <i class="el-icon-s-fold" :class="{'to-blue': kind === 'list'}" @click="kind = 'list'"></i>
            <i class="el-icon-s-unfold" :class="{'to-blue': kind === 'table'}" @click="kind = 'table'"></i>
        </div>
        <div class="display-info" v-show="display.length > 0">
            <hobby-list :list="display" :current='current' v-show='kind === "list"'></hobby-list>
            <hobby-table ref='hobbyTable' :table='display' :current='current' v-show="kind === 'table'"></hobby-table>
        </div>
        <empty-view v-show="display.length === 0"></empty-view>
    </div>
</template>

<script>
    import HobbyList from './HobbyList';
    import HobbyTable from './HobbyTable';
    import EmptyView from '../../../components/util/EmptyView';

    export default {
        name: 'TableOrList',
        components: {HobbyList, HobbyTable, EmptyView},
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
                current: {selection: 0}
            };
        },
        watch: {
            'current.selection': {
                handler(newVal, oldVal) {
                    // 为列表时的情况
                    if (this.kind === 'list') {
                        if (this.$refs.hobbyTable) {
                            this.$refs.hobbyTable.$refs.elTable.setCurrentRow(this.display[newVal]);
                        } else {
                            // 第一次挂载时还未加载完成
                            this.$nextTick(() => {
                                setTimeout(() => {
                                    this.$refs.hobbyTable.$refs.elTable.setCurrentRow(this.display[newVal]);
                                }, 1000);
                            });
                        }
                    }
                    this.$emit('current', newVal);
                },
                immediate: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .table-or-list {
        margin: .5rem;
        border: 1px solid #efefef;
        width: calc(100% - 1rem - 2px);
        height: calc(100% - 1rem - 2px);

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
