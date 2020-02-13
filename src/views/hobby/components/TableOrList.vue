<template>
    <div class="table-or-list">
        <div class="choose-type" v-if="display.length > 0">
            <i class="el-icon-s-fold" :class="{'to-blue': value === 'list'}" @click="switchStatus('list')"></i>
            <i class="el-icon-s-unfold" :class="{'to-blue': value === 'table'}" @click="switchStatus('table')"></i>
        </div>
        <div class="display-info" v-if="display.length > 0">
            <hobby-list :list="display" @currentSelection="currentSelection" v-if='value === "list"'></hobby-list>
            <hobby-table :table='display' @currentSelection='currentSelection' v-if="value === 'table'"></hobby-table>
        </div>
        <empty-view v-if="display.length === 0"></empty-view>
    </div>
</template>

<script>
    import HobbyList from './HobbyList';
    import EmptyView from '../../../components/util/EmptyView';
    import HobbyTable from './HobbyTable';

    export default {
        name: 'TableOrList',
        components: {HobbyTable, EmptyView, HobbyList},
        props: {
            value: {
                type: String,
                default: 'list'
            },
            display: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        methods: {
            switchStatus(kind) {
                this.$emit('input', kind);
            },
            currentSelection(index) {
                this.$emit('current', index);
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
