<template>
    <div class="third-part"></div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'ThirdPart',
        created() {
            if (location.href.indexOf('?code=') > -1 && location.href.indexOf('&state=') > -1) {
                debugger;
                let start = location.href.indexOf('?code=');
                let end = location.href.indexOf('&state=');
                let code = location.href.slice(start + 6, end);
                let param = JSON.parse(sessionStorage.getItem('gitHub'));
                let obj = {
                    client_id: param.clientId,
                    client_secret: param.clientSecret,
                    code: code
                };
                axios.post(param.getAccessTokenURL, obj).then((response) => {
                        console.log(response);
                    }).catch(error => {
                        console.error(error);
                });
            }
        },
        data() {
            return {
            };
        }
    };
</script>

<style lang="scss" scoped>
    .third-part {
        width: 100%;
        height: 100%;
    }

</style>
