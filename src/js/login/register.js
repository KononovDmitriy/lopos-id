import xhr from './../tools/xhr.js';
import form from './form_login.js';

const regVal = window.appSettings.registerValid;
const regUrlApi = window.appSettings.registerUrlApi;

let callbackXhrSuccess = function (response) {
  console.dir(response);

  switch (response.status) {

  case 200:
    form.showSubmitEmail();
    break;
  case 400:
    alert(response.message);
    break;
  }
};

let callbackXhrError = function (response) {
  alert('error');
};

let validateName = function (name) {

  if (regVal.name.test(name)) {
    return true;
  }
  return false;

};

let validateEmail = function (email) {

  if (regVal.email.test(email)) {
    return true;
  }
  return false;

};

let validatePassword = function (password) {

  if (regVal.password.test(password)) {
    return true;
  }
  return false;

};

let validateConfirm = function (password, confirm) {

  if (password !== confirm || confirm === '') {
    return false;
  }
  return true;

};

let validateForm = function (name, email, password, confirm, userAgreement) {
  let valid = true;

  if (!validateName(name)) {
    form.setRegisterInputNameError('Имя!');
    valid = false;
  }

  if (!validateEmail(email)) {
    form.setRegisterInputEmailError('Почта!');
    valid = false;
  }

  if (!validatePassword(password)) {
    form.setRegisterInputPasswordError('Пароль!');
    valid = false;
  }

  if (!validateConfirm(password, confirm)) {
    form.setRegisterInputConfirmPasswordError('Не совпадает!');
    valid = false;
  }

  if (!userAgreement) {
    alert('Соглашение!');
    valid = false;
  }

  return valid;
};

let getRequestData = function (name, email, password) {
  let requestData = `email=${email}&phone=&password=${password}&nickname=${name}&prefer_language=ru`;
  return {
    url: regUrlApi,
    metod: 'POST',
    data: requestData,
    callbackSuccess: callbackXhrSuccess,
    callbackError: callbackXhrError
  };
};

let submitForm = function (name, email, password) {
  xhr.request = getRequestData(name, email, password);
};


export default {
  submit(name, email, password, confirm, userAgreement) {
    if (validateForm(name, email, password, confirm, userAgreement)) {
      submitForm(name, email, password);
    }
  }
};
