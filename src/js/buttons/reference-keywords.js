import xhr from '../tools/xhr.js';
import auth from '../tools/storage.js';
import keywordsMarkup from '../markup/reference-keywords.js';
import toolsMarkup from '../markup/tools.js';

const loaderSpinnerId = 'loader-enterprises';
const loaderSpinnerMessage = 'Загрузка';
const loaderSpinnerMarkup = toolsMarkup.getLoadSpinner(loaderSpinnerId, loaderSpinnerMessage);

const listKeywords = document.querySelector('#list-keywords-list');
const listKeywordsCard = document.querySelector('#list-keywords-card');
const listKeywordsReturnBtn = document.querySelector('#list-keywords-card-return-btn');
const listKeywordsHeader = document.querySelector('#list-keywords-header');
const listKeywordsBody = document.querySelector('#list-keywords-body');
const listKeywordsCardEditRGBForm = document.querySelector('#keywords-card-edit-rgb-form');
const listKeywordsCardDeleteBtn = document.querySelector('#list-keywords-card-delete-btn');


const onSuccessKeywordDelete = (answer) => {
  console.log(answer);

  getKeywords();

  toolsMarkup.informationtModal = {
    title: 'Уведомление',
    message: `Ключевое слово <b>${auth.currentKeywordName}</b> успешно удалено`
  };

};

const onErrorKeywordDelete = (error) => {
  console.log(error);
};


const setRequestToDeleteKeyword = () => {
  xhr.request = {
    metod: 'DELETE',
    url: `lopos_directory/${auth.data.directory}/operator/1/business/${auth.data.currentBusiness}/tag/${auth.currentKeywordId}`,
    data: `view_last=0&token=${auth.data.token}`,
    callbackSuccess: onSuccessKeywordDelete,
    callbackError: onErrorKeywordDelete
  };
};

listKeywordsCardDeleteBtn.addEventListener('click', function () {

  toolsMarkup.actionRequestModal = {
    title: 'Удаление',
    message: `Вы точно хотите удалить ключевое слово <b>${auth.currentKeywordName}</b>?`,
    submitCallback: setRequestToDeleteKeyword
  };

});

const onListKeywordsReturnBtnClick = () => {
  listKeywordsCard.classList.add('d-none');
  listKeywordsHeader.classList.remove('d-none');
  listKeywordsHeader.classList.add('d-flex');
  listKeywordsBody.classList.remove('d-none');
};

listKeywordsReturnBtn.addEventListener('click', onListKeywordsReturnBtnClick);

const onSuccessKeywordColorUpdate = (answer) => {
  console.log(answer);

  getKeywords();

};

const onErrorKeywordColorUpdate = (error) => {
  console.log(error);
};


const onListKeywordsCardEditRGBFormSubmit = (evt) => {
  evt.preventDefault();
  let newRGB = listKeywordsCardEditRGBForm.querySelector('input:checked').value;
  auth.currentKeywordRgb = newRGB;
  console.log(document.querySelector('#list-keywords-card-edit > div > button'));
  document.querySelector('#list-keywords-card-edit > div > button').style.backgroundColor = '#' + auth.currentKeywordRgb;
  $('#keywords-card-edit-rgb').modal('hide');

  xhr.request = {
    metod: 'PUT',
    url: `lopos_directory/${auth.data.directory}/operator/1/business/${auth.data.currentBusiness}/tag/${auth.currentKeywordId}`,
    data: `color=${auth.currentKeywordRgb}&token=${auth.data.token}`,
    callbackSuccess: onSuccessKeywordColorUpdate,
    callbackError: onErrorKeywordColorUpdate
  };

};

listKeywordsCardEditRGBForm.addEventListener('submit', onListKeywordsCardEditRGBFormSubmit);

const onSuccessKeywordsLoad = (loadedKeywords) => {
  document.querySelector(`#${loaderSpinnerId}`).remove();
  console.log(loadedKeywords);
  if (loadedKeywords.status === 200 && loadedKeywords.data) {
    keywordsMarkup.drawDataInContainer(loadedKeywords.data);
  } else if (loadedKeywords.status === 200 && !loadedKeywords.data) {
    keywordsMarkup.drawMarkupInContainer(`<p>${loadedKeywords.message || 'Что-то в поле message пусто и в data лежит false'}</p>`);
  } else {
    keywordsMarkup.drawMarkupInContainer(`<p>${loadedKeywords.message}</p>`);
  }
};

const onErrorKeywordsLoad = (error) => {
  console.log(error);
};

const getKeywords = () => {
  keywordsMarkup.cleanContainer();
  keywordsMarkup.drawMarkupInContainer(loaderSpinnerMarkup);
  onListKeywordsReturnBtnClick();

  xhr.request = {
    metod: 'POST',
    url: `lopos_directory/${auth.data.directory}/operator/1/business/${auth.data.currentBusiness}/tag`,
    data: `view_last=0&token=${auth.data.token}`,
    callbackSuccess: onSuccessKeywordsLoad,
    callbackError: onErrorKeywordsLoad
  };
};

export default {

  start() {
    listKeywords.addEventListener('click', getKeywords);
  },

  redraw: getKeywords,

  stop() {
    keywordsMarkup.cleanContainer();
    listKeywords.removeEventListener('click', getKeywords);
  }
};
