webpackJsonp([13],{mWbN:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("R/2u"),i=n("dPLG"),o=n("+pvk"),s=n("Pfnk"),l=n("jeSC"),r={name:"DetailArticle",components:{ToolLoading:n("8VXF").a,EmptyView:l.a,ElFrame:o.a,ElFrameset:i.a},data:function(){return{result:{},loading:!1}},mounted:function(){var t=this;t.loading=!0;var e={condition:{id:t.$route.query.id}};Object(a.f)(e).then(function(e){200===e.status&&e.total>0&&(t.result=e.data[0])}).catch(function(){}).finally(function(){t.loading=!1});var n={condition:{articleId:t.$route.query.id,title:t.COMMON_MAP.HISTORY.READ_ARTICLE}};Object(a.p)(n).then(function(e){200!==e.status&&t.$msg("插入历史信息失败!")})},computed:{content:{get:function(){return this.result.content},set:function(){}},updateTime:function(){return s.a.formatDate(new Date(this.result.updateTime))}}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"detail-article"},[n("div",{staticClass:"article-content"},[n("div",{staticClass:"title"},[n("div",{staticClass:"top"},[n("span",[t._v(t._s(t.result.title))])]),t._v(" "),n("div",{staticClass:"bottom"},[n("span",[t._v("\n                    "+t._s(t.result.author+"  |  "+t.updateTime)+"\n                ")])])]),t._v(" "),n("div",{staticClass:"content"},[n("mavon-editor",{attrs:{defaultOpen:"preview",editable:!1,subfield:!1,toolbarsFlag:!1,boxShadow:!1,shortCut:!1,transition:!1},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)]),t._v(" "),n("el-backtop",{attrs:{target:".detail-article","visibility-height":50}}),t._v(" "),n("tool-loading",{attrs:{loading:t.loading}})],1)},staticRenderFns:[]};var u=n("VU/8")(r,c,!1,function(t){n("xb5K")},null,null);e.default=u.exports},xb5K:function(t,e){}});
//# sourceMappingURL=13.da7f1749893def9cf62c.js.map