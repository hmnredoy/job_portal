(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{299:function(t,s,a){"use strict";a.r(s);var e=a(4),i=(a(18),{name:"Home",data:function(){return{jobs:{},user:null}},methods:{getJobs:function(){var t=this,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;axios.get("/all-jobs?page="+s).then((function(s){t.jobs=s.data}))},apply:function(t){var s=this,a=e.a.getFromLocal("token");a?axios.post("/apply",{token:a,jobID:t}).then((function(t){"success"===t.data.status&&alert("Applied Successfully!")})).catch((function(t){alert(void 0!==t.response.data.message?t.response.data.message:"Something went wrong!"),"update_cv"===t.response.data.type&&s.$router.push({path:"/profile"})})):this.$router.push({path:"/login"})},getUser:function(){var t=this;this.token=e.a.getFromLocal("token"),this.token?this.$user&&void 0!==this.$user?this.user=this.$user:axios.get("/user?token="+this.token).then((function(s){t.user=s.data})):e.a.logout("/")}},mounted:function(){this.getJobs(),this.getUser()}}),n=a(3),o=Object(n.a)(i,(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("navbar",{attrs:{loginStatus:t.user}}),t._v(" "),a("div",{staticClass:"container"},[a("pagination",{attrs:{data:t.jobs},on:{"pagination-change-page":t.getJobs}}),t._v(" "),a("div",{staticClass:"row view-group",attrs:{id:"products"}},t._l(t.jobs.data,(function(s){return a("div",{key:s.id,staticClass:"item col-xs-4 col-lg-4 mb-4"},[a("div",{staticClass:"thumbnail card"},[a("div",{staticClass:"caption card-body"},[a("h4",{staticClass:"group card-title inner list-group-item-heading"},[t._v(t._s(s.title))]),t._v(" "),a("p",{staticClass:"group inner list-group-item-text"},[t._v(t._s(t._f("str_limit")(s.description,100)))]),t._v(" "),a("div",{staticClass:"mt-2 badge badge-pill"},[t._v("\n                            Company: "+t._s(s.owner.businessName)+"\n                        ")]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"mt-2 badge badge-pill"},[t._v("\n                            Location: "+t._s(s.location)+"\n                        ")]),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"mt-2 badge badge-pill"},[t._v("\n                            Country: "+t._s(s.country)+"\n                        ")]),t._v(" "),a("div",{staticClass:"card card-footer mt-2"},[a("div",{staticClass:"d-flex justify-content-between align-items-center"},[a("div",{staticClass:"float-left"},[a("p",{staticClass:"lead"},[t._v("\n                                        BDT "+t._s(t._f("numberFormat")(s.salary)))]),t._v(" "),a("small",{staticClass:"text-muted"},[t._v(t._s(t._f("fromNow")(s.created_at)))])]),t._v(" "),a("div",{staticClass:"float-right"},[a("button",{staticClass:"btn btn-primary btn-sm",on:{click:function(a){return t.apply(s.id)}}},[t._v("Apply")])])])])])])])})),0)],1)],1)}),[],!1,null,"743fa02b",null);s.default=o.exports}}]);