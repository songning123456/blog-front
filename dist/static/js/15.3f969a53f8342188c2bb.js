webpackJsonp([15],{GHzP:function(t,e){},"V/Ga":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("Gu7T"),r=n.n(i),a=n("fZjL"),o=n.n(a),s=n("mvHQ"),l=n.n(s),u=n("R/2u"),c=n("8VXF"),d={name:"History",components:{EmptyView:n("jeSC").a,ToolLoading:c.a},data:function(){return{busy:!1,page:{recordStartNo:-1,pageRecordNum:10},result:{data:[],total:0},loading:!1}},watch:{listData:{handler:function(t,e){if(t.length>e.length){var n=e.length,i=t.length-1;this.addListener(n,i)}else this.removeListener()},deep:!0}},computed:{listData:function(){return JSON.parse(l()(this.result.data))}},methods:{loadMore:function(){var t=this;t.busy=!0,t.loading=!0,setTimeout(function(){t.page.recordStartNo++,t.getHistory()},500)},addListener:function(t,e){var n=this;setTimeout(function(){for(var i=document.getElementsByClassName("history-title"),r=t;r<=e;r++){var a=i[r].children[2];a&&a.addEventListener("click",function(t){return function(){n.newLink(t)}}(r),!1)}},1e3)},removeListener:function(){var t=this,e=document.getElementsByClassName("history-title");o()(e).forEach(function(n){var i=e[n].children[2];i&&i.removeEventListener("click",function(e){return function(){t.newLink(e)}}(n),!1)})},destroy:function(){this.page={recordStartNo:-1,pageRecordNum:10},this.result={data:[],total:0},this.busy=!1},resetQuery:function(){this.page={recordStartNo:-1,pageRecordNum:10},this.result={data:[],total:0},this.busy=!1,this.loadMore()},getHistory:function(){var t=this,e={recordStartNo:t.page.recordStartNo,pageRecordNum:t.page.pageRecordNum};Object(u.h)(e).then(function(e){t.$response(e,"infiniteScroll").then(function(e){var n;(t.result.total=e.total,e.data.length>0)?((n=t.result.data).push.apply(n,r()(e.data)),t.busy=!1):t.busy=!0})}).finally(function(){t.loading=!1})},newLink:function(t){var e=this.$router.resolve({path:"/detail",query:{id:this.result.data[t].articleId}});window.open(e.href,"_blank"),this.resetQuery()}}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"history"},[n("el-timeline",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":"busy","infinite-scroll-distance":"10"}},t._l(t.result.data,function(e,i){return n("el-timeline-item",{key:i,attrs:{timestamp:e.time,placement:"top"}},[n("el-card",[n("h3",{staticClass:"history-title",domProps:{innerHTML:t._s(e.title)}}),t._v(" "),n("p",{domProps:{innerHTML:t._s(e.description)}})])],1)}),1),t._v(" "),0===t.result.data.length?n("tool-loading",{attrs:{loading:t.loading}}):t._e(),t._v(" "),0===t.result.data.length?n("empty-view"):t._e(),t._v(" "),n("el-backtop",{attrs:{target:".history","visibility-height":50}})],1)},staticRenderFns:[]};var f=n("VU/8")(d,h,!1,function(t){n("GHzP")},null,null);e.default=f.exports}});
//# sourceMappingURL=15.3f969a53f8342188c2bb.js.map