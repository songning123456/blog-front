<template>
    <div class="main-head" :style="{backgroundImage: 'url(' +bgUrl + ')'}">
        <div class="choose-tab">
            <span v-for='(tab, index) in tabs' :key='index' @click='tabClick(tab.name)'
                  :class='{"current-tab": currentTab === tab.name}'>{{tab.label}}
            </span>
        </div>
        <el-input ref='elInput' suffix-icon='el-icon-search' v-model='$store.state.query.param' placeholder='请输入搜索内容'
                  @keyup.enter.native="queryBtn"></el-input>
        <el-button type="primary" @click.native='writeBtn'>写文章</el-button>
        <el-avatar :src="avatar" @click.native.stop="configBar = !configBar">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
        </el-avatar>
        <el-radio-group v-model="$store.state.query.type">
            <el-radio label="content">文章</el-radio>
            <el-radio label="title">标题</el-radio>
            <el-radio label="author">作者</el-radio>
        </el-radio-group>
        <div class="main-head-popover" v-show='configBar'>
            <div @click.stop='$router.push({path: "/modify-password"})'><span>修改资料</span></div>
            <div @click.stop='$router.push({path: "/hobby-image"})'><span>业余爱好</span></div>
            <div @click.stop='$router.push({path: "/blog-config"})'><span>管理配置</span></div>
            <div @click.stop='$router.push({path: "/label-config"})'><span>标签管理</span></div>
            <div @click.stop='$router.push({path: "/written"})'><span>我写过的</span></div>
            <div @click.stop='$router.push({path: "/loved"})'><span>我点赞的</span></div>
            <div @click.stop="aboutme"><span>关于</span></div>
            <div @click.stop='exit'><span>退出</span></div>
        </div>
    </div>
</template>

<script>
    import {exitBlog} from '../../service/http';
    import init from '../../utils/Init';
    import wechat from '../../utils/Wechat';

    export default {
        name: 'MainHead',
        props: {
            currentTab: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                bgUrl: require('../../assets/titleBg.png'),
                tabs: [
                    {label: '阅读', name: 'read'},
                    {label: '统计', name: 'statistics'},
                    {label: '历史', name: 'history'},
                    {label: '微聊', name: 'wechat'}
                ],
                blogger: {},
                configBar: false // 展示 设置
            };
        },
        computed: {
            avatar() {
                return init.getHeadPortrait(this.blogger.headPortrait);
            }
        },
        created() {
            init.getBlogger().then(data => {
                this.blogger = data;
            });
        },
        activated() {
            // 绑定搜索文章 查询事件
            if (this.$refs['elInput'] && this.$refs['elInput'].$el) {
                let doc = this.$refs['elInput'].$el.children[1];
                doc.addEventListener('click', this.queryBtn, true);
            }
            document.addEventListener('click', this.closeShowInfo);
        },
        deactivated() {
            // 解绑搜索文章 查询事件
            if (this.$refs['elInput'] && this.$refs['elInput'].$el) {
                let doc = this.$refs['elInput'].$el.children[1];
                doc.removeEventListener('click', this.queryBtn, true);
            }
            // 离开页面时确定 设置栏关闭
            this.configBar = false;
            document.removeEventListener('click', this.closeShowInfo);
        },
        methods: {
            tabClick(tab) {
                if (tab !== this.currentTab) {
                    if (tab === 'read' && sessionStorage.getItem('currentLabelName')) {
                        tab = tab + '/' + sessionStorage.getItem('currentLabelName');
                    }
                    this.$router.push({path: '/' + tab});
                }
            },
            // 其他body 点击事件 关闭 设置栏
            closeShowInfo() {
                this.configBar = false;
            },
            queryBtn() {
                if (this.$store.state.query.param) {
                    // 添加time,解决路由不跳转问题
                    let query = Object.assign({}, this.$store.state.query);
                    query.time = new Date().getTime();
                    this.$router.push({
                        path: '/search',
                        name: 'search',
                        query: query
                    });
                } else {
                    this.$message.warning('请输入搜索内容');
                }
            },
            writeBtn() {
                this.$router.push({path: '/edit'});
            },
            aboutme() {
                window.open('https://github.com/songning123456/', '_blank');
            },
            exit() {
                exitBlog().then((data) => {
                    if (data.status === 200) {
                        // 删除token
                        localStorage.removeItem('token');
                        try {
                            wechat.webSocket.close();
                        } catch (e) {
                            console.error(e);
                        }
                        this.$router.push({path: '/'});
                    }
                }).catch((e) => {
                    this.$message.error('~~~退出登陆异常~~~');
                });
            }

        }
    };
</script>

<style lang="scss">
    .main-head {
        position: relative;
        width: 100%;
        height: 10%;
        z-index: 100;
        transition: all .4s ease-in-out;

        .choose-tab {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            span {
                padding: 0.2rem .9rem;
                font-weight: 500;
                font-size: 1.2rem;

                &.current-tab {
                    color: #409EFF;
                }

                &:hover {
                    color: #409EFF;
                    cursor: pointer;
                }
            }
        }

        .el-input {
            width: 20%;
            float: left;
            position: absolute;
            top: 50%;
            left: 77.5%;
            transform: translate(-50%, -50%);

            .el-input__suffix {
                cursor: pointer;
            }
        }

        .el-button {
            position: absolute;
            top: 50%;
            left: 90.5%;
            transform: translate(-50%, -50%);
        }

        .el-radio-group {
            position: absolute;
            top: 87%;
            left: 77%;
            transform: translate(-50%, -50%);

        }

        .el-avatar {
            position: absolute;
            top: 50%;
            left: 95%;
            transform: translate(-50%, -50%);
            cursor: pointer;
        }

        .main-head-popover {
            position: absolute;
            z-index: 100;
            width: 4rem;
            float: left;
            background-color: white;
            padding: 0.6rem;
            font-size: 0.7rem;
            left: 88.75rem;
            top: 4rem;

            div {
                text-align: center;
                padding: 0.1rem 0;

                span {
                    font-size: 0.75rem;
                    cursor: pointer;
                }

                :hover {
                    color: #409EFF;
                }
            }
        }
    }

</style>
