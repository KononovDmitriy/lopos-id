import xhr from '../tools/xhr.js';
import auth from '../tools/storage.js';
import buyersMarkup from '../markup/reference-buyers.js';
import buyersCardMarkup from '../markup/reference-buyers-card.js';
import toolsMarkup from '../markup/tools.js';

const loaderSpinnerId = 'loader-enterprises';
const loaderSpinnerMessage = 'Ждем загрузки предприятий';
const loaderSpinnerMarkup = toolsMarkup.getLoadSpinner(loaderSpinnerId, loaderSpinnerMessage);

const listBuyers = document.querySelector('#list-buyers-list');
const listSuppliers = document.querySelector('#list-suppliers-list');
const listBuyersHeaderType = document.querySelector('#list-buyers-header-type');

const listBuyersAddBtn = document.querySelector('#buyers-add-btn');
const listBuyersAddForm = document.querySelector('#buyers-add-form');
const listBuyersBody = document.querySelector('#list-buyers-body');
const listBuyersCard = document.querySelector('#list-buyers-card');
const listBuyersCardReturnBtn = document.querySelector('#list-buyers-card-return-btn');
const listBuyersCardEditBtn = document.querySelector('#list-buyers-card-edit-btn');

const listBuyersFormEditName = document.querySelector('#buyers-name');
const listBuyersFormEditDescribe = document.querySelector('#buyers-describe');
const listBuyersFormEditContact = document.querySelector('#buyers-contact');
const listBuyersFormEditEmail = document.querySelector('#buyers-email');


listBuyersAddBtn.addEventListener('click', function () {
  listBuyersAddForm.reset();
});

listBuyersCardReturnBtn.addEventListener('click', function () {
  listBuyersBody.classList.remove('d-none');
  listBuyersCard.classList.add('d-none');
  getBuyers(auth.currentKontragent);
});


const onSuccessBuyersLoad = (loadedBuyers) => {
  document.querySelector(`#${loaderSpinnerId}`).remove();
  if (loadedBuyers.status === 200) {
    console.log(loadedBuyers);
    buyersCardMarkup.cleanContainer();
    buyersMarkup.drawDataInContainer(loadedBuyers.data);
  } else {
    buyersMarkup.drawMarkupInContainer(`<p>${loadedBuyers.message}</p>`);

  }
};

const onErrorBuyersLoad = (error) => {
  console.log(error);
};


const onSuccessBuyerCardLoad = (loadedBuyerCard) => {
  document.querySelector(`#${loaderSpinnerId}`).remove();
  if (loadedBuyerCard.status === 200) {
    console.log(loadedBuyerCard);
    buyersCardMarkup.drawDataInContainer(loadedBuyerCard.data);

    listBuyersCardEditBtn.addEventListener('click', function () {
      listBuyersFormEditName.value = loadedBuyerCard.data.name;
      listBuyersFormEditDescribe.value = loadedBuyerCard.data.description;
      listBuyersFormEditContact.value = loadedBuyerCard.data.contact;
      listBuyersFormEditEmail.value = loadedBuyerCard.data.email;
    });

  } else {
    buyersCardMarkup.drawMarkupInContainer(`<p>${loadedBuyerCard.message}</p>`);

  }
};

const onErrorBuyerCardLoad = (error) => {
  console.log(error);
};


const onListBuyersBodyClick = (evt) => {
  if (evt.target.tagName === 'BUTTON') {
    listBuyersBody.classList.add('d-none');
    listBuyersCard.classList.remove('d-none');
    buyersCardMarkup.drawMarkupInContainer(loaderSpinnerMarkup);

    xhr.request = {
      metod: 'POST',
      url: `lopos_directory/${auth.data.directory}/operator/1/business/${auth.data.currentBusiness}/kontr_agent/${evt.target.dataset.buyerId}`,
      data: `token=${auth.data.token}&count_doc=4&shift_doc=2`,
      callbackSuccess: onSuccessBuyerCardLoad,
      callbackError: onErrorBuyerCardLoad
    };
  }
};

listBuyersBody.addEventListener('click', onListBuyersBodyClick);

const getBuyers = (type) => {
  console.log(type);
  listBuyersBody.classList.remove('d-none');
  listBuyersCard.classList.add('d-none');
  listBuyersHeaderType.innerHTML = (type === 1) ? 'Поставщики' : 'Покупатели';
  buyersMarkup.cleanContainer();
  buyersMarkup.drawMarkupInContainer(loaderSpinnerMarkup);
  auth.currentKontragent = type;

  xhr.request = {
    metod: 'POST',
    url: `lopos_directory/${auth.data.directory}/operator/1/business/${auth.data.currentBusiness}/kontr_agent`,
    data: `view_last=0&token=${auth.data.token}&type=${type}`,
    callbackSuccess: onSuccessBuyersLoad,
    callbackError: onErrorBuyersLoad
  };
};

export default {

  start() {
    listBuyers.addEventListener('click', getBuyers.bind(null, 2));
    listSuppliers.addEventListener('click', getBuyers.bind(null, 1));
  },

  redraw: getBuyers,

  stop() {
    buyersMarkup.cleanContainer();
    listBuyers.removeEventListener('click', getBuyers);
  }
};
