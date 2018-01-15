export default {

  // заполняем хранилище
  set data(loadedData) {
    localStorage.setItem('nickname', loadedData.nickname);
    localStorage.setItem('lastLogin', loadedData.lastLogin);
    localStorage.setItem('email', loadedData.email);
    localStorage.setItem('directory', loadedData.directory);
    localStorage.setItem('operatorId', loadedData.operator_id);
    localStorage.setItem('token', loadedData.token);
    localStorage.setItem('currentBusiness', loadedData.current_business);
    localStorage.setItem('currentStock', loadedData.current_stock);
  },

  // возвращаем данные
  get data() {
    return {
      nickname: localStorage.getItem('nickname'),
      lastLogin: localStorage.getItem('lastLogin'),
      directory: localStorage.getItem('directory'),
      email: localStorage.getItem('email'),
      operatorId: localStorage.getItem('operatorId'),
      token: localStorage.getItem('token'),
      currentBusiness: localStorage.getItem('currentBusiness'),
      currentStock: localStorage.getItem('currentStock'),
    };
  },

  get isSetFlag() {
    return Object.values(this.data).some((item) => item !== null);
  },

  // чистим хранилище
  clean() {
    localStorage.removeItem('nickname');
    localStorage.removeItem('lastLogin');
    localStorage.removeItem('directory');
    localStorage.removeItem('email');
    localStorage.removeItem('operatorId');
    localStorage.removeItem('token');
    localStorage.removeItem('currentBusiness');
    localStorage.removeItem('currentStock');
  }

};
