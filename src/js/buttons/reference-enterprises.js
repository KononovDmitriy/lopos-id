import xhr from '../tools/xhr.js';
import auth from '../tools/storage.js';
import enterprisesMarkup from '../markup/reference-enterprises.js';
import toolsMarkup from '../markup/tools.js';

const listEnterprises = document.querySelector('#list-enterprises-list');
const listEnterprisesBody = document.querySelector('#list-enterprises-body');
const listEnterprisesCard = document.querySelector('#list-enterprises-card');
const listEnterprisesCardReturnBtn = document.querySelector('#list-enterprises-card-return-btn');

const listEnterprisesCardName = document.querySelector('#list-enterprises-card-name');
const listEnterprisesCardBalance = document.querySelector('#list-enterprises-card-balance');
const listEnterprisesCardDate = document.querySelector('#list-enterprises-card-date');
// const listEnterprisesCardNegativeTailings = document.querySelector('#list-enterprises-card-negative-tailings');
// const listEnterprisesCardNegativeBalance = document.querySelector('#list-enterprises-card-negative-balance');

const listEnterprisesCardCheckBtn = document.querySelector('#list-enterprises-card-check-btn');
// const listEnterprisesCardEditBtn = document.querySelector('#list-enterprises-card-edit-btn');
// const listEnterprisesCardDeleteBtn = document.querySelector('#list-enterprises-card-delete-btn');

const listEnterprisesCardEditName = document.querySelector('#enterprises-card-edit-name');

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


const onSuccessEnterpriseCardLoad = (loadedEnterpriseCard) => {
  console.log(loadedEnterpriseCard);

  if (auth.data.currentBusiness === loadedEnterpriseCard.data.id) {
    listEnterprisesCardCheckBtn.setAttribute('disabled', 'disabled');
  } else {
    listEnterprisesCardCheckBtn.removeAttribute('disabled');
  }

  listEnterprisesCardCheckBtn.addEventListener('click', function () {
    auth.currentBusiness = loadedEnterpriseCard.data.id;
  });

  listEnterprisesCardName.innerText = loadedEnterpriseCard.data.name;
  listEnterprisesCardDate.innerText = new Date(+(loadedEnterpriseCard.data.time_activity + '000')).toLocaleString();
  listEnterprisesCardBalance.innerText = loadedEnterpriseCard.data.balance;
  listEnterprisesCardEditName.value = loadedEnterpriseCard.data.name;
  auth.currentEnterpriseId = loadedEnterpriseCard.data.id;
  auth.currentEnterpriseName = loadedEnterpriseCard.data.name;
};

const onErrorEnterpriseCardLoad = (error) => {
  console.log(error);
};

const onListEnterprisesBodyClick = (evt) => {
  if (evt.target.tagName === 'BUTTON') {
    listEnterprisesBody.classList.add('d-none');
    listEnterprisesCard.classList.remove('d-none');

    xhr.request = {
      metod: 'POST',
      url: `lopos_directory/${auth.data.directory}/operator/1/business/${evt.target.dataset.enterpriseId}/info`,
      data: `view_last=0&token=${auth.data.token}`,
      callbackSuccess: onSuccessEnterpriseCardLoad,
      callbackError: onErrorEnterpriseCardLoad
    };
  }
};

const onListEnterprisesCardReturnBtn = () => {
  listEnterprisesBody.classList.remove('d-none');
  listEnterprisesCard.classList.add('d-none');
  listEnterprisesCardName.innerText = '';
  listEnterprisesCardDate.innerText = '';
  listEnterprisesCardBalance.innerText = '';
  getEnterprises();
};

listEnterprisesBody.addEventListener('click', onListEnterprisesBodyClick);
listEnterprisesCardReturnBtn.addEventListener('click', onListEnterprisesCardReturnBtn);

export default {

  start() {
    listEnterprises.addEventListener('click', getEnterprises);
  },

  redraw: getEnterprises,

  stop() {
    enterprisesMarkup.cleanContainer();
    listEnterprises.removeEventListener('click', getEnterprises);
  }
};
