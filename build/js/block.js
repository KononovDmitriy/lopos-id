/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _test = __webpack_require__(1);
	
	(0, _test.test)(); // import {setXhrRequest} from './tools/xhr.js';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.test = test;
	
	var _xhr = __webpack_require__(2);
	
	function test() {
	  var xhrSuccessCallback = function xhrSuccessCallback(response) {
	    console.dir(response);
	  };
	
	  var xhrErrorCallback = function xhrErrorCallback(error) {
	    console.dir(error);
	  };
	
	  var par = {
	    url: '/user_boss/login',
	    metod: 'POST',
	    data: 'email=donmixa@gmail.com&deviceToken=-&password=Pass_e116',
	    callbackSuccess: xhrSuccessCallback,
	    callbackError: xhrErrorCallback
	  };
	
	  (0, _xhr.setXhrRequest)(par);
	}
	// -------------------------
	
	
	// !!!!STORAGE TRST!!!!
	// -----------------------
	// import {dataStorage} from './tools/storage.js';
	
	// export function test() {
	//   let data = {
	//     directory: 'aa5418d7',
	//     email: 'kondor_06@mail.ru',
	//     lastLogin: '2018-01-05 22:03:12',
	//     nickname: 'kds',
	//     operator_id: 1,
	//     token: '76720b2a0e7efc313648'
	//   };
	
	//   let data2 = {
	//     directory: 'aa5418d7',
	//     email: 'kondor_06@mail.ru',
	//     nickname: 'kds',
	//     operator_id: 1,
	//     token: '76720b2a0e7efc313648'
	//   };
	
	
	//   dataStorage(data);
	
	//   console.dir(dataStorage());
	
	//   dataStorage('clear');
	
	//   dataStorage(data2);
	
	
	// }
	// // -----------------------------
	// !!!!XHR TEST!!!!
	// -------------

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setXhrRequest = setXhrRequest;
	function setXhrRequest(requestParameters) {
	
	  var ErrorAttr = {
	    FILE: 'xhr.js',
	    MESSADGE: {
	      JSON_ERR: 'XHR: JSON error converting response.',
	      LOAD_ERR: 'Load Error.',
	      CONNECT_ERR: 'Connection error.',
	      TIMEOUT_ERR: 'Сonnection timeout exceeded'
	    }
	  };
	
	  var getError = function getError(messadge, row, error) {
	    var newError = new SyntaxError(messadge, ErrorAttr.FILE, row);
	    newError.cause = error;
	    return newError;
	  };
	
	  var xhr = new XMLHttpRequest();
	
	  xhr.addEventListener('load', function () {
	
	    if (xhr.status === 200) {
	      var response = '';
	
	      try {
	        console.log(xhr.response);
	        response = JSON.parse(xhr.response);
	      } catch (error) {
	        requestParameters.callbackError(getError(ErrorAttr.MESSADGE.JSON_ERR, 26, error));
	      }
	
	      requestParameters.callbackSuccess(response);
	    } else {
	      requestParameters.callbackError(getError(ErrorAttr.MESSADGE.LOAD_ERR + ' ' + xhr.statusText, 35, ''));
	    }
	  });
	
	  xhr.addEventListener('error', function () {
	    requestParameters.callbackError(getError(ErrorAttr.MESSADGE.CONNECT_ERR + ' ' + xhr.statusText, 42, ''));
	  });
	
	  xhr.addEventListener('timeout', function () {
	    requestParameters.callbackError(getError(ErrorAttr.MESSADGE.CONNECT_ERR + ' (' + xhr.timeout + 'ms.)', 50, ''));
	  });
	
	  xhr.timeout = window.appSettings.xhrSettings.timeout;
	  xhr.open(requestParameters.metod, window.appSettings.xhrSettings.urlApi + requestParameters.url, true);
	  xhr.setRequestHeader('Content-Type', window.appSettings.xhrSettings.contentType);
	
	  if (requestParameters.metod === 'GET') {
	    requestParameters.data = '';
	  }
	
	  xhr.send(requestParameters.data);
	}

/***/ })
/******/ ]);
//# sourceMappingURL=block.js.map