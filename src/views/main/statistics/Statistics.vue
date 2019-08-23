<template>
    <div class='statistic'>
        <side-menu-panel :side-bar='sideBar' title='大数据统计'></side-menu-panel>
        <div @mousedown="sideBar.showing = false" class='page-right'></div>
    </div>
</template>

<script>
    import SideMenuPanel from '@/components/public/SideMenuPanel';

    export default {
        name: 'Statistics',
        components: {SideMenuPanel},
        data () {
            return {
                sideBar: {
                    showing: false
                }
            };
        }
    };
</script>

<style lang="scss">
    .statistic {
        width: 100%;
        height: 100%;
        padding-top: .5rem;
        position: relative;
        box-sizing: border-box;

        .page-right {
            float: left;
            width: calc(100% - 2rem);
            height: 100%;
            position: relative;
            box-sizing: border-box;
        }
    }

</style>
