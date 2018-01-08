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
	
	var _captcha = __webpack_require__(1);
	
	var _captcha2 = _interopRequireDefault(_captcha);
	
	var _form_login = __webpack_require__(2);
	
	var _form_login2 = _interopRequireDefault(_form_login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	window.captchaOnLoad = function () {
	  console.log('Капча загружена');
	};
	
	exports.default = {
	  captchaCallback: function captchaCallback() {}
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _login = __webpack_require__(3);
	
	var _login2 = _interopRequireDefault(_login);
	
	var _register = __webpack_require__(6);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _confirm_email = __webpack_require__(7);
	
	var _confirm_email2 = _interopRequireDefault(_confirm_email);
	
	var _forgot = __webpack_require__(8);
	
	var _forgot2 = _interopRequireDefault(_forgot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sectionLoginFormMain = document.querySelector('#sectionLoginFormMain');
	
	var sectionLogin = sectionLoginFormMain.querySelector('#sectionLogin');
	var loginForm = sectionLogin.querySelector('#loginForm');
	var loginButtonRegister = loginForm.querySelector('#loginButtonRegister');
	var loginInputLogin = loginForm.querySelector('#loginInputLogin');
	var loginInputPassword = loginForm.querySelector('#loginInputPassword');
	var loginCaptcha = loginForm.querySelector('#loginCaptcha');
	var loginButtonForgot = loginForm.querySelector('#loginButtonForgot');
	
	var sectionRegister = sectionLoginFormMain.querySelector('#sectionRegister');
	var registerForm = sectionRegister.querySelector('#registerForm');
	var registerButtonCancel = registerForm.querySelector('#registerButtonCancel');
	var registerInputName = registerForm.querySelector('#registerInputName');
	var registerInputEmail = registerForm.querySelector('#registerInputEmail');
	var registerInputPassword = registerForm.querySelector('#registerInputPassword');
	var registerInputConfirmPassword = registerForm.querySelector('#registerInputConfirmPassword');
	var registerUserAgreement = sectionLoginFormMain.querySelector('#registerUserAgreement');
	
	var sectionConfirmEmail = sectionLoginFormMain.querySelector('#sectionConfirmEmail');
	var emailConfirmForm = sectionConfirmEmail.querySelector('#emailConfirmForm');
	var emailConfirmInputKey = emailConfirmForm.querySelector('#emailConfirmInputKey');
	var emailConfirmButtonCancel = emailConfirmForm.querySelector('#emailConfirmButtonCancel');
	
	var sectionForgot = sectionLoginFormMain.querySelector('#sectionForgot');
	var forgotForm = sectionForgot.querySelector('#forgotForm');
	var forgotInputEmail = forgotForm.querySelector('#forgotInputEmail');
	var forgotButtonCancel = forgotForm.querySelector('#forgotButtonCancel');
	
	sectionLoginFormMain.addEventListener('change', function (event) {
	  event.target.setCustomValidity('');
	});
	
	loginForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	  _login2.default.submit(loginInputLogin.value, loginInputPassword.value);
	});
	
	registerForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	  _register2.default.submit(registerInputName.value, registerInputEmail.value, registerInputPassword.value, registerInputConfirmPassword.value, registerUserAgreement.checked);
	});
	
	emailConfirmForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	  _confirm_email2.default.submit(emailConfirmInputKey.value, registerInputEmail.value);
	});
	
	forgotForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	  _forgot2.default.submit(forgotInputEmail.value);
	});
	
	loginButtonRegister.addEventListener('click', function () {
	  sectionLogin.classList.add('d-none');
	  sectionRegister.classList.remove('d-none');
	});
	
	loginButtonForgot.addEventListener('click', function () {
	  sectionLogin.classList.add('d-none');
	  sectionForgot.classList.remove('d-none');
	});
	
	registerButtonCancel.addEventListener('click', function () {
	  loginForm.reset();
	  registerForm.reset();
	  emailConfirmForm.reset();
	  sectionLogin.classList.remove('d-none');
	  sectionRegister.classList.add('d-none');
	});
	
	emailConfirmButtonCancel.addEventListener('click', function () {
	  loginForm.reset();
	  registerForm.reset();
	  sectionLogin.classList.remove('d-none');
	  sectionConfirmEmail.classList.add('d-none');
	});
	
	forgotButtonCancel.addEventListener('click', function () {
	  loginForm.reset();
	  registerForm.reset();
	  sectionLogin.classList.remove('d-none');
	  sectionForgot.classList.add('d-none');
	});
	
	exports.default = {
	  setLoginInputLoginError: function setLoginInputLoginError(msg) {
	    loginInputLogin.setCustomValidity(msg);
	  },
	  setLoginInputPasswordError: function setLoginInputPasswordError(msg) {
	    loginInputPassword.setCustomValidity(msg);
	  },
	  showLoginCaptcha: function showLoginCaptcha() {
	    loginCaptcha.classList.remove('d-none');
	  },
	  setRegisterInputNameError: function setRegisterInputNameError(msg) {
	    registerInputName.setCustomValidity(msg);
	  },
	  setRegisterInputEmailError: function setRegisterInputEmailError(msg) {
	    registerInputEmail.setCustomValidity(msg);
	  },
	  setRegisterInputPasswordError: function setRegisterInputPasswordError(msg) {
	    registerInputPassword.setCustomValidity(msg);
	  },
	  setRegisterInputConfirmPasswordError: function setRegisterInputConfirmPasswordError(msg) {
	    registerInputConfirmPassword.setCustomValidity(msg);
	  },
	  setConfirmEmailError: function setConfirmEmailError(msg) {
	    emailConfirmInputKey.setCustomValidity(msg);
	  },
	  setForgotError: function setForgotError(msg) {
	    forgotInputEmail.setCustomValidity(msg);
	  },
	  showSubmitEmail: function showSubmitEmail() {
	    sectionRegister.classList.add('d-none');
	    sectionConfirmEmail.classList.remove('d-none');
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
	
	var capcha = 0;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	  console.dir(response);
	  if (response.status === 200) {
	    if (response.data.status === '0') {
	      alert('Ваш пользователь заблокирован, обратитесь к администратору');
	      // сброс на страницу загрузки
	    } else {
	      _storage2.default.data = response.data;
	      // Загрузка приложения
	    }
	  } else {
	    capcha++;
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
	
	var submitForm = function submitForm(userLogin, userPassword, isEmail) {
	  if (isEmail) {
	    _xhr2.default.request = getRequestDataEmail(userLogin, userPassword);
	  } else {
	    _xhr2.default.request = getRequestDataId(userLogin, userPassword);
	  }
	};
	
	var validateData = function validateData(template, data) {
	
	  if (template.test(data)) {
	    return true;
	  }
	
	  return false;
	};
	
	var validateForm = function validateForm(userLogin, userPassword) {
	
	  var valid = {
	    valid: true,
	    loginEmail: true
	  };
	
	  if (!validateData(validEmail, userLogin)) {
	    valid.loginEmail = false;
	    if (!validateData(validId, userLogin)) {
	      valid.valid = false;
	      _form_login2.default.setLoginInputLoginError('Неверный формат логина');
	    }
	  }
	
	  if (!validateData(validPassword, userPassword)) {
	    valid.valid = false;
	    _form_login2.default.setLoginInputPasswordError('Пароль должен быть длиннее 3-х символов');
	  }
	
	  return valid;
	};
	
	exports.default = {
	  submit: function submit(login, password) {
	
	    if (capcha === 3) {
	      _form_login2.default.showLoginCaptcha();
	    }
	
	    login = login.toLowerCase();
	    login = login.replace(/-/g, '');
	
	    var valid = validateForm(login, password);
	
	    if (valid.valid) {
	      submitForm(login, password, valid.loginEmail);
	    }
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
	
	var _xhr = __webpack_require__(4);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _form_login = __webpack_require__(2);
	
	var _form_login2 = _interopRequireDefault(_form_login);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var regVal = window.appSettings.registerValid;
	var regUrlApi = window.appSettings.registerUrlApi;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	  console.dir(response);
	
	  switch (response.status) {
	
	    case 200:
	      _form_login2.default.showSubmitEmail();
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
	    _form_login2.default.setRegisterInputNameError('Имя!');
	    valid = false;
	  }
	
	  if (!validateEmail(email)) {
	    _form_login2.default.setRegisterInputEmailError('Почта!');
	    valid = false;
	  }
	
	  if (!validatePassword(password)) {
	    _form_login2.default.setRegisterInputPasswordError('Пароль!');
	    valid = false;
	  }
	
	  if (!validateConfirm(password, confirm)) {
	    _form_login2.default.setRegisterInputConfirmPasswordError('Не совпадает!');
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
	  submit: function submit(name, email, password, confirm, userAgreement) {
	    if (validateForm(name, email, password, confirm, userAgreement)) {
	      submitForm(name, email, password);
	    }
	  }
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(4);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _form_login = __webpack_require__(2);
	
	var _form_login2 = _interopRequireDefault(_form_login);
	
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
	  _form_login2.default.setConfirmEmailError('Неверный формат кода!');
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
	
	    if (validateForm(kod)) {
	      submitForm(kod, email);
	    }
	  }
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(4);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _form_login = __webpack_require__(2);
	
	var _form_login2 = _interopRequireDefault(_form_login);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var emailVal = window.appSettings.forgotEmailValid;
	var urlApi = window.appSettings.forgotUrlApi;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	  console.dir(response);
	
	  if (response.status === 400) {
	    alert(response.message);
	    // Возврат в окно входа
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
	  _form_login2.default.setForgotError('Введите корректный email');
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
	
	    if (validateForm(email)) {
	      submitForm(email);
	    }
	  }
	};

/***/ })
/******/ ]);
//# sourceMappingURL=block.js.map