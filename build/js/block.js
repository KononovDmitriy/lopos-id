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
	
	var _main_login_window = __webpack_require__(1);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_main_login_window2.default.firstScreen(); // import {setXhrRequest} from './tools/xhr.js';
	// import {dataStorage} from './tools/storage.js';
	// import {test} from './test.js';
	// test();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _form_login = __webpack_require__(2);
	
	var _form_login2 = _interopRequireDefault(_form_login);
	
	var _form_register = __webpack_require__(7);
	
	var _form_register2 = _interopRequireDefault(_form_register);
	
	var _form_confirm_email = __webpack_require__(9);
	
	var _form_confirm_email2 = _interopRequireDefault(_form_confirm_email);
	
	var _form_forgot = __webpack_require__(11);
	
	var _form_forgot2 = _interopRequireDefault(_form_forgot);
	
	var _captcha = __webpack_require__(6);
	
	var _captcha2 = _interopRequireDefault(_captcha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sectionLoginFormMain = document.querySelector('#sectionLoginFormMain');
	
	console.log('v27');
	
	_captcha2.default.init();
	
	sectionLoginFormMain.addEventListener('change', function (event) {
	  event.target.setCustomValidity('');
	});
	
	exports.default = {
	  firstScreen: function firstScreen() {
	    _form_confirm_email2.default.reset();
	    _form_register2.default.reset();
	    _form_forgot2.default.reset();
	    _form_login2.default.reset();
	    _form_confirm_email2.default.hide();
	    _form_register2.default.hide();
	    _form_forgot2.default.hide();
	    _form_login2.default.show();
	  },
	  confirmEmail: function confirmEmail() {
	    _form_register2.default.hide();
	    _form_confirm_email2.default.show();
	  },
	  register: function register() {
	    _form_login2.default.hide();
	    _form_register2.default.show();
	  },
	  forgot: function forgot() {
	    _form_login2.default.hide();
	    _form_forgot2.default.show();
	  }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _main_login_window = __webpack_require__(1);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	var _login = __webpack_require__(3);
	
	var _login2 = _interopRequireDefault(_login);
	
	var _captcha = __webpack_require__(6);
	
	var _captcha2 = _interopRequireDefault(_captcha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sectionLogin = document.querySelector('#sectionLogin');
	var loginForm = sectionLogin.querySelector('#loginForm');
	var loginButtonRegister = loginForm.querySelector('#loginButtonRegister');
	var loginButtonForgot = loginForm.querySelector('#loginButtonForgot');
	var loginCaptcha = loginForm.querySelector('#loginCaptcha');
	
	var inputFields = {
	  'login': loginForm.querySelector('#loginInputLogin'),
	  'password': loginForm.querySelector('#loginInputPassword')
	};
	
	var captchaCount = 0;
	var captchaId = 'NO';
	var userLogin = void 0;
	
	var captchaCallback = function captchaCallback() {
	  console.log('loginCallback');
	  // captcha.catchaReset(captchaId);
	  _login2.default.submit(userLogin, inputFields.password.value);
	};
	
	loginForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	
	  userLogin = formatLogin(inputFields.login.value);
	
	  if (_login2.default.validate(userLogin, inputFields.password.value)) {
	
	    if (captchaId !== 'NO' && captchaCount >= 2) {
	      console.log('captchaEXEC');
	      _captcha2.default.captchaExec(captchaId);
	    } else {
	      console.log('SUBMIT');
	      _login2.default.submit(userLogin, inputFields.password.value);
	    }
	  }
	});
	
	var formatLogin = function formatLogin(userlogin) {
	  userlogin = userlogin.toLowerCase();
	  userlogin = userlogin.replace(/-/g, '');
	  return userlogin;
	};
	
	loginButtonRegister.addEventListener('click', function () {
	  _main_login_window2.default.register();
	});
	
	loginButtonForgot.addEventListener('click', function () {
	  _main_login_window2.default.forgot();
	});
	
	exports.default = {
	  setError: function setError(target, msg) {
	    inputFields[target].setCustomValidity(msg);
	  },
	  show: function show() {
	    sectionLogin.classList.remove('d-none');
	  },
	  hide: function hide() {
	    sectionLogin.classList.add('d-none');
	  },
	  reset: function reset() {
	    loginForm.reset();
	    inputFields.login.setCustomValidity('');
	    inputFields.password.setCustomValidity('');
	
	    if (captchaId !== 'NO') {
	      _captcha2.default.catchaReset(captchaId);
	    }
	  },
	  addCaptchaCount: function addCaptchaCount() {
	    captchaCount++;
	  },
	  setCaptcha: function setCaptcha() {
	    captchaId = _captcha2.default.getCaptcha(loginCaptcha, captchaCallback);
	    console.log('setCaptcha id = ' + captchaId);
	  }
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(4);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _storage = __webpack_require__(5);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _form_login = __webpack_require__(2);
	
	var _form_login2 = _interopRequireDefault(_form_login);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var validId = window.appSettings.loginValid.id;
	var validEmail = window.appSettings.loginValid.email;
	var validPassword = window.appSettings.loginValid.password;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	  console.dir(response);
	
	  _form_login2.default.addCaptchaCount();
	
	  if (response.status === 200) {
	    if (response.data.status === '0') {
	      alert('Ваш пользователь заблокирован, обратитесь к администратору');
	    } else {
	      _storage2.default.data = response.data;
	      // Загрузка приложения
	    }
	  } else {
	    // показ ошибки
	    alert(response.message);
	  }
	};
	
	var callbackXhrError = function callbackXhrError(response) {
	  alert('error');
	};
	
	var getRequestDataEmail = function getRequestDataEmail(userLogin, userPassword) {
	  var dataApi = 'email=' + userLogin + '&deviceToken=-&password=' + userPassword;
	  return {
	    url: window.appSettings.loginUrlApi.email,
	    metod: 'POST',
	    data: dataApi,
	    callbackSuccess: callbackXhrSuccess,
	    callbackError: callbackXhrError
	  };
	};
	
	var getRequestDataId = function getRequestDataId(userLogin, userPassword) {
	
	  var folder = userLogin.substr(0, 8);
	  var operator = userLogin.substr(8);
	
	  var urlApi = window.appSettings.loginUrlApi.id.replace('{{dir}}', folder);
	  var dataApi = 'operator=' + operator + '&deviceToken=-&password=' + userPassword;
	
	  return {
	    url: urlApi,
	    metod: 'POST',
	    data: dataApi,
	    callbackSuccess: callbackXhrSuccess,
	    callbackError: callbackXhrError
	  };
	};
	
	var validateData = function validateData(template, data) {
	
	  if (template.test(data)) {
	    return true;
	  }
	
	  return false;
	};
	
	var validateForm = function validateForm(userLogin, userPassword) {
	
	  var valid = true;
	
	  if (!validateData(validEmail, userLogin)) {
	    if (!validateData(validId, userLogin)) {
	      valid = false;
	      _form_login2.default.setError('login', 'Неверный формат логина');
	    }
	  }
	
	  if (!validateData(validPassword, userPassword)) {
	    valid = false;
	    _form_login2.default.setError('password', 'Пароль должен быть длиннее 3-х символов');
	  }
	
	  return valid;
	};
	
	var submitForm = function submitForm(userLogin, userPassword, isEmail) {
	  if (validateData(validEmail, userLogin)) {
	    _xhr2.default.request = getRequestDataEmail(userLogin, userPassword);
	  } else {
	    _xhr2.default.request = getRequestDataId(userLogin, userPassword);
	  }
	};
	
	exports.default = {
	  submit: function submit(login, password) {
	    submitForm(login, password);
	  },
	  validate: function validate(login, password) {
	    return validateForm(login, password);
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	
	  set request(requestParameters) {
	
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
	
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	
	  // заполняем хранилище
	  set data(loadedData) {
	    console.log(loadedData);
	    sessionStorage.setItem('nickname', loadedData.nickname);
	    sessionStorage.setItem('lastLogin', loadedData.lastLogin);
	    sessionStorage.setItem('email', loadedData.email);
	    sessionStorage.setItem('directory', loadedData.directory);
	    sessionStorage.setItem('operatorId', loadedData.operator_id);
	    sessionStorage.setItem('token', loadedData.token);
	  },
	
	  // возвращаем данные
	  get data() {
	    return {
	      nickname: sessionStorage.getItem('nickname'),
	      lastLogin: sessionStorage.getItem('lastLogin'),
	      directory: sessionStorage.getItem('directory'),
	      email: sessionStorage.getItem('email'),
	      operatorId: sessionStorage.getItem('operatorId'),
	      token: sessionStorage.getItem('userToken')
	    };
	  },
	
	  get isSetFlag() {
	    return Object.values(this.data).some(function (item) {
	      return item !== null;
	    });
	  },
	
	  // чистим хранилище
	  clean: function clean() {
	    sessionStorage.removeItem('nickname');
	    sessionStorage.removeItem('lastLogin');
	    sessionStorage.removeItem('directory');
	    sessionStorage.removeItem('email');
	    sessionStorage.removeItem('operatorId');
	    sessionStorage.removeItem('token');
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _form_register = __webpack_require__(7);
	
	var _form_register2 = _interopRequireDefault(_form_register);
	
	var _form_login = __webpack_require__(2);
	
	var _form_login2 = _interopRequireDefault(_form_login);
	
	var _form_confirm_email = __webpack_require__(9);
	
	var _form_confirm_email2 = _interopRequireDefault(_form_confirm_email);
	
	var _form_forgot = __webpack_require__(11);
	
	var _form_forgot2 = _interopRequireDefault(_form_forgot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  init: function init() {
	    window.captchaOnLoadCallback = function () {
	      console.log('Капча загружена');
	      window.captchaOnLoad = true;
	
	      _form_login2.default.setCaptcha();
	      _form_register2.default.setCaptcha();
	      _form_confirm_email2.default.setCaptcha();
	      _form_forgot2.default.setCaptcha();
	    };
	  },
	  captchaExec: function captchaExec(captchaId) {
	    window.grecaptcha.execute(captchaId);
	    console.log('капча выполнена');
	  },
	  catchaReset: function catchaReset(captchaId) {
	    window.grecaptcha.reset(captchaId);
	  },
	  getCaptcha: function getCaptcha(elementId, callback) {
	    return window.grecaptcha.render(elementId, {
	      'size': 'invisible',
	      'sitekey': window.appSettings.reCaptchaSiteKey,
	      'callback': callback
	    });
	  }
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _main_login_window = __webpack_require__(1);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	var _register = __webpack_require__(8);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _captcha = __webpack_require__(6);
	
	var _captcha2 = _interopRequireDefault(_captcha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sectionRegister = document.querySelector('#sectionRegister');
	var registerForm = sectionRegister.querySelector('#registerForm');
	var registerButtonCancel = registerForm.querySelector('#registerButtonCancel');
	var registerUserAgreement = document.querySelector('#registerUserAgreement');
	var registerCaptcha = sectionRegister.querySelector('#registerCaptcha');
	
	var inputFields = {
	  'name': registerForm.querySelector('#registerInputName'),
	  'email': registerForm.querySelector('#registerInputEmail'),
	  'password': registerForm.querySelector('#registerInputPassword'),
	  'confirm': registerForm.querySelector('#registerInputConfirmPassword')
	};
	
	var captchaId = 'NO';
	
	var captchaCallback = function captchaCallback() {
	  console.log('registerCallback');
	  _register2.default.submit(inputFields.name.value, inputFields.email.value, inputFields.password.value);
	};
	
	registerForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	
	  if (_register2.default.validate(inputFields.name.value, inputFields.email.value, inputFields.password.value, inputFields.confirm.value, registerUserAgreement.checked)) {
	
	    if (captchaId !== 'NO') {
	      console.log('captchaEXEC');
	      _captcha2.default.captchaExec(captchaId);
	    } else {
	      console.log('SUBMIT');
	      _register2.default.submit(inputFields.name.value, inputFields.email.value, inputFields.password.value);
	    }
	  }
	});
	
	registerButtonCancel.addEventListener('click', function () {
	  _main_login_window2.default.firstScreen();
	});
	
	exports.default = {
	  setError: function setError(target, msg) {
	    inputFields[target].setCustomValidity(msg);
	  },
	  show: function show() {
	    sectionRegister.classList.remove('d-none');
	  },
	  hide: function hide() {
	    sectionRegister.classList.add('d-none');
	  },
	  reset: function reset() {
	    registerForm.reset();
	    inputFields.name.setCustomValidity('');
	    inputFields.email.setCustomValidity('');
	    inputFields.password.setCustomValidity('');
	    inputFields.confirm.setCustomValidity('');
	
	    if (captchaId !== 'NO') {
	      _captcha2.default.catchaReset(captchaId);
	    }
	  },
	  submitForm: function submitForm() {
	    _register2.default.submit(inputFields.name.value, inputFields.email.value, inputFields.password.value, inputFields.confirm.value, registerUserAgreement.checked);
	  },
	  setCaptcha: function setCaptcha() {
	    captchaId = _captcha2.default.getCaptcha(registerCaptcha, captchaCallback);
	    console.log('setCaptcha id = ' + captchaId);
	  }
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _main_login_window = __webpack_require__(1);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	var _xhr = __webpack_require__(4);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _form_register = __webpack_require__(7);
	
	var _form_register2 = _interopRequireDefault(_form_register);
	
	var _captcha = __webpack_require__(6);
	
	var _captcha2 = _interopRequireDefault(_captcha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var regVal = window.appSettings.registerValid;
	var regUrlApi = window.appSettings.registerUrlApi;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	  console.dir(response);
	
	  switch (response.status) {
	
	    case 200:
	      _main_login_window2.default.confirmEmail();
	      break;
	    case 400:
	      alert(response.message);
	      break;
	  }
	};
	
	var callbackXhrError = function callbackXhrError(response) {
	  alert('error');
	};
	
	var validateName = function validateName(name) {
	
	  if (regVal.name.test(name)) {
	    return true;
	  }
	  return false;
	};
	
	var validateEmail = function validateEmail(email) {
	
	  if (regVal.email.test(email)) {
	    return true;
	  }
	  return false;
	};
	
	var validatePassword = function validatePassword(password) {
	
	  if (regVal.password.test(password)) {
	    return true;
	  }
	  return false;
	};
	
	var validateConfirm = function validateConfirm(password, confirm) {
	
	  if (password !== confirm || confirm === '') {
	    return false;
	  }
	  return true;
	};
	
	var validateForm = function validateForm(name, email, password, confirm, userAgreement) {
	  var valid = true;
	
	  if (!validateName(name)) {
	    _form_register2.default.setError('name', 'Имя!');
	    valid = false;
	  }
	
	  if (!validateEmail(email)) {
	    _form_register2.default.setError('email', 'Почта!');
	    valid = false;
	  }
	
	  if (!validatePassword(password)) {
	    _form_register2.default.setError('password', 'Пароль!');
	    valid = false;
	  }
	
	  if (!validateConfirm(password, confirm)) {
	    _form_register2.default.setError('confirm', 'Не совпадает!');
	    valid = false;
	  }
	
	  if (!userAgreement) {
	    alert('Соглашение!');
	    valid = false;
	  }
	
	  return valid;
	};
	
	var getRequestData = function getRequestData(name, email, password) {
	  var requestData = 'email=' + email + '&phone=&password=' + password + '&nickname=' + name + '&prefer_language=ru';
	  return {
	    url: regUrlApi,
	    metod: 'POST',
	    data: requestData,
	    callbackSuccess: callbackXhrSuccess,
	    callbackError: callbackXhrError
	  };
	};
	
	var submitForm = function submitForm(name, email, password) {
	  _xhr2.default.request = getRequestData(name, email, password);
	};
	
	exports.default = {
	  submit: function submit(name, email, password) {
	    submitForm(name, email, password);
	  },
	  validate: function validate(name, email, password, confirm, userAgreement) {
	    return validateForm(name, email, password, confirm, userAgreement);
	  }
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _main_login_window = __webpack_require__(1);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	var _confirm_email = __webpack_require__(10);
	
	var _confirm_email2 = _interopRequireDefault(_confirm_email);
	
	var _captcha = __webpack_require__(6);
	
	var _captcha2 = _interopRequireDefault(_captcha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sectionConfirmEmail = document.querySelector('#sectionConfirmEmail');
	var emailConfirmForm = sectionConfirmEmail.querySelector('#emailConfirmForm');
	var emailConfirmInputKey = emailConfirmForm.querySelector('#emailConfirmInputKey');
	var emailConfirmButtonCancel = emailConfirmForm.querySelector('#emailConfirmButtonCancel');
	var emailConfirmCaptcha = sectionConfirmEmail.querySelector('#emailConfirmCaptcha');
	
	var registerInputEmail = document.querySelector('#registerInputEmail');
	
	var captchaId = 'NO';
	
	var captchaCallback = function captchaCallback() {
	  console.log('registerCallback');
	  _confirm_email2.default.submit(emailConfirmInputKey.value, registerInputEmail.value);
	};
	
	emailConfirmForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	
	  if (_confirm_email2.default.validate(emailConfirmInputKey.value)) {
	
	    if (captchaId !== 'NO') {
	      console.log('captchaEXEC');
	      _captcha2.default.captchaExec(captchaId);
	    } else {
	      console.log('SUBMIT');
	      _confirm_email2.default.submit(emailConfirmInputKey.value, registerInputEmail.value);
	    }
	  }
	});
	
	emailConfirmButtonCancel.addEventListener('click', function () {
	  _main_login_window2.default.firstScreen();
	});
	
	exports.default = {
	  setError: function setError(msg) {
	    emailConfirmInputKey.setCustomValidity(msg);
	  },
	  show: function show() {
	    sectionConfirmEmail.classList.remove('d-none');
	  },
	  hide: function hide() {
	    sectionConfirmEmail.classList.add('d-none');
	  },
	  reset: function reset() {
	    emailConfirmForm.reset();
	    emailConfirmInputKey.setCustomValidity('');
	  },
	  submitForm: function submitForm() {
	    _confirm_email2.default.submit(emailConfirmInputKey.value, registerInputEmail.value);
	  },
	  setCaptcha: function setCaptcha() {
	    captchaId = _captcha2.default.getCaptcha(emailConfirmCaptcha, captchaCallback);
	    console.log('setCaptcha id = ' + captchaId);
	  }
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(4);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _form_confirm_email = __webpack_require__(9);
	
	var _form_confirm_email2 = _interopRequireDefault(_form_confirm_email);
	
	var _storage = __webpack_require__(5);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var kodVal = window.appSettings.confirmEmailKodValid;
	var urlApi = window.appSettings.confirmEmailUrlApi;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	
	  if (response.status === 200) {
	    if (response.data.status === '0') {
	      alert('Ваш пользователь заблокирован, обратитесь к администратору');
	      // сброс на страницу загрузки
	    } else {
	      _storage2.default.data = response.data;
	      // Загрузка приложения
	    }
	  } else {
	    // показ ошибки
	    alert(response.message);
	  }
	};
	
	var callbackXhrError = function callbackXhrError(response) {
	  // показ ошибки
	  alert('error');
	};
	
	var validateForm = function validateForm(kod) {
	
	  if (kodVal.test(kod)) {
	    return true;
	  }
	  _form_confirm_email2.default.setError('Неверный формат кода!');
	  return false;
	};
	
	var getRequestData = function getRequestData(kod, email) {
	
	  var requestData = 'email=' + email + '&validate_code=' + kod + '&preferable_language=ru';
	  return {
	    url: urlApi,
	    metod: 'POST',
	    data: requestData,
	    callbackSuccess: callbackXhrSuccess,
	    callbackError: callbackXhrError
	  };
	};
	
	var submitForm = function submitForm(kod, email) {
	  _xhr2.default.request = getRequestData(kod, email);
	};
	
	exports.default = {
	  submit: function submit(kod, email) {
	    submitForm(kod, email);
	  },
	  validate: function validate(kod) {
	    return validateForm(kod);
	  }
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _main_login_window = __webpack_require__(1);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	var _forgot = __webpack_require__(12);
	
	var _forgot2 = _interopRequireDefault(_forgot);
	
	var _captcha = __webpack_require__(6);
	
	var _captcha2 = _interopRequireDefault(_captcha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sectionForgot = document.querySelector('#sectionForgot');
	var forgotForm = sectionForgot.querySelector('#forgotForm');
	var forgotInputEmail = forgotForm.querySelector('#forgotInputEmail');
	var forgotButtonCancel = forgotForm.querySelector('#forgotButtonCancel');
	
	var forgotCaptcha = forgotForm.querySelector('#forgotCaptcha');
	
	var captchaId = 'NO';
	
	var captchaCallback = function captchaCallback() {
	  console.log('registerCallback');
	  _forgot2.default.submit(forgotInputEmail.value);
	};
	
	forgotForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	
	  if (_forgot2.default.validate(forgotInputEmail.value)) {
	
	    if (captchaId !== 'NO') {
	      console.log('captchaEXEC');
	      _captcha2.default.captchaExec(captchaId);
	    } else {
	      console.log('SUBMIT');
	      _forgot2.default.submit(forgotInputEmail.value);
	    }
	  }
	});
	
	forgotButtonCancel.addEventListener('click', function () {
	  _main_login_window2.default.firstScreen();
	});
	
	exports.default = {
	  setError: function setError(msg) {
	    forgotInputEmail.setCustomValidity(msg);
	  },
	  show: function show() {
	    sectionForgot.classList.remove('d-none');
	  },
	  hide: function hide() {
	    sectionForgot.classList.add('d-none');
	  },
	  reset: function reset() {
	    forgotForm.reset();
	    forgotInputEmail.setCustomValidity('');
	  },
	  submitForm: function submitForm() {
	    _forgot2.default.submit(forgotInputEmail.value);
	  },
	  setCaptcha: function setCaptcha() {
	    captchaId = _captcha2.default.getCaptcha(forgotCaptcha, captchaCallback);
	    console.log('setCaptcha id = ' + captchaId);
	  }
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _main_login_window = __webpack_require__(1);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	var _xhr = __webpack_require__(4);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _form_forgot = __webpack_require__(11);
	
	var _form_forgot2 = _interopRequireDefault(_form_forgot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var emailVal = window.appSettings.forgotEmailValid;
	var urlApi = window.appSettings.forgotUrlApi;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	  console.dir(response);
	
	  if (response.status === 400) {
	    alert(response.message);
	    _main_login_window2.default.firstScreen();
	  } else {
	    // показ ошибки
	    alert('Ошибка восстановления пароля');
	  }
	};
	
	var callbackXhrError = function callbackXhrError(response) {
	  // показ ошибки
	  alert('error');
	};
	
	var validateForm = function validateForm(email) {
	
	  if (emailVal.test(email)) {
	    return true;
	  }
	  _form_forgot2.default.setError('Введите корректный email');
	  return false;
	};
	
	var getRequestData = function getRequestData(email) {
	
	  var requestData = 'email=' + email;
	  return {
	    url: urlApi,
	    metod: 'POST',
	    data: requestData,
	    callbackSuccess: callbackXhrSuccess,
	    callbackError: callbackXhrError
	  };
	};
	
	var submitForm = function submitForm(email) {
	  _xhr2.default.request = getRequestData(email);
	};
	
	exports.default = {
	  submit: function submit(email) {
	    submitForm(email);
	  },
	  validate: function validate(email) {
	    return validateForm(email);
	  }
	};

/***/ })
/******/ ]);
//# sourceMappingURL=block.js.map