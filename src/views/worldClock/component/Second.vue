<template>
    <div class='second'>
        <ul :style="{ transform: 'rotate(${rotates * -6}deg)' }">
            <li
                v-for="(item, index) in secondList"
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
        name: 'Second',
        props: ['second'],
        data() {
            return {
                rotates: ''
            };
        },
        computed: {
            secondList: {
                get() {
                    return this.$t('second');
                }
            }
        },
        watch: {
            second(val) {
                this.rotates = val;
            }
        }
    };
</script>

<style lang="scss">
    .second {
        height: 100%;
        width: 100%;
        ul {
            z-index: 9;
            @for $i from 1 through 60 {
                li:nth-child(#{$i}) {
                    transform: rotate(#{$i * 6deg}) translateX(390px);
                }
            }
        }
    }

</style>
