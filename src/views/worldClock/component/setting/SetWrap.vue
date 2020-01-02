<template>
    <div class='set-wrap'>
        <div class="title">{{ $t('settingData.title') }}</div>
        <div class="btn-list">
            <span class="iconfont iconshezhi"></span>
        </div>
        <div class="btn-list2">
            <span class="iconfont iconquanping" @click="screenfullClick"></span>
            <span @click='quit'><img src='../../../../assets/exit.svg'/></span>
        </div>
        <div class="content">
            <set-lang></set-lang>
            <set-size></set-size>
            <set-left></set-left>
            <set-top></set-top>
        </div>
    </div>
</template>

<script>
    import screenfull from 'screenfull';
    import SetLang from './SetLang';
    import SetSize from './SetSize';
    import SetLeft from './SetLeft';
    import SetTop from './SetTop';

    export default {
        name: 'SetWrap',
        components: {SetTop, SetLeft, SetSize, SetLang},
        props: ['week'],
        data () {
            return {
                isFullScreen: false
            };
        },
        methods: {
            screenfullClick () {
                if (!screenfull.enabled) {
                    return false;
                }
                screenfull.toggle();
            },
            quit () {
                let scope = this;
                scope.$router.go(-1);
            }
        }
    };
</script>

<style lang='scss'>
    .set-wrap {
        z-index: 10;
        position: fixed;
        top: 20px;
        width: 250px;
        color: #fff;

        .title {
            padding-left: 20px;
            font-size: 36px;
            color: #fff;
            opacity: 0.9;
        }

        .btn-list2 {
            position: absolute;
            padding: 10px 0px 10px 15px;
            left: 40px;
            opacity: 0.6;
            margin-bottom: 10px;
            cursor: pointer;

            span {
                font-size: 28px;
                margin-right: 10px;

                img {
                    transform: scale(2.2);
                    margin-bottom: .2rem;
                }
            }
        }

        .btn-list {
            @extend .btn-list2;
            left: 0px;
            cursor: pointer;

            &:hover ~ .content {
                margin-left: 0px;
            }
        }

        .content {
            position: absolute;
            height: 300px;
            width: 250px;
            padding: 10px;
            margin-top: 40px;
            margin-left: -272px;
            transition: margin-left 0.9s;
            font-size: 14px;
            border: 1px solid hsla(0, 0%, 100%, 0.2);
            border-radius: 20px;
            background-color: hsla(0, 0%, 100%, 0.1);

            .set-com {
                .set-title {
                    opacity: 0.9;
                    padding: 5px;
                }

                .set-list {
                    margin: 15px 0 15px 0;

                    label {
                        padding: 5px;
                        opacity: 0.7;
                    }

                    span {
                        margin-left: 5px;
                        opacity: 0.5;
                    }
                }
            }

            &:hover {
                margin-left: 0px;
            }

            &:hover ~ .btn-list2 {
                right: 0px;
            }
        }
    }
</style>
