import xhr from './../tools/xhr.js';
import formConfirmEmail from './form_confirm_email.js';
import dataStorage from './../tools/storage.js';

const kodVal = window.appSettings.confirmEmailKodValid;
const urlApi = window.appSettings.confirmEmailUrlApi;

let callbackXhrSuccess = function (response) {

  if (response.status === 200) {
    if (response.data.status === '0') {
      alert('Ваш пользователь заблокирован, обратитесь к администратору');
      // сброс на страницу загрузки
    } else {
      dataStorage.data = response.data;
    // Загрузка приложения
    }
  } else {
    // показ ошибки
    alert(response.message);
  }
};

let callbackXhrError = function (response) {
  // показ ошибки
  alert('error');
};

let validateForm = function (kod) {

  if (kodVal.test(kod)) {
    return true;
  }
  formConfirmEmail.setError('Неверный формат кода!');
  return false;
};

let getRequestData = function (kod, email) {

  let requestData = `email=${email}&validate_code=${kod}&preferable_language=ru`;
  return {
    url: urlApi,
    metod: 'POST',
    data: requestData,
    callbackSuccess: callbackXhrSuccess,
    callbackError: callbackXhrError
  };
};


let submitForm = function (kod, email) {
  xhr.request = getRequestData(kod, email);
};


export default {
  submit(kod, email) {

    if (validateForm(kod)) {
      submitForm(kod, email);
    }

  }
};
