import xhr from '../tools/xhr.js';
import auth from '../tools/storage.js';
import contractorsMarkup from '../markup/reference-contractors.js';
import contractorsCardMarkup from '../markup/reference-contractors-card.js';
import toolsMarkup from '../markup/tools.js';

const loaderSpinnerId = 'loader-contractors';
const loaderSpinnerMessage = 'Загрузка';
const loaderSpinnerMarkup = toolsMarkup.getLoadSpinner(loaderSpinnerId, loaderSpinnerMessage);

const listBuyers = document.querySelector('#list-contractor-buyers-list');
const listSuppliers = document.querySelector('#list-contractor-suppliers-list');

const listContractorsHeaderType = document.querySelector('#list-contractors-header-type');
const listContractorsAddBtn = document.querySelector('#contractors-add-btn');
const listContractorsAddForm = document.querySelector('#contractors-add-form');
const listContractorsHeader = document.querySelector('#list-contractors-header');
const listContractorsBody = document.querySelector('#list-contractors-body');
const listContractorsCard = document.querySelector('#list-contractors-card');
const listContractorsCardReturnBtn = document.querySelector('#list-contractors-card-return-btn');
// const listContractorsCardEditBtn = document.querySelector('#list-contractors-card-edit-btn');

const listContractorsFormEditLabel = document.querySelector('#contractors-add-label');
const listContractorsFormEditName = document.querySelector('#contractors-name');
const listContractorsFormEditDescribe = document.querySelector('#contractors-describe');
const listContractorsFormEditContact = document.querySelector('#contractors-contact');
const listContractorsFormEditPhone = document.querySelector('#contractors-phone');
const listContractorsFormEditEmail = document.querySelector('#contractors-email');
const listContractorsFormSubmit = document.querySelector('#contractors-add-submit');
const listContractorsFormBill = document.querySelector('#contractors-add-bill');

let contractorsData = [];

const ContractorType = {
  SUPPLIER: 1,
  BUYER: 2
};

const showBodyHideCard = () => {
  listContractorsBody.classList.remove('d-none');
  listContractorsCard.classList.add('d-none');
  listContractorsHeader.classList.add('d-flex');
  listContractorsHeader.classList.remove('d-none');
};

const hideBodyShowCard = () => {
  listContractorsBody.classList.add('d-none');
  listContractorsCard.classList.remove('d-none');
};

listContractorsAddBtn.addEventListener('click', function () {
  listContractorsAddForm.reset();
  auth.currentContractorOperation = 'add';
  listContractorsFormSubmit.innerHTML = 'Создать';

});

/*
listContractorsCardEditBtn.addEventListener('click', function () {
  auth.currentContractorOperation = 'edit';
  listContractorsFormSubmit.innerHTML = 'Изменить';
});
*/

listContractorsCardReturnBtn.addEventListener('click', function () {
  showBodyHideCard();
  getContractors(auth.currentContractorType);
});


const onSuccessContractorsLoad = (loadedContractors) => {
  document.querySelector(`#${loaderSpinnerId}`).remove();
  if (loadedContractors.status === 200) {
    console.log(loadedContractors);
    if (loadedContractors.data.length) {
      contractorsData = loadedContractors.data.slice(0);
    }
    contractorsCardMarkup.cleanContainer();
    contractorsMarkup.drawDataInContainer(loadedContractors.data);
    // listContractorsFormSubmit.innerHTML = 'Создать';
    // auth.currentContractorOperation = 'add';

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
    contractorsCardMarkup.cleanContainer();
    contractorsCardMarkup.drawDataInContainer(loadedBuyerCard.data);
    // auth.currentContractorOperation = 'edit';
    // listContractorsFormSubmit.innerHTML = 'Изменить';

  } else {
    contractorsCardMarkup.drawMarkupInContainer(`<p>${loadedBuyerCard.message}</p>`);

  }
};

const onErrorBuyerCardLoad = (error) => {
  console.log(error);
};

const onListContractorsBodyClick = (evt) => {
  let currentStringElement = evt.target;

  while (!currentStringElement.dataset.buyerId) {
    currentStringElement = currentStringElement.parentNode;
  }

  let {id, name, description, phone, contact, email} = contractorsData[currentStringElement.dataset.index];

  $('#contractors-add').modal('show');

  auth.currentContractorId = id;

  listContractorsFormEditName.value = name ? name : '';
  listContractorsFormEditDescribe.value = description ? description : '';
  listContractorsFormEditContact.value = contact ? contact : '';
  listContractorsFormEditPhone.value = phone ? phone : '';
  listContractorsFormEditEmail.value = email ? email : '';
  listContractorsFormSubmit.innerHTML = 'Изменить';
  auth.currentContractorOperation = 'edit';

  listContractorsFormBill.classList.remove('d-none');

  console.log(auth.currentContractorId);
  console.log(auth.currentContractorOperation);
  console.log(contractorsData);

  listContractorsFormBill.addEventListener('click', function () {
    hideBodyShowCard();
    listContractorsHeader.classList.remove('d-flex');
    listContractorsHeader.classList.add('d-none');

    contractorsCardMarkup.drawMarkupInContainer(loaderSpinnerMarkup);

    xhr.request = {
      metod: 'POST',
      url: `lopos_directory/${auth.data.directory}/operator/1/business/${auth.data.currentBusiness}/kontr_agent/${currentStringElement.dataset.buyerId}`,
      data: `token=${auth.data.token}&count_doc=4&shift_doc=0`,
      callbackSuccess: onSuccessBuyerCardLoad,
      callbackError: onErrorBuyerCardLoad
    };
  });

};

listContractorsBody.addEventListener('click', onListContractorsBodyClick);

const getContractors = (type) => {
  showBodyHideCard();


  listContractorsHeaderType.innerHTML = (type === ContractorType.SUPPLIER) ? contractorsMarkup.getSuppliersHeader() : contractorsMarkup.getBuyersHeader();
  listContractorsFormEditLabel.innerHTML = (type === ContractorType.SUPPLIER) ? 'Поставщики' : 'Покупатели';
  auth.currentContractorType = type;

  contractorsMarkup.cleanContainer();
  contractorsMarkup.drawMarkupInContainer(loaderSpinnerMarkup);

  xhr.request = {
    metod: 'POST',
    url: `lopos_directory/${auth.data.directory}/operator/1/business/${auth.data.currentBusiness}/kontr_agent`,
    data: `view_last=0&token=${auth.data.token}&type=${type}`,
    callbackSuccess: onSuccessContractorsLoad,
    callbackError: onErrorContractorsLoad
  };
};

$('#contractors-add').on('hidden.bs.modal', function (e) {
  listContractorsFormBill.classList.add('d-none');

});
$('#contractors-add').on('show.bs.modal', function (e) {
  listContractorsFormSubmit.innerHTML = (auth.currentContractorOperation === 'edit') ? 'Изменить' : 'Создать';
  console.log(auth.currentContractorId);
  console.log(auth.currentContractorOperation);

});

export default {

  start() {
    listBuyers.addEventListener('click', getContractors.bind(null, ContractorType.BUYER));
    listSuppliers.addEventListener('click', getContractors.bind(null, ContractorType.SUPPLIER));
  },

  redraw: getContractors,

  stop() {
    contractorsMarkup.cleanContainer();
    listBuyers.removeEventListener('click', getContractors);
    listSuppliers.addEventListener('click', getContractors);
  }
};
