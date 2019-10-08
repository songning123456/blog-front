<template>
    <div class='label-button'>
        <div v-if='normal' class='normal-button'>
            <span>{{label}}</span>
        </div>
        <div v-else class='un-normal-button'>
            <span>{{label}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LabelButton',
        props: {
            label: {
                type: String,
                default: ''
            },
            normal: {
                type: Boolean,
                default: true
            }
        }
    };
</script>

<style lang='scss'>
    .label-button {
        height: 2.5rem;
        width: 8rem;
        display: flex;
        justify-content: center;
        float: left;
        padding: .8rem 0 0 .8rem;

        .normal-button {
            width: 100%;
            height: 100%;
            background: rgba(230, 241, 252, 1);
            border-radius: 4px;
            cursor: pointer;

            display: flex;
            align-items: center;
            justify-content: center;

            span {
                font-size: .75rem;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(66, 123, 241, 1);
            }
        }

        .un-normal-button {
            width: 100%;
            height: 100%;
            background: rgba(66, 123, 241, 1);
            border-radius: 4px;
            cursor: pointer;

            display: flex;
            align-items: center;
            justify-content: center;

            span {
                font-size: .75rem;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
            }
        }
    }

</style>
