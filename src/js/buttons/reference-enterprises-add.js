import xhr from './../tools/xhr.js';

const validNamePattern = window.appSettings.formAddEnterprise.validPatterns.name;
const validBalancePattern = window.appSettings.formAddEnterprise.validPatterns.balance;
const validNameMessage = window.appSettings.formAddEnterprise.validMessage.name;
const validBalanceMessage = window.appSettings.formAddEnterprise.validMessage.balance


const enterprisesAdd = document.querySelector('#enterprises-add');
const form = enterprisesAdd.querySelector('#enterprises-add-form');

const name = form.querySelector('#enterprise-name');
const nameValid = form.querySelector('#enterprises-name-valid');
const balance = form.querySelector('#enterprise-balance');
const balanceValid = form.querySelector('#enterprise-balance-valid');
const money = form.querySelector('#enterprise-money');

const spinner = form.querySelector('#enterprises-add-spinner');

const buttonSubmit = form.querySelector('#enterprises-add-submit');
const buttonCancel = form.querySelector('#enterprises-add-cancel');





const callbackXhrSuccess = (response) => {};

const callbackXhrError = (response) => {};

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

const submitForm = () => {};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  console.log(money.value);

  if (validateForm()) {
    console.log("valid ok");
    submitForm();
    return true;
  }
  console.log("valid no");
  return false;
};

export default {
  start() {
    form.addEventListener('submit', formSubmitHandler);
    form.addEventListener('change', (evt) => {
      if (evt.target.nextElementSibling) {
        evt.target.nextElementSibling.innerHTML = '';
      }
    });
  }
};
