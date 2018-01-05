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
	
	var _storage = __webpack_require__(2);
	
	function test() {
	  var data = {
	    directory: 'aa5418d7',
	    email: 'kondor_06@mail.ru',
	    lastLogin: '2018-01-05 22:03:12',
	    nickname: 'kds',
	    operator_id: 1,
	    token: '76720b2a0e7efc313648'
	  };
	
	  var data2 = {
	    directory: 'aa5418d7',
	    email: 'kondor_06@mail.ru',
	    nickname: 'kds',
	    operator_id: 1,
	    token: '76720b2a0e7efc313648'
	  };
	
	  (0, _storage.dataStorage)(data);
	
	  console.dir((0, _storage.dataStorage)());
	
	  (0, _storage.dataStorage)('clear');
	
	  (0, _storage.dataStorage)(data2);
	}
	// -----------------------------
	// // !!!!XHR TEST!!!!
	// // -------------
	// import {setXhrRequest} from './tools/xhr.js';
	// export function test() {
	//   let xhrSuccessCallback = function (response) {
	//     console.dir(response);
	//   };
	
	//   let xhrErrorCallback = function (error) {
	//     console.dir(error);
	//   };
	
	
	//   let par = {
	//     url: '/user_boss/login',
	//     metod: 'POST',
	//     data: 'email=kondor_06@mail.ru&deviceToken=-&password=Qwerty123#',
	//     callbackSuccess: xhrSuccessCallback,
	//     callbackError: xhrErrorCallback
	//   };
	
	//   setXhrRequest(par);
	// }
	// // -------------------------
	
	
	// !!!!STORAGE TRST!!!!
	// -----------------------

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var setStorage = function setStorage(data) {
	  sessionStorage.clear();
	  sessionStorage.setItem('directory', data.directory);
	  sessionStorage.setItem('email', data.email);
	  sessionStorage.setItem('lastLogin', data.lastLogin);
	  sessionStorage.setItem('nickname', data.nickname);
	  sessionStorage.setItem('operator_id', data.operator_id);
	  sessionStorage.setItem('token', data.token);
	};
	
	var getStorage = function getStorage() {
	  return {
	    directory: sessionStorage.getItem('directory'),
	    email: sessionStorage.getItem('email'),
	    lastLogin: sessionStorage.getItem('lastLogin'),
	    nickname: sessionStorage.getItem('nickname'),
	    operator_id: sessionStorage.getItem('operator_id'),
	    token: sessionStorage.getItem('token')
	  };
	};
	
	var isSet = function isSet() {
	  if (sessionStorage.getItem('directory') && sessionStorage.getItem('email') && sessionStorage.getItem('lastLogin') && sessionStorage.getItem('nickname') && sessionStorage.getItem('operator_id') && sessionStorage.getItem('token')) {
	    return true;
	  }
	  return false;
	};
	
	var isKey = function isKey(data) {
	  if (data['directory'] && data['email'] && data['lastLogin'] && data['nickname'] && data['operator_id'] && data['token']) {
	    return true;
	  }
	  return false;
	};
	
	var dataStorage = function dataStorage(data) {
	  if (!data) {
	
	    if (!isSet()) {
	      return false;
	    }
	
	    return getStorage();
	  }
	
	  if (data === 'clear') {
	    sessionStorage.clear();
	    return true;
	  }
	
	  console.log(isKey(data));
	  if (isKey(data)) {
	    setStorage(data);
	    return true;
	  }
	
	  sessionStorage.clear();
	  return false;
	};
	
	exports.dataStorage = dataStorage;

/***/ })
/******/ ]);
//# sourceMappingURL=block.js.map