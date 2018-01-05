let setStorage = function (data) {
  sessionStorage.clear();
  sessionStorage.setItem('directory', data.directory);
  sessionStorage.setItem('email', data.email);
  sessionStorage.setItem('lastLogin', data.lastLogin);
  sessionStorage.setItem('nickname', data.nickname);
  sessionStorage.setItem('operator_id', data.operator_id);
  sessionStorage.setItem('token', data.token);
};

let getStorage = function () {
  return {
    directory: sessionStorage.getItem('directory'),
    email: sessionStorage.getItem('email'),
    lastLogin: sessionStorage.getItem('lastLogin'),
    nickname: sessionStorage.getItem('nickname'),
    operator_id: sessionStorage.getItem('operator_id'),
    token: sessionStorage.getItem('token')
  };

};

let isSet = function () {
  if (sessionStorage.getItem('directory') && sessionStorage.getItem('email') &&
      sessionStorage.getItem('lastLogin') && sessionStorage.getItem('nickname') &&
      sessionStorage.getItem('operator_id') && sessionStorage.getItem('token')) {
    return true;
  }
  return false;
};

let isKey = function (data) {
  if (data['directory'] && data['email'] && data['lastLogin'] &&
      data['nickname'] && data['operator_id'] && data['token']) {
    return true;
  }
  return false;
};

let dataStorage = function (data) {
  if (!data) {

    if (!isSet()) {
      return false;
    }

    return getStorage();
  }

  if (data === 'clear') {
    sessionStorage.clear();
    return true;
  }

  console.log(isKey(data));
  if (isKey(data)) {
    setStorage(data);
    return true;
  }

  sessionStorage.clear();
  return false;
};

export {dataStorage};
