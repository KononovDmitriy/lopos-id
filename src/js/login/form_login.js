import login from './login.js';
import register from './register.js';
import confirmEmail from './confirm_email.js';
import forgot from './forgot.js';

const sectionLoginFormMain = document.querySelector('#sectionLoginFormMain');

const sectionLogin = sectionLoginFormMain.querySelector('#sectionLogin');
const loginForm = sectionLogin.querySelector('#loginForm');
const loginButtonRegister = loginForm.querySelector('#loginButtonRegister');
const loginInputLogin = loginForm.querySelector('#loginInputLogin');
const loginInputPassword = loginForm.querySelector('#loginInputPassword');
const loginCaptcha = loginForm.querySelector('#loginCaptcha');
const loginButtonForgot = loginForm.querySelector('#loginButtonForgot');

const sectionRegister = sectionLoginFormMain.querySelector('#sectionRegister');
const registerForm = sectionRegister.querySelector('#registerForm');
const registerButtonCancel = registerForm.querySelector('#registerButtonCancel');
const registerInputName = registerForm.querySelector('#registerInputName');
const registerInputEmail = registerForm.querySelector('#registerInputEmail');
const registerInputPassword = registerForm.querySelector('#registerInputPassword');
const registerInputConfirmPassword = registerForm.querySelector('#registerInputConfirmPassword');
const registerUserAgreement = sectionLoginFormMain.querySelector('#registerUserAgreement');

const sectionConfirmEmail = sectionLoginFormMain.querySelector('#sectionConfirmEmail');
const emailConfirmForm = sectionConfirmEmail.querySelector('#emailConfirmForm');
const emailConfirmInputKey = emailConfirmForm.querySelector('#emailConfirmInputKey');
const emailConfirmButtonCancel = emailConfirmForm.querySelector('#emailConfirmButtonCancel');

const sectionForgot = sectionLoginFormMain.querySelector('#sectionForgot');
const forgotForm = sectionForgot.querySelector('#forgotForm');
const forgotInputEmail = forgotForm.querySelector('#forgotInputEmail');
const forgotButtonCancel = forgotForm.querySelector('#forgotButtonCancel');


sectionLoginFormMain.addEventListener('change', function (event) {
  event.target.setCustomValidity('');
});

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  login.submit(loginInputLogin.value, loginInputPassword.value);
});

registerForm.addEventListener('submit', function (event) {
  event.preventDefault();
  register.submit(registerInputName.value, registerInputEmail.value,
     registerInputPassword.value, registerInputConfirmPassword.value, registerUserAgreement.checked);
});

emailConfirmForm.addEventListener('submit', function (event) {
  event.preventDefault();
  confirmEmail.submit(emailConfirmInputKey.value, registerInputEmail.value);
});

forgotForm.addEventListener('submit', function (event) {
  event.preventDefault();
  forgot.submit(forgotInputEmail.value);
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


export default {

  setLoginInputLoginError(msg) {
    loginInputLogin.setCustomValidity(msg);
  },

  setLoginInputPasswordError(msg) {
    loginInputPassword.setCustomValidity(msg);
  },

  showLoginCaptcha() {
    loginCaptcha.classList.remove('d-none');
  },

  setRegisterInputNameError(msg) {
    registerInputName.setCustomValidity(msg);
  },

  setRegisterInputEmailError(msg) {
    registerInputEmail.setCustomValidity(msg);
  },

  setRegisterInputPasswordError(msg) {
    registerInputPassword.setCustomValidity(msg);
  },

  setRegisterInputConfirmPasswordError(msg) {
    registerInputConfirmPassword.setCustomValidity(msg);
  },

  setConfirmEmailError(msg) {
    emailConfirmInputKey.setCustomValidity(msg);
  },

  setForgotError(msg) {
    forgotInputEmail.setCustomValidity(msg);
  },


  showSubmitEmail() {
    sectionRegister.classList.add('d-none');
    sectionConfirmEmail.classList.remove('d-none');
  }

};
