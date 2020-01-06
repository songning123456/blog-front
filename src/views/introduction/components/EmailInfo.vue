<template>
    <div class='email-info'>
        <div class='frame-head'>
            <div class="text">联系 && 交流</div>
        </div>
        <div class="frame-content">
            <email></email>
        </div>
    </div>
</template>

<script>

    import Email from '../../../views/email/Email';

    export default {
        name: 'EmailInfo',
        components: {Email}
    };
</script>

<style lang="scss" scoped>
    .email-info {
        width: 100%;
        height: 100%;

        .frame-head {
            height: 2rem;
            width: 100%;

            .text {
                height: 80%;
                background: orange;
                float: left;
                font-size: 1rem;
                padding: 0 1rem;
                line-height: 1.8rem;
                color: white;
                border-radius: .2rem;
            }
        }

        .frame-content {
            width: 100%;
            height: calc(100% - 2rem);

            .email {
                .paper {
                    height: 92%;
                }
            }
        }
    }

</style>
