// // !!!!XHR TEST!!!!
// // -------------
// import {setXhrRequest} from './tools/xhr.js';
// export function test() {
//   let xhrSuccessCallback = function (response) {
//     console.dir(response);
//   };

//   let xhrErrorCallback = function (error) {
//     console.dir(error);
//   };


//   let par = {
//     url: '/user_boss/login',
//     metod: 'POST',
//     data: 'email=kondor_06@mail.ru&deviceToken=-&password=Qwerty123#',
//     callbackSuccess: xhrSuccessCallback,
//     callbackError: xhrErrorCallback
//   };

//   setXhrRequest(par);
// }
// // -------------------------




// !!!!STORAGE TRST!!!!
// -----------------------
import {dataStorage} from './tools/storage.js';

export function test() {
  let data = {
    directory: 'aa5418d7',
    email: 'kondor_06@mail.ru',
    lastLogin: '2018-01-05 22:03:12',
    nickname: 'kds',
    operator_id: 1,
    token: '76720b2a0e7efc313648'
  };

  let data2 = {
    directory: 'aa5418d7',
    email: 'kondor_06@mail.ru',
    nickname: 'kds',
    operator_id: 1,
    token: '76720b2a0e7efc313648'
  };



  dataStorage(data);

  console.dir(dataStorage());

  dataStorage('clear');

  dataStorage(data2);



}
// -----------------------------
