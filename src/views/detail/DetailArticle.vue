<template>
    <div class='detail-article'>{{result.data[0]}}</div>
</template>

<script>
    import {getContent} from '../../service/request.js';

    export default {
        name: 'DetailArticle',
        data () {
            return {
                result: {
                    data: []
                }
            };
        },
        mounted () {
            let scope = this;
            let form = {
                id: scope.$route.query.id
            };
            let param = {
                condition: form
            };
            getContent(param).then((data) => {
                if (data.status === 200) {
                    if (data.total > 0) {
                        scope.result.data = data.data;
                    }
                }
            }).catch(() => {
            }).finally(() => {
            });
        }
    };
</script>

<style lang="scss">
    .detail-article {
        width: 100%;
        height: 100%;
    }
</style>
