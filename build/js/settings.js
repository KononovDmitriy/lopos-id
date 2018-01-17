window.appSettings = {
  // SiteKey для капчи
  'reCaptchaSiteKey': '6Lct5j8UAAAAAJkVidQhkOxmBhI9uj28IQ5-Ltp9',

  'xhrSettings': {
  // Адрес ApiDesigber, интервал ожидания ответа, кодировка
    urlApi: 'https://lopos.bidone.ru/api/v1/',
    timeout: 10000,
    contentType: 'application/x-www-form-urlencoded',
  },
  // Шаборны валидации формы входа
  'loginValid': {
    email: /@/,
    id: /^[0-9a-z]{8,}\d{1,2}$/,
    password: /.{3,}/
  },
  // Ссылки на апи для формы входа
  'loginUrlApi': {
    email: 'user_boss/login',
    id: 'lopos_directory/{{dir}}/authorization/login'
  },
  // Шаборны валидации формы регистрации
  'registerValid': {
    email: /@/,
    password: /.{3,}/,
    name: /^[а-яёА-ЯЁA-Za-z\s]+$/
  },
  // Ссылки на апи для формы регистрации
  'registerUrlApi': 'user_boss/registration',
  // Шаборны валидации формы подтверждения почты
  'confirmEmailKodValid': /[\d]{4}/,
  // Ссылки на апи для формы подтверждения почты
  'confirmEmailUrlApi': 'user_boss/submit_registration',
  // Шаборны валидации формы восстановления пароля
  'forgotEmailValid': /@/,
  // Ссылки на апи для формы восстановления пароля
  'forgotUrlApi': 'user_boss/forgot',

  // Сообщения
  'messages': {

    // Ошибка обращения к серверу через AJAX
    'xhrError': 'Ошибка связи с сервером приложения',

    // Все внутренние ошибки капчи
    'captchaError': 'Ошибка связи с сервером капчи',

    // Ответы от сервера BIDONE
    'responseStatus': {
      'res0': 'Ваш пользователь заблокирован, обратитесь к администратору'
    },

    // Сообщения валидации формы входа
    'formValidation': {

      login: {
        login: 'Неверный формат логина',
        password: 'Пароль должен быть длиннее 3-х символов'
      },

      registration: {
        name: 'Имя!',
        email: 'Почта!',
        password: 'Пароль!',
        confirmPassword: 'Не совпадает!',
        UserAgreement: 'Соглашение'
      },

      emailConfirm: {
        key: 'Неверный формат кода!'
      },

      forgot: {
        email: 'Введите корректный email'
      }
    }
  },

    // Форма добавления организации
  'formAddEnterprise': {
    UrlApi: 'lopos_directory/{{dir}}/operator/{{oper}}/business',
    validPatterns: {
      'name': /^[а-яёА-ЯЁA-Za-z\s\d]+$/,
      'balance': /(^\d+$)|(^\d+\.\d{2}$)/
    },
    validMessage: {
      'name': 'минимум 1 буква',
      'balance': 'формат: 0.00 или 0'
    }
  },

   // Форма редактирования организации
  'formEditEnterprise': {
    UrlApi: 'lopos_directory/{{dir}}/operator/{{oper}}/business/{{}}',
    validPatterns: {
      'name': /^[а-яёА-ЯЁA-Za-z\s\d]+$/,
    },
    validMessage: {
      'name': 'минимум 1 буква'
    }
  }
};
