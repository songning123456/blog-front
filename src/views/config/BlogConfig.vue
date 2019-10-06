<template>
    <div class='blog-config'>
        <div class="search">
            <div class='content'>
                <el-form :inline="true" :model='formInline'>
                    <el-form-item label='配置项key'>
                        <el-input v-model='formInline.key' placeholder='配置项key' clearable></el-input>
                    </el-form-item>
                    <el-form-item label='配置项value'>
                        <el-input v-model='formInline.value' placeholder='配置项value' clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="display"></div>
    </div>
</template>

<script>
    export default {
        name: 'BlogConfig',
        data() {
            return {
                formInline: {
                    key: '',
                    value: ''
                }
            };
        },
        methods: {
            onSubmit() {

            }
        }
    };
</script>

<style lang='scss'>
    .blog-config {
        width: 100%;
        height: 100%;

        .search {
            width: 100%;
            height: 12%;
            display: flex;
            justify-content: center;
            align-items: center;

            .content {
                width: 100%;

                .el-form {
                    padding: .8rem 0;
                    background: #edf4fb;

                    .el-form-item {
                        margin-bottom: 0;
                    }
                }
            }
        }

        .display {
            width: 100%;
            height: 88%;
        }
    }
</style>
