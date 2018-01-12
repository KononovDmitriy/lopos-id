import xhr from './../tools/xhr.js';
import dataStorage from './../tools/storage.js';
import mainWindow from './main_login_window.js';

const kodVal = window.appSettings.confirmEmailKodValid;
const urlApi = window.appSettings.confirmEmailUrlApi;

let callbackXhrSuccess = function (response) {

  if (response.status === 200) {
    if (response.data.status === '0') {
      mainWindow.setAlert(response.message, 'message');
      mainWindow.init();
    } else {
      dataStorage.data = response.data;
      document.dispatchEvent(new Event('loginSuccess'));
    }
  } else {
    mainWindow.setAlert(response.message, 'error');
  }
};

let validateForm = function (kod) {

  if (kodVal.test(kod)) {
    return true;
  }
  mainWindow.setError('emailConfirmInputKey', 'Неверный формат кода!');
  return false;
};

let getRequestData = function (kod, email) {

  let requestData = `email=${email}&validate_code=${kod}&preferable_language=ru`;
  return {
    url: urlApi,
    metod: 'POST',
    data: requestData,
    callbackSuccess: callbackXhrSuccess,
    callbackError: window.callbackXhrError
  };
};


let submitForm = function (kod, email) {
  xhr.request = getRequestData(kod, email);
};


export default {
  submit(kod, email) {
    submitForm(kod, email);
  },

  validate(kod) {
    return validateForm(kod);
  }
};
