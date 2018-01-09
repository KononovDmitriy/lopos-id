import mainWindow from './main_login_window.js';
import login from './login.js';
import captcha from './../tools/captcha.js';

const sectionLogin = document.querySelector('#sectionLogin');
const loginForm = sectionLogin.querySelector('#loginForm');
const loginButtonRegister = loginForm.querySelector('#loginButtonRegister');
const loginButtonForgot = loginForm.querySelector('#loginButtonForgot');

const inputFields = {
  'login': loginForm.querySelector('#loginInputLogin'),
  'password': loginForm.querySelector('#loginInputPassword')
};

const BUTTON_SUBMIT_ID = 'loginButtonSubmit';

let captchaCount = 0;
let captchaId;

let captchaCallback = function () {

  console.log('login catcha id = ' + captchaId);
  window.grecaptcha.reset(captchaId);
  login.submit(inputFields.login.value, inputFields.password.value);
};

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  login.submit(inputFields.login.value, inputFields.password.value);

  if (captchaCount >= 2 && window.captchaOnLoad) {
    captchaId = captcha.getCaptcha(BUTTON_SUBMIT_ID, captchaCallback);
  }

});

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
  },

  addCaptchaCount() {
    captchaCount++;
  }
};
