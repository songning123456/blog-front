<template>
    <div class="modify-info">
        <div class="sub-menu">
            <div class="main-col"></div>
            <div class="info-col"></div>
            <div class="info-col"></div>
            <div class="info-col"></div>
        </div>
        <div class="content-panel"></div>
    </div>
</template>

<script>
    export default {
        name: 'ModifyInfo'
    };
</script>

<style lang="scss" scoped>
    .modify-info {
        width: 100%;
        height: 100%;
        position: relative;

        .sub-menu {
            background: #fff;
            position: relative;
            width: 40px;
            height: 100%;
            z-index: 110;
            border-top: 1px solid #f0f2f9;
            border-right: 1px solid #f0f2f9;
            cursor: pointer;
            float: left;

            .info-col {
                height: auto;
                padding: 13px 0;
                text-align: center;

                img {
                    height: 1.2rem;
                    width: 1.2rem;
                }

                &:hover,
                &.actived {
                    background: #e2efff;

                    span {
                        color: #3776ff;
                    }
                }

                span {
                    writing-mode: vertical-lr;
                    font-size: .7rem;
                    color: #606266;
                    letter-spacing: .25rem;
                    padding-top: .5rem;
                }
            }

            .main-col {
                text-align: center;
                width: 100%;
                padding: 0.8rem 0;

                img {
                    width: 1.6rem;
                    height: 1.6rem;
                }
            }
        }

        .content-panel {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
        }
    }

</style>
