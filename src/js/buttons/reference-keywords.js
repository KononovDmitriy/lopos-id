import xhr from '../tools/xhr.js';
import auth from '../tools/storage.js';
import keywordsMarkup from '../markup/reference-keywords.js';
import toolsMarkup from '../markup/tools.js';

const loaderSpinnerId = 'loader-enterprises';
const loaderSpinnerMessage = 'Загрузка';
const loaderSpinnerMarkup = toolsMarkup.getLoadSpinner(loaderSpinnerId, loaderSpinnerMessage);

const listKeywords = document.querySelector('#list-keywords-list');

const onSuccessKeywordsLoad = (loadedKeywords) => {
  document.querySelector(`#${loaderSpinnerId}`).remove();
  console.log(loadedKeywords);
  if (loadedKeywords.status === 200) {
    keywordsMarkup.drawDataInContainer(loadedKeywords.data);
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
