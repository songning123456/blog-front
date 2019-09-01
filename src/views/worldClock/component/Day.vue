<template>
    <div class='day'>
        <ul :style="{ transform: 'rotate(${rotates * -11.613}deg)' }">
            <li
                v-for="(item, index) in dayList"
                :key="index"
                :class="{ hover: index === rotates - 1 }"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Day',
        props: ['day'],
        data() {
            return {
                rotates: ''
            };
        },
        computed: {
            dayList: {
                get() {
                    return this.$t('day');
                }
            }
        },
        watch: {
            day(val) {
                this.rotates = val;
            }
        }
    };
</script>

<style lang="scss">
    .day {
        width: 100%;
        height: 100%;

        ul {
            z-index: 4;
            @for $i from 1 through 31 {
                li:nth-child(#{$i}) {
                    transform: rotate(#{$i * 11.6129deg}) translateX(120px);
                }
            }
        }
    }
</style>
