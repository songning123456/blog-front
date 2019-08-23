<template>
    <div class='blogger-introduction'>
        <div class='intro-top'>
            <div class='intro-left'>
                <el-avatar :src='result.headPortrait' :size='320'></el-avatar>
            </div>
            <div class='intro-right'>
                <div v-for='(item, index) in display' :key='index' class='inner-display'
                     :style='{height: 100 / display.length + "%"}'>
                    <div class='inner-key'>{{item.key}}</div>
                    <div class='inner-value'>{{result[item.value]}}</div>
                </div>
            </div>
        </div>
        <div class='intro-middle'>
            <div class='text'>{{result.introduction}}</div>
        </div>
        <div class='intro-bottom'></div>
    </div>
</template>

<script>
    export default {
        name: 'BloggerIntroduction',
        data () {
            return {
                result: {
                    id: '',
                    userName: '夷山 龙龙 张乐',
                    password: '',
                    gender: '男',
                    age: 35,
                    profession: '程序员',
                    telephone: '15850682190',
                    email: '1457065856@qq.com',
                    introduction: '从警8年他硕果累累，先后荣立个人一等功1次，二等功1次，三等功3次，嘉奖2次，2006年被评为“百姓心中好交警”，2007年被评为青年执法标兵，2008年被评为奥运交通安保标兵和“微笑北京交警之星”，2009年又荣获了首都“五一”劳动奖章,受邀参加市委政法委“学习实践科学发展观巡讲团”和北京市公安局“平凡颂”演讲报告会。孟昆玉在平凡的岗位上，做出了不平凡的业绩',
                    updateTime: '2019-08-23 13:30:00',
                    headPortrait: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                },
                display: [
                    {
                        key: '作者',
                        value: 'userName'
                    },
                    {
                        key: '性别',
                        value: 'gender'
                    },
                    {
                        key: '年龄',
                        value: 'age'
                    },
                    {
                        key: '职位',
                        value: 'profession'
                    },
                    {
                        key: '电话',
                        value: 'telephone'
                    },
                    {
                        key: '电子邮箱',
                        value: 'email'
                    }
                ]
            };
        }
    };
</script>

<style lang="scss">
    .blogger-introduction {
        width: 100%;
        height: 100%;

        .intro-top {
            width: 100%;
            height: 40%;

            .intro-left {
                height: 100%;
                width: 50%;
                float: left;

                display: flex;
                justify-content: center;
                align-items: center;
            }

            .intro-right {
                height: 100%;
                width: 50%;
                float: left;

                .inner-display {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;

                    .inner-key {
                        width: 50%;
                        float: left;
                    }

                    .inner-value {
                        width: 50%;
                        float: left;
                    }
                }
            }
        }

        .intro-middle {
            width: 100%;
            height: 40%;
            display: flex;
            justify-content: center;
            align-items: center;

            .text {
                font-size: 1.4rem;
                width: 50%;
                height: 50%;
                border: 1px solid rgba(128, 128, 128, 0.6);
            }
        ;
        }

        .intro-bottom {
            width: 100%;
            height: 20%;
        }
    }

</style>
