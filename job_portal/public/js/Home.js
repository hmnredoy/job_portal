(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/Home"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/pages/Home.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/pages/Home.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper */ "./resources/js/vue/helper.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../router */ "./resources/js/vue/router.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Home",
  data: function data() {
    return {
      jobs: {},
      user: null
    };
  },
  methods: {
    getJobs: function getJobs() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get('/all-jobs?page=' + page).then(function (response) {
        _this.jobs = response.data;
      });
    },
    apply: function apply(jobID) {
      var _this2 = this;

      var token = _helper__WEBPACK_IMPORTED_MODULE_0__["helper"].getFromLocal('token');

      if (token) {
        axios.post('/apply', {
          token: token,
          jobID: jobID
        }).then(function (res) {
          if (res.data.status === 'success') {
            alert('Applied Successfully!');
          }
        })["catch"](function (e) {
          alert(typeof e.response.data.message !== 'undefined' ? e.response.data.message : 'Something went wrong!');

          if (e.response.data.type === 'update_cv') {
            _this2.$router.push({
              path: '/profile'
            });
          }
        });
      } else {
        this.$router.push({
          path: '/login'
        });
      }
    },
    getUser: function getUser() {
      var _this3 = this;

      this.token = _helper__WEBPACK_IMPORTED_MODULE_0__["helper"].getFromLocal('token');

      if (this.token) {
        if (!this.$user || typeof this.$user === 'undefined') {
          axios.get('/user?token=' + this.token).then(function (response) {
            _this3.user = response.data;
          });
        } else {
          this.user = this.$user;
        }
      } else {
        _helper__WEBPACK_IMPORTED_MODULE_0__["helper"].logout('/');
      }
    }
  },
  mounted: function mounted() {
    this.getJobs();
    this.getUser();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/pages/Home.vue?vue&type=template&id=66ad3111&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/pages/Home.vue?vue&type=template&id=66ad3111&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("navbar", { attrs: { loginStatus: _vm.user } }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "container" },
        [
          _c("pagination", {
            attrs: { data: _vm.jobs },
            on: { "pagination-change-page": _vm.getJobs }
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "row view-group", attrs: { id: "products" } },
            _vm._l(_vm.jobs.data, function(job) {
              return _c(
                "div",
                { key: job.id, staticClass: "item col-xs-4 col-lg-4 mb-4" },
                [
                  _c("div", { staticClass: "thumbnail card" }, [
                    _c("div", { staticClass: "caption card-body" }, [
                      _c(
                        "h4",
                        {
                          staticClass:
                            "group card-title inner list-group-item-heading"
                        },
                        [_vm._v(_vm._s(job.title))]
                      ),
                      _vm._v(" "),
                      _c(
                        "p",
                        { staticClass: "group inner list-group-item-text" },
                        [_vm._v(_vm._s(job.description))]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "card card-footer" }, [
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex justify-content-between align-items-center"
                          },
                          [
                            _c("div", { staticClass: "float-left" }, [
                              _c("p", { staticClass: "lead" }, [
                                _vm._v(
                                  "\n                                        BDT " +
                                    _vm._s(job.salary)
                                )
                              ]),
                              _vm._v(" "),
                              _c("small", { staticClass: "text-muted" }, [
                                _vm._v(
                                  _vm._s(_vm._f("fromNow")(job.created_at))
                                )
                              ])
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "float-right" }, [
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-success",
                                  on: {
                                    click: function($event) {
                                      return _vm.apply(job.id)
                                    }
                                  }
                                },
                                [_vm._v("Apply")]
                              )
                            ])
                          ]
                        )
                      ])
                    ])
                  ])
                ]
              )
            }),
            0
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/vue/pages/Home.vue":
/*!*****************************************!*\
  !*** ./resources/js/vue/pages/Home.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home_vue_vue_type_template_id_66ad3111_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=66ad3111&scoped=true& */ "./resources/js/vue/pages/Home.vue?vue&type=template&id=66ad3111&scoped=true&");
/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ "./resources/js/vue/pages/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Home_vue_vue_type_template_id_66ad3111_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Home_vue_vue_type_template_id_66ad3111_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "66ad3111",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/vue/pages/Home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/vue/pages/Home.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/vue/pages/Home.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/pages/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/vue/pages/Home.vue?vue&type=template&id=66ad3111&scoped=true&":
/*!************************************************************************************!*\
  !*** ./resources/js/vue/pages/Home.vue?vue&type=template&id=66ad3111&scoped=true& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_66ad3111_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=66ad3111&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/pages/Home.vue?vue&type=template&id=66ad3111&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_66ad3111_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_66ad3111_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);