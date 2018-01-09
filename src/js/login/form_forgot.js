import mainWindow from './main_login_window.js';
import forgot from './forgot.js';

const sectionForgot = document.querySelector('#sectionForgot');
const forgotForm = sectionForgot.querySelector('#forgotForm');
const forgotInputEmail = forgotForm.querySelector('#forgotInputEmail');
const forgotButtonCancel = forgotForm.querySelector('#forgotButtonCancel');

forgotForm.addEventListener('submit', function (event) {
  event.preventDefault();
  forgot.submit(forgotInputEmail.value);
});

forgotButtonCancel.addEventListener('click', function () {
  mainWindow.firstScreen();
});

export default {

  setError(msg) {
    forgotInputEmail.setCustomValidity(msg);
  },

  show() {
    sectionForgot.classList.remove('d-none');
  },

  hide() {
    sectionForgot.classList.add('d-none');
  },

  reset() {
    forgotForm.reset();
    forgotInputEmail.setCustomValidity('');
  }

};
