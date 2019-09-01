<template>
    <div class='apm'>
        <ul :style="{ transform: 'rotate(${rotates * -30}deg)' }">
            <li
                v-for="(item, index) in apmList"
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
        name: 'Apm',
        props: ['apm'],
        data() {
            return {
                rotates: ''
            };
        },
        computed: {
            apmList: {
                get() {
                    return this.$t('apm');
                }
            }
        },
        watch: {
            apm(val) {
                this.rotates = val;
            }
        }
    };
</script>

<style lang='scss'>
    .apm {
        width: 100%;
        height: 100%;
        ul {
            z-index: 6;
            @for $i from 1 through 2 {
                li:nth-child(#{$i}) {
                    transform: rotate(#{$i * 30deg}) translateX(230px);
                }
            }
        }
    }
</style>
