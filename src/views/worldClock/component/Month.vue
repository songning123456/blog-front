<template>
    <div class='month'>
        <ul :style="{ transform: 'rotate(${rotates * -30}deg)' }">
            <li
                v-for="(item, index) in monthList"
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
        name: 'Month',
        props: ['month'],
        data() {
            return {
                rotates: ''
            };
        },
        computed: {
            monthList: {
                get() {
                    return this.$t('month');
                }
            }
        },
        watch: {
            month(val) {
                this.rotates = val;
            }
        }
    };
</script>

<style lang="scss">
    .month {
        width: 100%;
        height: 100%;

        ul {
            z-index: 3;
            @for $i from 1 through 12 {
                li:nth-child(#{$i}) {
                    transform: rotate(#{$i * 30deg}) translateX(60px);
                }
            }
        }
    }
</style>
