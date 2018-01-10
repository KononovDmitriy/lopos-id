export default {

  // заполняем хранилище
  set data(loadedData) {
    console.log(loadedData);
    sessionStorage.setItem('nickname', loadedData.nickname);
    sessionStorage.setItem('lastLogin', loadedData.lastLogin);
    sessionStorage.setItem('email', loadedData.email);
    sessionStorage.setItem('directory', loadedData.directory);
    sessionStorage.setItem('operatorId', loadedData.operator_id);
    sessionStorage.setItem('token', loadedData.token);
  },

  // возвращаем данные
  get data() {
    return {
      nickname: sessionStorage.getItem('nickname'),
      lastLogin: sessionStorage.getItem('lastLogin'),
      directory: sessionStorage.getItem('directory'),
      email: sessionStorage.getItem('email'),
      operatorId: sessionStorage.getItem('operatorId'),
      token: sessionStorage.getItem('token'),
    };
  },

  get isSetFlag() {
    return Object.values(this.data).some((item) => item !== null);
  },

  // чистим хранилище
  clean() {
    sessionStorage.removeItem('nickname');
    sessionStorage.removeItem('lastLogin');
    sessionStorage.removeItem('directory');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('operatorId');
    sessionStorage.removeItem('token');
  }

};
