import auth from './tools/storage.js';
import mainWindow from './login/main_login_window.js';
import logButton from './buttons/log.js';
import profileButton from './buttons/online-profile.js';
import enterprisesButton from './buttons/reference-enterprises.js';
import enterprisesButtonFormAdd from './buttons/reference-enterprises-add.js';
import enterprisesButtonFormEdit from './buttons/reference-enterprises-edit.js';
import pointsButton from './buttons/reference-points.js';
import contractorsButton from './buttons/reference-contractors.js';

console.log('ver: 2D4');
console.log('ver: 2A3');

const exit = document.querySelector('#profile-exit');
const app = document.querySelector('#app');
const login = document.querySelector('#login');

const showLoginHideApp = () => {
  login.classList.remove('d-none');
  app.classList.add('d-none');
};

const showAppHideLogin = () => {
  login.classList.add('d-none');
  app.classList.remove('d-none');
};

// чистим меню и вкладки
const initMarkup = () => {
  document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('active'));
  document.querySelectorAll('.nav-item.dropdown').forEach((item) => item.classList.remove('show'));
  document.querySelectorAll('.tab-pane').forEach((item) => item.classList.add('fade'));
  document.querySelectorAll('.dropdown-item').forEach((item) => item.classList.remove('active'));
};

const hashObserver = () => {
  let hash = window.location.hash;
  if (hash) {
    document.querySelector(`${hash}-list`).dispatchEvent(new Event('click'));
    document.querySelector(`${hash}-list`).classList.add('active');
    document.querySelector(`${hash}`).classList.add('active');
    document.querySelector(`${hash}`).classList.remove('fade');
  }
};

// ========== ОБНОВЛЕНИЕ/ОТКРЫТИЕ СТРАНИЦЫ ==========
const start = () => {
  if (auth.isSetFlag) {
    showAppHideLogin();
    profileButton.start();
    logButton.start();
    enterprisesButton.start();
    pointsButton.start();
    contractorsButton.start();
    initMarkup();
    hashObserver();
    enterprisesButtonFormAdd.start();
    enterprisesButtonFormEdit.start();
  } else {
    showLoginHideApp();
    mainWindow.init();
  }
};

// ========== ВЫХОД ==========
const stop = () => {
  showLoginHideApp();
  logButton.stop();
  profileButton.stop();
  auth.clean();
  window.location.hash = '';
  document.dispatchEvent(new Event('logoutSuccess'));
};

// ========== НАЧАЛО РАБОТЫ ==========
initMarkup();
hashObserver();
start();
document.addEventListener('loginSuccess', start);

// ========== ЗАВЕРШЕНИЕ РАБОТЫ ==========
exit.addEventListener('click', stop);
