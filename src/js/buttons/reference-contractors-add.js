import xhr from './../tools/xhr.js';
import dataStorage from './../tools/storage.js';
import referenceContractors from './reference-contractors.js';

const appUrl = window.appSettings.formAddContractor.UrlApi;
const validPattern = window.appSettings.formAddContractor.validPatterns;
const validMessage = window.appSettings.formAddContractor.validMessage;
const messages = window.appSettings.formAddContractor.messages;


const body = document.querySelector('body');
const contractorsAdd = body.querySelector('#contractors-add');
const form = contractorsAdd.querySelector('#contractors-add-form');

const name = form.querySelector('#contractors-name');
const describe = form.querySelector('#contractors-describe');
const contact = form.querySelector('#contractors-contact');
const phone = form.querySelector('#contractors-phone');
const email = form.querySelector('#contractors-email');

const nameValid = form.querySelector('#contractors-name-valid');
const describeValid = form.querySelector('#contractors-describe-valid');
const contactValid = form.querySelector('#contractors-contact-valid');
const phoneValid = form.querySelector('#contractors-phone-valid');
const emailValid = form.querySelector('#contractors-email-valid');

const spinner = form.querySelector('#contractors-add-spinner');

const buttonSubmit = form.querySelector('#contractors-add-submit');
const buttonCancel = form.querySelector('#contractors-add-cancel');

const stor = dataStorage.data;

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

const formReset = () => {
  form.reset();
  nameValid.innerHTML = '';
  describeValid.innerHTML = '';
  contactValid.innerHTML = '';
  phoneValid.innerHTML = '';
  emailValid.innerHTML = '';
  buttonCancel.disabled = false;
  buttonSubmit.disabled = true;
  hideSpinner();
};

const callbackXhrSuccess = (response) => {
  console.dir(response);

  hideSpinner();
  switch (response.status) {
  case 200:
    formReset();
    $('#contractors-add').modal('hide');
    referenceContractors.redraw();
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

const hideAlert = (el) => {
  el.classList.remove('border');
  el.classList.remove('border-danger');
  el.classList.remove('border-primary');
  el.nextElementSibling.innerHTML = '';
};

const showAert = (el, mess) => {
  el.classList.add('border');
  el.classList.add('border-danger');
  el.nextElementSibling.innerHTML = mess;
};

const showBorder = (el) => {
  el.classList.add('border');
  el.classList.add('border-primary');
};

const validateForm = () => {
  let val = true;
  if (!validPattern.name.test(name.value)) {
    val = false;
    showBorder(name);
  }
  if (!validPattern.describe.test(describe.value)) {
    val = false;
    showBorder(describe);
  }
  if (!validPattern.contact.test(contact.value)) {
    val = false;
    showBorder(contact);
  }
  if (!validPattern.phone.test(phone.value)) {
    val = false;
    showBorder(phone);
  }
  if (!validPattern.email.test(email.value)) {
    val = false;
    showBorder(email);
  }
  return val;
};

const validateInput = (el) => {
  let index = el.id.match(/[\w]+$/);
  if (validPattern[index].test(el.value)) {
    hideAlert(el);
    if (validateForm()) {
      buttonSubmit.disabled = false;
    }
    return true;
  }
  buttonSubmit.disabled = true;
  showAert(el, validMessage[index]);
  return false;
};

const getUrl = () => {
  let url = '';

  switch (dataStorage.currentContractorOperation) {
  case 'add':
    url = appUrl.add.replace('{{dir}}', stor.directory);
    url = url.replace('{{oper}}', stor.operatorId);
    url = url.replace('{{busId}}', stor.currentBusiness);
    break;
  case 'edit':
    url = appUrl.add.replace('{{dir}}', stor.directory);
    url = url.replace('{{oper}}', stor.operatorId);
    url = url.replace('{{busId}}', stor.currentBusiness);
    url = url.replace('{{agentId}}', dataStorage.currentContractorId);
    break;
  }
  return url;
};

const submitForm = () => {
  let appLink = getUrl();

  let postData = `token=${stor.token}&type=${dataStorage.currentContractorType}&name=${name.value}&email=${email.value}&description=${describe.value}&phone=${phone.value}&FIO=${contact.value}`;

  let response = {
    url: appLink,
    metod: (dataStorage.currentContractorOperation === 'add') ? 'POST' : 'PUT',
    data: postData,
    callbackSuccess: callbackXhrSuccess,
    callbackError: callbackXhrError
  };

  console.log('response:');
  console.dir(response);

  xhr.request = response;
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  showSpinner();
  submitForm();
};

const addHandlers = () => {

  $('#contractors-add').on('hidden.bs.modal', () => {
    formReset();
  });

  $('#contractors-add').on('shown.bs.modal', () => {

    if (dataStorage.currentContractorOperation === 'edit') {
      window.appFormCurrValue = {
        'name': name.value,
        'describe': describe.value,
        'contact': contact.value,
        'phone': phone.value,
        'email': email.value
      };
    }

  });

  form.addEventListener('submit', formSubmitHandler);
  form.addEventListener('focusout', (evt) => {

    validateInput(evt.target);
  });

  form.addEventListener('focusin', (evt) => {
    console.log('!!^^');
    hideAlert(evt.target);
  });

  buttonSubmit.addEventListener('mouseover', () => {

  });
};

export default {
  start: addHandlers,
};
