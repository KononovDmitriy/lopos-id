import mainWindow from './main_login_window.js';
import login from './login.js';

const sectionLogin = document.querySelector('#sectionLogin');
const loginForm = sectionLogin.querySelector('#loginForm');
const loginButtonRegister = loginForm.querySelector('#loginButtonRegister');
const loginButtonForgot = loginForm.querySelector('#loginButtonForgot');

const inputFields = {
  'login': loginForm.querySelector('#loginInputLogin'),
  'password': loginForm.querySelector('#loginInputPassword')
};

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  login.submit(inputFields.login.value, inputFields.password.value);
});

loginButtonRegister.addEventListener('click', function () {
  mainWindow.register();
});

loginButtonForgot.addEventListener('click', function () {
  mainWindow.forgot();
});

export default {

  setError(target, msg) {
    inputFields[target].setCustomValidity(msg);
  },

  show() {
    sectionLogin.classList.remove('d-none');
  },

  hide() {
    sectionLogin.classList.add('d-none');
  },

  reset() {
    loginForm.reset();
  }

};
