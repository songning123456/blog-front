webpackJsonp([11],{"0NmL":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"BlogLazyComponent",props:{timeout:{type:Number},tagName:{type:String,default:"div"},viewport:{type:"undefined"!=typeof window?window.HTMLElement:Object,default:function(){return null}},threshold:{type:String,default:"0px"},direction:{type:String,default:"vertical"},maxWaitingTime:{type:Number,default:50}},data:function(){return{isInit:!1,timer:null,io:null,loading:!1}},created:function(){var t=this;this.timeout&&(this.timer=setTimeout(function(){t.init()},this.timeout))},mounted:function(){if(!this.timeout){var t=void 0;switch(this.direction){case"vertical":t=this.threshold+" 0px";break;case"horizontal":t="0px "+this.threshold}try{this.io=new window.IntersectionObserver(this.intersectionHandler,{rootMargin:t,root:this.viewport,threshold:[0,Number.MIN_VALUE,.01]}),this.io.observe(this.$el)}catch(t){this.init()}}},beforeDestroy:function(){this.io&&this.io.unobserve(this.$el)},methods:{intersectionHandler:function(t){(t[0].isIntersecting||t[0].intersectionRatio)&&(this.init(),this.io.unobserve(this.$el))},init:function(){var t=this;this.$emit("beforeInit"),this.$emit("before-init"),this.loading=!0,this.requestAnimationFrame(function(){t.isInit=!0,t.$emit("init")})},requestAnimationFrame:function(t){var e=this;return setTimeout(function(){e.isInit||t()},this.maxWaitingTime),(window.requestAnimationFrame||function(t){return setTimeout(t,1e3/60)})(t)}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition-group",{staticStyle:{position:"relative"},attrs:{tag:t.tagName,name:"lazy-component"},on:{"before-enter":function(e){return t.$emit("before-enter",e)},"before-leave":function(e){return t.$emit("before-leave",e)},"after-enter":function(e){return t.$emit("after-enter",e)},"after-leave":function(e){return t.$emit("after-leave",e)}}},[t.isInit?n("div",{key:"component"},[t._t("default",null,{loading:t.loading})],2):t.$slots.skeleton?n("div",{key:"skeleton"},[t._t("skeleton")],2):n("div",{key:"loading"})])},staticRenderFns:[]},o=n("VU/8")(i,r,!1,null,null,null).exports,s={name:"OriginLazy",mounted:function(){console.error("origin lazy")}},a={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"origin-lazy"},[e("span",[e("a",{staticClass:"pic",attrs:{target:"_blank",href:"http://tv.sohu.com/20170321/n484142953.shtml"}},[e("img",{attrs:{src:"http://photocdn.sohu.com/20170310/vrsa_hor9313037.jpg",alt:"罪第1季第10集"}})])]),this._v(" "),e("span",[e("a",{staticClass:"pic",attrs:{target:"_blank",href:"http://tv.sohu.com/20170321/n484142953.shtml"}},[e("img",{attrs:{src:"http://photocdn.sohu.com/20170310/vrsa_hor9313037.jpg",alt:"罪第1季第10集"}})])])])}]};var l=n("VU/8")(s,a,!1,function(t){n("42cK")},"data-v-3ff0ef3d",null).exports,c={name:"SkeletonLazy",mounted:function(){console.error("skeleton lazy")}},u={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"skeleton-lazy"},[e("span"),this._v(" "),e("span")])}]};var h={name:"LazyExperiment",components:{SkeletonLazy:n("VU/8")(c,u,!1,function(t){n("D6vQ")},"data-v-d0eb82c6",null).exports,OriginLazy:l,BlogLazyComponent:o}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lazy-experiment"},t._l(20,function(e){return n("blog-lazy-component",{key:e},[n("origin-lazy"),t._v(" "),n("skeleton-lazy",{attrs:{slot:"skeleton"},slot:"skeleton"})],1)}),1)},staticRenderFns:[]};var f=n("VU/8")(h,m,!1,function(t){n("EmJ/")},"data-v-699a0faa",null);e.default=f.exports},"42cK":function(t,e){},D6vQ:function(t,e){},"EmJ/":function(t,e){}});
//# sourceMappingURL=11.7805fa285f229cdc7ab6.js.map