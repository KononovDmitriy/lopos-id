import xhr from './../tools/xhr.js';
import form from './form_login.js';

const emailVal = window.appSettings.forgotEmailValid;
const urlApi = window.appSettings.forgotUrlApi;

let callbackXhrSuccess = function (response) {
  console.dir(response);

  if (response.status === 400) {
    alert(response.message);
    // Возврат в окно входа
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
  form.setForgotError('Введите корректный email');
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

    if (validateForm(email)) {
      submitForm(email);
    }

  }
};
