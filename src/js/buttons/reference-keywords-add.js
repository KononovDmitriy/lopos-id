import xhr from './../tools/xhr.js';
import dataStorage from './../tools/storage.js';
import keywordsButton from './reference-keywords.js';

const appUrl = window.appSettings.formAddKeywords.UrlApi;
const validNamePattern = window.appSettings.formAddKeywords.validPatterns.name;
const validNameMessage = window.appSettings.formAddKeywords.validMessage.name;
const messages = window.appSettings.formAddKeywords.messages;


const body = document.querySelector('body');
const enterprisesAdd = body.querySelector('#keywords-add');
const form = enterprisesAdd.querySelector('#keywords-add-form');

const name = form.querySelector('#keywords-add-name');
const nameValid = form.querySelector('#keywords-add-valid');

const spinner = form.querySelector('#keywords-add-spinner');

const buttonSubmit = form.querySelector('#keywords-add-submit');
const buttonCancel = form.querySelector('#keywords-add-cancel');
const buttonClose = enterprisesAdd.querySelector('#keywords-add-close');

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
    $('#keywords-add').modal('hide');

    // Сюда метод перезагрузки списка
    keywordsButton.redraw();
    break;
  case 400:

    // Вывести response.message в красную ошибку
    alert(messages.mes400);
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
    valid = false;
    nameValid.innerHTML = validNameMessage;
  }

  return valid;
};

const submitForm = () => {
  let postData = `name=${name.value}&token=${stor.token}`;
  let urlApp = appUrl.replace('{{dir}}', stor.directory);
  urlApp = urlApp.replace('{{oper}}', stor.operatorId);
  urlApp = urlApp.replace('{{busId}}', stor.currentBusiness);

  let response = {
    url: urlApp,
    metod: 'POST',
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
