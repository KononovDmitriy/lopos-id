import mainWindow from './main_login_window.js';
import forgot from './forgot.js';
import captcha from './../tools/captcha.js';

const sectionForgot = document.querySelector('#sectionForgot');
const forgotForm = sectionForgot.querySelector('#forgotForm');
const forgotInputEmail = forgotForm.querySelector('#forgotInputEmail');
const forgotButtonCancel = forgotForm.querySelector('#forgotButtonCancel');

const forgotCaptcha = forgotForm.querySelector('#forgotCaptcha');

let captchaId = 'NO';

let captchaCallback = function () {

  if (captcha.getResponse(captchaId)) {
    captcha.catchaReset(captchaId);
  }

  forgot.submit(forgotInputEmail.value);

};

forgotForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (forgot.validate(forgotInputEmail.value)) {

    if (captchaId !== 'NO') {
      captcha.captchaExec(captchaId);
    } else {
      forgot.submit(forgotInputEmail.value);
    }

  }

});

forgotButtonCancel.addEventListener('click', function () {
  mainWindow.init();
});

export default {

  setError(msg) {
    forgotInputEmail.setCustomValidity(msg);
  },

  show() {
    sectionForgot.classList.remove('d-none');
  },

  hide() {
    sectionForgot.classList.add('d-none');
  },

  reset() {
    forgotForm.reset();
    forgotInputEmail.setCustomValidity('');

    if (captchaId !== 'NO') {
      captcha.catchaReset(captchaId);
    }
  },

  submitForm() {
    forgot.submit(forgotInputEmail.value);
  },

  setCaptcha() {
    captchaId = captcha.getCaptcha(forgotCaptcha, captchaCallback);
  },

};
