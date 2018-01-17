import xhr from './../tools/xhr.js';
import dataStorage from './../tools/storage.js';

const appUrl = window.appSettings.formEditEnterprise.UrlApi;
const validNamePattern = window.appSettings.formEditEnterprise.validPatterns.name;
const validNameMessage = window.appSettings.formEditEnterprise.validMessage.name;



const enterprisesEdit = document.querySelector('#enterprises-edit');
const form = enterprisesEdit.querySelector('#enterprises-edit-form');

const name = form.querySelector('#enterprise-name');
const nameValid = form.querySelector('#enterprises-name-valid');
const balance = form.querySelector('#enterprise-balance');
const balanceValid = form.querySelector('#enterprise-balance-valid');
const currency = form.querySelector('#enterprise-money');

const spinner = form.querySelector('#enterprises-add-spinner');

const buttonSubmit = form.querySelector('#enterprises-add-submit');
const buttonCancel = form.querySelector('#enterprises-add-cancel');
const buttonClose = enterprisesEdit.querySelector('#enterprises-add-close');

const stor = dataStorage.data;

const formReset = () => {
  form.reset();
  nameValid.innerHTML = '';
  balanceValid.innerHTML = '';
};

const callbackXhrSuccess = (response) => {

  hideSpinner();
  switch (response.status) {
  case 200:
    formReset();
    enterprisesEdit.classList.remove('show');
    let el = document.querySelector('.modal-backdrop');
    if (el) {
      el.classList.remove('show');
    }

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
    valid = false;
    nameValid.innerHTML = validNameMessage;
  }
  if (!validBalancePattern.test(balance.value)) {
    valid = false;
    balanceValid.innerHTML = validBalanceMessage;
  }

  return valid;
};

const submitForm = () => {
  let postData = `name=${name.value}&balance=${balance.value}&currency=${currency.value}&token=${stor.token}`;
  let urlApp = appUrl.replace('{{dir}}', stor.directory);
  urlApp = urlApp.replace('{{oper}}', stor.operatorId);

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
