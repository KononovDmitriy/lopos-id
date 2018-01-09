import mainWindow from './main_login_window.js';
import confirmEmail from './confirm_email.js';

const sectionConfirmEmail = document.querySelector('#sectionConfirmEmail');
const emailConfirmForm = sectionConfirmEmail.querySelector('#emailConfirmForm');
const emailConfirmInputKey = emailConfirmForm.querySelector('#emailConfirmInputKey');
const emailConfirmButtonCancel = emailConfirmForm.querySelector('#emailConfirmButtonCancel');

const registerInputEmail = document.querySelector('#registerInputEmail');

emailConfirmForm.addEventListener('submit', function (event) {
  event.preventDefault();
  confirmEmail.submit(emailConfirmInputKey.value, registerInputEmail.value);
});

emailConfirmButtonCancel.addEventListener('click', function () {
  mainWindow.firstScreen();
});

export default {

  setError(msg) {
    emailConfirmInputKey.setCustomValidity(msg);
  },

  show() {
    sectionConfirmEmail.classList.remove('d-none');
  },

  hide() {
    sectionConfirmEmail.classList.add('d-none');
  },

  reset() {
    emailConfirmForm.reset();
    emailConfirmInputKey.setCustomValidity('');
  }
};
