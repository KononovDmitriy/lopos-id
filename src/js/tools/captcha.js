import formRegister from './../login/form_register.js';
import formLogin from './../login/form_login.js';
import formConfirmEmail from './../login/form_confirm_email.js';
import formForgot from './../login/form_forgot.js';

export default {

  init() {
    window.captchaOnLoadCallback = function () {
      console.log('Капча загружена');
      window.captchaOnLoad = true;

      formLogin.setCaptcha();
      formRegister.setCaptcha();
      formConfirmEmail.setCaptcha();
      formForgot.setCaptcha();
    };
  },

  captchaExec(captchaId) {
    window.grecaptcha.execute(captchaId);
    console.log('капча выполнена');
  },

  catchaReset(captchaId) {
    window.grecaptcha.reset(captchaId);
  },

  getCaptcha(elementId, callback) {
    return window.grecaptcha.render(elementId, {
      'size': 'invisible',
      'sitekey': window.appSettings.reCaptchaSiteKey,
      'callback': callback
    });
  }
};