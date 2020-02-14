<template>
    <div class="hobby-card">
        <div class="cover-src">
            <el-image :src="card.cover" lazy scroll-container='.display-info'></el-image>
        </div>
        <div class="cover-info" ref='coverInfo'>
            <div class="info">
                <span>标题</span>
                <el-tooltip :content="card.name" placement="right-start" effect="light">
                    <span>{{card.name}}</span>
                </el-tooltip>
            </div>
            <div class="info">
                <span>时间</span>
                <el-tooltip :content="card.updateTime" placement="right-start" effect="light">
                    <span>{{card.updateTime}}</span>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'HobbyCard',
        props: {
            card: {
                type: Object,
                default() {
                }
            }
        },
        data() {
            return {};
        },
        mounted() {
            let doc = this.$refs.coverInfo.getElementsByClassName('info');
            for (let i = 0; i < doc.length; i++) {
                doc[i].children[0].style.width = '30px';
                doc[i].children[1].style.width = 'calc(100% - 30px)';
            }
        },
        methods: {}
    };
</script>

<style lang="scss" scoped>
    .hobby-card {
        width: 23%;
        margin: 0 1% 1% 1%;
        padding: 1%;
        box-sizing: border-box;
        height: auto;
        overflow: auto;
        float: left;
        cursor: pointer;
        background: white;
        border: 1px solid #f5f5f5;
        border-radius: .2rem;

        .cover-src {
            height: 7rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .cover-info {
            width: 100%;
            font-size: .6rem;
            overflow: auto;

            .info {
                width: 100%;
                height: 1.5rem;
                margin-bottom: .2rem;

                span:nth-child(1) {
                    display: inline-block;
                    float: left;
                    line-height: 1.5rem;
                }

                span:nth-child(2) {
                    display: inline-block;
                    line-height: 1.5rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    background: #f8f8f9;
                    border-radius: .1rem;
                }
            }

            .info:nth-child(1) {
                span:nth-child(2) {
                    padding-left: .24rem;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>
