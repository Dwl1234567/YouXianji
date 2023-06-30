"use weex:vue";
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************************************************************************!*\
  !*** /Users/0821a/Desktop/YouXianji/main.js?{"page":"pages%2Fidphoto%2Fidphoto"} ***!
  \***********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uni-app-style */ 1);\n/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uni_app_style__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var uni_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uni-polyfill */ 4);\n/* harmony import */ var uni_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uni_polyfill__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pages_idphoto_idphoto_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/idphoto/idphoto.nvue?mpType=page */ 5);\n\n        \n        \n        \n        \n        _pages_idphoto_idphoto_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"].mpType = 'page'\n        _pages_idphoto_idphoto_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"].route = 'pages/idphoto/idphoto'\n        _pages_idphoto_idphoto_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"].el = '#root'\n        new Vue(_pages_idphoto_idphoto_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\n        //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsUUFBOEI7QUFDOUIsUUFBNkI7QUFDN0IsUUFBa0U7QUFDbEUsUUFBUSwrRUFBRztBQUNYLFFBQVEsK0VBQUc7QUFDWCxRQUFRLCtFQUFHO0FBQ1gsZ0JBQWdCLCtFQUFHIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAgICAgXG4gICAgICAgIGltcG9ydCAndW5pLWFwcC1zdHlsZSdcbiAgICAgICAgaW1wb3J0ICd1bmktcG9seWZpbGwnXG4gICAgICAgIGltcG9ydCBBcHAgZnJvbSAnLi9wYWdlcy9pZHBob3RvL2lkcGhvdG8ubnZ1ZT9tcFR5cGU9cGFnZSdcbiAgICAgICAgQXBwLm1wVHlwZSA9ICdwYWdlJ1xuICAgICAgICBBcHAucm91dGUgPSAncGFnZXMvaWRwaG90by9pZHBob3RvJ1xuICAgICAgICBBcHAuZWwgPSAnI3Jvb3QnXG4gICAgICAgIG5ldyBWdWUoQXBwKVxuICAgICAgICAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!******************************************************************!*\
  !*** /Users/0821a/Desktop/YouXianji/main.js?{"type":"appStyle"} ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("Vue.prototype.__$appStyle__ = {}\nVue.prototype.__merge_style && Vue.prototype.__merge_style(__webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss */ 2).default,Vue.prototype.__$appStyle__)\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsMkRBQTJELG1CQUFPLENBQUMsbURBQTRDIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18gPSB7fVxuVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlICYmIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShyZXF1aXJlKFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1zY3NzXCIpLmRlZmF1bHQsVnVlLnByb3RvdHlwZS5fXyRhcHBTdHlsZV9fKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/*!*******************************************************************************!*\
  !*** /Users/0821a/Desktop/YouXianji/App.vue?vue&type=style&index=0&lang=scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-1!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--11-oneOf-0-2!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--11-oneOf-0-3!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-4!../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=scss */ 3);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 3 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-1!./node_modules/postcss-loader/src??ref--11-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--11-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!/Users/0821a/Desktop/YouXianji/App.vue?vue&type=style&index=0&lang=scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "@VERSION": 2
}

/***/ }),
/* 4 */
/*!*******************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-cli-shared/lib/uni-polyfill.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  var global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}

/***/ }),
/* 5 */
/*!*****************************************************************************!*\
  !*** /Users/0821a/Desktop/YouXianji/pages/idphoto/idphoto.nvue?mpType=page ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _idphoto_nvue_vue_type_template_id_11812838_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./idphoto.nvue?vue&type=template&id=11812838&mpType=page */ 6);\n/* harmony import */ var _idphoto_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./idphoto.nvue?vue&type=script&lang=js&mpType=page */ 8);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _idphoto_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _idphoto_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 13);\n\nvar renderjs\n\n\nfunction injectStyles (context) {\n  \n  if(!this.options.style){\n          this.options.style = {}\n      }\n      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){\n        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)\n      }\n      if(Vue.prototype.__merge_style){\n                Vue.prototype.__merge_style(__webpack_require__(/*! ./idphoto.nvue?vue&type=style&index=0&lang=scss&mpType=page */ 11).default, this.options.style)\n            }else{\n                Object.assign(this.options.style,__webpack_require__(/*! ./idphoto.nvue?vue&type=style&index=0&lang=scss&mpType=page */ 11).default)\n            }\n\n}\n\n/* normalize component */\n\nvar component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _idphoto_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _idphoto_nvue_vue_type_template_id_11812838_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _idphoto_nvue_vue_type_template_id_11812838_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  \"475f16ce\",\n  false,\n  _idphoto_nvue_vue_type_template_id_11812838_mpType_page__WEBPACK_IMPORTED_MODULE_0__[\"components\"],\n  renderjs\n)\n\ninjectStyles.call(component)\ncomponent.options.__file = \"pages/idphoto/idphoto.nvue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0k7QUFDaEk7QUFDdUU7QUFDTDtBQUNsRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxtQkFBTyxDQUFDLHFFQUE2RDtBQUNqSCxhQUFhO0FBQ2IsaURBQWlELG1CQUFPLENBQUMscUVBQTZEO0FBQ3RIOztBQUVBOztBQUVBO0FBQzZNO0FBQzdNLGdCQUFnQixpTkFBVTtBQUMxQixFQUFFLHlGQUFNO0FBQ1IsRUFBRSw4RkFBTTtBQUNSLEVBQUUsdUdBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsa0dBQVU7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDZSxnRiIsImZpbGUiOiI1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSBmcm9tIFwiLi9pZHBob3RvLm52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTE4MTI4MzgmbXBUeXBlPXBhZ2VcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2lkcGhvdG8ubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5leHBvcnQgKiBmcm9tIFwiLi9pZHBob3RvLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmbXBUeXBlPXBhZ2VcIlxuZnVuY3Rpb24gaW5qZWN0U3R5bGVzIChjb250ZXh0KSB7XG4gIFxuICBpZighdGhpcy5vcHRpb25zLnN0eWxlKXtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSB7fVxuICAgICAgfVxuICAgICAgaWYoVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlICYmIFZ1ZS5wcm90b3R5cGUuX18kYXBwU3R5bGVfXyl7XG4gICAgICAgIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18sIHRoaXMub3B0aW9ucy5zdHlsZSlcbiAgICAgIH1cbiAgICAgIGlmKFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZSl7XG4gICAgICAgICAgICAgICAgVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlKHJlcXVpcmUoXCIuL2lkcGhvdG8ubnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9c2NzcyZtcFR5cGU9cGFnZVwiKS5kZWZhdWx0LCB0aGlzLm9wdGlvbnMuc3R5bGUpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5zdHlsZSxyZXF1aXJlKFwiLi9pZHBob3RvLm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPXNjc3MmbXBUeXBlPXBhZ2VcIikuZGVmYXVsdClcbiAgICAgICAgICAgIH1cblxufVxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IQnVpbGRlclguYXBwL0NvbnRlbnRzL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgXCI0NzVmMTZjZVwiLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuaW5qZWN0U3R5bGVzLmNhbGwoY29tcG9uZW50KVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9pZHBob3RvL2lkcGhvdG8ubnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///5\n");

