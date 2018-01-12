import formLogin from './form_login.js';
import formRegister from './form_register.js';
import formConfirmEmail from './form_confirm_email.js';
import formForgot from './form_forgot.js';
import captcha from './../tools/captcha.js';

const sectionLoginFormMain = document.querySelector('#sectionLoginFormMain');
const globalAlert = document.querySelector('#globalAlert');

const inputFields = {
  'loginLogin': sectionLoginFormMain.querySelector('#loginInputLogin'),
  'loginPassword': sectionLoginFormMain.querySelector('#loginInputPassword'),
  'registerLogin': sectionLoginFormMain.querySelector('#registerInputName'),
  'registerEmail': sectionLoginFormMain.querySelector('#registerInputEmail'),
  'registerPassword': sectionLoginFormMain.querySelector('#registerInputPassword'),
  'registerConfirm': sectionLoginFormMain.querySelector('#registerInputConfirmPassword'),
  'registerUserAgreement': sectionLoginFormMain.querySelector('#registerUserAgreement'),
  'emailConfirmInputKey': sectionLoginFormMain.querySelector('#emailConfirmInputKey'),
  'forgotInputEmail': sectionLoginFormMain.querySelector('#forgotInputEmail'),
};

const inputFieldsErrors = {
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

const progressBar = {
  'loginProgress': sectionLoginFormMain.querySelector('#registerInputName'),
  'registerProgress': sectionLoginFormMain.querySelector('#registerProgress'),
  'confirmProgress': sectionLoginFormMain.querySelector('#confirmProgress'),
  'forgotButtonSubmit': sectionLoginFormMain.querySelector('#forgotButtonSubmit')
};

const buttons = {
  'loginButtonSubmit': sectionLoginFormMain.querySelector('#loginButtonSubmit'),
  'registerButtonSubmit': sectionLoginFormMain.querySelector('#registerButtonSubmit'),
  'emailConfirmButtonSubmit': sectionLoginFormMain.querySelector('#emailConfirmButtonSubmit'),
  'forgotButtonSubmit': sectionLoginFormMain.querySelector('#forgotButtonSubmit')
};

let setGlobalAlert = function (msg, type) {
  let msgType;
  let msgClass;
  if (type === 'error') {
    msgType = 'ОШИБКА! ';
    msgClass = 'alert-danger';
  }

  if (type === 'message') {
    msgType = 'СООБЩЕНИЕ! ';
    msgClass = 'alert-success';
  }

  globalAlert.innerHTML = globalAlert.innerHTML + `<div id="globalAlert" class="alert ${msgClass} fade show" role="alert">
      <strong>${msgType} </strong> ${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`;
};

sectionLoginFormMain.addEventListener('change', function (event) {

  inputFieldsErrors[event.target.dataset.erreset].innerHTML = '';
  event.target.classList.remove('border');
  event.target.classList.remove('border-danger');
});


document.addEventListener('logoutSuccess', function () {
  formInit();
});


let formInit = function () {
  formConfirmEmail.reset();
  formRegister.reset();
  formForgot.reset();
  formLogin.reset();
  formConfirmEmail.hide();
  formRegister.hide();
  formForgot.hide();
  formLogin.show();
};

window.callbackXhrError = function (response) {

  setGlobalAlert('Ошибка связи', 'error');
};

console.log('v47');

captcha.init();

export default {

  init: formInit,

  confirmEmail() {
    formRegister.hide();
    formConfirmEmail.show();
  },

  register() {
    formLogin.hide();
    formRegister.show();
  },

  forgot() {
    formLogin.hide();
    formForgot.show();
  },

  setError(target, msg) {
    inputFieldsErrors[target].innerHTML = msg;
    inputFields[target].classList.add('border');
    inputFields[target].classList.add('border-danger');
  },

  setAlert: setGlobalAlert,

  showProgress(button, progress) {
    progressBar[progress].classList.remove('invisible');
    buttons[button].disable = true;
  }
};
