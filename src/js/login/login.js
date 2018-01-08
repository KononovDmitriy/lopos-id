import xhr from './../tools/xhr.js';
import dataStorage from './../tools/storage.js';
import form from './form_login.js';

const validId = window.appSettings.loginValid.id;
const validEmail = window.appSettings.loginValid.email;
const validPassword = window.appSettings.loginValid.password;


// let capcha = 0;

let callbackXhrSuccess = function (response) {
  console.dir(response);
  if (response.status === 200) {
    if (response.data.status === '0') {
      alert('Ваш пользователь заблокирован, обратитесь к администратору');
      // сброс на страницу загрузки
    } else {
      dataStorage.data = response.data;
      // Загрузка приложения
    }
  } else {
    // capcha++;
    // показ ошибки
    alert(response.message);
  }
};

let callbackXhrError = function (response) {
  alert('error');
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
    callbackError: callbackXhrError
  };
};

let submitForm = function (userLogin, userPassword, isEmail) {
  if (isEmail) {
    xhr.request = getRequestDataEmail(userLogin, userPassword);
  } else {
    xhr.request = getRequestDataId(userLogin, userPassword);
  }

};

let validateData = function (template, data) {

  if (template.test(data)) {
    return true;
  }

  return false;
};

let validateForm = function (userLogin, userPassword) {

  let valid = {
    valid: true,
    loginEmail: true
  };

  if (!validateData(validEmail, userLogin)) {
    valid.loginEmail = false;
    if (!validateData(validId, userLogin)) {
      valid.valid = false;
      form.setError('login', 'Неверный формат логина');
    }
  }

  if (!validateData(validPassword, userPassword)) {
    valid.valid = false;
    form.setError('password', 'Пароль должен быть длиннее 3-х символов');
  }

  return valid;
};

export default {

  submit(login, password) {

    // if (capcha === 3) {
    //   form.showLoginCaptcha();
    // }

    login = login.toLowerCase();
    login = login.replace(/-/g, '');

    let valid = validateForm(login, password);

    if (valid.valid) {
      submitForm(login, password, valid.loginEmail);
    }

  }

};
