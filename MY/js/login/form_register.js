import mainWindow from './main_login_window.js';
import register from './register.js';
import captcha from './../tools/captcha.js';

const sectionRegister = document.querySelector('#sectionRegister');
const registerForm = sectionRegister.querySelector('#registerForm');
const registerButtonCancel = registerForm.querySelector('#registerButtonCancel');
const registerUserAgreement = document.querySelector('#registerUserAgreement');
const registerCaptcha = sectionRegister.querySelector('#registerCaptcha');

const inputFields = {
  'name': registerForm.querySelector('#registerInputName'),
  'email': registerForm.querySelector('#registerInputEmail'),
  'password': registerForm.querySelector('#registerInputPassword'),
  'confirm': registerForm.querySelector('#registerInputConfirmPassword')
};

let captchaId = 'NO';

let captchaCallback = function () {

  if (captcha.getResponse(captchaId)) {
    captcha.catchaReset(captchaId);
  }

  register.submit(inputFields.name.value, inputFields.email.value, inputFields.password.value);

};

registerForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (register.validate(inputFields.name.value, inputFields.email.value, inputFields.password.value,
    inputFields.confirm.value, registerUserAgreement.checked)) {

    if (captchaId !== 'NO') {
      captcha.captchaExec(captchaId);
    } else {
      register.submit(inputFields.name.value, inputFields.email.value, inputFields.password.value);
    }

  }

});

registerButtonCancel.addEventListener('click', function () {
  mainWindow.firstScreen();
});

export default {

  setError(target, msg) {
    inputFields[target].setCustomValidity(msg);
  },

  show() {
    sectionRegister.classList.remove('d-none');
  },

  hide() {
    sectionRegister.classList.add('d-none');
  },

  reset() {
    registerForm.reset();
    inputFields.name.setCustomValidity('');
    inputFields.email.setCustomValidity('');
    inputFields.password.setCustomValidity('');
    inputFields.confirm.setCustomValidity('');

    if (captchaId !== 'NO') {
      captcha.catchaReset(captchaId);
    }
  },

  submitForm() {
    register.submit(inputFields.name.value, inputFields.email.value, inputFields.password.value,
      inputFields.confirm.value, registerUserAgreement.checked);
  },

  setCaptcha() {
    captchaId = captcha.getCaptcha(registerCaptcha, captchaCallback);
  },
};
