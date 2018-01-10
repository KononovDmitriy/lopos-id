import mainWindow from './main_login_window.js';
import confirmEmail from './confirm_email.js';
import captcha from './../tools/captcha.js';

const sectionConfirmEmail = document.querySelector('#sectionConfirmEmail');
const emailConfirmForm = sectionConfirmEmail.querySelector('#emailConfirmForm');
const emailConfirmInputKey = emailConfirmForm.querySelector('#emailConfirmInputKey');
const emailConfirmButtonCancel = emailConfirmForm.querySelector('#emailConfirmButtonCancel');
const emailConfirmCaptcha = sectionConfirmEmail.querySelector('#emailConfirmCaptcha');

const registerInputEmail = document.querySelector('#registerInputEmail');

let captchaId = 'NO';

let captchaCallback = function () {
  console.log('registerCallback');
  confirmEmail.submit(emailConfirmInputKey.value, registerInputEmail.value);
};

emailConfirmForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (confirmEmail.validate(emailConfirmInputKey.value)) {

    if (captchaId !== 'NO') {
      console.log('captchaEXEC');
      captcha.captchaExec(captchaId);
    } else {
      console.log('SUBMIT');
      confirmEmail.submit(emailConfirmInputKey.value, registerInputEmail.value);
    }

  }
});

emailConfirmButtonCancel.addEventListener('click', function () {
  mainWindow.firstScreen();
});

export default {

  setError(msg) {
    emailConfirmInputKey.setCustomValidity(msg);
  },

  show() {
    sectionConfirmEmail.classList.remove('d-none');
  },

  hide() {
    sectionConfirmEmail.classList.add('d-none');
  },

  reset() {
    emailConfirmForm.reset();
    emailConfirmInputKey.setCustomValidity('');

    if (captchaId !== 'NO') {
      captcha.catchaReset(captchaId);
    }
  },

  submitForm() {
    confirmEmail.submit(emailConfirmInputKey.value, registerInputEmail.value);
  },

  setCaptcha() {
    captchaId = captcha.getCaptcha(emailConfirmCaptcha, captchaCallback);
    console.log('setCaptcha id = ' + captchaId);
  }
};
