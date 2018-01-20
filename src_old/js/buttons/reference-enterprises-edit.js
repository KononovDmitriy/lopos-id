import xhr from './../tools/xhr.js';
import dataStorage from './../tools/storage.js';

const appUrl = window.appSettings.formEditEnterprise.UrlApi;
const validNamePattern = window.appSettings.formEditEnterprise.validPatterns.name;
const validNameMessage = window.appSettings.formEditEnterprise.validMessage.name;

const body = document.querySelector('body');
const enterprisesCarEedit = body.querySelector('#enterprises-card-edit');
const form = enterprisesCarEedit.querySelector('#enterprises-card-edit-form');

const name = form.querySelector('#enterprises-card-edit-name');
const nameValid = form.querySelector('#enterprises-card-edit-valid');

const spinner = form.querySelector('#enterprises-card-edit-spinner');

const buttonSubmit = form.querySelector('#enterprises-card-edit-submit');
const buttonCancel = form.querySelector('#enterprises-card-edit-cancel');
const buttonClose = enterprisesCarEedit.querySelector('#enterprises-card-edit-close');

const stor = dataStorage.data;

const formReset = () => {
  form.reset();
  nameValid.innerHTML = '';
};

const callbackXhrSuccess = (response) => {

  hideSpinner();
  switch (response.status) {
  case 200:
    formReset();
    $('#enterprises-card-edit').modal('hide');

    // Вывести response.message в зеленое сообщение
    alert(response.message);

    // Сюда метод перезагрузки списка

    break;
  case 400:

    // Вывести response.message в красную ошибку
    alert(response.message);
    break;
  }
};

const callbackXhrError = () => {

  hideSpinner();
  // Вывести window.appSettings.messages.xhrError в красную ошибку
  alert(window.appSettings.messages.xhrError);
};

const showSpinner = () => {
  spinner.classList.remove('invisible');
  buttonSubmit.disabled = true;
  buttonCancel.disabled = true;
};

const hideSpinner = () => {
  spinner.classList.add('invisible');
  buttonSubmit.disabled = false;
  buttonCancel.disabled = false;
};

const validateForm = () => {
  let valid = true;

  if (!validNamePattern.test(name.value)) {
    console.log('!val');
    valid = false;
    nameValid.innerHTML = validNameMessage;
  }
  return valid;
};

const submitForm = () => {
  let postData = `name=${name.value}&token=${stor.token}`;
  let urlApp = appUrl.replace('{{dir}}', stor.directory);
  urlApp = urlApp.replace('{{oper}}', stor.operatorId);
  urlApp = urlApp.replace('{{id}}', dataStorage.currentEnterpriseId);

  let response = {
    url: urlApp,
    metod: 'PUT',
    data: postData,
    callbackSuccess: callbackXhrSuccess,
    callbackError: callbackXhrError
  };

  xhr.request = response;
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  if (validateForm()) {
    showSpinner();
    submitForm();
  }
};

export default {
  start() {

    buttonCancel.addEventListener('click', () => {
      formReset();
    });
    buttonClose.addEventListener('click', () => {
      formReset();
    });
    form.addEventListener('submit', formSubmitHandler);
    form.addEventListener('change', (evt) => {
      if (evt.target.nextElementSibling) {
        evt.target.nextElementSibling.innerHTML = '';
      }
    });
  }
};
