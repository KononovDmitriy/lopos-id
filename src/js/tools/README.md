'# Вспомогательные функции' 

<!-- 
xhr.js:
  export setXhrRequest(requestParameters);
    requestParameters = {
      url: string, (начинается от .../v1/ (например: /user_boss/login))
      metod: string, ('POST', 'GET') (GET на всякий случай)
      data: string,
      callbackSuccess: function (Object), (Объект из json)
      callbackError: function (SyntaxError) (Добавлено поле cause, в которое копируется исходная ошибка)
    }
 -->

<!-- 
storage.js
  export dataStorage(data);
    
    Функция перегруженная.

    data = Object - поле data объекта, принятого с сервера. Переменные хранилища устанавливаются только в том случае, если все поля присутствуют. Объект data передается "как есть".
      {…}
        data: {…}
          directory: "aa5418d7"
          email: "kondor_06@mail.ru"
          lastLogin: "2018-01-05 22:03:12"
          nickname: "kds"
          operator_id: 1
          token: "76720b2a0e7efc313648"
          __proto__: Object { … }
        status: 200
      __proto__: Object { … }

    data = 'clear' - в этом случае очищается хранилище

    data = Undefined (вызов без параметров) возвращает объект с переменными или false
 -->
