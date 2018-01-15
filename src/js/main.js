import auth from './tools/storage.js';
import logButton from './buttons/log.js';
import profileButton from './buttons/online-profile.js';
import mainWindow from './login/main_login_window.js';

console.log('v54');

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

// ========== ОБНОВЛЕНИЕ/ОТКРЫТИЕ СТРАНИЦЫ ==========
const start = () => {
  if (auth.isSetFlag) {
    showAppHideLogin();
    profileButton.start();
    logButton.start();
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
  document.dispatchEvent(new Event('logoutSuccess'));
};

// ========== НАЧАЛО РАБОТЫ ==========
start();
document.addEventListener('loginSuccess', start);

// ========== ЗАВЕРШЕНИЕ РАБОТЫ ==========
exit.addEventListener('click', stop);

