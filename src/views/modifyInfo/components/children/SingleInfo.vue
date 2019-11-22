<template>
    <div class='single-info'>
        <div ref='displayInfo' class='display-info' :class="status === 'edit' ? 'rotate-display' : ''">
            <div class='first-content'>
                <div class="title">
                    <span>{{info.infoType}}</span>
                </div>
                <div class="edit">
                    <el-button type="text" size="small" @click.stop="status = 'edit'">编辑</el-button>
                </div>
            </div>
            <div class='second-content'>
                <div class='time'>
                    <span>{{formatDate(info.startTime)}}</span>
                    <span>~</span>
                    <span>{{formatDate(info.endTime)}}</span>
                </div>
                <div class="mechanism">
                    <span>{{info.mechanism}}</span>
                </div>
                <div class='position'><span>{{info.position}}</span></div>
            </div>
            <div class="third-content">
                <div class='text'>
                    <mavon-editor v-model='info.introduction' :defaultOpen='"preview"' :editable='false'
                                  :subfield='false'
                                  :toolbarsFlag='false' :boxShadow='false' :shortCut='false'
                                  :transition="false"></mavon-editor>
                </div>
            </div>
        </div>
        <div ref='editInfo' class='edit-info' :class="status === 'display' ? 'rotate-edit' : ''">
            <div class="first-content">
                <div class="title">
                    <el-select v-model="form.infoType" placeholder="请选择" :disabled="disabled.infoType">
                        <el-option v-for="(item, index) in options" :key="index" :label="item.label"
                                   :value="item.value"></el-option>
                    </el-select>
                    <div class='modify-icon' v-if="disabled.infoType">
                        <i class="el-icon-edit" @click.stop="edit('infoType')"></i>
                    </div>
                    <div class="no-modify-icon" v-else>
                        <span @click.stop="save('infoType')">保存</span><span @click.stop="cancel('infoType')">取消</span>
                    </div>
                </div>
                <div class="display">
                    <el-button type="text" size="small" @click.stop="status = 'display'">返回</el-button>
                </div>
            </div>
            <div class="second-content">
                <div class='time'>
                    <el-date-picker v-model="timeRange" type="daterange" value-format="yyyy-MM-dd" range-separator="至"
                                    start-placeholder="开始日期" end-placeholder="结束日期"
                                    :disabled="disabled.timeRange"></el-date-picker>
                    <div class='modify-icon' v-if="disabled.timeRange">
                        <i class="el-icon-edit" @click.stop="edit('timeRange')"></i>
                    </div>
                    <div class="no-modify-icon" v-else>
                        <span @click.stop="save('timeRange')">保存</span><span @click.stop="cancel('timeRange')">取消</span>
                    </div>
                </div>
                <div class="mechanism">
                    <el-input v-model="form.mechanism" placeholder="请输入内容" :disabled="disabled.mechanism"></el-input>
                    <div class='modify-icon' v-if="disabled.mechanism">
                        <i class="el-icon-edit" @click.stop="edit('mechanism')"></i>
                    </div>
                    <div class="no-modify-icon" v-else>
                        <span @click.stop="save('mechanism')">保存</span><span @click.stop="cancel('mechanism')">取消</span>
                    </div>
                </div>
                <div class='position'>
                    <el-input v-model="form.position" placeholder="请输入内容" :disabled="disabled.position"></el-input>
                    <div class='modify-icon' v-if="disabled.position">
                        <i class="el-icon-edit" @click.stop="edit('position')"></i>
                    </div>
                    <div class="no-modify-icon" v-else>
                        <span @click.stop="save('position')">保存</span><span @click.stop="cancel('position')">取消</span>
                    </div>
                </div>
            </div>
            <div class="third-content">
                <div class="text">
                    <el-input type="textarea" placeholder="请输入内容" :disabled="disabled.introduction"
                              v-model="form.introduction" :autosize="{ minRows: 3, maxRows: 8}"></el-input>
                    <div class='modify-icon' v-if="disabled.introduction">
                        <i class="el-icon-edit" @click.stop="edit('introduction')"></i>
                    </div>
                    <div class="no-modify-icon" v-else>
                        <span @click.stop="save('introduction')">保存</span><span
                        @click.stop="cancel('introduction')">取消</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'SingleInfo',
        props: {
            info: {
                type: Object,
                // eslint-disable-next-line vue/require-valid-default-prop
                default: {}
            }
        },
        mounted () {
            let scope = this;
            scope.form = Object.assign({}, scope.info);
            scope.timeRange = [scope.formatDate(scope.info.startTime), scope.formatDate(scope.info.endTime)];
        },
        data () {
            return {
                // 判断展示 or 修改 display or edit
                status: 'display',
                options: [
                    {
                        value: '教育经历',
                        label: '教育经历'
                    }, {
                        value: '工作经历',
                        label: '工作经历'
                    }
                ],
                timeRange: [],
                form: {},
                disabled: {
                    timeRange: true,
                    introduction: true,
                    position: true,
                    infoType: true,
                    mechanism: true
                }
            };
        },
        watch: {
            status (newVal, oldVal) {
                let scope = this;
                if (newVal === 'edit') {
                    setTimeout(() => {
                        scope.$refs.displayInfo.style.display = 'none';
                        scope.$refs.editInfo.style.display = 'block';
                    }, 1000);
                } else if (newVal === 'display') {
                    setTimeout(() => {
                        scope.$refs.displayInfo.style.display = 'block';
                        scope.$refs.editInfo.style.display = 'none';
                    }, 1000);
                }
            },
            timeRange: {
                handler (newVal, oldVal) {
                    let scope = this;
                    scope.form.startTime = newVal[0];
                    scope.form.endTime = newVal[1];
                },
                deep: true
            }
        },
        methods: {
            formatDate (date) {
                date = new Date(date);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            save (type) {
                let scope = this;
                switch (type) {
                    case 'infoType':
                        if (scope.form[type] === scope.info[type]) {
                            scope.$msg('请输入不同信息');
                            return;
                        }
                        break;
                    case 'timeRange':
                        if (!scope.timeRange || !scope.timeRange.length || !scope.timeRange[0] || !scope.timeRange[1]) {
                            scope.$msg('请输入有效时间');
                            return;
                        }
                        if (scope.form.startTime === scope.timeRange[0] && scope.form.endTime === scope.timeRange[1]) {
                            scope.$msg('请输入不同信息');
                            return;
                        }
                        break;
                    case 'position':
                        if (scope.form[type] === scope.info[type]) {
                            scope.$msg('请输入不同信息');
                            return;
                        }
                        if (!scope.form[type]) {
                            scope.$msg('请输入有效信息');
                            return;
                        }
                        break;
                    case 'mechanism':
                        if (scope.form[type] === scope.info[type]) {
                            scope.$msg('请输入不同信息');
                            return;
                        }
                        if (!scope.form[type]) {
                            scope.$msg('请输入有效信息');
                            return;
                        }
                        break;
                    case 'introduction':
                        if (scope.form[type] === scope.info[type]) {
                            scope.$msg('请输入不同信息');
                            return;
                        }
                        if (!scope.form[type]) {
                            scope.$msg('请输入有效信息');
                            return;
                        }
                        break;
                    default:
                        break;
                }
                scope.disabled[type] = true;
                scope.$emit('update', scope.form);
            },
            cancel (type) {
                let scope = this;
                scope.disabled[type] = true;
                scope.form[type] = scope.info[type];
            },
            edit (type) {
                let scope = this;
                scope.disabled[type] = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .single-info {
        width: 100%;
        height: 12rem;
        float: left;
        margin-bottom: .3rem;
        background-color: white;

        .display-info {
            height: 100%;
            width: 100%;
            background-color: white;

            &.rotate-display {
                transform: rotateY(180deg);
                transition: all 1s ease-in-out;
            }

            .first-content {
                height: 20%;
                width: 100%;

                .title {
                    width: 90%;
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    span {
                        padding: .3rem 1rem;
                        background: #67C23A;
                        border-radius: .2rem;
                        font-weight: 600;
                    }
                }

                .edit {
                    width: 10%;
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .second-content {
                height: 15%;
                width: 100%;
                font-size: .7rem;

                .time {
                    width: 40%;
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    span:first-child {
                        padding-left: 1.8rem;
                    }

                    span:nth-child(2) {
                        padding: 0 .3rem;
                    }
                }

                .mechanism {
                    width: 40%;
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    span {
                        padding: .2rem .5rem;
                        border-radius: .2rem;
                        background-color: #ffe397;
                    }
                }

                .position {
                    width: 20%;
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    span {
                        padding: .2rem .5rem;
                        border-radius: .2rem;
                        background-color: #e2efff;
                    }
                }
            }

            .third-content {
                height: 65%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                .text {
                    width: 90%;
                    height: 90%;

                    .v-note-wrapper {
                        min-height: unset;
                        height: 100%;
                    }
                }
            }
        }

        .edit-info {
            height: 100%;
            width: 100%;
            display: none;

            &.rotate-edit {
                transform: rotateY(180deg);
                transition: all 1s ease-in-out;
            }

            .modify-icon {
                width: 4rem;
                font-size: 0.5rem;
                float: right;
                padding: .3rem 0;
                box-sizing: border-box;

                .el-icon-edit {
                    font-size: 1rem;

                    &:hover {
                        cursor: pointer;
                        color: #417BF1;
                    }
                }
            }

            .no-modify-icon {
                width: 4rem;
                font-size: 0.5rem;
                float: right;
                padding: .3rem 0;
                box-sizing: border-box;

                span {
                    padding: 0 .1rem;

                    &:hover {
                        cursor: pointer;
                        color: #417BF1;
                    }
                }
            }

            .first-content {
                height: 25%;
                width: 100%;

                .title {
                    width: 90%;
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .display {
                    width: 10%;
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .second-content {
                height: 25%;
                width: 100%;

                .time {
                    width: 50%;
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding-left: 1.8rem;
                    box-sizing: border-box;
                }

                .mechanism {
                    width: 30%;
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .position {
                    width: 20%;
                    height: 100%;
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .el-input {
                        width: 40%;

                        /deep/ .el-input__inner {
                            padding: 0 0 0 .75rem;
                        }
                    }
                }
            }

            .third-content {
                height: 50%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                .text {
                    width: 90%;
                    height: 90%;

                    .el-textarea {
                        textarea {
                            &::-webkit-scrollbar {
                                width: 10px;
                                height: 15px;
                            }

                            &::-webkit-scrollbar-track {
                                background-color: white;
                                border-radius: 2px;
                            }

                            &::-webkit-scrollbar-thumb {
                                background: #bfbfbf;
                                border-radius: 10px;

                                &:hover {
                                    background: #a5a5a5;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

</style>
