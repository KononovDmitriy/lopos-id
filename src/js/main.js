import auth from './tools/storage.js';
import logButton from './buttons/log.js';
import profileButton from './buttons/online-profile.js';
import enterprisesButton from './buttons/reference-enterprises.js';
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
    initMarkup();
    hashObserver();
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

/*

Возможные сценарии запуска приложения:

1. Обновление страницы в ходе работы после успешной авторизации
2. Открытие страницы в новой вкладке + авторизация
3. Открытие страницы в новой вкладке + регистрация
4. Выход и новая регистрация без перезагрузки страницы в той же вкладке

NB1: на старте оба контейнера (app и login) скрыты
NB2: событие loginSuccess создается в модулях confirm_email.js и login.js

Алгоритм:
(1)
 - проверяем sessionStorage и авторизацию, если данные пользователя есть, то выполняем функцию start:
    - показываем контейнер app и прячем login
    - запускаем profileButton, чтобы заново записать в Онлайн/Профиль данные пользователя
    - запускаем logButton, который при клике на кнопку журнала начнет грузить данные
 (2,3)
 - показываем контейнер login
 - mainWindow.firstScreen() =?= может переименуем его во что-то типа authority =?=
 - слушаем возникновение события loginSuccess на документе и выполняем функцию start (см. п.1)
 событие loginSuccess вызывается модулями авторизации/регистрации и сообщает нам, что данная процедура пройдена
 (4)
 - слушаем click по кнопке exit и обрабатываем выход, запустив функцию stop:
    - прячем контейнер app и показываем login
    - останавливаем модуль с журналом: чистим счетчики, кэш неотрисованных нод, прячем все сообщения о процессе загрузки и чистим контейнер, чистим обработчики клика и скролла
    - чистим sessionStorage
    - создаем событие logoutSuccess на document, по которому можно сделать все необходимое с формой авторизации

*/
