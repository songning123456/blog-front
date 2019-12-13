<template>
    <div class='blogger-introduction'>
        <div class='el-frame-left'>
            <blogger-info></blogger-info>
        </div>
        <div class=el-frame-right>
            <div class='detail-header'>
                <div v-for='(item, index) in detail' :key='index' class='detail-content'
                     :class='current === index ? "detail-choose" : ""' @click='sureContent(index)'>
                    <img class="inner-img" :src='current === index ? item.url1 : item.url2'/>
                    <span>{{item.info}}</span>
                </div>
            </div>
            <personal-info v-if='current === 0' class='detail-show-0'></personal-info>
            <image-info v-else-if='current === 1' class='detail-show-1'></image-info>
            <email-info v-else-if=' current === 2' class='detail-show-2'></email-info>
        </div>
    </div>
</template>

<script>
    import BloggerInfo from './components/BloggerInfo';
    import PersonalInfo from './components/PersonalInfo';
    import ImageInfo from './components/ImageInfo';
    import EmailInfo from './components/EmailInfo';

    export default {
        name: 'BloggerIntroduction',
        components: {EmailInfo, ImageInfo, PersonalInfo, BloggerInfo},
        data () {
            return {
                detail: [
                    {
                        url1: 'static/images/personalInfo/special.svg',
                        url2: 'static/images/personalInfo/common.svg',
                        info: '简历'
                    },
                    {url1: 'static/images/photo/special.svg', url2: 'static/images/photo/common.svg', info: '相册'},
                    {url1: 'static/images/mail/special.svg', url2: 'static/images/mail/common.svg', info: '给我发电子邮件?'}
                ],
                current: ''
            };
        },
        methods: {
            sureContent (index) {
                let scope = this;
                if (scope.current !== index) {
                    scope.current = index;
                }
            }
        },
        mounted () {
            this.sureContent(0);
        }
    };
</script>

<style lang="scss" scoped>
    .blogger-introduction {
        width: 100%;
        height: 100%;

        .el-frame-left {
            height: 100%;
            width: 20%;
            float: left;
            box-sizing: border-box;
            background: #6ecadc;
        }

        .el-frame-right {
            height: 100%;
            width: 80%;
            float: left;
            box-sizing: border-box;

            .detail-header {
                height: 3rem;
                width: 100%;

                display: flex;
                align-items: center;
                justify-content: center;

                .detail-content {
                    text-align: left;
                    display: inline-block;
                    cursor: pointer;

                    &.detail-choose {
                        color: #409eff;
                    }
                }

                .detail-content {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    span {
                        padding-left: .3rem;
                    }
                }

                .detail-content:nth-child(1) {
                    width: 4rem;
                    margin-right: 7rem;
                }

                .detail-content:nth-child(2) {
                    width: 4rem;
                    margin-right: 7rem;
                }

                .detail-content:nth-child(3) {
                    width: 10rem;
                    margin-right: 1rem;

                    .inner-img {
                        position: relative;
                        top: .12rem;
                    }
                }
            }

            .detail-show-0 {
                width: 100%;
                height: calc(100% - 3rem);
            }

            .detail-show-1 {
                width: 100%;
                height: calc(100% - 3rem);
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .detail-show-2 {
                width: 100%;
                height: calc(100% - 3rem);
            }
        }
    }

</style>
