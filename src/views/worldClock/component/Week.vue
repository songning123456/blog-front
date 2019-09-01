<template>
    <div class='week'>
        <ul :style='{transform: `rotate(${rotates * -51.428}deg)`}'>
            <li v-for='(item, index) in weekList' :key=index
                :class='{hover: index === rotates - 1 || index === rotates + 6}'>
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Week',
        props: ['week'],
        data() {
            return {
                rotates: ''
            };
        },
        computed: {
            weekList: {
                get() {
                    return this.$t('week');
                }
            }
        },
        watch: {
            week(val) {
                this.rotates = val;
            }
        }
    };
</script>

<style lang="scss">
    .week {
        height: 100%;
        width: 100%;

        ul {
            z-index: 5;
            @for $i from 1 to 7 {
                li:nth-child(#{$i}) {
                    transform: rotate(#{$i * 360 / 7 * 1deg}) translateX(180px);
                }
            }
        }
    }

</style>
