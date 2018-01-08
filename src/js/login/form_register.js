import mainWindow from './main_login_window.js';
import register from './register.js';

const sectionRegister = document.querySelector('#sectionRegister');
const registerForm = sectionRegister.querySelector('#registerForm');
const registerButtonCancel = registerForm.querySelector('#registerButtonCancel');
const registerUserAgreement = document.querySelector('#registerUserAgreement');

const inputFields = {
  'name': registerForm.querySelector('#registerInputName'),
  'email': registerForm.querySelector('#registerInputEmail'),
  'password': registerForm.querySelector('#registerInputPassword'),
  'confirm': registerForm.querySelector('#registerInputConfirmPassword')
};

registerForm.addEventListener('submit', function (event) {
  event.preventDefault();

  register.submit(inputFields.name.value, inputFields.email.value, inputFields.password.value,
    inputFields.confirm.value, registerUserAgreement.checked);
});

registerButtonCancel.addEventListener('click', function () {
  mainWindow.firstScreen();
});

export default {

  setError(target, msg) {
    inputFields[target].setCustomValidity(msg);
  },

  show() {
    sectionRegister.classList.remove('d-none');
  },

  hide() {
    sectionRegister.classList.add('d-none');
  },

  reset() {
    registerForm.reset();
  }
};
