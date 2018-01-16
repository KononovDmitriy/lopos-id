import xhr from '../tools/xhr.js';
import auth from '../tools/storage.js';
import enterprisesMarkup from '../markup/reference-enterprises.js';
import toolsMarkup from '../markup/tools.js';

const listEnterprises = document.querySelector('#list-enterprises-list');
const loaderSpinnerId = 'loader-enterprises';
const loaderSpinnerMessage = 'Ждем загрузки предприятий';
const loaderSpinnerMarkup = toolsMarkup.getLoadSpinner(loaderSpinnerId, loaderSpinnerMessage);

const onSuccessEnterprisesLoad = (loadedEnterprises) => {
  document.querySelector(`#${loaderSpinnerId}`).remove();
  if (loadedEnterprises.status === 200) {
    enterprisesMarkup.drawDataInContainer(loadedEnterprises.data);
  } else {
    enterprisesMarkup.drawMarkupInContainer(`<p>${loadedEnterprises.message}</p>`);

  }
};

const onErrorEnterprisesLoad = (error) => {
  console.log(error);
};

const getEnterprises = () => {
  enterprisesMarkup.cleanContainer();
  enterprisesMarkup.drawMarkupInContainer(loaderSpinnerMarkup);

  xhr.request = {
    metod: 'POST',
    url: `lopos_directory/${auth.data.directory}/operator/1/business/1`,
    data: `view_last=0&token=${auth.data.token}`,
    callbackSuccess: onSuccessEnterprisesLoad,
    callbackError: onErrorEnterprisesLoad
  };

};

export default {

  start() {
    listEnterprises.addEventListener('click', getEnterprises);
  },

  stop() {
    enterprisesMarkup.cleanContainer();
    listEnterprises.removeEventListener('click', getEnterprises);
  }
};