/***/ }),
/* 6 */
/*!***********************************************************************************************************!*\
  !*** /Users/0821a/Desktop/YouXianji/pages/idphoto/idphoto.nvue?vue&type=template&id=11812838&mpType=page ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_template_id_11812838_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./idphoto.nvue?vue&type=template&id=11812838&mpType=page */ 7);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_template_id_11812838_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_template_id_11812838_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_template_id_11812838_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_template_id_11812838_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 7 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!/Users/0821a/Desktop/YouXianji/pages/idphoto/idphoto.nvue?vue&type=template&id=11812838&mpType=page ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "scroll-view",
    {
      staticStyle: { flexDirection: "column" },
      attrs: {
        scrollY: true,
        showScrollbar: true,
        enableBackToTop: true,
        bubble: "true",
      },
    },
    [
      _c(
        "view",
        {
          staticClass: ["live-camera"],
          style: { width: _vm.windowWidth, height: _vm.windowHeight },
        },
        [
          _c(
            "view",
            {
              staticClass: ["preview"],
              style: { width: _vm.windowWidth, height: _vm.windowHeight - 80 },
            },
            [
              _c("live-pusher", {
                ref: "livePusher",
                staticClass: ["livePusher"],
                style: { width: _vm.cameraWidth, height: _vm.cameraHeight },
                attrs: {
                  id: "livePusher",
                  mode: "FHD",
                  beauty: "0",
                  whiteness: "0",
                  aspect: _vm.aspect,
                  minBitrate: "1000",
                  audioQuality: "16KHz",
                  devicePosition: "back",
                  autoFocus: false,
                  muted: true,
                  enableCamera: true,
                  enableMic: false,
                  zoom: false,
                },
                on: { statechange: _vm.statechange },
              }),
              _c(
                "cover-view",
                {
                  staticClass: ["remind"],
                  style: { top: (_vm.windowHeight / 100) * 55 },
                },
                [
                  _c(
                    "u-text",
                    {
                      staticClass: ["remind-text"],
                      appendAsTree: true,
                      attrs: { append: "tree" },
                    },
                    [_vm._v(_vm._s(_vm.message))]
                  ),
                ]
              ),
              _vm.type == 0
                ? _c(
                    "cover-view",
                    {
                      staticClass: ["outline-box"],
                      style: {
                        width: _vm.windowWidth,
                        height: _vm.windowHeight - 80,
                      },
                    },
                    [
                      _c("cover-image", {
                        staticClass: ["outline-img"],
                        staticStyle: { width: "318rpx", height: "630rpx" },
                        attrs: { src: "/static/photo/photo9.png" },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
              _vm.type == 1
                ? _c(
                    "cover-view",
                    {
                      staticClass: ["outline-box"],
                      style: {
                        width: _vm.windowWidth,
                        height: _vm.windowHeight - 80,
                      },
                    },
                    [
                      _c("cover-image", {
                        staticClass: ["outline-img"],
                        staticStyle: { width: "318rpx", height: "630rpx" },
                        attrs: { src: "/static/photo/photo2.png" },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
              _vm.type == 2
                ? _c(
                    "cover-view",
                    {
                      staticClass: ["outline-box"],
                      style: {
                        width: _vm.windowWidth,
                        height: _vm.windowHeight - 80,
                      },
                    },
                    [
                      _c("cover-image", {
                        staticClass: ["outline-img"],
                        staticStyle: { width: "61rpx", height: "630rpx" },
                        attrs: { src: "/static/photo/photo3.png" },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
              _vm.type == 3
                ? _c(
                    "cover-view",
                    {
                      staticClass: ["outline-box"],
                      style: {
                        width: _vm.windowWidth,
                        height: _vm.windowHeight - 80,
                      },
                    },
                    [
                      _c("cover-image", {
                        staticClass: ["outline-img"],
                        staticStyle: { width: "61rpx", height: "630rpx" },
                        attrs: { src: "/static/photo/photo4.png" },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
              _vm.type == 4
                ? _c(
                    "cover-view",
                    {
                      staticClass: ["outline-box"],
                      style: {
                        width: _vm.windowWidth,
                        height: _vm.windowHeight - 80,
                      },
                    },
                    [
                      _c("cover-image", {
                        staticClass: ["outline-img"],
                        staticStyle: { width: "61rpx", height: "630rpx" },
                        attrs: { src: "/static/photo/photo5.png" },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
              _vm.type == 5
                ? _c(
                    "cover-view",
                    {
                      staticClass: ["outline-box"],
                      style: {
                        width: _vm.windowWidth,
                        height: _vm.windowHeight - 80,
                      },
                    },
                    [
                      _c("cover-image", {
                        staticClass: ["outline-img"],
                        staticStyle: { width: "61rpx", height: "630rpx" },
                        attrs: { src: "/static/photo/photo6.png" },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
              _vm.type == 6
                ? _c(
                    "cover-view",
                    {
                      staticClass: ["outline-box"],
                      style: {
                        width: _vm.windowWidth,
                        height: _vm.windowHeight - 80,
                      },
                    },
                    [
                      _c("cover-image", {
                        staticClass: ["outline-img"],
                        staticStyle: { width: "318rpx", height: "630rpx" },
                        attrs: { src: "/static/photo/photo7.png" },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
              _vm.type == 7
                ? _c(
                    "cover-view",
                    {
                      staticClass: ["outline-box"],
                      style: {
                        width: _vm.windowWidth,
                        height: _vm.windowHeight - 80,
                      },
                    },
                    [
                      _c("cover-image", {
                        staticClass: ["outline-img"],
                        staticStyle: { width: "318rpx", height: "630rpx" },
                        attrs: { src: "/static/photo/photo8.png" },
                      }),
                    ],
                    1
                  )
                : _vm._e(),
            ],
            1
          ),
          _c(
            "view",
            { staticClass: ["menu"] },
            [
              _c("cover-image", {
                staticClass: ["menu-mask"],
                attrs: { src: "/static/live-camera/bar.png" },
              }),
              _c("cover-image", {
                staticClass: ["menu-back"],
                attrs: { src: "/static/live-camera/back.png" },
                on: { click: _vm.back },
              }),
              _c("cover-image", {
                staticClass: ["menu-snapshot"],
                attrs: { src: "/static/live-camera/shutter.png" },
                on: { click: _vm.snapshot },
              }),
              _c("cover-image", {
                staticClass: ["menu-flip"],
                attrs: { src: "/static/live-camera/flip.png" },
                on: { click: _vm.flip },
              }),
            ],
            1
          ),
        ]
      ),
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 8 */
/*!*****************************************************************************************************!*\
  !*** /Users/0821a/Desktop/YouXianji/pages/idphoto/idphoto.nvue?vue&type=script&lang=js&mpType=page ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib??ref--5-0!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--5-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./idphoto.nvue?vue&type=script&lang=js&mpType=page */ 9);\n/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_5_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_5_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbbnVsbF0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWdqQixDQUFnQixta0JBQUcsRUFBQyIsImZpbGUiOiI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi8uLi8uLi9BcHBsaWNhdGlvbnMvSEJ1aWxkZXJYLmFwcC9Db250ZW50cy9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTUtMCEuLi8uLi8uLi8uLi8uLi8uLi9BcHBsaWNhdGlvbnMvSEJ1aWxkZXJYLmFwcC9Db250ZW50cy9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNS0xIS4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IQnVpbGRlclguYXBwL0NvbnRlbnRzL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2lkcGhvdG8ubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IQnVpbGRlclguYXBwL0NvbnRlbnRzL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNS0wIS4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9IQnVpbGRlclguYXBwL0NvbnRlbnRzL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS01LTEhLi4vLi4vLi4vLi4vLi4vLi4vQXBwbGljYXRpb25zL0hCdWlsZGVyWC5hcHAvQ29udGVudHMvSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vaWRwaG90by5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///8\n");

/***/ }),
/* 9 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--5-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!/Users/0821a/Desktop/YouXianji/pages/idphoto/idphoto.nvue?vue&type=script&lang=js&mpType=page ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__f__) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\nvar _this = null;\nvar _default = {\n  data: function data() {\n    return {\n      type: 0,\n      dotype: 'idphoto',\n      //操作类型\n      message: '',\n      //提示\n      aspect: '1:1',\n      //比例\n      cameraWidth: '',\n      //相机画面宽度\n      cameraHeight: '',\n      //相机画面宽度\n      windowWidth: '',\n      //屏幕可用宽度\n      windowHeight: '',\n      //屏幕可用高度\n      camerastate: false,\n      //相机准备好了\n      livePusher: null,\n      //流视频对象\n      snapshotsrc: null //快照\n    };\n  },\n  onLoad: function onLoad(e) {\n    this.type = e.type;\n    _this = this;\n    if (e.dotype != undefined) this.dotype = e.dotype;\n    this.initCamera();\n  },\n  onReady: function onReady() {\n    this.livePusher = uni.createLivePusherContext('livePusher', this);\n    // setTimeout(()=>{\n    this.startPreview(); //开启预览并设置摄像头\n    this.poenCarme();\n    // },500)\n  },\n\n  methods: {\n    //轮询打开\n    poenCarme: function poenCarme() {\n      if (plus.os.name == 'Android' || plus.os.name == 'iOS') {\n        this.poenCarmeInterval = setInterval(function () {\n          __f__(\"log\", _this.camerastate, \" at pages/idphoto/idphoto.nvue:105\");\n          if (!_this.camerastate) _this.startPreview();\n        }, 2500);\n      }\n      // else{\n      // \tlet poenCarmeInterval = setInterval(function() {\n      // \t\tconsole.log(_this.openCameraStatus);\n      // \t\tif (_this.openCameraStatus) {\n      // \t\t\tclearInterval(poenCarmeInterval)\n      // \t\t\treturn;\n      // \t\t}\n      // \t\t_this.startPreview();\n      // \t}, 1000);\n      // }\n    },\n    //初始化相机\n    initCamera: function initCamera() {\n      uni.getSystemInfo({\n        success: function success(res) {\n          // console.log(res)\n          _this.windowWidth = res.windowWidth;\n          _this.windowHeight = res.windowHeight;\n          _this.cameraWidth = res.windowWidth;\n          _this.cameraHeight = res.windowWidth;\n        }\n      });\n    },\n    //开始预览\n    startPreview: function startPreview() {\n      this.livePusher.startPreview({\n        success: function success(a) {\n          __f__(\"log\", a, \" at pages/idphoto/idphoto.nvue:139\");\n          _this.camerastate = true;\n        }\n      });\n    },\n    //停止预览\n    stopPreview: function stopPreview() {\n      this.livePusher.stopPreview({\n        success: function success(a) {\n          _this.camerastate = false; //标记相机未启动\n        }\n      });\n    },\n    //状态\n    statechange: function statechange(e) {\n      //状态改变\n      __f__(\"log\", e, \" at pages/idphoto/idphoto.nvue:156\");\n      if (e.detail.code == 1007) {\n        _this.camerastate = true;\n      } else if (e.detail.code == -1301) {\n        _this.camerastate = false;\n      }\n    },\n    //返回\n    back: function back() {\n      uni.navigateBack();\n    },\n    //抓拍\n    snapshot: function snapshot() {\n      this.livePusher.snapshot({\n        success: function success(e) {\n          __f__(\"log\", e, \" at pages/idphoto/idphoto.nvue:173\");\n          __f__(\"log\", e.message.tempImagePath, \" at pages/idphoto/idphoto.nvue:174\");\n          _this.snapshotsrc = 'file:/' + e.message.tempImagePath;\n          __f__(\"log\", _this.snapshotsrc, \" at pages/idphoto/idphoto.nvue:177\");\n          // uni.saveFile({\n          // \ttempFilePath: _this.snapshotsrc,\n          // \tsuccess: function (res) {\n          // \t\tvar savedFilePath = res.savedFilePath;\n          // \t\tconsole.log('savedFilePath', savedFilePath);\n          // \t\t_this.snapshotsrc = savedFilePath\n          // \t\t_this.stopPreview();\n          // \t\t_this.setImage();\n          // \t\tuni.navigateBack();\n          // \t},\n          // \tfail: (err) => {\n          // \t\tconsole.log('err', err);\n          // \t},\n          // });\n          _this.stopPreview();\n          _this.setImage();\n          uni.navigateBack();\n        }\n      });\n    },\n    //反转\n    flip: function flip() {\n      this.livePusher.switchCamera();\n    },\n    //设置\n    setImage: function setImage() {\n      var pages = getCurrentPages();\n      var prevPage = pages[pages.length - 2]; //上一个页面\n      __f__(\"log\", prevPage, '上一个页面', \" at pages/idphoto/idphoto.nvue:209\");\n      //直接调用上一个页面的setImage()方法，把数据存到上一个页面中去\n      __f__(\"log\", _this.snapshotsrc, '_this.snapshotsrc', \" at pages/idphoto/idphoto.nvue:211\");\n      prevPage.$vm.setImage({\n        path: _this.snapshotsrc,\n        dotype: this.dotype\n      });\n    }\n  }\n};\nexports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 10)[\"default\"]))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vcGFnZXMvaWRwaG90by9pZHBob3RvLm52dWUiXSwibmFtZXMiOlsiZGF0YSIsInR5cGUiLCJkb3R5cGUiLCJtZXNzYWdlIiwiYXNwZWN0IiwiY2FtZXJhV2lkdGgiLCJjYW1lcmFIZWlnaHQiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsImNhbWVyYXN0YXRlIiwibGl2ZVB1c2hlciIsInNuYXBzaG90c3JjIiwib25Mb2FkIiwiX3RoaXMiLCJvblJlYWR5IiwibWV0aG9kcyIsInBvZW5DYXJtZSIsImluaXRDYW1lcmEiLCJ1bmkiLCJzdWNjZXNzIiwic3RhcnRQcmV2aWV3Iiwic3RvcFByZXZpZXciLCJzdGF0ZWNoYW5nZSIsImJhY2siLCJzbmFwc2hvdCIsImZsaXAiLCJzZXRJbWFnZSIsInByZXZQYWdlIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvRUE7QUFBQSxlQUNBO0VBQ0FBO0lBQ0E7TUFDQUM7TUFDQUM7TUFBQTtNQUNBQztNQUFBO01BQ0FDO01BQUE7TUFDQUM7TUFBQTtNQUNBQztNQUFBO01BQ0FDO01BQUE7TUFDQUM7TUFBQTtNQUNBQztNQUFBO01BQ0FDO01BQUE7TUFDQUM7SUFDQTtFQUNBO0VBQ0FDO0lBQ0E7SUFDQUM7SUFDQTtJQUNBO0VBQ0E7RUFDQUM7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0VBQ0E7O0VBQ0FDO0lBQ0E7SUFDQUM7TUFFQTtRQUNBO1VBQ0E7VUFDQTtRQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtJQUVBO0lBRUE7SUFDQUM7TUFDQUM7UUFDQUM7VUFDQTtVQUNBTjtVQUNBQTtVQUNBQTtVQUNBQTtRQUNBO01BQ0E7SUFDQTtJQUVBO0lBQ0FPO01BQ0E7UUFDQUQ7VUFDQTtVQUNBTjtRQUNBO01BQ0E7SUFDQTtJQUNBO0lBQ0FRO01BQ0E7UUFDQUY7VUFDQU47UUFDQTtNQUNBO0lBQ0E7SUFFQTtJQUNBUztNQUNBO01BQ0E7TUFDQTtRQUNBVDtNQUNBO1FBQ0FBO01BQ0E7SUFDQTtJQUVBO0lBQ0FVO01BQ0FMO0lBQ0E7SUFFQTtJQUNBTTtNQUNBO1FBQ0FMO1VBQ0E7VUFDQTtVQUVBTjtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBQTtVQUNBQTtVQUNBSztRQUVBO01BQ0E7SUFDQTtJQUVBO0lBQ0FPO01BQ0E7SUFDQTtJQUVBO0lBQ0FDO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBQztRQUNBQztRQUNBMUI7TUFDQTtJQUNBO0VBQ0E7QUFDQTtBQUFBLDJCIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XHJcblx0PHZpZXcgY2xhc3M9XCJsaXZlLWNhbWVyYVwiIDpzdHlsZT1cInsgd2lkdGg6IHdpbmRvd1dpZHRoLCBoZWlnaHQ6IHdpbmRvd0hlaWdodCB9XCI+XHJcblx0XHQ8dmlldyBjbGFzcz1cInByZXZpZXdcIiA6c3R5bGU9XCJ7IHdpZHRoOiB3aW5kb3dXaWR0aCwgaGVpZ2h0OiB3aW5kb3dIZWlnaHQgLSA4MCB9XCI+XHJcblx0XHRcdDxsaXZlLXB1c2hlciBpZD1cImxpdmVQdXNoZXJcIiByZWY9XCJsaXZlUHVzaGVyXCIgY2xhc3M9XCJsaXZlUHVzaGVyXCIgbW9kZT1cIkZIRFwiIGJlYXV0eT1cIjBcIiB3aGl0ZW5lc3M9XCIwXCJcclxuXHRcdFx0XHQ6YXNwZWN0PVwiYXNwZWN0XCIgbWluLWJpdHJhdGU9XCIxMDAwXCIgYXVkaW8tcXVhbGl0eT1cIjE2S0h6XCIgZGV2aWNlLXBvc2l0aW9uPVwiYmFja1wiIDphdXRvLWZvY3VzPVwiZmFsc2VcIlxyXG5cdFx0XHRcdDptdXRlZD1cInRydWVcIiA6ZW5hYmxlLWNhbWVyYT1cInRydWVcIiA6ZW5hYmxlLW1pYz1cImZhbHNlXCIgOnpvb209XCJmYWxzZVwiIEBzdGF0ZWNoYW5nZT1cInN0YXRlY2hhbmdlXCJcclxuXHRcdFx0XHQ6c3R5bGU9XCJ7IHdpZHRoOiBjYW1lcmFXaWR0aCwgaGVpZ2h0OiBjYW1lcmFIZWlnaHQgfVwiPjwvbGl2ZS1wdXNoZXI+XHJcblxyXG5cdFx0XHQ8IS0t5o+Q56S66K+tLS0+XHJcblx0XHRcdDxjb3Zlci12aWV3IGNsYXNzPVwicmVtaW5kXCIgOnN0eWxlPVwie3RvcDogd2luZG93SGVpZ2h0LzEwMCo1NSB9XCI+XHJcblx0XHRcdFx0PHRleHQgY2xhc3M9XCJyZW1pbmQtdGV4dFwiIHN0eWxlPVwiXCI+e3sgbWVzc2FnZSB9fTwvdGV4dD5cclxuXHRcdFx0PC9jb3Zlci12aWV3PlxyXG5cclxuXHRcdFx0PCEtLei+heWKqee6vy0tPlxyXG5cdFx0XHQ8IS0tIDxjb3Zlci12aWV3IGNsYXNzPVwib3V0bGluZS1ib3hcIiA6c3R5bGU9XCJ7IHdpZHRoOiB3aW5kb3dXaWR0aCwgaGVpZ2h0OiB3aW5kb3dIZWlnaHQgLSA4MCB9XCI+XHJcblx0XHRcdFx0PGNvdmVyLWltYWdlIGNsYXNzPVwib3V0bGluZS1pbWdcIiBzcmM9XCIvc3RhdGljL2dvb2RzcGhvdG8ucG5nXCIgc3R5bGU9XCJcIj48L2NvdmVyLWltYWdlPlxyXG5cdFx0XHQ8L2NvdmVyLXZpZXc+IC0tPlxyXG5cdFx0XHQ8Y292ZXItdmlldyBjbGFzcz1cIm91dGxpbmUtYm94XCIgOnN0eWxlPVwieyB3aWR0aDogd2luZG93V2lkdGgsIGhlaWdodDogd2luZG93SGVpZ2h0IC0gODAgfVwiIHYtaWY9XCJ0eXBlID09IDBcIj5cclxuXHRcdFx0XHQ8Y292ZXItaW1hZ2UgY2xhc3M9XCJvdXRsaW5lLWltZ1wiIHNyYz1cIi9zdGF0aWMvcGhvdG8vcGhvdG85LnBuZ1wiXHJcblx0XHRcdFx0XHRzdHlsZT1cIndpZHRoOiAzMThycHg7IGhlaWdodDogNjMwcnB4O1wiPjwvY292ZXItaW1hZ2U+XHJcblx0XHRcdDwvY292ZXItdmlldz5cclxuXHRcdFx0PGNvdmVyLXZpZXcgY2xhc3M9XCJvdXRsaW5lLWJveFwiIDpzdHlsZT1cInsgd2lkdGg6IHdpbmRvd1dpZHRoLCBoZWlnaHQ6IHdpbmRvd0hlaWdodCAtIDgwIH1cIiB2LWlmPVwidHlwZSA9PSAxXCI+XHJcblx0XHRcdFx0PGNvdmVyLWltYWdlIGNsYXNzPVwib3V0bGluZS1pbWdcIiBzcmM9XCIvc3RhdGljL3Bob3RvL3Bob3RvMi5wbmdcIlxyXG5cdFx0XHRcdFx0c3R5bGU9XCJ3aWR0aDogMzE4cnB4OyBoZWlnaHQ6IDYzMHJweDtcIj48L2NvdmVyLWltYWdlPlxyXG5cdFx0XHQ8L2NvdmVyLXZpZXc+XHJcblx0XHRcdDxjb3Zlci12aWV3IGNsYXNzPVwib3V0bGluZS1ib3hcIiA6c3R5bGU9XCJ7IHdpZHRoOiB3aW5kb3dXaWR0aCwgaGVpZ2h0OiB3aW5kb3dIZWlnaHQgLSA4MCB9XCIgdi1pZj1cInR5cGUgPT0gMlwiPlxyXG5cdFx0XHRcdDxjb3Zlci1pbWFnZSBjbGFzcz1cIm91dGxpbmUtaW1nXCIgc3JjPVwiL3N0YXRpYy9waG90by9waG90bzMucG5nXCJcclxuXHRcdFx0XHRcdHN0eWxlPVwid2lkdGg6IDYxcnB4OyBoZWlnaHQ6IDYzMHJweDtcIj48L2NvdmVyLWltYWdlPlxyXG5cdFx0XHQ8L2NvdmVyLXZpZXc+XHJcblx0XHRcdDxjb3Zlci12aWV3IGNsYXNzPVwib3V0bGluZS1ib3hcIiA6c3R5bGU9XCJ7IHdpZHRoOiB3aW5kb3dXaWR0aCwgaGVpZ2h0OiB3aW5kb3dIZWlnaHQgLSA4MCB9XCIgdi1pZj1cInR5cGUgPT0gM1wiPlxyXG5cdFx0XHRcdDxjb3Zlci1pbWFnZSBjbGFzcz1cIm91dGxpbmUtaW1nXCIgc3JjPVwiL3N0YXRpYy9waG90by9waG90bzQucG5nXCJcclxuXHRcdFx0XHRcdHN0eWxlPVwid2lkdGg6IDYxcnB4OyBoZWlnaHQ6IDYzMHJweDtcIj48L2NvdmVyLWltYWdlPlxyXG5cdFx0XHQ8L2NvdmVyLXZpZXc+XHJcblx0XHRcdDxjb3Zlci12aWV3IGNsYXNzPVwib3V0bGluZS1ib3hcIiA6c3R5bGU9XCJ7IHdpZHRoOiB3aW5kb3dXaWR0aCwgaGVpZ2h0OiB3aW5kb3dIZWlnaHQgLSA4MCB9XCIgdi1pZj1cInR5cGUgPT0gNFwiPlxyXG5cdFx0XHRcdDxjb3Zlci1pbWFnZSBjbGFzcz1cIm91dGxpbmUtaW1nXCIgc3JjPVwiL3N0YXRpYy9waG90by9waG90bzUucG5nXCJcclxuXHRcdFx0XHRcdHN0eWxlPVwid2lkdGg6IDYxcnB4OyBoZWlnaHQ6IDYzMHJweDtcIj48L2NvdmVyLWltYWdlPlxyXG5cdFx0XHQ8L2NvdmVyLXZpZXc+XHJcblx0XHRcdDxjb3Zlci12aWV3IGNsYXNzPVwib3V0bGluZS1ib3hcIiA6c3R5bGU9XCJ7IHdpZHRoOiB3aW5kb3dXaWR0aCwgaGVpZ2h0OiB3aW5kb3dIZWlnaHQgLSA4MCB9XCIgdi1pZj1cInR5cGUgPT0gNVwiPlxyXG5cdFx0XHRcdDxjb3Zlci1pbWFnZSBjbGFzcz1cIm91dGxpbmUtaW1nXCIgc3JjPVwiL3N0YXRpYy9waG90by9waG90bzYucG5nXCJcclxuXHRcdFx0XHRcdHN0eWxlPVwid2lkdGg6IDYxcnB4OyBoZWlnaHQ6IDYzMHJweDtcIj48L2NvdmVyLWltYWdlPlxyXG5cdFx0XHQ8L2NvdmVyLXZpZXc+XHJcblx0XHRcdDxjb3Zlci12aWV3IGNsYXNzPVwib3V0bGluZS1ib3hcIiA6c3R5bGU9XCJ7IHdpZHRoOiB3aW5kb3dXaWR0aCwgaGVpZ2h0OiB3aW5kb3dIZWlnaHQgLSA4MCB9XCIgdi1pZj1cInR5cGUgPT0gNlwiPlxyXG5cdFx0XHRcdDxjb3Zlci1pbWFnZSBjbGFzcz1cIm91dGxpbmUtaW1nXCIgc3JjPVwiL3N0YXRpYy9waG90by9waG90bzcucG5nXCJcclxuXHRcdFx0XHRcdHN0eWxlPVwid2lkdGg6IDMxOHJweDsgaGVpZ2h0OiA2MzBycHg7XCI+PC9jb3Zlci1pbWFnZT5cclxuXHRcdFx0PC9jb3Zlci12aWV3PlxyXG5cdFx0XHQ8Y292ZXItdmlldyBjbGFzcz1cIm91dGxpbmUtYm94XCIgOnN0eWxlPVwieyB3aWR0aDogd2luZG93V2lkdGgsIGhlaWdodDogd2luZG93SGVpZ2h0IC0gODAgfVwiIHYtaWY9XCJ0eXBlID09IDdcIj5cclxuXHRcdFx0XHQ8Y292ZXItaW1hZ2UgY2xhc3M9XCJvdXRsaW5lLWltZ1wiIHNyYz1cIi9zdGF0aWMvcGhvdG8vcGhvdG84LnBuZ1wiXHJcblx0XHRcdFx0XHRzdHlsZT1cIndpZHRoOiAzMThycHg7IGhlaWdodDogNjMwcnB4O1wiPjwvY292ZXItaW1hZ2U+XHJcblx0XHRcdDwvY292ZXItdmlldz5cclxuXHRcdDwvdmlldz5cclxuXHJcblx0XHQ8dmlldyBjbGFzcz1cIm1lbnVcIj5cclxuXHRcdFx0PCEtLeW6lemDqOiPnOWNleWMuuWfn+iDjOaZry0tPlxyXG5cdFx0XHQ8Y292ZXItaW1hZ2UgY2xhc3M9XCJtZW51LW1hc2tcIiBzcmM9XCIvc3RhdGljL2xpdmUtY2FtZXJhL2Jhci5wbmdcIj48L2NvdmVyLWltYWdlPlxyXG5cclxuXHRcdFx0PCEtLei/lOWbnumUri0tPlxyXG5cdFx0XHQ8Y292ZXItaW1hZ2UgY2xhc3M9XCJtZW51LWJhY2tcIiBAdGFwPVwiYmFja1wiIHNyYz1cIi9zdGF0aWMvbGl2ZS1jYW1lcmEvYmFjay5wbmdcIj48L2NvdmVyLWltYWdlPlxyXG5cclxuXHRcdFx0PCEtLeW/q+mXqOmUri0tPlxyXG5cdFx0XHQ8Y292ZXItaW1hZ2UgY2xhc3M9XCJtZW51LXNuYXBzaG90XCIgQHRhcD1cInNuYXBzaG90XCIgc3JjPVwiL3N0YXRpYy9saXZlLWNhbWVyYS9zaHV0dGVyLnBuZ1wiPjwvY292ZXItaW1hZ2U+XHJcblxyXG5cdFx0XHQ8IS0t5Y+N6L2s6ZSuLS0+XHJcblx0XHRcdDxjb3Zlci1pbWFnZSBjbGFzcz1cIm1lbnUtZmxpcFwiIEB0YXA9XCJmbGlwXCIgc3JjPVwiL3N0YXRpYy9saXZlLWNhbWVyYS9mbGlwLnBuZ1wiPjwvY292ZXItaW1hZ2U+XHJcblx0XHQ8L3ZpZXc+XHJcblx0PC92aWV3PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuXHRsZXQgX3RoaXMgPSBudWxsO1xyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdGRhdGEoKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dHlwZTogMCxcclxuXHRcdFx0XHRkb3R5cGU6ICdpZHBob3RvJywgLy/mk43kvZznsbvlnotcclxuXHRcdFx0XHRtZXNzYWdlOiAnJywgLy/mj5DnpLpcclxuXHRcdFx0XHRhc3BlY3Q6ICcxOjEnLCAvL+avlOS+i1xyXG5cdFx0XHRcdGNhbWVyYVdpZHRoOiAnJywgLy/nm7jmnLrnlLvpnaLlrr3luqZcclxuXHRcdFx0XHRjYW1lcmFIZWlnaHQ6ICcnLCAvL+ebuOacuueUu+mdouWuveW6plxyXG5cdFx0XHRcdHdpbmRvd1dpZHRoOiAnJywgLy/lsY/luZXlj6/nlKjlrr3luqZcclxuXHRcdFx0XHR3aW5kb3dIZWlnaHQ6ICcnLCAvL+Wxj+W5leWPr+eUqOmrmOW6plxyXG5cdFx0XHRcdGNhbWVyYXN0YXRlOiBmYWxzZSwgLy/nm7jmnLrlh4blpIflpb3kuoZcclxuXHRcdFx0XHRsaXZlUHVzaGVyOiBudWxsLCAvL+a1geinhumikeWvueixoVxyXG5cdFx0XHRcdHNuYXBzaG90c3JjOiBudWxsLCAvL+W/q+eFp1xyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHRcdG9uTG9hZChlKSB7XHJcblx0XHRcdHRoaXMudHlwZSA9IGUudHlwZVxyXG5cdFx0XHRfdGhpcyA9IHRoaXM7XHJcblx0XHRcdGlmIChlLmRvdHlwZSAhPSB1bmRlZmluZWQpIHRoaXMuZG90eXBlID0gZS5kb3R5cGU7XHJcblx0XHRcdHRoaXMuaW5pdENhbWVyYSgpO1xyXG5cdFx0fSxcclxuXHRcdG9uUmVhZHkoKSB7XHJcblx0XHRcdHRoaXMubGl2ZVB1c2hlciA9IHVuaS5jcmVhdGVMaXZlUHVzaGVyQ29udGV4dCgnbGl2ZVB1c2hlcicsIHRoaXMpO1xyXG5cdFx0XHQvLyBzZXRUaW1lb3V0KCgpPT57XHJcblx0XHRcdHRoaXMuc3RhcnRQcmV2aWV3KCk7IC8v5byA5ZCv6aKE6KeI5bm26K6+572u5pGE5YOP5aS0XHJcblx0XHRcdHRoaXMucG9lbkNhcm1lKCk7XHJcblx0XHRcdC8vIH0sNTAwKVxyXG5cdFx0fSxcclxuXHRcdG1ldGhvZHM6IHtcclxuXHRcdFx0Ly/ova7or6LmiZPlvIBcclxuXHRcdFx0cG9lbkNhcm1lKCkge1xyXG5cdFx0XHRcdC8vI2lmZGVmIEFQUC1QTFVTXHJcblx0XHRcdFx0aWYgKHBsdXMub3MubmFtZSA9PSAnQW5kcm9pZCcgfHwgcGx1cy5vcy5uYW1lID09ICdpT1MnKSB7XHJcblx0XHRcdFx0XHR0aGlzLnBvZW5DYXJtZUludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKF90aGlzLmNhbWVyYXN0YXRlKTtcclxuXHRcdFx0XHRcdFx0aWYgKCFfdGhpcy5jYW1lcmFzdGF0ZSkgX3RoaXMuc3RhcnRQcmV2aWV3KCk7XHJcblx0XHRcdFx0XHR9LCAyNTAwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gZWxzZXtcclxuXHRcdFx0XHQvLyBcdGxldCBwb2VuQ2FybWVJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vIFx0XHRjb25zb2xlLmxvZyhfdGhpcy5vcGVuQ2FtZXJhU3RhdHVzKTtcclxuXHRcdFx0XHQvLyBcdFx0aWYgKF90aGlzLm9wZW5DYW1lcmFTdGF0dXMpIHtcclxuXHRcdFx0XHQvLyBcdFx0XHRjbGVhckludGVydmFsKHBvZW5DYXJtZUludGVydmFsKVxyXG5cdFx0XHRcdC8vIFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHQvLyBcdFx0fVxyXG5cdFx0XHRcdC8vIFx0XHRfdGhpcy5zdGFydFByZXZpZXcoKTtcclxuXHRcdFx0XHQvLyBcdH0sIDEwMDApO1xyXG5cdFx0XHRcdC8vIH1cclxuXHRcdFx0XHQvLyNlbmRpZlxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly/liJ3lp4vljJbnm7jmnLpcclxuXHRcdFx0aW5pdENhbWVyYSgpIHtcclxuXHRcdFx0XHR1bmkuZ2V0U3lzdGVtSW5mbyh7XHJcblx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2cocmVzKVxyXG5cdFx0XHRcdFx0XHRfdGhpcy53aW5kb3dXaWR0aCA9IHJlcy53aW5kb3dXaWR0aDtcclxuXHRcdFx0XHRcdFx0X3RoaXMud2luZG93SGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodDtcclxuXHRcdFx0XHRcdFx0X3RoaXMuY2FtZXJhV2lkdGggPSByZXMud2luZG93V2lkdGg7XHJcblx0XHRcdFx0XHRcdF90aGlzLmNhbWVyYUhlaWdodCA9IHJlcy53aW5kb3dXaWR0aDtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvL+W8gOWni+mihOiniFxyXG5cdFx0XHRzdGFydFByZXZpZXcoKSB7XHJcblx0XHRcdFx0dGhpcy5saXZlUHVzaGVyLnN0YXJ0UHJldmlldyh7XHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoYSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhhKTtcclxuXHRcdFx0XHRcdFx0X3RoaXMuY2FtZXJhc3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Ly/lgZzmraLpooTop4hcclxuXHRcdFx0c3RvcFByZXZpZXcoKSB7XHJcblx0XHRcdFx0dGhpcy5saXZlUHVzaGVyLnN0b3BQcmV2aWV3KHtcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChhKSA9PiB7XHJcblx0XHRcdFx0XHRcdF90aGlzLmNhbWVyYXN0YXRlID0gZmFsc2U7IC8v5qCH6K6w55u45py65pyq5ZCv5YqoXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly/nirbmgIFcclxuXHRcdFx0c3RhdGVjaGFuZ2UoZSkge1xyXG5cdFx0XHRcdC8v54q25oCB5pS55Y+YXHJcblx0XHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHRcdFx0aWYgKGUuZGV0YWlsLmNvZGUgPT0gMTAwNykge1xyXG5cdFx0XHRcdFx0X3RoaXMuY2FtZXJhc3RhdGUgPSB0cnVlO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZS5kZXRhaWwuY29kZSA9PSAtMTMwMSkge1xyXG5cdFx0XHRcdFx0X3RoaXMuY2FtZXJhc3RhdGUgPSBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHQvL+i/lOWbnlxyXG5cdFx0XHRiYWNrKCkge1xyXG5cdFx0XHRcdHVuaS5uYXZpZ2F0ZUJhY2soKTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8v5oqT5ouNXHJcblx0XHRcdHNuYXBzaG90KCkge1xyXG5cdFx0XHRcdHRoaXMubGl2ZVB1c2hlci5zbmFwc2hvdCh7XHJcblx0XHRcdFx0XHRzdWNjZXNzOiAoZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlKVxyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhlLm1lc3NhZ2UudGVtcEltYWdlUGF0aCk7XHJcblxyXG5cdFx0XHRcdFx0XHRfdGhpcy5zbmFwc2hvdHNyYyA9ICdmaWxlOi8nICsgZS5tZXNzYWdlLnRlbXBJbWFnZVBhdGg7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKF90aGlzLnNuYXBzaG90c3JjKTtcclxuXHRcdFx0XHRcdFx0Ly8gdW5pLnNhdmVGaWxlKHtcclxuXHRcdFx0XHRcdFx0Ly8gXHR0ZW1wRmlsZVBhdGg6IF90aGlzLnNuYXBzaG90c3JjLFxyXG5cdFx0XHRcdFx0XHQvLyBcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuXHRcdFx0XHRcdFx0Ly8gXHRcdHZhciBzYXZlZEZpbGVQYXRoID0gcmVzLnNhdmVkRmlsZVBhdGg7XHJcblx0XHRcdFx0XHRcdC8vIFx0XHRjb25zb2xlLmxvZygnc2F2ZWRGaWxlUGF0aCcsIHNhdmVkRmlsZVBhdGgpO1xyXG5cdFx0XHRcdFx0XHQvLyBcdFx0X3RoaXMuc25hcHNob3RzcmMgPSBzYXZlZEZpbGVQYXRoXHJcblx0XHRcdFx0XHRcdC8vIFx0XHRfdGhpcy5zdG9wUHJldmlldygpO1xyXG5cdFx0XHRcdFx0XHQvLyBcdFx0X3RoaXMuc2V0SW1hZ2UoKTtcclxuXHRcdFx0XHRcdFx0Ly8gXHRcdHVuaS5uYXZpZ2F0ZUJhY2soKTtcclxuXHRcdFx0XHRcdFx0Ly8gXHR9LFxyXG5cdFx0XHRcdFx0XHQvLyBcdGZhaWw6IChlcnIpID0+IHtcclxuXHRcdFx0XHRcdFx0Ly8gXHRcdGNvbnNvbGUubG9nKCdlcnInLCBlcnIpO1xyXG5cdFx0XHRcdFx0XHQvLyBcdH0sXHJcblx0XHRcdFx0XHRcdC8vIH0pO1xyXG5cdFx0XHRcdFx0XHRfdGhpcy5zdG9wUHJldmlldygpO1xyXG5cdFx0XHRcdFx0XHRfdGhpcy5zZXRJbWFnZSgpO1xyXG5cdFx0XHRcdFx0XHR1bmkubmF2aWdhdGVCYWNrKCk7XHJcblxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdC8v5Y+N6L2sXHJcblx0XHRcdGZsaXAoKSB7XHJcblx0XHRcdFx0dGhpcy5saXZlUHVzaGVyLnN3aXRjaENhbWVyYSgpO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Ly/orr7nva5cclxuXHRcdFx0c2V0SW1hZ2UoKSB7XHJcblx0XHRcdFx0bGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcblx0XHRcdFx0bGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07IC8v5LiK5LiA5Liq6aG16Z2iXHJcblx0XHRcdFx0Y29uc29sZS5sb2cocHJldlBhZ2UsICfkuIrkuIDkuKrpobXpnaInKTtcclxuXHRcdFx0XHQvL+ebtOaOpeiwg+eUqOS4iuS4gOS4qumhtemdoueahHNldEltYWdlKCnmlrnms5XvvIzmiormlbDmja7lrZjliLDkuIrkuIDkuKrpobXpnaLkuK3ljrtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhfdGhpcy5zbmFwc2hvdHNyYywgJ190aGlzLnNuYXBzaG90c3JjJyk7XHJcblx0XHRcdFx0cHJldlBhZ2UuJHZtLnNldEltYWdlKHtcclxuXHRcdFx0XHRcdHBhdGg6IF90aGlzLnNuYXBzaG90c3JjLFxyXG5cdFx0XHRcdFx0ZG90eXBlOiB0aGlzLmRvdHlwZVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9O1xyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxyXG5cdC5saXZlLWNhbWVyYSB7XHJcblx0XHQucHJldmlldyB7XHJcblx0XHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdFx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuXHRcdFx0Lm91dGxpbmUtYm94IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiAwO1xyXG5cdFx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdFx0Ym90dG9tOiAwO1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5O1xyXG5cdFx0XHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0XHRcdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblxyXG5cdFx0XHRcdC5vdXRsaW5lLWltZyB7XHJcblx0XHRcdFx0XHR3aWR0aDogNTAwcnB4O1xyXG5cdFx0XHRcdFx0aGVpZ2h0OiA3NTBycHg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQucmVtaW5kIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0dG9wOiA4ODBycHg7XHJcblx0XHRcdFx0d2lkdGg6IDc1MHJweDtcclxuXHRcdFx0XHR6LWluZGV4OiAxMDA7XHJcblx0XHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcblx0XHRcdFx0LnJlbWluZC10ZXh0IHtcclxuXHRcdFx0XHRcdGNvbG9yOiAjZGRkZGRkO1xyXG5cdFx0XHRcdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Lm1lbnUge1xyXG5cdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdGxlZnQ6IDA7XHJcblx0XHRcdGJvdHRvbTogMDtcclxuXHRcdFx0d2lkdGg6IDc1MHJweDtcclxuXHRcdFx0aGVpZ2h0OiAxODBycHg7XHJcblx0XHRcdHotaW5kZXg6IDk4O1xyXG5cdFx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcblx0XHRcdC5tZW51LW1hc2sge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdFx0XHRsZWZ0OiAwO1xyXG5cdFx0XHRcdGJvdHRvbTogMDtcclxuXHRcdFx0XHR3aWR0aDogNzUwcnB4O1xyXG5cdFx0XHRcdGhlaWdodDogMTgwcnB4O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk4O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubWVudS1iYWNrIHtcclxuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdFx0bGVmdDogMzBycHg7XHJcblx0XHRcdFx0Ym90dG9tOiA1MHJweDtcclxuXHRcdFx0XHR3aWR0aDogODBycHg7XHJcblx0XHRcdFx0aGVpZ2h0OiA4MHJweDtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTtcclxuXHRcdFx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdFx0XHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQubWVudS1zbmFwc2hvdCB7XHJcblx0XHRcdFx0d2lkdGg6IDEzMHJweDtcclxuXHRcdFx0XHRoZWlnaHQ6IDEzMHJweDtcclxuXHRcdFx0XHR6LWluZGV4OiA5OTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Lm1lbnUtZmxpcCB7XHJcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0XHRcdHJpZ2h0OiAzMHJweDtcclxuXHRcdFx0XHRib3R0b206IDUwcnB4O1xyXG5cdFx0XHRcdHdpZHRoOiA4MHJweDtcclxuXHRcdFx0XHRoZWlnaHQ6IDgwcnB4O1xyXG5cdFx0XHRcdHotaW5kZXg6IDk5O1xyXG5cdFx0XHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0XHRcdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbjwvc3R5bGU+Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///9\n");

/***/ }),
/* 10 */
/*!*********************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatLog;
exports.log = log;
function typof(v) {
  var s = Object.prototype.toString.call(v);
  return s.substring(8, s.length - 1);
}
function isDebugMode() {
  /* eslint-disable no-undef */
  return typeof __channelId__ === 'string' && __channelId__;
}
function jsonStringifyReplacer(k, p) {
  switch (typof(p)) {
    case 'Function':
      return 'function() { [native code] }';
    default:
      return p;
  }
}
function log(type) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  console[type].apply(console, args);
}
function formatLog() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var type = args.shift();
  if (isDebugMode()) {
    args.push(args.pop().replace('at ', 'uni-app:///'));
    return console[type].apply(console, args);
  }
  var msgs = args.map(function (v) {
    var type = Object.prototype.toString.call(v).toLowerCase();
    if (type === '[object object]' || type === '[object array]') {
      try {
        v = '---BEGIN:JSON---' + JSON.stringify(v, jsonStringifyReplacer) + '---END:JSON---';
      } catch (e) {
        v = type;
      }
    } else {
      if (v === null) {
        v = '---NULL---';
      } else if (v === undefined) {
        v = '---UNDEFINED---';
      } else {
        var vType = typof(v).toUpperCase();
        if (vType === 'NUMBER' || vType === 'BOOLEAN') {
          v = '---BEGIN:' + vType + '---' + v + '---END:' + vType + '---';
        } else {
          v = String(v);
        }
      }
    }
    return v;
  });
  var msg = '';
  if (msgs.length > 1) {
    var lastMsg = msgs.pop();
    msg = msgs.join('---COMMA---');
    if (lastMsg.indexOf(' at ') === 0) {
      msg += lastMsg;
    } else {
      msg += '---COMMA---' + lastMsg;
    }
  } else {
    msg = msgs[0];
  }
  console[type](msg);
}

/***/ }),
/* 11 */
/*!**************************************************************************************************************!*\
  !*** /Users/0821a/Desktop/YouXianji/pages/idphoto/idphoto.nvue?vue&type=style&index=0&lang=scss&mpType=page ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_style_index_0_lang_scss_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-1!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--11-oneOf-0-2!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--11-oneOf-0-3!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-4!../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./idphoto.nvue?vue&type=style&index=0&lang=scss&mpType=page */ 12);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_style_index_0_lang_scss_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_style_index_0_lang_scss_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_style_index_0_lang_scss_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_style_index_0_lang_scss_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_11_oneOf_0_2_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_11_oneOf_0_3_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_11_oneOf_0_4_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_idphoto_nvue_vue_type_style_index_0_lang_scss_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 12 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-1!./node_modules/postcss-loader/src??ref--11-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--11-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--11-oneOf-0-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!/Users/0821a/Desktop/YouXianji/pages/idphoto/idphoto.nvue?vue&type=style&index=0&lang=scss&mpType=page ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  ".preview": {
    ".live-camera ": {
      "justifyContent": [
        "center",
        0,
        1,
        12
      ],
      "alignItems": [
        "center",
        0,
        1,
        12
      ]
    }
  },
  ".outline-box": {
    ".live-camera .preview ": {
      "position": [
        "absolute",
        0,
        2,
        13
      ],
      "top": [
        0,
        0,
        2,
        13
      ],
      "left": [
        0,
        0,
        2,
        13
      ],
      "bottom": [
        0,
        0,
        2,
        13
      ],
      "zIndex": [
        99,
        0,
        2,
        13
      ],
      "alignItems": [
        "center",
        0,
        2,
        13
      ],
      "justifyContent": [
        "center",
        0,
        2,
        13
      ]
    }
  },
  ".outline-img": {
    ".live-camera .preview .outline-box ": {
      "width": [
        "500rpx",
        0,
        3,
        14
      ],
      "height": [
        "750rpx",
        0,
        3,
        14
      ]
    }
  },
  ".remind": {
    ".live-camera .preview ": {
      "position": [
        "absolute",
        0,
        2,
        15
      ],
      "top": [
        "880rpx",
        0,
        2,
        15
      ],
      "width": [
        "750rpx",
        0,
        2,
        15
      ],
      "zIndex": [
        100,
        0,
        2,
        15
      ],
      "alignItems": [
        "center",
        0,
        2,
        15
      ],
      "justifyContent": [
        "center",
        0,
        2,
        15
      ]
    }
  },
  ".remind-text": {
    ".live-camera .preview .remind ": {
      "color": [
        "#dddddd",
        0,
        3,
        16
      ],
      "fontWeight": [
        "bold",
        0,
        3,
        16
      ]
    }
  },
  ".menu": {
    ".live-camera ": {
      "position": [
        "absolute",
        0,
        1,
        17
      ],
      "left": [
        0,
        0,
        1,
        17
      ],
      "bottom": [
        0,
        0,
        1,
        17
      ],
      "width": [
        "750rpx",
        0,
        1,
        17
      ],
      "height": [
        "180rpx",
        0,
        1,
        17
      ],
      "zIndex": [
        98,
        0,
        1,
        17
      ],
      "alignItems": [
        "center",
        0,
        1,
        17
      ],
      "justifyContent": [
        "center",
        0,
        1,
        17
      ]
    }
  },
  ".menu-mask": {
    ".live-camera .menu ": {
      "position": [
        "absolute",
        0,
        2,
        18
      ],
      "left": [
        0,
        0,
        2,
        18
      ],
      "bottom": [
        0,
        0,
        2,
        18
      ],
      "width": [
        "750rpx",
        0,
        2,
        18
      ],
      "height": [
        "180rpx",
        0,
        2,
        18
      ],
      "zIndex": [
        98,
        0,
        2,
        18
      ]
    }
  },
  ".menu-back": {
    ".live-camera .menu ": {
      "position": [
        "absolute",
        0,
        2,
        19
      ],
      "left": [
        "30rpx",
        0,
        2,
        19
      ],
      "bottom": [
        "50rpx",
        0,
        2,
        19
      ],
      "width": [
        "80rpx",
        0,
        2,
        19
      ],
      "height": [
        "80rpx",
        0,
        2,
        19
      ],
      "zIndex": [
        99,
        0,
        2,
        19
      ],
      "alignItems": [
        "center",
        0,
        2,
        19
      ],
      "justifyContent": [
        "center",
        0,
        2,
        19
      ]
    }
  },
  ".menu-snapshot": {
    ".live-camera .menu ": {
      "width": [
        "130rpx",
        0,
        2,
        20
      ],
      "height": [
        "130rpx",
        0,
        2,
        20
      ],
      "zIndex": [
        99,
        0,
        2,
        20
      ]
    }
  },
  ".menu-flip": {
    ".live-camera .menu ": {
      "position": [
        "absolute",
        0,
        2,
        21
      ],
      "right": [
        "30rpx",
        0,
        2,
        21
      ],
      "bottom": [
        "50rpx",
        0,
        2,
        21
      ],
      "width": [
        "80rpx",
        0,
        2,
        21
      ],
      "height": [
        "80rpx",
        0,
        2,
        21
      ],
      "zIndex": [
        99,
        0,
        2,
        21
      ],
      "alignItems": [
        "center",
        0,
        2,
        21
      ],
      "justifyContent": [
        "center",
        0,
        2,
        21
      ]
    }
  },
  "@VERSION": 2
}

/***/ }),
/* 13 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })
/******/ ]);