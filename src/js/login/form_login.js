import mainWindow from './main_login_window.js';
import login from './login.js';
import captcha from './../tools/captcha.js';

const sectionLogin = document.querySelector('#sectionLogin');
const loginForm = sectionLogin.querySelector('#loginForm');
const loginButtonRegister = loginForm.querySelector('#loginButtonRegister');
const loginButtonForgot = loginForm.querySelector('#loginButtonForgot');
const loginCaptcha = loginForm.querySelector('#loginCaptcha');

const inputFields = {
  'login': loginForm.querySelector('#loginInputLogin'),
  'password': loginForm.querySelector('#loginInputPassword')
};

let captchaCount = 0;
let captchaId = 'NO';
let userLogin;

let captchaCallback = function () {
  console.log('loginCallback');
  // captcha.catchaReset(captchaId);
  login.submit(userLogin, inputFields.password.value);
};

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  userLogin = formatLogin(inputFields.login.value);

  if (login.validate(userLogin, inputFields.password.value)) {

    if (captchaId !== 'NO' && captchaCount >= 2) {
      console.log('captchaEXEC');
      captcha.captchaExec(captchaId);
    } else {
      console.log('SUBMIT');
      login.submit(userLogin, inputFields.password.value);
    }
  }
});

let formatLogin = function (userlogin) {
  userlogin = userlogin.toLowerCase();
  userlogin = userlogin.replace(/-/g, '');
  return userlogin;
};

loginButtonRegister.addEventListener('click', function () {
  mainWindow.register();
});

loginButtonForgot.addEventListener('click', function () {
  mainWindow.forgot();
});

export default {

  setError(target, msg) {
    inputFields[target].setCustomValidity(msg);
  },

  show() {
    sectionLogin.classList.remove('d-none');
  },

  hide() {
    sectionLogin.classList.add('d-none');
  },

  reset() {
    loginForm.reset();
    inputFields.login.setCustomValidity('');
    inputFields.password.setCustomValidity('');

    if (captchaId !== 'NO') {
      captcha.catchaReset(captchaId);
    }
  },

  addCaptchaCount() {
    captchaCount++;
  },

  setCaptcha() {
    captchaId = captcha.getCaptcha(loginCaptcha, captchaCallback);
    console.log('setCaptcha id = ' + captchaId);
  },
};
