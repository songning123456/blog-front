<template>
    <div class='multiple-label'>
        <single-label v-for='(item, index) in data' :key='index' :label-name='item.labelName'
                      :label-photo='item.labelPhoto' :is-chosen='isChosen === index'
                      @click.native='isChosen = index'></single-label>
    </div>
</template>

<script>
    import SingleLabel from '@/views/config/labelConfig/components/SingleLabel';
    export default {
        name: 'MultipleLabel',
        components: {SingleLabel},
        props: {
            data: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        data() {
            return {
                isChosen: ''
            };
        }
    };
</script>

<style lang='scss' scoped>
    .multiple-label {
        width: 100%;
        height: 100%;
    }

</style>
