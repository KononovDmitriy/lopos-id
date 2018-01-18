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
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _main_login_window = __webpack_require__(2);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	var _log = __webpack_require__(13);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _onlineProfile = __webpack_require__(15);
	
	var _onlineProfile2 = _interopRequireDefault(_onlineProfile);
	
	var _referenceEnterprises = __webpack_require__(17);
	
	var _referenceEnterprises2 = _interopRequireDefault(_referenceEnterprises);
	
	var _referenceEnterprisesAdd = __webpack_require__(20);
	
	var _referenceEnterprisesAdd2 = _interopRequireDefault(_referenceEnterprisesAdd);
	
	var _referenceEnterprisesEdit = __webpack_require__(21);
	
	var _referenceEnterprisesEdit2 = _interopRequireDefault(_referenceEnterprisesEdit);
	
	var _referencePoints = __webpack_require__(22);
	
	var _referencePoints2 = _interopRequireDefault(_referencePoints);
	
	var _referenceBuyers = __webpack_require__(24);
	
	var _referenceBuyers2 = _interopRequireDefault(_referenceBuyers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	console.log('ver: 2D4');
	console.log('ver: 2A3');
	
	var exit = document.querySelector('#profile-exit');
	var app = document.querySelector('#app');
	var login = document.querySelector('#login');
	
	var showLoginHideApp = function showLoginHideApp() {
	  login.classList.remove('d-none');
	  app.classList.add('d-none');
	};
	
	var showAppHideLogin = function showAppHideLogin() {
	  login.classList.add('d-none');
	  app.classList.remove('d-none');
	};
	
	// чистим меню и вкладки
	var initMarkup = function initMarkup() {
	  document.querySelectorAll('.nav-link').forEach(function (item) {
	    return item.classList.remove('active');
	  });
	  document.querySelectorAll('.nav-item.dropdown').forEach(function (item) {
	    return item.classList.remove('show');
	  });
	  document.querySelectorAll('.tab-pane').forEach(function (item) {
	    return item.classList.add('fade');
	  });
	  document.querySelectorAll('.dropdown-item').forEach(function (item) {
	    return item.classList.remove('active');
	  });
	};
	
	var hashObserver = function hashObserver() {
	  var hash = window.location.hash;
	  if (hash) {
	    document.querySelector(hash + '-list').dispatchEvent(new Event('click'));
	    document.querySelector(hash + '-list').classList.add('active');
	    document.querySelector('' + hash).classList.add('active');
	    document.querySelector('' + hash).classList.remove('fade');
	  }
	};
	
	// ========== ОБНОВЛЕНИЕ/ОТКРЫТИЕ СТРАНИЦЫ ==========
	var start = function start() {
	  if (_storage2.default.isSetFlag) {
	    showAppHideLogin();
	    _onlineProfile2.default.start();
	    _log2.default.start();
	    _referenceEnterprises2.default.start();
	    _referencePoints2.default.start();
	    _referenceBuyers2.default.start();
	    initMarkup();
	    hashObserver();
	    _referenceEnterprisesAdd2.default.start();
	    _referenceEnterprisesEdit2.default.start();
	  } else {
	    showLoginHideApp();
	    _main_login_window2.default.init();
	  }
	};
	
	// ========== ВЫХОД ==========
	var stop = function stop() {
	  showLoginHideApp();
	  _log2.default.stop();
	  _onlineProfile2.default.stop();
	  _storage2.default.clean();
	  window.location.hash = '';
	  document.dispatchEvent(new Event('logoutSuccess'));
	};
	
	// ========== НАЧАЛО РАБОТЫ ==========
	initMarkup();
	hashObserver();
	start();
	document.addEventListener('loginSuccess', start);
	
	// ========== ЗАВЕРШЕНИЕ РАБОТЫ ==========
	exit.addEventListener('click', stop);
	
	/*
	
	Возможные сценарии запуска приложения:

	1. Обновление страницы в ходе работы после успешной авторизации
	2. Открытие страницы в новой вкладке + авторизация
	3. Открытие страницы в новой вкладке + регистрация
	4. Выход и новая регистрация без перезагрузки страницы в той же вкладке

	NB1: на старте оба контейнера (app и login) скрыты
	NB2: событие loginSuccess создается в модулях confirm_email.js и login.js

	Алгоритм:
	(1)
	 - проверяем sessionStorage и авторизацию, если данные пользователя есть, то выполняем функцию start:
	    - показываем контейнер app и прячем login
	    - запускаем profileButton, чтобы заново записать в Онлайн/Профиль данные пользователя
	    - запускаем logButton, который при клике на кнопку журнала начнет грузить данные
	 (2,3)
	 - показываем контейнер login
	 - mainWindow.firstScreen() =?= может переименуем его во что-то типа authority =?=
	 - слушаем возникновение события loginSuccess на документе и выполняем функцию start (см. п.1)
	 событие loginSuccess вызывается модулями авторизации/регистрации и сообщает нам, что данная процедура пройдена
	 (4)
	 - слушаем click по кнопке exit и обрабатываем выход, запустив функцию stop:
	    - прячем контейнер app и показываем login
	    - останавливаем модуль с журналом: чистим счетчики, кэш неотрисованных нод, прячем все сообщения о процессе загрузки и чистим контейнер, чистим обработчики клика и скролла
	    - чистим sessionStorage
	    - создаем событие logoutSuccess на document, по которому можно сделать все необходимое с формой авторизации

	*/

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	
	  // заполняем хранилище
	  set data(loadedData) {
	    localStorage.setItem('nickname', loadedData.nickname);
	    localStorage.setItem('lastLogin', loadedData.lastLogin);
	    localStorage.setItem('email', loadedData.email);
	    localStorage.setItem('directory', loadedData.directory);
	    localStorage.setItem('operatorId', loadedData.operator_id);
	    localStorage.setItem('token', loadedData.token);
	    localStorage.setItem('currentBusiness', loadedData.current_business);
	    localStorage.setItem('currentStock', loadedData.current_stock);
	  },
	
	  // возвращаем данные
	  get data() {
	    return {
	      nickname: localStorage.getItem('nickname'),
	      lastLogin: localStorage.getItem('lastLogin'),
	      directory: localStorage.getItem('directory'),
	      email: localStorage.getItem('email'),
	      operatorId: localStorage.getItem('operatorId'),
	      token: localStorage.getItem('token'),
	      currentBusiness: localStorage.getItem('currentBusiness'),
	      currentStock: localStorage.getItem('currentStock')
	    };
	  },
	
	  set currentBusiness(id) {
	    localStorage.setItem('currentBusiness', id);
	  },
	
	  set currentStock(id) {
	    localStorage.setItem('currentStock', id);
	  },
	
	  get isSetFlag() {
	    return Object.values(this.data).some(function (item) {
	      return item !== null;
	    });
	  },
	
	  // чистим хранилище
	  clean: function clean() {
	    localStorage.removeItem('nickname');
	    localStorage.removeItem('lastLogin');
	    localStorage.removeItem('directory');
	    localStorage.removeItem('email');
	    localStorage.removeItem('operatorId');
	    localStorage.removeItem('token');
	    localStorage.removeItem('currentBusiness');
	    localStorage.removeItem('currentStock');
	  },
	
	
	  // ВСЯКОЕ ПРОЧЕЕ
	
	  set currentEnterpriseId(id) {
	    sessionStorage.setItem('currentEnterpriseId', id);
	  },
	
	  get currentEnterpriseId() {
	    return sessionStorage.getItem('currentEnterpriseId');
	  },
	
	  set currentEnterpriseName(name) {
	    sessionStorage.setItem('currentEnterpriseName', name);
	  },
	
	  get currentEnterpriseName() {
	    return sessionStorage.getItem('currentEnterpriseName');
	  },
	
	  set currentStockId(id) {
	    sessionStorage.setItem('currentStockId', id);
	  },
	
	  get currentStockId() {
	    return sessionStorage.getItem('currentStockId');
	  },
	
	  set currentStockName(name) {
	    sessionStorage.setItem('currentStockName', name);
	  },
	
	  get currentStockName() {
	    return sessionStorage.getItem('currentStockName');
	  },
	
	  set currentKontragent(type) {
	    sessionStorage.setItem('currentKontragent', type);
	  },
	
	  get currentKontragent() {
	    return sessionStorage.getItem('currentKontragent');
	  }
	
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _form_login = __webpack_require__(3);
	
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
	var globalAlert = document.querySelector('#globalAlert');
	
	var inputFields = {
	  'loginLogin': sectionLoginFormMain.querySelector('#loginInputLogin'),
	  'loginPassword': sectionLoginFormMain.querySelector('#loginInputPassword'),
	  'registerLogin': sectionLoginFormMain.querySelector('#registerInputName'),
	  'registerEmail': sectionLoginFormMain.querySelector('#registerInputEmail'),
	  'registerPassword': sectionLoginFormMain.querySelector('#registerInputPassword'),
	  'registerConfirm': sectionLoginFormMain.querySelector('#registerInputConfirmPassword'),
	  'registerUserAgreement': sectionLoginFormMain.querySelector('#registerUserAgreement'),
	  'emailConfirmInputKey': sectionLoginFormMain.querySelector('#emailConfirmInputKey'),
	  'forgotInputEmail': sectionLoginFormMain.querySelector('#forgotInputEmail')
	};
	
	var inputFieldsErrors = {
	  'loginLogin': sectionLoginFormMain.querySelector('#loginInputLoginError'),
	  'loginPassword': sectionLoginFormMain.querySelector('#loginInputPasswordError'),
	  'registerLogin': sectionLoginFormMain.querySelector('#registerInputNameError'),
	  'registerEmail': sectionLoginFormMain.querySelector('#registerInputEmailError'),
	  'registerPassword': sectionLoginFormMain.querySelector('#registerInputPasswordError'),
	  'registerConfirm': sectionLoginFormMain.querySelector('#registerInputConfirmPasswordError'),
	  'registerUserAgreement': sectionLoginFormMain.querySelector('#registerUserAgreementError'),
	  'emailConfirmInputKey': sectionLoginFormMain.querySelector('#emailConfirmInputKeyError'),
	  'forgotInputEmail': sectionLoginFormMain.querySelector('#forgotInputEmailError')
	};
	
	var progressBar = {
	  'loginProgress': sectionLoginFormMain.querySelector('#loginProgress'),
	  'registerProgress': sectionLoginFormMain.querySelector('#registerProgress'),
	  'confirmProgress': sectionLoginFormMain.querySelector('#confirmProgress'),
	  'forgotProgress': sectionLoginFormMain.querySelector('#forgotProgress')
	};
	
	var buttons = {
	  'loginButtonSubmit': sectionLoginFormMain.querySelector('#loginButtonSubmit'),
	  'registerButtonSubmit': sectionLoginFormMain.querySelector('#registerButtonSubmit'),
	  'emailConfirmButtonSubmit': sectionLoginFormMain.querySelector('#emailConfirmButtonSubmit'),
	  'forgotButtonSubmit': sectionLoginFormMain.querySelector('#forgotButtonSubmit')
	};
	
	var setGlobalAlert = function setGlobalAlert(msg, type) {
	  var msgType = void 0;
	  var msgClass = void 0;
	  if (type === 'error') {
	    msgType = 'ОШИБКА! ';
	    msgClass = 'alert-danger';
	  }
	
	  if (type === 'message') {
	    msgType = 'СООБЩЕНИЕ! ';
	    msgClass = 'alert-success';
	  }
	
	  globalAlert.innerHTML = globalAlert.innerHTML + ('<div id="globalAlert" class="alert ' + msgClass + ' fade show" role="alert">\n      <strong>' + msgType + ' </strong> ' + msg + '\n      <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n        <span aria-hidden="true">&times;</span>\n      </button>\n    </div>');
	};
	
	var resetErrors = function resetErrors() {
	  var errObj = Object.keys(inputFieldsErrors);
	  var inObg = Object.keys(inputFields);
	
	  errObj.forEach(function (value) {
	    inputFieldsErrors[value].innerHTML = '';
	  });
	
	  inObg.forEach(function (value) {
	    inputFields[value].classList.remove('border');
	    inputFields[value].classList.remove('border-danger');
	  });
	};
	
	sectionLoginFormMain.addEventListener('change', function (event) {
	
	  inputFieldsErrors[event.target.dataset.erreset].innerHTML = '';
	  event.target.classList.remove('border');
	  event.target.classList.remove('border-danger');
	});
	
	document.addEventListener('logoutSuccess', function () {
	  formInit();
	});
	
	var formInit = function formInit() {
	  globalAlert.innerHTML = '';
	  resetErrors();
	  _form_confirm_email2.default.reset();
	  _form_register2.default.reset();
	  _form_forgot2.default.reset();
	  _form_login2.default.reset();
	  _form_confirm_email2.default.hide();
	  _form_register2.default.hide();
	  _form_forgot2.default.hide();
	  _form_login2.default.show();
	};
	
	_captcha2.default.init();
	
	exports.default = {
	
	  init: formInit,
	
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
	  },
	  setError: function setError(target, msg) {
	    inputFieldsErrors[target].innerHTML = msg;
	    inputFields[target].classList.add('border');
	    inputFields[target].classList.add('border-danger');
	  },
	
	
	  setAlert: setGlobalAlert,
	
	  showProgress: function showProgress(button, progress) {
	    progressBar[progress].classList.remove('invisible');
	    if (button) {
	      buttons[button].disabled = true;
	    }
	  },
	  hideProgress: function hideProgress(button, progress) {
	    progressBar[progress].classList.add('invisible');
	    buttons[button].disabled = false;
	  }
	};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _main_login_window = __webpack_require__(2);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	var _login = __webpack_require__(4);
	
	var _login2 = _interopRequireDefault(_login);
	
	var _captcha = __webpack_require__(6);
	
	var _captcha2 = _interopRequireDefault(_captcha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sectionLogin = document.querySelector('#sectionLogin');
	var loginForm = sectionLogin.querySelector('#loginForm');
	var loginInputLogin = sectionLogin.querySelector('#loginInputLogin');
	var loginInputPassword = sectionLogin.querySelector('#loginInputPassword');
	var loginButtonRegister = loginForm.querySelector('#loginButtonRegister');
	var loginButtonForgot = loginForm.querySelector('#loginButtonForgot');
	var loginCaptcha = loginForm.querySelector('#loginCaptcha');
	
	var captchaCount = 0;
	var captchaId = 'NO';
	var userLogin = void 0;
	
	var captchaCallback = function captchaCallback() {
	
	  _main_login_window2.default.showProgress('loginButtonSubmit', 'loginProgress');
	
	  if (_captcha2.default.getResponse(captchaId)) {
	    _captcha2.default.catchaReset(captchaId);
	  }
	
	  _login2.default.submit(userLogin, loginInputPassword.value);
	};
	
	loginForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	  userLogin = formatLogin(loginInputLogin.value);
	
	  if (_login2.default.validate(userLogin, loginInputPassword.value)) {
	
	    if (!window.captchaErr && captchaCount >= 3) {
	      _main_login_window2.default.showProgress(false, 'loginProgress');
	      _captcha2.default.captchaExec(captchaId);
	    } else {
	      _main_login_window2.default.showProgress('loginButtonSubmit', 'loginProgress');
	      _login2.default.submit(userLogin, loginInputPassword.value);
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
	  show: function show() {
	    sectionLogin.classList.remove('d-none');
	  },
	  hide: function hide() {
	    sectionLogin.classList.add('d-none');
	  },
	  reset: function reset() {
	    loginForm.reset();
	    loginInputLogin.setCustomValidity('');
	    loginInputPassword.setCustomValidity('');
	
	    if (captchaId !== 'NO') {
	      _captcha2.default.catchaReset(captchaId);
	    }
	  },
	  addCaptchaCount: function addCaptchaCount() {
	    captchaCount++;
	  },
	  setCaptcha: function setCaptcha() {
	    captchaId = _captcha2.default.getCaptcha(loginCaptcha, captchaCallback);
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(5);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _form_login = __webpack_require__(3);
	
	var _form_login2 = _interopRequireDefault(_form_login);
	
	var _main_login_window = __webpack_require__(2);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var validId = window.appSettings.loginValid.id;
	var validEmail = window.appSettings.loginValid.email;
	var validPassword = window.appSettings.loginValid.password;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	  _form_login2.default.addCaptchaCount();
	  _main_login_window2.default.hideProgress('loginButtonSubmit', 'loginProgress');
	
	  if (response.status === 200) {
	    if (response.data.status === '0') {
	      _main_login_window2.default.setAlert(window.appSettings.messages.responseStatus.res0, 'message');
	    } else {
	      _storage2.default.data = response.data;
	      document.dispatchEvent(new Event('loginSuccess'));
	    }
	  } else {
	    _main_login_window2.default.setAlert(response.message, 'error');
	  }
	};
	
	var callbackXhrError = function callbackXhrError(response) {
	  _main_login_window2.default.hideProgress('loginButtonSubmit', 'loginProgress');
	  _main_login_window2.default.setAlert(window.appSettings.messages.xhrError, 'error');
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
	    callbackError: window.callbackXhrError
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
	      _main_login_window2.default.setError('loginLogin', window.appSettings.messages.formValidation.login.login);
	    }
	  }
	
	  if (!validateData(validPassword, userPassword)) {
	    valid = false;
	    _main_login_window2.default.setError('loginPassword', window.appSettings.messages.formValidation.login.password);
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _form_register = __webpack_require__(7);
	
	var _form_register2 = _interopRequireDefault(_form_register);
	
	var _form_login = __webpack_require__(3);
	
	var _form_login2 = _interopRequireDefault(_form_login);
	
	var _form_confirm_email = __webpack_require__(9);
	
	var _form_confirm_email2 = _interopRequireDefault(_form_confirm_email);
	
	var _form_forgot = __webpack_require__(11);
	
	var _form_forgot2 = _interopRequireDefault(_form_forgot);
	
	var _main_login_window = __webpack_require__(2);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var captchaErrorCallback = function captchaErrorCallback(response) {
	  window.captchaErr = true;
	  _main_login_window2.default.setAlert(window.appSettings.messages.captchaError, 'error');
	};
	
	exports.default = {
	  init: function init() {
	    window.captchaOnLoadCallback = function () {
	      window.captchaOnLoad = true;
	      window.captchaErr = false;
	
	      _form_login2.default.setCaptcha();
	      _form_register2.default.setCaptcha();
	      _form_confirm_email2.default.setCaptcha();
	      _form_forgot2.default.setCaptcha();
	    };
	  },
	  captchaExec: function captchaExec(captchaId) {
	    window.grecaptcha.execute(captchaId);
	  },
	  catchaReset: function catchaReset(captchaId) {
	    window.grecaptcha.reset(captchaId);
	  },
	  getResponse: function getResponse(captchaId) {
	    return window.grecaptcha.getResponse(captchaId);
	  },
	  getCaptcha: function getCaptcha(elementId, callback) {
	    return window.grecaptcha.render(elementId, {
	      'size': 'invisible',
	      'sitekey': window.appSettings.reCaptchaSiteKey,
	      'callback': callback,
	      'error-callback': captchaErrorCallback
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
	
	var _main_login_window = __webpack_require__(2);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	var _register = __webpack_require__(8);
	
	var _register2 = _interopRequireDefault(_register);
	
	var _captcha = __webpack_require__(6);
	
	var _captcha2 = _interopRequireDefault(_captcha);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sectionRegister = document.querySelector('#sectionRegister');
	var registerForm = sectionRegister.querySelector('#registerForm');
	var registerInputName = registerForm.querySelector('#registerInputName');
	var registerInputEmail = registerForm.querySelector('#registerInputEmail');
	var registerInputPassword = registerForm.querySelector('#registerInputPassword');
	var registerInputConfirmPassword = registerForm.querySelector('#registerInputConfirmPassword');
	var registerButtonCancel = registerForm.querySelector('#registerButtonCancel');
	var registerUserAgreement = document.querySelector('#registerUserAgreement');
	var registerCaptcha = sectionRegister.querySelector('#registerCaptcha');
	var registerButtonUserAgreement = sectionRegister.querySelector('#registerButtonUserAgreement');
	
	var captchaId = 'NO';
	
	var captchaCallback = function captchaCallback() {
	
	  _main_login_window2.default.showProgress('registerButtonSubmit', 'registerProgress');
	
	  if (_captcha2.default.getResponse(captchaId)) {
	    _captcha2.default.catchaReset(captchaId);
	  }
	
	  _register2.default.submit(registerInputName.value, registerInputEmail.value, registerInputPassword.value);
	};
	
	registerForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	
	  if (_register2.default.validate(registerInputName.value, registerInputEmail.value, registerInputPassword.value, registerInputConfirmPassword.value, registerUserAgreement.checked)) {
	
	    if (!window.captchaErr) {
	      _main_login_window2.default.showProgress(false, 'registerProgress');
	      _captcha2.default.captchaExec(captchaId);
	    } else {
	      _main_login_window2.default.showProgress('registerButtonSubmit', 'registerProgress');
	      _register2.default.submit(registerInputName.value, registerInputEmail.value, registerInputPassword.value);
	    }
	  }
	});
	
	registerButtonCancel.addEventListener('click', function () {
	  _main_login_window2.default.init();
	});
	
	registerButtonUserAgreement.addEventListener('click', function () {
	  // window.location = 'http://bidone.ru/lopos_terms_and_agreements';
	  window.open('http://bidone.ru/lopos_terms_and_agreements');
	});
	
	exports.default = {
	  show: function show() {
	    sectionRegister.classList.remove('d-none');
	  },
	  hide: function hide() {
	    sectionRegister.classList.add('d-none');
	  },
	  reset: function reset() {
	    registerForm.reset();
	    registerInputName.setCustomValidity('');
	    registerInputEmail.setCustomValidity('');
	    registerInputPassword.setCustomValidity('');
	    registerInputConfirmPassword.setCustomValidity('');
	
	    if (captchaId !== 'NO') {
	      _captcha2.default.catchaReset(captchaId);
	    }
	  },
	  submitForm: function submitForm() {
	    _register2.default.submit(registerInputName.value, registerInputEmail.value, registerInputPassword.value, registerInputConfirmPassword.value, registerUserAgreement.checked);
	  },
	  setCaptcha: function setCaptcha() {
	    captchaId = _captcha2.default.getCaptcha(registerCaptcha, captchaCallback);
	  }
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _main_login_window = __webpack_require__(2);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	var _xhr = __webpack_require__(5);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var regVal = window.appSettings.registerValid;
	var regUrlApi = window.appSettings.registerUrlApi;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	
	  _main_login_window2.default.hideProgress('registerButtonSubmit', 'registerProgress');
	  switch (response.status) {
	
	    case 200:
	      _main_login_window2.default.setAlert(response.message, 'message');
	      _main_login_window2.default.confirmEmail();
	      break;
	    case 400:
	      _main_login_window2.default.setAlert(response.message, 'error');
	      break;
	  }
	};
	
	var callbackXhrError = function callbackXhrError(response) {
	  _main_login_window2.default.hideProgress('registerButtonSubmit', 'registerProgress');
	  _main_login_window2.default.setAlert(window.appSettings.messages.xhrError, 'error');
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
	    _main_login_window2.default.setError('registerLogin', window.appSettings.messages.formValidation.registration.name);
	    valid = false;
	  }
	
	  if (!validateEmail(email)) {
	    _main_login_window2.default.setError('registerEmail', window.appSettings.messages.formValidation.registration.email);
	    valid = false;
	  }
	
	  if (!validatePassword(password)) {
	    _main_login_window2.default.setError('registerPassword', window.appSettings.messages.formValidation.registration.password);
	    valid = false;
	  }
	
	  if (!validateConfirm(password, confirm)) {
	    _main_login_window2.default.setError('registerConfirm', window.appSettings.messages.formValidation.registration.confirmPassword);
	    valid = false;
	  }
	
	  if (!userAgreement) {
	    _main_login_window2.default.setError('registerUserAgreement', window.appSettings.messages.formValidation.registration.UserAgreement);
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
	
	var _main_login_window = __webpack_require__(2);
	
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
	  _main_login_window2.default.showProgress('emailConfirmButtonSubmit', 'confirmProgress');
	
	  if (_captcha2.default.getResponse(captchaId)) {
	    _captcha2.default.catchaReset(captchaId);
	  }
	
	  _confirm_email2.default.submit(emailConfirmInputKey.value, registerInputEmail.value);
	};
	
	emailConfirmForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	
	  if (_confirm_email2.default.validate(emailConfirmInputKey.value)) {
	
	    if (!window.captchaErr) {
	      _main_login_window2.default.showProgress(false, 'confirmProgress');
	      _captcha2.default.captchaExec(captchaId);
	    } else {
	      _main_login_window2.default.showProgress('emailConfirmButtonSubmit', 'confirmProgress');
	      _confirm_email2.default.submit(emailConfirmInputKey.value, registerInputEmail.value);
	    }
	  }
	});
	
	emailConfirmButtonCancel.addEventListener('click', function () {
	  _main_login_window2.default.init();
	});
	
	exports.default = {
	  show: function show() {
	    sectionConfirmEmail.classList.remove('d-none');
	  },
	  hide: function hide() {
	    sectionConfirmEmail.classList.add('d-none');
	  },
	  reset: function reset() {
	    emailConfirmForm.reset();
	    emailConfirmInputKey.setCustomValidity('');
	
	    if (captchaId !== 'NO') {
	      _captcha2.default.catchaReset(captchaId);
	    }
	  },
	  submitForm: function submitForm() {
	    _confirm_email2.default.submit(emailConfirmInputKey.value, registerInputEmail.value);
	  },
	  setCaptcha: function setCaptcha() {
	    captchaId = _captcha2.default.getCaptcha(emailConfirmCaptcha, captchaCallback);
	  }
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(5);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _main_login_window = __webpack_require__(2);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var kodVal = window.appSettings.confirmEmailKodValid;
	var urlApi = window.appSettings.confirmEmailUrlApi;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	  _main_login_window2.default.hideProgress('emailConfirmButtonSubmit', 'confirmProgress');
	
	  if (response.status === 200) {
	    if (response.data.status === '0') {
	      _main_login_window2.default.setAlert(window.appSettings.messages.responseStatus.res0, 'message');
	    } else {
	      _storage2.default.data = response.data;
	      document.dispatchEvent(new Event('loginSuccess'));
	    }
	  } else {
	    _main_login_window2.default.setAlert(response.message, 'error');
	  }
	};
	
	var callbackXhrError = function callbackXhrError(response) {
	  _main_login_window2.default.hideProgress('emailConfirmButtonSubmit', 'confirmProgress');
	  _main_login_window2.default.setAlert(window.appSettings.messages.xhrError, 'error');
	};
	
	var validateForm = function validateForm(kod) {
	
	  if (kodVal.test(kod)) {
	    return true;
	  }
	  _main_login_window2.default.setError('emailConfirmInputKey', window.appSettings.messages.formValidation.emailConfirm.key);
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
	
	var _main_login_window = __webpack_require__(2);
	
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
	
	  _main_login_window2.default.showProgress('forgotButtonSubmit', 'forgotProgress');
	
	  if (_captcha2.default.getResponse(captchaId)) {
	    _captcha2.default.catchaReset(captchaId);
	  }
	
	  _forgot2.default.submit(forgotInputEmail.value);
	};
	
	forgotForm.addEventListener('submit', function (event) {
	  event.preventDefault();
	
	  if (_forgot2.default.validate(forgotInputEmail.value)) {
	
	    if (!window.captchaErr) {
	      _main_login_window2.default.showProgress(false, 'forgotProgress');
	      _captcha2.default.captchaExec(captchaId);
	    } else {
	      _main_login_window2.default.showProgress('forgotButtonSubmit', 'forgotProgress');
	      _forgot2.default.submit(forgotInputEmail.value);
	    }
	  }
	});
	
	forgotButtonCancel.addEventListener('click', function () {
	  _main_login_window2.default.init();
	});
	
	exports.default = {
	  show: function show() {
	    sectionForgot.classList.remove('d-none');
	  },
	  hide: function hide() {
	    sectionForgot.classList.add('d-none');
	  },
	  reset: function reset() {
	    forgotForm.reset();
	    forgotInputEmail.setCustomValidity('');
	
	    if (captchaId !== 'NO') {
	      _captcha2.default.catchaReset(captchaId);
	    }
	  },
	  submitForm: function submitForm() {
	    _forgot2.default.submit(forgotInputEmail.value);
	  },
	  setCaptcha: function setCaptcha() {
	    captchaId = _captcha2.default.getCaptcha(forgotCaptcha, captchaCallback);
	  }
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(5);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _main_login_window = __webpack_require__(2);
	
	var _main_login_window2 = _interopRequireDefault(_main_login_window);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var emailVal = window.appSettings.forgotEmailValid;
	var urlApi = window.appSettings.forgotUrlApi;
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	  _main_login_window2.default.hideProgress('forgotButtonSubmit', 'forgotProgress');
	
	  if (response.status === 400) {
	    _main_login_window2.default.setAlert(response.message, 'message');
	  } else {
	    _main_login_window2.default.setAlert(response.message, 'error');
	  }
	};
	
	var callbackXhrError = function callbackXhrError(response) {
	  _main_login_window2.default.hideProgress('forgotButtonSubmit', 'forgotProgress');
	  _main_login_window2.default.setAlert(window.appSettings.messages.xhrError, 'error');
	};
	
	var validateForm = function validateForm(email) {
	
	  if (emailVal.test(email)) {
	    return true;
	  }
	  _main_login_window2.default.setError('forgotInputEmail', window.appSettings.messages.formValidation.forgot.email);
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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _log = __webpack_require__(14);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _xhr = __webpack_require__(5);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var listLog = document.querySelector('#list-log-list');
	var listLogBody = document.querySelector('#log-body');
	var loader = document.querySelector('#loader');
	var loaderWait = document.querySelector('#loader-wait');
	var loaderFinish = document.querySelector('#loader-finish');
	var loaderFail = document.querySelector('#loader-fail');
	
	// начальная позиция и смещение
	var logCardNodes = [];
	var position = 0;
	var count = 200;
	var drawSet = count / 4;
	
	// отрисовка порции карточек
	var drawCardSet = function drawCardSet() {
	  return logCardNodes.splice(0, drawSet).forEach(_log2.default.addCardToContainer);
	};
	
	// создание нод по полученной порции данных
	var createCardNodes = function createCardNodes(cardData) {
	  return cardData.forEach(function (item, index) {
	    return logCardNodes.push(_log2.default.getElement(item, index));
	  });
	};
	
	// успех загрузки
	var onSuccessLogLoad = function onSuccessLogLoad(logResponse) {
	  var loadedLog = logResponse.data;
	
	  loaderWait.classList.add('d-none');
	  if (loadedLog.length) {
	    createCardNodes(loadedLog);
	  } else {
	    loaderFinish.classList.remove('d-none');
	    window.removeEventListener('scroll', onMouseScroll);
	    return;
	  }
	  if (position === 0) {
	    drawCardSet();
	  }
	  window.addEventListener('scroll', onMouseScroll);
	};
	
	// ошибка загрузки
	var onErrorLogLoad = function onErrorLogLoad() {
	  loaderFail.classList.remove('d-none');
	  loader.classList.add('d-none');
	  loaderWait.classList.add('d-none');
	  loaderFinish.classList.add('d-none');
	};
	
	// отправка запроса на новую порцию
	var getLog = function getLog() {
	  console.log('get.log');
	  if (logCardNodes.length === 0) {
	    loaderWait.classList.remove('d-none');
	    window.removeEventListener('scroll', onMouseScroll);
	    _xhr2.default.request = {
	      metod: 'POST',
	      url: 'lopos_directory/' + _storage2.default.data.directory + '/update_log/' + Date.now() + '/story',
	      data: 'position=' + position + '&count=' + count + '&token=' + _storage2.default.data.token,
	      callbackSuccess: onSuccessLogLoad,
	      callbackError: onErrorLogLoad
	    };
	  }
	};
	
	// "ленивая отрисовка" журнала
	var isBottomReached = function isBottomReached() {
	  return listLogBody.getBoundingClientRect().bottom - window.innerHeight <= 150;
	};
	
	var onMouseScroll = function onMouseScroll(evt) {
	
	  if (isBottomReached() && logCardNodes.length > 0) {
	    loader.classList.remove('d-none');
	    window.removeEventListener('scroll', onMouseScroll);
	
	    window.setTimeout(function () {
	      window.addEventListener('scroll', onMouseScroll);
	      loader.classList.add('d-none');
	      drawCardSet();
	    }, 500);
	  } else if (logCardNodes.length === 0) {
	    position += count;
	    getLog();
	  }
	};
	
	exports.default = {
	  start: function start() {
	    listLog.addEventListener('click', getLog);
	  },
	  stop: function stop() {
	    _log2.default.cleanContainer();
	    logCardNodes = [];
	    position = 0;
	
	    loaderFail.classList.add('d-none');
	    loader.classList.add('d-none');
	    loaderWait.classList.add('d-none');
	    loaderFinish.classList.add('d-none');
	
	    listLog.removeEventListener('click', getLog);
	    window.removeEventListener('scroll', onMouseScroll);
	  }
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var listLogBody = document.querySelector('#log-body');
	
	exports.default = {
	  cleanContainer: function cleanContainer() {
	    listLogBody.innerHTML = '';
	  },
	  getElement: function getElement(item, index) {
	    var getIconColor = item.ha_operator_hex ? item.ha_operator_hex : 'F4002C';
	    var hasMinusInComments = item.ha_comment.includes('-');
	    var imgName = '';
	
	    if (item.ha_kontr_agent_id_fk) {
	      imgName = 'buyers';
	    }
	    if (item.ha_nomenclature_card_id_fk) {
	      imgName = 'ic_my_nomenclature';
	    }
	    if (item.ha_group_good_id_fk) {
	      imgName = 'groups';
	    }
	    if (item.ha_good_id_fk || item.ha_price_id_fk) {
	      imgName = 'goods';
	    }
	    if (item.ha_tag_id_fk) {
	      imgName = 'ic_my_tag';
	    }
	
	    if (item.ha_balance_act_id_fk && hasMinusInComments) {
	      imgName = 'expenses';
	    } else if (item.ha_balance_act_id_fk && !hasMinusInComments) {
	      imgName = 'revenue';
	    }
	
	    if (item.ha_naklad_id_fk && hasMinusInComments) {
	      imgName = 'admission';
	    } else if (item.ha_naklad_id_fk && !hasMinusInComments) {
	      imgName = 'sale';
	    }
	
	    imgName = imgName ? imgName : 'other_ic_history';
	
	    var cardHeader = item.ha_comment.split('\n');
	    cardHeader[1] = cardHeader[1] ? cardHeader[1] : '';
	
	    return '\n    <div id="log-row" class="card mb-0 p-1 rounded-0" style="width: 100%">\n      <div class="media">\n        <img class="mr-3 rounded-circle p-1" src="img/user-male-filled-32.png" title="' + item.ha_operator_name + '" style="background-color: #' + getIconColor + '" width="30" alt="' + item.ha_operator_name + '">\n        <img class="mr-3" src="img/' + imgName + '.png" width="30" alt="Generic placeholder image">\n        <div class="media-body">\n          <b>' + cardHeader[0] + '</b>\n          ' + cardHeader[1] + '\n          <div class="badge text-right text-muted float-right">' + new Date(+(item.ha_time + '000')).toLocaleString() + '</div>\n        </div>\n      </div>';
	  },
	  addCardToContainer: function addCardToContainer(cardMarkupItem) {
	    listLogBody.insertAdjacentHTML('beforeend', cardMarkupItem);
	  }
	};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _onlineProfile = __webpack_require__(16);
	
	var _onlineProfile2 = _interopRequireDefault(_onlineProfile);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  start: function start() {
	    _onlineProfile2.default.setProfile();
	  },
	  stop: function stop() {
	    _onlineProfile2.default.clearProfile();
	  }
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var listProfile = document.querySelector('#list-profile');
	
	var prepareProfileMarkup = function prepareProfileMarkup() {
	  return '\n  <div id="profile" class="card p-3 w-50 text-dark">\n    <h3>\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442</h3>\n    <p><span>\u0418\u043C\u044F: </span><span>' + _storage2.default.data.nickname + '</span></p>\n    <p><span>\u0412\u0440\u0435\u043C\u044F \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0432\u0445\u043E\u0434\u0430: </span><span>' + _storage2.default.data.lastLogin + '</span></p>\n    <p><span></span>\u041A\u0430\u0442\u0430\u043B\u043E\u0433: <span>' + _storage2.default.data.directory + '</span></p>\n    <p><span></span>\u041F\u043E\u0447\u0442\u0430: <span>' + _storage2.default.data.email + '</span></p>\n  </div>';
	};
	
	exports.default = {
	  setProfile: function setProfile() {
	    listProfile.innerHTML = _storage2.default.isSetFlag ? prepareProfileMarkup() : '';
	  },
	  clearProfile: function clearProfile() {
	    listProfile.innerHTML = '';
	  }
	};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(5);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _referenceEnterprises = __webpack_require__(18);
	
	var _referenceEnterprises2 = _interopRequireDefault(_referenceEnterprises);
	
	var _tools = __webpack_require__(19);
	
	var _tools2 = _interopRequireDefault(_tools);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var listEnterprises = document.querySelector('#list-enterprises-list');
	var listEnterprisesBody = document.querySelector('#list-enterprises-body');
	var listEnterprisesCard = document.querySelector('#list-enterprises-card');
	var listEnterprisesCardReturnBtn = document.querySelector('#list-enterprises-card-return-btn');
	
	var listEnterprisesCardName = document.querySelector('#list-enterprises-card-name');
	var listEnterprisesCardBalance = document.querySelector('#list-enterprises-card-balance');
	var listEnterprisesCardDate = document.querySelector('#list-enterprises-card-date');
	// const listEnterprisesCardNegativeTailings = document.querySelector('#list-enterprises-card-negative-tailings');
	// const listEnterprisesCardNegativeBalance = document.querySelector('#list-enterprises-card-negative-balance');
	
	var listEnterprisesCardCheckBtn = document.querySelector('#list-enterprises-card-check-btn');
	// const listEnterprisesCardEditBtn = document.querySelector('#list-enterprises-card-edit-btn');
	// const listEnterprisesCardDeleteBtn = document.querySelector('#list-enterprises-card-delete-btn');
	
	var listEnterprisesCardEditName = document.querySelector('#enterprises-card-edit-name');
	
	var loaderSpinnerId = 'loader-enterprises';
	var loaderSpinnerMessage = 'Ждем загрузки предприятий';
	var loaderSpinnerMarkup = _tools2.default.getLoadSpinner(loaderSpinnerId, loaderSpinnerMessage);
	
	var onSuccessEnterprisesLoad = function onSuccessEnterprisesLoad(loadedEnterprises) {
	  document.querySelector('#' + loaderSpinnerId).remove();
	  if (loadedEnterprises.status === 200) {
	    _referenceEnterprises2.default.drawDataInContainer(loadedEnterprises.data);
	  } else {
	    _referenceEnterprises2.default.drawMarkupInContainer('<p>' + loadedEnterprises.message + '</p>');
	  }
	};
	
	var onErrorEnterprisesLoad = function onErrorEnterprisesLoad(error) {
	  console.log(error);
	};
	
	var getEnterprises = function getEnterprises() {
	  _referenceEnterprises2.default.cleanContainer();
	  _referenceEnterprises2.default.drawMarkupInContainer(loaderSpinnerMarkup);
	
	  _xhr2.default.request = {
	    metod: 'POST',
	    url: 'lopos_directory/' + _storage2.default.data.directory + '/operator/1/business/1',
	    data: 'view_last=0&token=' + _storage2.default.data.token,
	    callbackSuccess: onSuccessEnterprisesLoad,
	    callbackError: onErrorEnterprisesLoad
	  };
	};
	
	var onSuccessEnterpriseCardLoad = function onSuccessEnterpriseCardLoad(loadedEnterpriseCard) {
	  console.log(loadedEnterpriseCard);
	
	  if (_storage2.default.data.currentBusiness === loadedEnterpriseCard.data.id) {
	    listEnterprisesCardCheckBtn.setAttribute('disabled', 'disabled');
	  } else {
	    listEnterprisesCardCheckBtn.removeAttribute('disabled');
	  }
	
	  listEnterprisesCardCheckBtn.addEventListener('click', function () {
	    _storage2.default.currentBusiness = loadedEnterpriseCard.data.id;
	  });
	
	  listEnterprisesCardName.innerText = loadedEnterpriseCard.data.name;
	  listEnterprisesCardDate.innerText = new Date(+(loadedEnterpriseCard.data.time_activity + '000')).toLocaleString();
	  listEnterprisesCardBalance.innerText = loadedEnterpriseCard.data.balance;
	  listEnterprisesCardEditName.value = loadedEnterpriseCard.data.name;
	  _storage2.default.currentEnterpriseId = loadedEnterpriseCard.data.id;
	  _storage2.default.currentEnterpriseName = loadedEnterpriseCard.data.name;
	};
	
	var onErrorEnterpriseCardLoad = function onErrorEnterpriseCardLoad(error) {
	  console.log(error);
	};
	
	var onListEnterprisesBodyClick = function onListEnterprisesBodyClick(evt) {
	  if (evt.target.tagName === 'BUTTON') {
	    listEnterprisesBody.classList.add('d-none');
	    listEnterprisesCard.classList.remove('d-none');
	
	    _xhr2.default.request = {
	      metod: 'POST',
	      url: 'lopos_directory/' + _storage2.default.data.directory + '/operator/1/business/' + evt.target.dataset.enterpriseId + '/info',
	      data: 'view_last=0&token=' + _storage2.default.data.token,
	      callbackSuccess: onSuccessEnterpriseCardLoad,
	      callbackError: onErrorEnterpriseCardLoad
	    };
	  }
	};
	
	var onListEnterprisesCardReturnBtn = function onListEnterprisesCardReturnBtn() {
	  listEnterprisesBody.classList.remove('d-none');
	  listEnterprisesCard.classList.add('d-none');
	  listEnterprisesCardName.innerText = '';
	  listEnterprisesCardDate.innerText = '';
	  listEnterprisesCardBalance.innerText = '';
	  getEnterprises();
	};
	
	listEnterprisesBody.addEventListener('click', onListEnterprisesBodyClick);
	listEnterprisesCardReturnBtn.addEventListener('click', onListEnterprisesCardReturnBtn);
	
	exports.default = {
	  start: function start() {
	    listEnterprises.addEventListener('click', getEnterprises);
	  },
	
	
	  redraw: getEnterprises,
	
	  stop: function stop() {
	    _referenceEnterprises2.default.cleanContainer();
	    listEnterprises.removeEventListener('click', getEnterprises);
	  }
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var listEnterprisesBody = document.querySelector('#list-enterprises-body');
	exports.default = {
	  cleanContainer: function cleanContainer() {
	    listEnterprisesBody.innerHTML = '';
	  },
	  getElement: function getElement(item) {
	    var currentEnterpriseFlag = item.b_id === _storage2.default.data['currentBusiness'] ? 'V' : '';
	
	    return '\n    <div id="log-row" class="card mb-0 p-1 rounded-0" style="width: 100%">\n      <div class="media">\n        <div class="media-body">\n          <b>ID: </b>' + item.b_id + ' <b>\u0418\u043C\u044F: </b>' + item.b_name + ' <b>\u041F\u043E\u0447\u0442\u0430: </b>' + item.b_owner_email + ' <b>\u0412\u0440\u0435\u043C\u044F: </b>' + new Date(+(item.b_time_activity + '000')).toLocaleString() + '\n          <div class="badge text-right float-right"><span class="badge badge-pill badge-success">' + currentEnterpriseFlag + '</span> <button type="button" class="btn btn-primary btn-sm" data-enterprise-id="' + item.b_id + '"> > </button> </div>\n        </div>\n      </div>';
	  },
	  drawDataInContainer: function drawDataInContainer(enterprisesData) {
	    var _this = this;
	
	    enterprisesData.forEach(function (item) {
	      return listEnterprisesBody.insertAdjacentHTML('beforeend', _this.getElement(item));
	    });
	  },
	  drawMarkupInContainer: function drawMarkupInContainer(markup) {
	    listEnterprisesBody.insertAdjacentHTML('beforeend', markup);
	  }
	};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  getWaitSpinner: function getWaitSpinner(id, message) {
	    return "\n      <div id=\"loader\" class=\"progress text-white\" style=\"height: 25px;\">\n        <div class=\"progress-bar progress-bar-striped progress-bar-animated text-white font-weight-bold text-uppercase bg-success\" style=\"width: 100%\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">" + message + "</div>\n      </div>";
	  },
	  getLoadSpinner: function getLoadSpinner(id, message) {
	    return "\n      <div id=\"" + id + "\" class=\"progress text-white\" style=\"height: 25px;\">\n        <div class=\"progress-bar progress-bar-striped progress-bar-animated text-white font-weight-bold text-uppercase\" style=\"width: 100%\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\">" + message + "</div>\n      </div>";
	  },
	  getError: function getError(id, message) {
	    return "\n      <div id=\"loader-fail\" class=\"container-fluid bg-danger text-white text-center mb-5\" style=\"height: 25;\">" + message + "</div>";
	  }
	};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(5);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _referenceEnterprises = __webpack_require__(17);
	
	var _referenceEnterprises2 = _interopRequireDefault(_referenceEnterprises);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var appUrl = window.appSettings.formAddEnterprise.UrlApi;
	var validNamePattern = window.appSettings.formAddEnterprise.validPatterns.name;
	var validBalancePattern = window.appSettings.formAddEnterprise.validPatterns.balance;
	var validNameMessage = window.appSettings.formAddEnterprise.validMessage.name;
	var validBalanceMessage = window.appSettings.formAddEnterprise.validMessage.balance;
	
	var body = document.querySelector('body');
	var enterprisesAdd = body.querySelector('#enterprises-add');
	var form = enterprisesAdd.querySelector('#enterprises-add-form');
	
	var name = form.querySelector('#enterprise-name');
	var nameValid = form.querySelector('#enterprises-name-valid');
	var balance = form.querySelector('#enterprise-balance');
	var balanceValid = form.querySelector('#enterprise-balance-valid');
	var currency = form.querySelector('#enterprise-money');
	
	var spinner = form.querySelector('#enterprises-add-spinner');
	
	var buttonSubmit = form.querySelector('#enterprises-add-submit');
	var buttonCancel = form.querySelector('#enterprises-add-cancel');
	var buttonClose = enterprisesAdd.querySelector('#enterprises-add-close');
	
	var stor = _storage2.default.data;
	
	var formReset = function formReset() {
	  form.reset();
	  nameValid.innerHTML = '';
	  balanceValid.innerHTML = '';
	};
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	
	  hideSpinner();
	  switch (response.status) {
	    case 200:
	      formReset();
	      $('#enterprises-add').modal('hide');
	
	      // Вывести response.message в зеленое сообщение
	      alert(response.message);
	
	      // Сюда метод перезагрузки списка
	      _referenceEnterprises2.default.redraw();
	      break;
	    case 400:
	
	      // Вывести response.message в красную ошибку
	      alert(response.message);
	      break;
	  }
	};
	
	var callbackXhrError = function callbackXhrError() {
	
	  hideSpinner();
	  // Вывести window.appSettings.messages.xhrError в красную ошибку
	  alert(window.appSettings.messages.xhrError);
	};
	
	var showSpinner = function showSpinner() {
	  spinner.classList.remove('invisible');
	  buttonSubmit.disabled = true;
	  buttonCancel.disabled = true;
	};
	
	var hideSpinner = function hideSpinner() {
	  spinner.classList.add('invisible');
	  buttonSubmit.disabled = false;
	  buttonCancel.disabled = false;
	};
	
	var validateForm = function validateForm() {
	  var valid = true;
	
	  if (!validNamePattern.test(name.value)) {
	    valid = false;
	    nameValid.innerHTML = validNameMessage;
	  }
	  if (!validBalancePattern.test(balance.value)) {
	    valid = false;
	    balanceValid.innerHTML = validBalanceMessage;
	  }
	
	  return valid;
	};
	
	var submitForm = function submitForm() {
	  var postData = 'name=' + name.value + '&balance=' + balance.value + '&currency=' + currency.value + '&token=' + stor.token;
	  var urlApp = appUrl.replace('{{dir}}', stor.directory);
	  urlApp = urlApp.replace('{{oper}}', stor.operatorId);
	
	  var response = {
	    url: urlApp,
	    metod: 'POST',
	    data: postData,
	    callbackSuccess: callbackXhrSuccess,
	    callbackError: callbackXhrError
	  };
	
	  _xhr2.default.request = response;
	};
	
	var formSubmitHandler = function formSubmitHandler(evt) {
	  evt.preventDefault();
	
	  if (validateForm()) {
	    showSpinner();
	    submitForm();
	  }
	};
	
	exports.default = {
	  start: function start() {
	
	    buttonCancel.addEventListener('click', function () {
	      formReset();
	    });
	    buttonClose.addEventListener('click', function () {
	      formReset();
	    });
	    form.addEventListener('submit', formSubmitHandler);
	    form.addEventListener('change', function (evt) {
	      if (evt.target.nextElementSibling) {
	        evt.target.nextElementSibling.innerHTML = '';
	      }
	    });
	  }
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(5);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var appUrl = window.appSettings.formEditEnterprise.UrlApi;
	var validNamePattern = window.appSettings.formEditEnterprise.validPatterns.name;
	var validNameMessage = window.appSettings.formEditEnterprise.validMessage.name;
	
	var body = document.querySelector('body');
	var enterprisesCarEedit = body.querySelector('#enterprises-card-edit');
	var form = enterprisesCarEedit.querySelector('#enterprises-card-edit-form');
	
	var name = form.querySelector('#enterprises-card-edit-name');
	var nameValid = form.querySelector('#enterprises-card-edit-valid');
	
	var spinner = form.querySelector('#enterprises-card-edit-spinner');
	
	var buttonSubmit = form.querySelector('#enterprises-card-edit-submit');
	var buttonCancel = form.querySelector('#enterprises-card-edit-cancel');
	var buttonClose = enterprisesCarEedit.querySelector('#enterprises-card-edit-close');
	
	var stor = _storage2.default.data;
	
	var formReset = function formReset() {
	  form.reset();
	  nameValid.innerHTML = '';
	};
	
	var callbackXhrSuccess = function callbackXhrSuccess(response) {
	
	  hideSpinner();
	  switch (response.status) {
	    case 200:
	      formReset();
	      $('#enterprises-card-edit').modal('hide');
	
	      // Вывести response.message в зеленое сообщение
	      alert(response.message);
	
	      // Сюда метод перезагрузки списка
	
	      break;
	    case 400:
	
	      // Вывести response.message в красную ошибку
	      alert(response.message);
	      break;
	  }
	};
	
	var callbackXhrError = function callbackXhrError() {
	
	  hideSpinner();
	  // Вывести window.appSettings.messages.xhrError в красную ошибку
	  alert(window.appSettings.messages.xhrError);
	};
	
	var showSpinner = function showSpinner() {
	  spinner.classList.remove('invisible');
	  buttonSubmit.disabled = true;
	  buttonCancel.disabled = true;
	};
	
	var hideSpinner = function hideSpinner() {
	  spinner.classList.add('invisible');
	  buttonSubmit.disabled = false;
	  buttonCancel.disabled = false;
	};
	
	var validateForm = function validateForm() {
	  var valid = true;
	
	  if (!validNamePattern.test(name.value)) {
	    console.log('!val');
	    valid = false;
	    nameValid.innerHTML = validNameMessage;
	  }
	  return valid;
	};
	
	var submitForm = function submitForm() {
	  var postData = 'name=' + name.value + '&token=' + stor.token;
	  var urlApp = appUrl.replace('{{dir}}', stor.directory);
	  urlApp = urlApp.replace('{{oper}}', stor.operatorId);
	  urlApp = urlApp.replace('{{id}}', _storage2.default.currentEnterpriseId);
	
	  var response = {
	    url: urlApp,
	    metod: 'PUT',
	    data: postData,
	    callbackSuccess: callbackXhrSuccess,
	    callbackError: callbackXhrError
	  };
	
	  _xhr2.default.request = response;
	};
	
	var formSubmitHandler = function formSubmitHandler(evt) {
	  evt.preventDefault();
	
	  if (validateForm()) {
	    showSpinner();
	    submitForm();
	  }
	};
	
	exports.default = {
	  start: function start() {
	
	    buttonCancel.addEventListener('click', function () {
	      formReset();
	    });
	    buttonClose.addEventListener('click', function () {
	      formReset();
	    });
	    form.addEventListener('submit', formSubmitHandler);
	    form.addEventListener('change', function (evt) {
	      if (evt.target.nextElementSibling) {
	        evt.target.nextElementSibling.innerHTML = '';
	      }
	    });
	  }
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(5);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _referencePoints = __webpack_require__(23);
	
	var _referencePoints2 = _interopRequireDefault(_referencePoints);
	
	var _tools = __webpack_require__(19);
	
	var _tools2 = _interopRequireDefault(_tools);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var loaderSpinnerId = 'loader-enterprises';
	var loaderSpinnerMessage = 'Ждем загрузки предприятий';
	var loaderSpinnerMarkup = _tools2.default.getLoadSpinner(loaderSpinnerId, loaderSpinnerMessage);
	
	var listPoints = document.querySelector('#list-points-list');
	var listPointsBody = document.querySelector('#list-points-body');
	var pointsCheckBtn = document.querySelector('#points-check');
	var pointsEditBtn = document.querySelector('#points-edit-btn');
	var pointsEditName = document.querySelector('#points-edit-name');
	
	var onSuccessPointsLoad = function onSuccessPointsLoad(loadedPoints) {
	  document.querySelector('#' + loaderSpinnerId).remove();
	  if (loadedPoints.status === 200) {
	    console.log(loadedPoints);
	    _referencePoints2.default.drawDataInContainer(loadedPoints.data);
	  } else {
	    _referencePoints2.default.drawMarkupInContainer('<p>' + loadedPoints.message + '</p>');
	  }
	};
	
	var selectedString = '';
	pointsCheckBtn.setAttribute('disabled', 'disabled');
	pointsEditBtn.setAttribute('disabled', 'disabled');
	
	var onErrorPointsLoad = function onErrorPointsLoad(error) {
	  console.log(error);
	};
	
	listPointsBody.addEventListener('change', function (evt) {
	  console.log(evt);
	  if (selectedString) {
	    selectedString.classList.remove('bg-light');
	  }
	  selectedString = evt.target.labels[0];
	  selectedString.classList.add('bg-light');
	  pointsCheckBtn.removeAttribute('disabled');
	  pointsEditBtn.removeAttribute('disabled');
	});
	
	pointsCheckBtn.addEventListener('click', function () {
	  if (!pointsCheckBtn.hasAttribute('disabled')) {
	    console.dir(selectedString);
	    console.log(selectedString.dataset);
	    _storage2.default.currentStock = selectedString.dataset.stockId;
	    pointsCheckBtn.setAttribute('disabled', 'disabled');
	    pointsEditBtn.setAttribute('disabled', 'disabled');
	    getPoints();
	  }
	});
	
	pointsEditBtn.addEventListener('click', function () {
	  if (!pointsEditBtn.hasAttribute('disabled')) {
	    console.dir(selectedString);
	    console.log(selectedString.dataset);
	    _storage2.default.currentStockId = selectedString.dataset.stockId;
	    _storage2.default.currentStockName = selectedString.dataset.stockName;
	    pointsEditName.value = selectedString.dataset.stockName;
	  }
	});
	
	var getPoints = function getPoints() {
	  _referencePoints2.default.cleanContainer();
	  _referencePoints2.default.drawMarkupInContainer(loaderSpinnerMarkup);
	  pointsCheckBtn.setAttribute('disabled', 'disabled');
	  pointsEditBtn.setAttribute('disabled', 'disabled');
	
	  _xhr2.default.request = {
	    metod: 'POST',
	    url: 'lopos_directory/' + _storage2.default.data.directory + '/operator/1/business/' + _storage2.default.data.currentBusiness + '/stock',
	    data: 'view_last=0&token=' + _storage2.default.data.token,
	    callbackSuccess: onSuccessPointsLoad,
	    callbackError: onErrorPointsLoad
	  };
	};
	
	exports.default = {
	  start: function start() {
	    listPoints.addEventListener('click', getPoints);
	  },
	
	
	  redraw: getPoints,
	
	  stop: function stop() {
	    _referencePoints2.default.cleanContainer();
	    listPoints.removeEventListener('click', getPoints);
	  }
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var listPointsBody = document.querySelector('#list-points-body');
	exports.default = {
	  cleanContainer: function cleanContainer() {
	    listPointsBody.innerHTML = '';
	  },
	  getElement: function getElement(item) {
	    var currentStockFlag = item.id === _storage2.default.data['currentStock'] ? 'V' : '';
	
	    return '\n    <input type="radio" id="' + item.id + '" name="contact" value="email" class="d-none">\n    <label id="log-row" for="' + item.id + '" class="card mb-0 p-1 rounded-0" style="width: 100%" data-stock-id="' + item.id + '" data-stock-name="' + item.name + '">\n        <div>\n          <b>ID: </b>' + item.id + ' <b>\u0418\u043C\u044F: </b>' + item.name + '\n          <div class="badge text-right float-right">\n            <span class="badge badge-pill badge-success">' + currentStockFlag + '</span>\n          </div>\n      </label>';
	  },
	  drawDataInContainer: function drawDataInContainer(enterprisesData) {
	    var _this = this;
	
	    enterprisesData.forEach(function (item) {
	      return listPointsBody.insertAdjacentHTML('beforeend', _this.getElement(item));
	    });
	  },
	  drawMarkupInContainer: function drawMarkupInContainer(markup) {
	    listPointsBody.insertAdjacentHTML('beforeend', markup);
	  }
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _xhr = __webpack_require__(5);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _storage = __webpack_require__(1);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _referenceBuyers = __webpack_require__(25);
	
	var _referenceBuyers2 = _interopRequireDefault(_referenceBuyers);
	
	var _referenceBuyersCard = __webpack_require__(26);
	
	var _referenceBuyersCard2 = _interopRequireDefault(_referenceBuyersCard);
	
	var _tools = __webpack_require__(19);
	
	var _tools2 = _interopRequireDefault(_tools);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var loaderSpinnerId = 'loader-enterprises';
	var loaderSpinnerMessage = 'Ждем загрузки предприятий';
	var loaderSpinnerMarkup = _tools2.default.getLoadSpinner(loaderSpinnerId, loaderSpinnerMessage);
	
	var listBuyers = document.querySelector('#list-buyers-list');
	var listSuppliers = document.querySelector('#list-suppliers-list');
	var listBuyersHeaderType = document.querySelector('#list-buyers-header-type');
	
	var listBuyersAddBtn = document.querySelector('#buyers-add-btn');
	var listBuyersAddForm = document.querySelector('#buyers-add-form');
	var listBuyersBody = document.querySelector('#list-buyers-body');
	var listBuyersCard = document.querySelector('#list-buyers-card');
	var listBuyersCardReturnBtn = document.querySelector('#list-buyers-card-return-btn');
	var listBuyersCardEditBtn = document.querySelector('#list-buyers-card-edit-btn');
	
	var listBuyersFormEditName = document.querySelector('#buyers-name');
	var listBuyersFormEditDescribe = document.querySelector('#buyers-describe');
	var listBuyersFormEditContact = document.querySelector('#buyers-contact');
	var listBuyersFormEditEmail = document.querySelector('#buyers-email');
	
	listBuyersAddBtn.addEventListener('click', function () {
	  listBuyersAddForm.reset();
	});
	
	listBuyersCardReturnBtn.addEventListener('click', function () {
	  listBuyersBody.classList.remove('d-none');
	  listBuyersCard.classList.add('d-none');
	  getBuyers(_storage2.default.currentKontragent);
	});
	
	var onSuccessBuyersLoad = function onSuccessBuyersLoad(loadedBuyers) {
	  document.querySelector('#' + loaderSpinnerId).remove();
	  if (loadedBuyers.status === 200) {
	    console.log(loadedBuyers);
	    _referenceBuyersCard2.default.cleanContainer();
	    _referenceBuyers2.default.drawDataInContainer(loadedBuyers.data);
	  } else {
	    _referenceBuyers2.default.drawMarkupInContainer('<p>' + loadedBuyers.message + '</p>');
	  }
	};
	
	var onErrorBuyersLoad = function onErrorBuyersLoad(error) {
	  console.log(error);
	};
	
	var onSuccessBuyerCardLoad = function onSuccessBuyerCardLoad(loadedBuyerCard) {
	  document.querySelector('#' + loaderSpinnerId).remove();
	  if (loadedBuyerCard.status === 200) {
	    console.log(loadedBuyerCard);
	    _referenceBuyersCard2.default.drawDataInContainer(loadedBuyerCard.data);
	
	    listBuyersCardEditBtn.addEventListener('click', function () {
	      listBuyersFormEditName.value = loadedBuyerCard.data.name;
	      listBuyersFormEditDescribe.value = loadedBuyerCard.data.description;
	      listBuyersFormEditContact.value = loadedBuyerCard.data.contact;
	      listBuyersFormEditEmail.value = loadedBuyerCard.data.email;
	    });
	  } else {
	    _referenceBuyersCard2.default.drawMarkupInContainer('<p>' + loadedBuyerCard.message + '</p>');
	  }
	};
	
	var onErrorBuyerCardLoad = function onErrorBuyerCardLoad(error) {
	  console.log(error);
	};
	
	var onListBuyersBodyClick = function onListBuyersBodyClick(evt) {
	  if (evt.target.tagName === 'BUTTON') {
	    listBuyersBody.classList.add('d-none');
	    listBuyersCard.classList.remove('d-none');
	    _referenceBuyersCard2.default.drawMarkupInContainer(loaderSpinnerMarkup);
	
	    _xhr2.default.request = {
	      metod: 'POST',
	      url: 'lopos_directory/' + _storage2.default.data.directory + '/operator/1/business/' + _storage2.default.data.currentBusiness + '/kontr_agent/' + evt.target.dataset.buyerId,
	      data: 'token=' + _storage2.default.data.token + '&count_doc=4&shift_doc=2',
	      callbackSuccess: onSuccessBuyerCardLoad,
	      callbackError: onErrorBuyerCardLoad
	    };
	  }
	};
	
	listBuyersBody.addEventListener('click', onListBuyersBodyClick);
	
	var getBuyers = function getBuyers(type) {
	  console.log(type);
	  listBuyersBody.classList.remove('d-none');
	  listBuyersCard.classList.add('d-none');
	  listBuyersHeaderType.innerHTML = type === 1 ? 'Поставщики' : 'Покупатели';
	  _referenceBuyers2.default.cleanContainer();
	  _referenceBuyers2.default.drawMarkupInContainer(loaderSpinnerMarkup);
	  _storage2.default.currentKontragent = type;
	
	  _xhr2.default.request = {
	    metod: 'POST',
	    url: 'lopos_directory/' + _storage2.default.data.directory + '/operator/1/business/' + _storage2.default.data.currentBusiness + '/kontr_agent',
	    data: 'view_last=0&token=' + _storage2.default.data.token + '&type=' + type,
	    callbackSuccess: onSuccessBuyersLoad,
	    callbackError: onErrorBuyersLoad
	  };
	};
	
	exports.default = {
	  start: function start() {
	    listBuyers.addEventListener('click', getBuyers.bind(null, 2));
	    listSuppliers.addEventListener('click', getBuyers.bind(null, 1));
	  },
	
	
	  redraw: getBuyers,
	
	  stop: function stop() {
	    _referenceBuyers2.default.cleanContainer();
	    listBuyers.removeEventListener('click', getBuyers);
	  }
	};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var listBuyersBody = document.querySelector('#list-buyers-body');
	// import auth from '../tools/storage.js';
	
	exports.default = {
	  cleanContainer: function cleanContainer() {
	    listBuyersBody.innerHTML = '';
	  },
	  getElement: function getElement(item) {
	    // const currentStockFlag = (item.id === auth.data['currentStock']) ? 'V' : '';
	
	    return '\n    <input type="radio" id="' + item.id + '" name="contact" value="email" class="d-none">\n    <label id="log-row" for="' + item.id + '" class="card mb-0 p-1 rounded-0" style="width: 100%" data-stock-id="' + item.id + '" data-stock-name="' + item.name + '">\n        <div>\n          <b>ID: </b>' + item.id + ' <b>\u0418\u043C\u044F: </b>' + item.name + '\n          <div class="badge text-right float-right">\n            <button type="button" class="btn btn-light" data-buyer-id="' + item.id + '"> &rarr; </button>\n          </div>\n      </label>';
	  },
	  drawDataInContainer: function drawDataInContainer(buyersBodyData) {
	    var _this = this;
	
	    buyersBodyData.forEach(function (item) {
	      return listBuyersBody.insertAdjacentHTML('beforeend', _this.getElement(item));
	    });
	  },
	  drawMarkupInContainer: function drawMarkupInContainer(markup) {
	    listBuyersBody.insertAdjacentHTML('beforeend', markup);
	  }
	};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var listBuyersCardBody = document.querySelector('#list-buyers-card-body');
	
	// import auth from '../tools/storage.js';
	
	
	var drawHeaderInContainer = function drawHeaderInContainer(data) {
	  return '\n    <div class="d-flex justify-content-between">\n      <div class="border">' + data.name + '</div>\n      <div class="border">' + data.phone + '</div>\n      <div class="border">' + data.email + '</div>\n    </div>\n    <div class="d-flex border">' + data.description + '</div>\n  ';
	};
	exports.default = {
	  cleanContainer: function cleanContainer() {
	    listBuyersCardBody.innerHTML = '';
	  },
	  getElement: function getElement(item) {
	    // const currentStockFlag = (item.id === auth.data['currentStock']) ? 'V' : '';
	
	    return '\n        <div class="border">\n          <b>ID: </b>' + item.id + '\n          <b> \u0421\u0442\u0430\u0442\u0443\u0441: </b>' + item.status + '\n          <b> \u0412\u0440\u0435\u043C\u044F: </b>' + new Date(+(item.time_activity + '000')).toLocaleString() + '\n          <b> \u0412\u0441\u0435\u0433\u043E: </b>' + item.total + '\n          <b> \u0422\u0438\u043F: </b>' + item.type + '\n        </div>\n';
	  },
	  drawDataInContainer: function drawDataInContainer(buyersCardData) {
	    var _this = this;
	
	    listBuyersCardBody.insertAdjacentHTML('beforeend', drawHeaderInContainer(buyersCardData));
	    if (buyersCardData.naklads) {
	      buyersCardData.naklads.forEach(function (item) {
	        return listBuyersCardBody.insertAdjacentHTML('beforeend', _this.getElement(item));
	      });
	    } else {
	      listBuyersCardBody.insertAdjacentHTML('beforeend', '<p class="border">Накладных нет</p>');
	    }
	  },
	  drawMarkupInContainer: function drawMarkupInContainer(markup) {
	    listBuyersCardBody.insertAdjacentHTML('beforeend', markup);
	  }
	};

/***/ })
/******/ ]);
//# sourceMappingURL=script.js.map