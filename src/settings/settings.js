window.appSettings = {

  xhrSettings: {
// Ссылка на апи
    urlApi: 'https://lopos.bidone.ru/api/v1/',
// Задержка
    timeout: 10000,
// Кодировка
    contentType: 'application/x-www-form-urlencoded',
  },

  loginValid: {
    email: /@/,
    id: /^[0-9a-z]{8,}1$/,
    password: /.{3,}/
  },

  loginUrlApi: {
    email: 'user_boss/login',
    id: 'lopos_directory/{{dir}}/authorization/login'
  },

  registerValid: {
    email: /@/,
    password: /.{3,}/,
    name: /^[а-яёА-ЯЁA-Za-z\s]+$/
  },

  registerUrlApi: 'user_boss/registration',

  confirmEmailKodValid: /[\d]{4}/,

  confirmEmailUrlApi: 'user_boss/submit_registration',

  forgotUrlApi: 'user_boss/forgot',
  forgotEmailValid: /@/
};
