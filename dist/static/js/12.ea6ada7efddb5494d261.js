webpackJsonp([12],{OSes:function(t,e){},puSM:function(t,e){},xK6L:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("R/2u"),r=a("o6ZE"),o=a("8VXF"),l=a("jeSC"),i={name:"ColumnPopover",components:{Column:r.a},props:{data:{type:Object,default:function(){return{}}}},computed:{results:function(){return this.data.searchResult.map(function(t,e){var a={};return a.index=e,a.value=t,a})}},methods:{getDetail:function(t){this.$emit("detail",t)}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-popover",{attrs:{placement:"right",width:"400",trigger:"hover","popper-class":"popover-column","visible-arrow":!1}},[a("el-table",{attrs:{data:t.results,"header-cell-style":{background:"#eef1f6",color:"#606266"},"max-height":"400"}},[a("el-table-column",{attrs:{width:"60",property:"index",label:"序号",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"查询结果",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{innerHTML:t._s(e.row.value)}})]}}])})],1),t._v(" "),a("column",{staticClass:"column-popover",attrs:{slot:"reference",data:t.data},on:{detail:t.getDetail},slot:"reference"})],1)},staticRenderFns:[]};var c={name:"SearchArticle",components:{ColumnPopover:a("VU/8")(i,s,!1,function(t){a("OSes")},null,null).exports,EmptyView:l.a,ToolLoading:o.a,Column:r.a},data:function(){return{busy:!1,page:{recordStartNo:-1,pageRecordNum:20},content:"",result:{data:[],total:0},loading:!1}},created:function(){this.$route.query&&(this.content=this.$route.query.data)},methods:{getDetail:function(t){var e=this.$router.resolve({path:"/detail",query:{id:t}});window.open(e.href,"_blank")},getHighlightArticle:function(){var t=this,e={condition:{content:t.content},recordStartNo:t.page.recordStartNo,pageRecordNum:t.page.pageRecordNum};Object(n.o)(e).then(function(e){200===e.status?e.total>0?(e.data.forEach(function(e){t.result.data.push(e)}),t.result.total=e.total,t.busy=!1):t.busy=!0:t.$msg(e.message?e.message:"Function-highlightSearch 查询异常!")}).catch().finally(function(){t.loading=!1})},loadMore:function(){var t=this;t.busy=!0,t.loading=!0,setTimeout(function(){t.page.recordStartNo++,t.getHighlightArticle()},500)}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"search-article"},[a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scorll-disabled":"busy","infinite-scroll-distance":"10"}},t._l(t.result.data,function(e,n){return a("column-popover",{key:n,attrs:{data:e},on:{detail:t.getDetail}})}),1),t._v(" "),t.result.data.length?t._e():a("empty-view"),t._v(" "),0===t.result.data.length?a("tool-loading",{attrs:{loading:t.loading}}):t._e(),t._v(" "),a("el-backtop",{attrs:{target:".search-article","visibility-height":50}})],1)},staticRenderFns:[]};var d=a("VU/8")(c,u,!1,function(t){a("puSM")},null,null);e.default=d.exports}});
//# sourceMappingURL=12.ea6ada7efddb5494d261.js.map