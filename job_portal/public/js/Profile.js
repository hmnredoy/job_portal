(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/Profile"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/pages/Profile.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/pages/Profile.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper */ "./resources/js/vue/helper.js");
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
  name: "Profile",
  data: function data() {
    return {
      user: {
        type: null,
        firstName: null,
        lastName: null,
        businessName: null,
        email: null,
        password: null,
        image: null,
        cv: null,
        skills: []
      },
      errors: null,
      profileImage: '/storage/images/profile.png',
      skill: null
    };
  },
  methods: {
    addSkill: function addSkill() {
      this.user.skills.push(this.skill);
      this.skill = null;
    },
    setPhoto: function setPhoto(e) {
      var _this = this;

      var file = e.target.files[0];
      var reader = new FileReader();

      reader.onloadend = function () {
        _this.profileImage = reader.result;
      };

      reader.readAsDataURL(file);
      this.user.image = file;
    },
    setCV: function setCV(e) {
      this.user.cv = e.target.files[0];
    },
    getUserData: function getUserData() {
      var _this2 = this;

      axios.get('/user?token=' + _helper__WEBPACK_IMPORTED_MODULE_0__["helper"].getFromLocal("token")).then(function (res) {
        Object.assign(_this2.user, res.data);
        console.log(res);
      })["catch"](function (e) {
        _this2.errors = e.response.data.errors;
      });
    },
    saveData: function saveData() {
      var _this$user$image$file, _this$user$cv$files$;

      var formData = new FormData();
      var image = (_this$user$image$file = this.user.image.files[0]) !== null && _this$user$image$file !== void 0 ? _this$user$image$file : null;
      var cv = (_this$user$cv$files$ = this.user.cv.files[0]) !== null && _this$user$cv$files$ !== void 0 ? _this$user$cv$files$ : null;
      formData.append("image", image);
      formData.append("cv", cv); //
      //  let data = Object.assign(this.user, formData, {token: helper.getFromLocal("token")},{_method: 'patch'})

      console.log(formData);
      /*axios.post('/user',data,
      {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
          .then((res) => {
              console.log(res)
          })
          .catch((e) => {
              this.errors = e.response.data.errors
          })*/
    }
  },
  mounted: function mounted() {
    this.getUserData();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/pages/Profile.vue?vue&type=template&id=70193f32&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/vue/pages/Profile.vue?vue&type=template&id=70193f32&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
      _c("navbar"),
      _vm._v(" "),
      _c("div", { staticClass: "container" }, [
        _c("div", { staticClass: "card" }, [
          _c(
            "div",
            { staticClass: "card-body d-flex justify-content-center" },
            [
              _c("div", { staticClass: "col-md-6" }, [
                _vm._m(0),
                _vm._v(" "),
                _vm.user.type === "applicant"
                  ? _c("div", { staticClass: "profile-image-wrapper" }, [
                      _c("img", {
                        staticClass: "profile-image",
                        attrs: {
                          src: _vm.profileImage,
                          alt: "profile-image",
                          width: "100"
                        }
                      })
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.user.type === "applicant"
                  ? _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "pPhoto" } }, [
                        _vm._v("Profile Photo")
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        staticClass: "form-control-file",
                        attrs: { type: "file", id: "pPhoto" },
                        on: {
                          change: function($event) {
                            return _vm.setPhoto($event)
                          }
                        }
                      })
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.user.firstName,
                        expression: "user.firstName"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "text",
                      placeholder: "First Name",
                      autofocus: ""
                    },
                    domProps: { value: _vm.user.firstName },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.user, "firstName", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.user.lastName,
                        expression: "user.lastName"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { type: "text", placeholder: "Last Name" },
                    domProps: { value: _vm.user.lastName },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.user, "lastName", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _vm.user.type === "company"
                  ? _c("div", { staticClass: "form-group" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.user.businessName,
                            expression: "user.businessName"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { type: "text", placeholder: "Business Name" },
                        domProps: { value: _vm.user.businessName },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.user,
                              "businessName",
                              $event.target.value
                            )
                          }
                        }
                      })
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.user.type === "applicant"
                  ? _c("div", { staticClass: "form-group" }, [
                      _c("label", [_vm._v("Skills:")]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticStyle: { display: "inline-block" } },
                        _vm._l(_vm.user.skills, function(skill, index) {
                          return _c(
                            "span",
                            { key: index, staticClass: "text-muted" },
                            [_c("span", [_vm._v(_vm._s(skill) + ", ")])]
                          )
                        }),
                        0
                      ),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.skill,
                            expression: "skill"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          placeholder: "Write skill and press Enter"
                        },
                        domProps: { value: _vm.skill },
                        on: {
                          keydown: function($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k(
                                $event.keyCode,
                                "enter",
                                13,
                                $event.key,
                                "Enter"
                              )
                            ) {
                              return null
                            }
                            $event.preventDefault()
                            return _vm.addSkill($event)
                          },
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.skill = $event.target.value
                          }
                        }
                      })
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.user.type === "applicant"
                  ? _c("div", { staticClass: "profile-image-wrapper mb-2" }, [
                      _c("label", { attrs: { for: "cv" } }, [
                        _vm._v("Select CV")
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        staticClass: "form-control-file",
                        attrs: { type: "file", id: "cv" },
                        on: {
                          change: function($event) {
                            return _vm.setCV($event)
                          }
                        }
                      })
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("hr"),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn-block btn btn-default mb-2 float-right",
                    attrs: {
                      type: "button",
                      "data-toggle": "collapse",
                      "data-target": "#emailPassword",
                      "aria-expanded": "false"
                    }
                  },
                  [
                    _vm._v(
                      "\n                    Update Email/Password\n                "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "collapse mb-4",
                    attrs: { id: "emailPassword" }
                  },
                  [
                    _c("div", { staticClass: "form-group" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.user.email,
                            expression: "user.email"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { type: "text", placeholder: "Email" },
                        domProps: { value: _vm.user.email },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.user, "email", $event.target.value)
                          }
                        }
                      })
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.user.password,
                            expression: "user.password"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { type: "password", placeholder: "Password" },
                        domProps: { value: _vm.user.password },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.user, "password", $event.target.value)
                          }
                        }
                      })
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-lg btn-primary btn-block",
                    on: { click: _vm.saveData }
                  },
                  [_vm._v("Update")]
                ),
                _vm._v(" "),
                _vm.errors
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "alert alert-danger mt-4 rounded font-bold mb-4 shadow-lg"
                      },
                      _vm._l(_vm.errors, function(v, k) {
                        return _c(
                          "div",
                          { key: k },
                          _vm._l(v, function(error) {
                            return _c(
                              "p",
                              { key: error, staticClass: "text-sm" },
                              [
                                _vm._v(
                                  "\n                        " +
                                    _vm._s(error) +
                                    "\n                        "
                                )
                              ]
                            )
                          }),
                          0
                        )
                      }),
                      0
                    )
                  : _vm._e()
              ])
            ]
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "text-center mb-4" }, [
      _c("h1", { staticClass: "h3 mb-3 font-weight-normal" }, [
        _vm._v("Profile")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/vue/pages/Profile.vue":
/*!********************************************!*\
  !*** ./resources/js/vue/pages/Profile.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Profile_vue_vue_type_template_id_70193f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Profile.vue?vue&type=template&id=70193f32&scoped=true& */ "./resources/js/vue/pages/Profile.vue?vue&type=template&id=70193f32&scoped=true&");
/* harmony import */ var _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Profile.vue?vue&type=script&lang=js& */ "./resources/js/vue/pages/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Profile_vue_vue_type_template_id_70193f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Profile_vue_vue_type_template_id_70193f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "70193f32",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/vue/pages/Profile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/vue/pages/Profile.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/vue/pages/Profile.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/pages/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/vue/pages/Profile.vue?vue&type=template&id=70193f32&scoped=true&":
/*!***************************************************************************************!*\
  !*** ./resources/js/vue/pages/Profile.vue?vue&type=template&id=70193f32&scoped=true& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_70193f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=template&id=70193f32&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/vue/pages/Profile.vue?vue&type=template&id=70193f32&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_70193f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_70193f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);