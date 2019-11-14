<template>
    <el-popover placement='right' width='300' trigger='manual' v-model='show'
                popper-class='popover-item' :visible-arrow='false'>
        <span>{{title}}</span>
        <el-form-item :label='labelName' slot='reference'>
            <slot name='popoverItem'></slot>
        </el-form-item>
    </el-popover>
</template>

<script>
    export default {
        name: 'PopoverItem',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            labelName: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        }
    };
</script>

<style lang="scss">
    .popover-item {
        display: flex;
        align-items: center;
        left: 65.5rem;
        padding: 10px;
        background-color: #fef0f0;
        color: #f56c6c;
    }
</style>
