import xhr from './../tools/xhr.js';
import dataStorage from './../tools/storage.js';
import form from './form_login.js';
import mainWindow from './main_login_window.js';

const validId = window.appSettings.loginValid.id;
const validEmail = window.appSettings.loginValid.email;
const validPassword = window.appSettings.loginValid.password;

let callbackXhrSuccess = function (response) {
  form.addCaptchaCount();
  mainWindow.hideProgress('loginButtonSubmit', 'loginProgress');

  if (response.status === 200) {
    if (response.data.status === '0') {
      mainWindow.setAlert('Ваш пользователь заблокирован, обратитесь к администратору', 'message');
    } else {
      dataStorage.data = response.data;
      document.dispatchEvent(new Event('loginSuccess'));
    }
  } else {
    mainWindow.setAlert(response.message, 'error');
  }
};

let callbackXhrError = function (response) {
  mainWindow.hideProgress('loginButtonSubmit', 'loginProgress');
  mainWindow.setAlert('Ошибка связи', 'error');
};

let getRequestDataEmail = function (userLogin, userPassword) {
  let dataApi = `email=${userLogin}&deviceToken=-&password=${userPassword}`;
  return {
    url: window.appSettings.loginUrlApi.email,
    metod: 'POST',
    data: dataApi,
    callbackSuccess: callbackXhrSuccess,
    callbackError: callbackXhrError
  };
};

let getRequestDataId = function (userLogin, userPassword) {

  let folder = userLogin.substr(0, 8);
  let operator = userLogin.substr(8);

  let urlApi = window.appSettings.loginUrlApi.id.replace('{{dir}}', folder);
  let dataApi = `operator=${operator}&deviceToken=-&password=${userPassword}`;

  return {
    url: urlApi,
    metod: 'POST',
    data: dataApi,
    callbackSuccess: callbackXhrSuccess,
    callbackError: window.callbackXhrError
  };
};

let validateData = function (template, data) {

  if (template.test(data)) {
    return true;
  }

  return false;
};

let validateForm = function (userLogin, userPassword) {

  let valid = true;

  if (!validateData(validEmail, userLogin)) {
    if (!validateData(validId, userLogin)) {
      valid = false;
      mainWindow.setError('loginLogin', 'Неверный формат логина');
    }
  }

  if (!validateData(validPassword, userPassword)) {
    valid = false;
    mainWindow.setError('loginPassword', 'Пароль должен быть длиннее 3-х символов');
  }

  return valid;
};

let submitForm = function (userLogin, userPassword, isEmail) {
  if (validateData(validEmail, userLogin)) {
    xhr.request = getRequestDataEmail(userLogin, userPassword);
  } else {
    xhr.request = getRequestDataId(userLogin, userPassword);
  }

};

export default {

  submit(login, password) {
    submitForm(login, password);
  },

  validate(login, password) {
    return validateForm(login, password);
  }

};
