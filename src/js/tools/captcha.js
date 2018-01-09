
export default {

  init() {
    window.captchaCallback = function () {
      console.log('captcha callback');
    },


    window.captchaOnLoadCallback = function () {
      const loginButtonSubmit = document.querySelector('#loginButtonSubmit');

      console.log('Капча загружена');
      grecaptcha.render('loginButtonSubmit', {
        'sitekey' : '',
        'callback' : captchaCallback
      });
    };
  }


};
