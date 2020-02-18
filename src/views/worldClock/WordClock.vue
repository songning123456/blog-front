<template>
    <div class='word-clock'>
        <Second :second="second"></Second>
        <Minute :minute="minute"></Minute>
        <Hour :hour="hour"></Hour>
        <Apm :apm="apm"></Apm>
        <Week :week="week"></Week>
        <Day :day="day"></Day>
        <Month :month="month"></Month>
        <set-wrap></set-wrap>
    </div>
</template>

<script>
    import Second from './component/Second';
    import Minute from './component/Minute';
    import Hour from './component/Hour';
    import Apm from './component/Apm';
    import Week from './component/Week';
    import Day from './component/Day';
    import Month from './component/Month';
    import SetWrap from './component/setting/SetWrap';
    import {insertHistoryInfo} from '../../service/http';

    export default {
        name: 'WordClock',
        components: {SetWrap, Month, Day, Week, Apm, Hour, Minute, Second},
        data () {
            return {
                second: '',
                minute: '',
                hour: '',
                apm: '',
                week: '',
                day: '',
                month: ''
            };
        },
        mounted () {
            let scope = this;
            insertHistoryInfo({condition: {title: scope.COMMON_MAP.HISTORY.SIMPLE_CLOCK}}).then(data => {
                if (data.status !== 200) {
                    this.$message.error('插入历史信息失败!');
                }
            });
        },
        methods: {
            start () {
                let scope = this;
                setInterval(() => {
                    let date = new Date();
                    scope.second = date.getSeconds();
                    scope.minute = date.getMinutes();
                    scope.hour = date.getHours();
                    scope.week = date.getDay();
                    scope.day = date.getDate();
                    scope.month = date.getMonth() + 1;
                    if (scope.hour > 12) {
                        scope.apm = 2;
                    } else {
                        scope.apm = 1;
                    }
                }, 1000);
            }
        },
        created () {
            this.start();
        }
    };
</script>

<style lang="scss">
    .word-clock {
        width: 100%;
        height: 100%;
        background-color: black;
        overflow-x: hidden;
        overflow-y: hidden;

        ul {
            list-style-type: none;
            padding: 0;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            height: 60px;
            width: 60px;
            transition: 0.1s 0.1s ease-in;

            li {
                position: absolute;
                height: 60px;
                width: 60px;
                color: #fff;
                text-align: center;
                font-size: 14px;
                line-height: 20px;

                &.hover {
                    text-shadow: rgb(255, 255, 255) 0px 0px 10px,
                    rgb(255, 255, 255) 0px 0px 20px, rgb(255, 0, 222) 0px 0px 30px,
                    rgb(255, 0, 222) 0px 0px 40px, rgb(255, 0, 222) 0px 0px 70px,
                    rgb(255, 0, 222) 0px 0px 80px, rgb(255, 0, 222) 0px 0px 100px;
                }
            }
        }
    }

</style>
