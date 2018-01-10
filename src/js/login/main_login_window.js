import formLogin from './form_login.js';
import formRegister from './form_register.js';
import formConfirmEmail from './form_confirm_email.js';
import formForgot from './form_forgot.js';
import captcha from './../tools/captcha.js';

const sectionLoginFormMain = document.querySelector('#sectionLoginFormMain');

console.log('v27');

captcha.init();

sectionLoginFormMain.addEventListener('change', function (event) {
  event.target.setCustomValidity('');
});

export default {

  firstScreen() {
    formConfirmEmail.reset();
    formRegister.reset();
    formForgot.reset();
    formLogin.reset();
    formConfirmEmail.hide();
    formRegister.hide();
    formForgot.hide();
    formLogin.show();
  },

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
  }

};