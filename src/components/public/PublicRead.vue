<template>
    <div class="public-read" ref='publicRead'>
        <div class="left-frame"></div>
        <div class="middle-frame">
            <kind-article :kinds="currentLabel" target='.public-read'
                          @showHotArticle="showHotArticle = true"></kind-article>
        </div>
        <div class="right-frame">
            <hot-article :kinds="currentLabel" v-show='showHotArticle' ref='hotArticle'></hot-article>
        </div>
    </div>
</template>

<script>
    import HotArticle from './HotArticle';
    import KindArticle from './KindArticle';

    export default {
        name: 'PublicRead',
        components: {KindArticle, HotArticle},
        data () {
            return {
                currentLabel: '',
                showHotArticle: false
            };
        },
        activated () {
            this.currentLabel = this.$route.params.label;
            this.$nextTick(() => {
                this.$refs['publicRead'].addEventListener('mousewheel', this.handleHeadScroll);
            });
        },
        deactivated () {
            this.$refs['publicRead'].removeEventListener('mousewheel', this.handleHeadScroll);
        },
        methods: {
            // 处理头部消失滚动
            handleHeadScroll () {
                let scope = this;
                let height = scope.$refs['publicRead'].scrollTop;
                if (this.$parent.$refs.mainHead.configBar) {
                    this.$parent.$refs.mainHead.configBar = false;
                }
                if (height > 100) {
                    let size = document.getElementsByTagName('html')[0].style.fontSize.slice(0, -2) * 10;
                    this.$parent.$refs.mainHead.$el.style.marginTop = '-' + document.body.clientHeight / size + 'rem';
                    this.$refs['hotArticle'].$el.style.top = 9 - document.body.clientHeight / size + 'rem';
                    scope.resolveHidden = true;
                }
                if (height === 0 && scope.resolveHidden) {
                    this.$parent.$refs.mainHead.$el.style.marginTop = '0rem';
                    this.$refs['hotArticle'].$el.style.top = 9 + 'rem';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .public-read {
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: #f8f8f9;

        .left-frame {
            width: 30%;
            height: 100%;
            float: left;
        }

        .middle-frame {
            width: 40%;
            height: 100%;
            float: left;
        }

        .right-frame {
            width: 30%;
            height: 100%;
            float: left;
        }
    }
</style>
