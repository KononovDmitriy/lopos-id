import formLogin from './../login/form_login.js';
import formRegister from './../login/form_register.js';
import formEmail from './../login/form_confirm_email.js';
import formForgot from './../login/form_forgot.js';

// const BUTTON_SUBMIT_LOGIN_ID = 'loginButtonSubmit';
const BUTTON_SUBMIT_REGISTER_ID = 'registerButtonSubmit';
const BUTTON_SUBMIT_EMAIL_ID = 'emailConfirmButtonSubmit';
const BUTTON_SUBMIT_FORGOT_ID = 'forgotButtonSubmit';

// let captchaLoginId;
let captchaRegisterId;
let captchaEmailId;
let captchaForgotId;

// let captchaLoginCallback = function () {

// };

let captchaRegisterCallback = function () {
  console.log('register id = ' + captchaRegisterId);

  formRegister.submitForm();
};

let captchaEmailCallback = function () {
  console.log('email id = ' + captchaEmailId);

  formEmail.submitForm();

};

let captchaForgotCallback = function () {
  console.log('forgot id = ' + captchaForgotId);

  formForgot.submitForm();

};

export default {

  init() {

    window.captchaOnLoadCallback = function () {
      console.log('Капча загружена');

      // captchaLoginId = window.grecaptcha.render(BUTTON_SUBMIT_LOGIN_ID,
      //   {
      //     'sitekey': window.appSettings.reCaptchaSiteKey,
      //     'callback': captchaLoginCallback
      //   });

      captchaRegisterId = window.grecaptcha.render(BUTTON_SUBMIT_REGISTER_ID,
        {
          'sitekey': window.appSettings.reCaptchaSiteKey,
          'callback': captchaRegisterCallback
        });

      captchaEmailId = window.grecaptcha.render(BUTTON_SUBMIT_EMAIL_ID,
        {
          'sitekey': window.appSettings.reCaptchaSiteKey,
          'callback': captchaEmailCallback
        });

      captchaForgotId = window.grecaptcha.render(BUTTON_SUBMIT_FORGOT_ID,
        {
          'sitekey': window.appSettings.reCaptchaSiteKey,
          'callback': captchaForgotCallback
        });

      window.captchaOnLoad = true;
    };
  },

  getCaptcha(formId, callback) {
    if (window.captchaOnLoad) {
      return window.grecaptcha.render(formId, {
        'sitekey': window.appSettings.reCaptchaSiteKey,
        'callback': callback
      });
    }
    return false;
  }
};
