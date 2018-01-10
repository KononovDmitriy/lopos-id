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
  console.log('registerCallback');
  forgot.submit(forgotInputEmail.value);

};

forgotForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (forgot.validate(forgotInputEmail.value)) {

    if (captchaId !== 'NO') {
      console.log('captchaEXEC');
      captcha.captchaExec(captchaId);
    } else {
      console.log('SUBMIT');
      forgot.submit(forgotInputEmail.value);
    }

  }

});

forgotButtonCancel.addEventListener('click', function () {
  mainWindow.firstScreen();
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
  },

  submitForm() {
    forgot.submit(forgotInputEmail.value);
  },

  setCaptcha() {
    captchaId = captcha.getCaptcha(forgotCaptcha, captchaCallback);
    console.log('setCaptcha id = ' + captchaId);
  },

};
