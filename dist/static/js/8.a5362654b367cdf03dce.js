webpackJsonp([8],{"9NNX":function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyNTY5OTE4Nzg0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2NjkiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTEwMjQgNTExLjk5OTUwMmMwIDI4Mi43NzA1NTctMjI5LjIyOTk0MSA1MTIuMDAwNDk4LTUxMS45OTk1MDIgNTEyLjAwMDQ5OC0yODIuNzY5NTYxIDAtNTEyLjAwMDQ5OC0yMjkuMjI5OTQxLTUxMi4wMDA0OTgtNTEyLjAwMDQ5OCAwLTI4Mi43Njg1NjYgMjI5LjIzMDkzNi01MTEuOTk5NTAyIDUxMi4wMDA0OTgtNTExLjk5OTUwMkM3OTQuNzY5MDY0IDAgMTAyNCAyMjkuMjMwOTM2IDEwMjQgNTExLjk5OTUwMnpNNzk2LjU3NzA4MSAzNzguMzE3NzEzbC00OC40NTkwNTEtNDguNDU5MDUxLTI5Ny4wNzgzODcgMjk3LjA3NzM5MkwyNzcuMjY3ODUyIDQ1My4xNjUyNThsLTQ4LjQ1ODA1NiA0OC40NTgwNTYgMjIyLjIyODg1MSAyMjIuMjMwODQyTDc5Ni41NzcwODEgMzc4LjMxNzcxM3oiIHAtaWQ9IjE2NzAiIGZpbGw9IiM0MDlFRkYiPjwvcGF0aD48L3N2Zz4="},Ckxj:function(e,t){},lHcx:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("//Fk"),l=a.n(s),o={name:"PopoverItem",props:{show:{type:Boolean,default:!1},labelName:{type:String,default:""},title:{type:String,default:""}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-popover",{attrs:{placement:"right",width:"300",trigger:"manual","popper-class":"popover-item","visible-arrow":!1},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[a("span",[e._v(e._s(e.title))]),e._v(" "),a("el-form-item",{attrs:{slot:"reference",label:e.labelName},slot:"reference"},[e._t("popoverItem")],2)],1)},staticRenderFns:[]};var n=a("VU/8")(o,i,!1,function(e){a("Ckxj")},null,null).exports,r=a("R/2u"),u=/^[0-9a-zA-Z]{8,20}$/,M=/^([\u4e00-\u9fa5]|[a-zA-Z0-9]){1,20}$/,c=/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/,g=/^1[3456789]\d{9}$/,m={name:"Register",components:{ToolLoading:a("8VXF").a,PopoverItem:n},data:function(){return{form:{username:"fengying123456",password:"fengying123456",password2:"fengying123456",realName:"冯影",author:"安静的猫",email:"15957843289@163.com",motto:"做一只躺猫",profession:"学生",telephone:"15957843289",age:21,gender:"女",headPortrait:""},labelInfo:{result:[],total:""},register:{success:!1,fail:!1},second:"",image:{imgBlob:"",filename:"",files:""},labelWidth:"5rem",step:1,loading:!1,menu:[[{label:"用户名",value:"username"},{label:"密码",value:"password"},{label:"确认密码",value:"password2"}],[{label:"真实姓名",value:"realName"},{label:"笔名",value:"author"},{label:"电子邮件",value:"email"},{label:"座右铭",value:"motto"},{label:"职业",value:"profession"},{label:"电话",value:"telephone"}]],warning:{username:{title:"用户名必须符合0-9,a-z,A-Z且长度>8,<20",show:!1},password:{title:"密码必须符合0-9,a-z,A-Z且长度>8,<20",show:!1},password2:{title:"确定是输入的密码?",show:!1},realName:{title:"真实姓名必须符合汉字,英文",show:!1},author:{title:"笔名必须符合汉字,英文",show:!1},email:{title:"电子邮件必须符合邮件规范",show:!1},motto:{title:"座右铭不能为空",show:!1},profession:{title:"请填写相关职位",show:!1},telephone:{title:"以1开头的11位数字",show:!1}}}},watch:{form:{handler:function(e,t){this.warning.username.show=!u.test(e.username),this.warning.password.show=!u.test(e.password),!e.password||e.password2?this.warning.password2.show=e.password!==e.password2:this.warning.password2.show=!!e.password2,this.warning.realName.show=!e.realName.length||!M.test(e.realName),this.warning.author.show=!e.author.length||!M.test(e.author),this.warning.email.show=!e.email.length||!c.test(e.email),this.warning.motto.show=!e.motto.length,this.warning.profession.show=!e.profession.length||!M.test(e.profession),this.warning.telephone.show=!e.telephone.length||!g.test(e.telephone)},deep:!0}},computed:{tableData:function(){return this.labelInfo.result.map(function(e,t){return{index:t+1,labelName:e.labelName,attention:!1}})}},methods:{previousStep:function(e){0===e?this.$router.push({path:"/"}):this.step=e},nextStep:function(e){var t=this;t.formCheck(e).then(function(a){a.value?0===e?t.save():3===e?(t.labelInfo={result:a.data,total:a.total},t.step=e):t.step=e:t.$msg(a.message)})},autoJump:function(e){var t=this;t.timer||(t.second=3,t.register[e]=!0,t.timer=setInterval(function(){t.second>0&&t.second<=3?t.second--:(t.register[e]=!1,clearInterval(t.timer),t.timer=null,t.$router.push({path:"/"}))},1e3))},save:function(){var e=this,t=new FormData;t.append("file",e.image.files,e.image.filename),e.loading=!0,Object(r.t)(t).then(function(t){200===t.status&&t.total>0?(e.form.headPortrait=t.data[0].imageSrc,e.form.labelVOS=e.tableData.map(function(e){var t={};return t.labelName=e.labelName,e.attention?t.attention=1:t.attention=0,t}),Object(r.s)({condition:e.form}).then(function(t){if(e.loading=!1,200===t.status){var a={condition:{title:e.COMMON_MAP.HISTORY.REGISTER}};Object(r.p)(a).then(function(t){200!==t.status&&e.$msg("插入历史信息失败!")}),e.autoJump("success")}else e.autoJump("fail")}).catch(function(t){e.loading=!1,e.autoJump("fail")})):(e.loading=!1,e.autoJump("fail"))}).catch(function(t){e.loading=!1,e.autoJump("fail")})},beforeUpload:function(e){return this.image.imgBlob=URL.createObjectURL(e),this.image.filename=e.name,this.image.files=e,!1},formCheck:function(e){var t=this;return 2===e?new l.a(function(e){t.form.username&&u.test(t.form.username)?t.form.password&&u.test(t.form.password)?t.form.password===t.form.password2?Object(r.a)({condition:{username:t.form.username}}).then(function(a){t.$response(a).then(function(t){t.data[0].isExist?e({message:"用户名已存在",value:!1}):e({value:!0})})}):e({message:"两次输入密码不一致",value:!1}):e({message:"密码格式不符合规范",value:!1}):e({message:"用户名格式不符合规范",value:!1})}):3===e?new l.a(function(e){t.image.imgBlob?t.form.realName.length&&M.test(t.form.realName)?t.form.author.length&&M.test(t.form.author)?t.form.email.length&&c.test(t.form.email)?t.form.motto.length?t.form.profession.length&&M.test(t.form.profession)?t.form.telephone.length&&g.test(t.form.telephone)?Object(r.j)().then(function(a){t.$response(a).then(function(t){e({data:t.data,total:t.total,value:!0})})}):e({message:"以1开头的11位电话号码",value:!1}):e({message:"请填写相关职位",value:!1}):e({message:"座右铭不能为空",value:!1}):e({message:"电子邮件格式不符合规范",value:!1}):e({message:"笔名必须符合汉字,英文",value:!1}):e({message:"真实姓名必须符合汉字,英文",value:!1}):e({message:"头像不能为空",value:!1})}):0===e?new l.a(function(e){var a=t.tableData.filter(function(e){return!0===e.attention});0===a.length?e({message:"请先选择关注标签",value:!1}):a.length>0&&a.length<5?e({message:"至少选择5个关注标签",value:!1}):e({value:!0})}):void 0}}},N={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"register"},[1===e.step?s("div",{staticClass:"register-first"},[s("div",{staticClass:"header"},[e._v("登陆信息")]),e._v(" "),s("el-form",{attrs:{model:e.form,"label-width":e.labelWidth}},e._l(e.menu[0],function(t,a){return s("popover-item",{key:a,attrs:{"label-name":t.label,show:e.warning[t.value].show,title:e.warning[t.value].title}},[s("el-input",{attrs:{slot:"popoverItem",placeholder:t.label,clearable:"","show-password":t.value.indexOf("password")>-1},slot:"popoverItem",model:{value:e.form[t.value],callback:function(a){e.$set(e.form,t.value,a)},expression:"form[item.value]"}})],1)}),1),e._v(" "),s("div",{staticClass:"register-button"},[s("el-button",{on:{click:function(t){return e.previousStep(0)}}},[e._v("上一步")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.nextStep(2)}}},[e._v("下一步")])],1)],1):2===e.step?s("div",{staticClass:"register-second"},[s("div",{staticClass:"header"},[e._v("\n            个人信息\n        ")]),e._v(" "),s("el-upload",{staticClass:"avatar-uploader",attrs:{accept:"image/*",action:"",limit:1,"before-upload":e.beforeUpload}},[e.image.imgBlob?s("img",{staticClass:"avatar",attrs:{src:e.image.imgBlob,alt:""}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),e._v(" "),s("el-form",{attrs:{model:e.form,"label-width":e.labelWidth}},[e._l(e.menu[1],function(t,a){return s("popover-item",{key:a,attrs:{"label-name":t.label,show:e.warning[t.value].show,title:e.warning[t.value].title}},[s("el-input",{attrs:{slot:"popoverItem",placeholder:t.label,clearable:"","show-password":t.value.indexOf("password")>-1},slot:"popoverItem",model:{value:e.form[t.value],callback:function(a){e.$set(e.form,t.value,a)},expression:"form[item.value]"}})],1)}),e._v(" "),s("el-form-item",{attrs:{label:"年龄"}},[s("el-slider",{attrs:{"show-input":"",min:18},model:{value:e.form.age,callback:function(t){e.$set(e.form,"age",t)},expression:"form.age"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"性别"}},[s("span",{staticClass:"register-gender"},[s("el-radio",{attrs:{label:"男"},model:{value:e.form.gender,callback:function(t){e.$set(e.form,"gender",t)},expression:"form.gender"}},[e._v("男")]),e._v(" "),s("el-radio",{attrs:{label:"女"},model:{value:e.form.gender,callback:function(t){e.$set(e.form,"gender",t)},expression:"form.gender"}},[e._v("女")])],1)])],2),e._v(" "),s("div",{staticClass:"register-button"},[s("el-button",{on:{click:function(t){return e.previousStep(1)}}},[e._v("上一步")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.nextStep(3)}}},[e._v("下一步")])],1)],1):3===e.step?s("div",{staticClass:"register-third"},[s("div",{staticClass:"header"},[e._v("标签选择")]),e._v(" "),s("el-table",{attrs:{data:e.tableData}},[s("el-table-column",{attrs:{prop:"index",label:"ID"}}),e._v(" "),s("el-table-column",{attrs:{prop:"labelName",label:"标签名称"}}),e._v(" "),s("el-table-column",{attrs:{label:"是否关注"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-switch",{model:{value:t.row.attention,callback:function(a){e.$set(t.row,"attention",a)},expression:"scope.row.attention"}})]}}])})],1),e._v(" "),s("div",{staticClass:"register-button"},[s("el-button",{on:{click:function(t){return e.previousStep(2)}}},[e._v("上一步")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.nextStep(0)}}},[e._v("保存信息")])],1)],1):e._e(),e._v(" "),s("tool-loading",{attrs:{loading:e.loading,normal:"spinner"}}),e._v(" "),e.register.success?s("div",{staticClass:"register-success"},[s("div",{staticClass:"count-down"},[s("span",{staticClass:"digital"},[e._v(e._s(e.second))]),e._v(" "),s("span",{staticClass:"text"},[e._v("s后自动跳转到主页...")])]),e._v(" "),s("img",{attrs:{src:a("9NNX")}}),e._v(" "),s("h4",[e._v("注册成功")])]):e._e(),e._v(" "),e.register.fail?s("div",{staticClass:"register-fail"},[s("div",{staticClass:"count-down"},[s("span",{staticClass:"digital"},[e._v(e._s(e.second))]),e._v(" "),s("span",{staticClass:"text"},[e._v("s后自动跳转到主页...")])]),e._v(" "),s("img",{attrs:{src:a("lr0L")}}),e._v(" "),s("h4",[e._v("注册失败")])]):e._e()],1)},staticRenderFns:[]};var d=a("VU/8")(m,N,!1,function(e){a("quEj")},null,null);t.default=d.exports},lr0L:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTcyNTcwMzk2NzA0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI2OTciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTM1OC40MTk3ODggMzkyLjUyNzI0OWMwLTM3LjY4MzY3MS0zMC41NTc4MzgtNjguMjY1MDMtNjguMjU2ODQ5LTY4LjI2NTAzLTM3LjcwMDAzNCAwLTY4LjI1Nzg3MiAzMC41ODIzODItNjguMjU3ODcyIDY4LjI2NTAzIDAgMzcuNzE1MzczIDMwLjU1NzgzOCA2OC4yNjUwMyA2OC4yNTc4NzIgNjguMjY1MDNDMzI3Ljg2MTk1IDQ2MC43OTMzMDIgMzU4LjQxOTc4OCA0MzAuMjQyNjIyIDM1OC40MTk3ODggMzkyLjUyNzI0OXpNNzMzLjg0NzI4NyAzMjQuMjYyMjE4Yy0zNy42OTkwMTEgMC02OC4yNjcwNzYgMzAuNTgyMzgyLTY4LjI2NzA3NiA2OC4yNjUwMyAwIDM3LjcxNTM3MyAzMC41NjgwNjUgNjguMjY1MDMgNjguMjY3MDc2IDY4LjI2NTAzczY4LjI1Njg0OS0zMC41NTA2OCA2OC4yNTY4NDktNjguMjY1MDNDODAyLjEwNDEzNyAzNTQuODQzNTc3IDc3MS41NDYyOTggMzI0LjI2MjIxOCA3MzMuODQ3Mjg3IDMyNC4yNjIyMTh6TTUxMS45OTk0ODkgMGMtMjgyLjczNzQ2OSAwLTUxMS45NDIyMiAyMjkuMjEyOTMyLTUxMS45NDIyMiA1MTEuOTkxMzA3czIyOS4yMDQ3NTEgNTEyLjAwODY5MyA1MTEuOTQyMjIgNTEyLjAwODY5MyA1MTEuOTQzMjQzLTIyOS4yMjkyOTUgNTExLjk0MzI0My01MTIuMDA4NjkzUzc5NC43MzY5NTggMCA1MTEuOTk5NDg5IDB6TTUxMS45OTk0ODkgOTcyLjc4MzU4NmMtMjU0LjQ2MjE4OCAwLTQ2MC43NDMxOTItMjA2LjMxMzcyOC00NjAuNzQzMTkyLTQ2MC43OTIyNzkgMC0yNTQuNDc4NTUxIDIwNi4yNzk5ODEtNDYwLjc3NTkxNyA0NjAuNzQzMTkyLTQ2MC43NzU5MTcgMjU0LjQ2MzIxMSAwIDQ2MC43NTAzNSAyMDYuMjk3MzY2IDQ2MC43NTAzNSA0NjAuNzc1OTE3Qzk3Mi43NDk4MzkgNzY2LjQ2OTg1OCA3NjYuNDYzNzIyIDk3Mi43ODM1ODYgNTExLjk5OTQ4OSA5NzIuNzgzNTg2ek01MTIuMDY2OTg0IDU5Ny4zMzk3MjVjLTE1NC4yMTQ3NjcgMC0yMDQuNzk2MTE0IDEzNi41MzIxMDYtMjA0Ljc5NjExNCAxMzYuNTMyMTA2bDUxLjE5OTAyOCAwYzAgMCAzOS4wMzI1NDgtODUuMzMxMDMyIDE1My41OTcwODUtODUuMzMxMDMyIDExNi4wNzI5NDggMCAxNTMuNTk3MDg1IDg1LjMzMTAzMiAxNTMuNTk3MDg1IDg1LjMzMTAzMmw1MS4xOTgwMDYgMEM3MTYuODYzMDk4IDczMy44NzE4MzEgNjY2LjI4MTc1IDU5Ny4zMzk3MjUgNTEyLjA2Njk4NCA1OTcuMzM5NzI1eiIgcC1pZD0iMjY5OCIgZmlsbD0iIzQwOUVGRiI+PC9wYXRoPjwvc3ZnPg=="},quEj:function(e,t){}});
//# sourceMappingURL=8.a5362654b367cdf03dce.js.map