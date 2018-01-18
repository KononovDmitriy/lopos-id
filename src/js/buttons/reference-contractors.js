import xhr from '../tools/xhr.js';
import auth from '../tools/storage.js';
import contractorsMarkup from '../markup/reference-contractors.js';
import contractorsCardMarkup from '../markup/reference-contractors-card.js';
import toolsMarkup from '../markup/tools.js';

const loaderSpinnerId = 'loader-enterprises';
const loaderSpinnerMessage = 'Загрузка';
const loaderSpinnerMarkup = toolsMarkup.getLoadSpinner(loaderSpinnerId, loaderSpinnerMessage);

const listBuyers = document.querySelector('#list-contractor-buyers-list');
const listSuppliers = document.querySelector('#list-contractor-suppliers-list');

const listContractorsHeaderType = document.querySelector('#list-contractors-header-type');
const listContractorsAddBtn = document.querySelector('#contractors-add-btn');
const listContractorsAddForm = document.querySelector('#contractors-add-form');
const listContractorsBody = document.querySelector('#list-contractors-body');
const listContractorsCard = document.querySelector('#list-contractors-card');
const listContractorsCardReturnBtn = document.querySelector('#list-contractors-card-return-btn');
const listContractorsCardEditBtn = document.querySelector('#list-contractors-card-edit-btn');

const listContractorsFormEditName = document.querySelector('#contractors-name');
const listContractorsFormEditDescribe = document.querySelector('#contractors-describe');
const listContractorsFormEditContact = document.querySelector('#contractors-contact');
const listContractorsFormEditEmail = document.querySelector('#contractors-email');


listContractorsAddBtn.addEventListener('click', function () {
  listContractorsAddForm.reset();
});

listContractorsCardReturnBtn.addEventListener('click', function () {
  listContractorsBody.classList.remove('d-none');
  listContractorsCard.classList.add('d-none');
  getContractors(auth.currentContractor);
});


const onSuccessContractorsLoad = (loadedContractors) => {
  document.querySelector(`#${loaderSpinnerId}`).remove();
  if (loadedContractors.status === 200) {
    console.log(loadedContractors);
    contractorsCardMarkup.cleanContainer();
    contractorsMarkup.drawDataInContainer(loadedContractors.data);
  } else {
    contractorsMarkup.drawMarkupInContainer(`<p>${loadedContractors.message}</p>`);

  }
};

const onErrorContractorsLoad = (error) => {
  console.log(error);
};


const onSuccessBuyerCardLoad = (loadedBuyerCard) => {
  document.querySelector(`#${loaderSpinnerId}`).remove();
  if (loadedBuyerCard.status === 200) {
    console.log(loadedBuyerCard);
    contractorsCardMarkup.drawDataInContainer(loadedBuyerCard.data);

    listContractorsCardEditBtn.addEventListener('click', function () {
      listContractorsFormEditName.value = loadedBuyerCard.data.name;
      listContractorsFormEditDescribe.value = loadedBuyerCard.data.description;
      listContractorsFormEditContact.value = loadedBuyerCard.data.contact;
      listContractorsFormEditEmail.value = loadedBuyerCard.data.email;
    });

  } else {
    contractorsCardMarkup.drawMarkupInContainer(`<p>${loadedBuyerCard.message}</p>`);

  }
};

const onErrorBuyerCardLoad = (error) => {
  console.log(error);
};


const onListContractorsBodyClick = (evt) => {
  if (evt.target.tagName === 'BUTTON') {
    listContractorsBody.classList.add('d-none');
    listContractorsCard.classList.remove('d-none');
    contractorsCardMarkup.drawMarkupInContainer(loaderSpinnerMarkup);

    xhr.request = {
      metod: 'POST',
      url: `lopos_directory/${auth.data.directory}/operator/1/business/${auth.data.currentBusiness}/kontr_agent/${evt.target.dataset.buyerId}`,
      data: `token=${auth.data.token}&count_doc=4&shift_doc=2`,
      callbackSuccess: onSuccessBuyerCardLoad,
      callbackError: onErrorBuyerCardLoad
    };
  }
};

listContractorsBody.addEventListener('click', onListContractorsBodyClick);

const getContractors = (type) => {
  console.log(type);
  listContractorsBody.classList.remove('d-none');
  listContractorsCard.classList.add('d-none');
  listContractorsHeaderType.innerHTML = (type === 1) ? 'Поставщики' : 'Покупатели';
  contractorsMarkup.cleanContainer();
  contractorsMarkup.drawMarkupInContainer(loaderSpinnerMarkup);
  auth.currentContractor = type;

  xhr.request = {
    metod: 'POST',
    url: `lopos_directory/${auth.data.directory}/operator/1/business/${auth.data.currentBusiness}/kontr_agent`,
    data: `view_last=0&token=${auth.data.token}&type=${type}`,
    callbackSuccess: onSuccessContractorsLoad,
    callbackError: onErrorContractorsLoad
  };
};

export default {

  start() {
    listBuyers.addEventListener('click', getContractors.bind(null, 2));
    listSuppliers.addEventListener('click', getContractors.bind(null, 1));
  },

  redraw: getContractors,

  stop() {
    contractorsMarkup.cleanContainer();
    listBuyers.removeEventListener('click', getContractors);
    listSuppliers.addEventListener('click', getContractors);
  }
};
