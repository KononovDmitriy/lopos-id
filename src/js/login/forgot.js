// import mainWindow from './main_login_window.js';
import xhr from './../tools/xhr.js';
import formForgot from './form_forgot.js';

const emailVal = window.appSettings.forgotEmailValid;
const urlApi = window.appSettings.forgotUrlApi;

let callbackXhrSuccess = function (response) {
  console.dir(response);

  if (response.status === 400) {
    alert(response.message);
  } else {
    // показ ошибки
    alert('Ошибка восстановления пароля');
  }
};

let callbackXhrError = function (response) {
  // показ ошибки
  alert('error');
};

let validateForm = function (email) {

  if (emailVal.test(email)) {
    return true;
  }
  formForgot.setError('Введите корректный email');
  return false;
};

let getRequestData = function (email) {

  let requestData = `email=${email}`;
  return {
    url: urlApi,
    metod: 'POST',
    data: requestData,
    callbackSuccess: callbackXhrSuccess,
    callbackError: callbackXhrError
  };
};


let submitForm = function (email) {
  xhr.request = getRequestData(email);
};

export default {
  submit(email) {
    submitForm(email);
  },

  validate(email) {
    return validateForm(email);
  }
};
