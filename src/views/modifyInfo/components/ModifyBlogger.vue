<template>
    <div class='modify-blogger'></div>
</template>

<script>
    export default {
        name: 'ModifyBlogger',
        data () {
            return {
                display: [
                    {
                        key: '真实姓名',
                        value: 'realName'
                    },
                    {
                        key: '笔名',
                        value: 'author'
                    },
                    {
                        key: '职位',
                        value: 'profession'
                    },
                    {
                        key: '座右铭',
                        value: 'motto'
                    },
                    {
                        key: '电话',
                        value: 'telephone'
                    },
                    {
                        key: '电子邮箱',
                        value: 'email'
                    }
                ],
                form: {
                    author: '',
                    gender: '',
                    age: '',
                    profession: '',
                    telephone: '',
                    email: '',
                    headPortrait: '',
                    motto: '',
                    realName: ''
                }
            };
        }
    };
</script>

<style lang="scss" scoped>
    .modify-blogger {
        width: 100%;
        height: 100%;
    }
</style>
