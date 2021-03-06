const modalActionRequest = document.querySelector('#modal-action-request');
const modalActionRequestTitle = modalActionRequest.querySelector('#modal-action-request-title');
const modalActionRequestMessage = modalActionRequest.querySelector('#modal-action-request-message');
const modalActionRequestSubmit = modalActionRequest.querySelector('#modal-action-request-submit');

const modalInformation = document.querySelector('#modal-information');
const modalInformationTitle = modalInformation.querySelector('#modal-information-title');
const modalInformationMessage = modalInformation.querySelector('#modal-information-message');

export default {

  getWaitSpinner(id, message) {
    return `
      <div id="loader" class="progress text-white" style="height: 25px;">
        <div class="progress-bar progress-bar-striped progress-bar-animated text-white font-weight-bold text-uppercase bg-success" style="width: 100%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${message}</div>
      </div>`;
  },

  getLoadSpinner(id, message) {
    return `
      <div id="${id}" class="progress text-white" style="height: 25px;">
        <div class="progress-bar progress-bar-striped progress-bar-animated text-white font-weight-bold text-uppercase" style="width: 100%" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${message}</div>
      </div>`;
  },

  getError(id, message) {
    return `
      <div id="loader-fail" class="container-fluid bg-danger text-white text-center mb-5" style="height: 25;">${message}</div>`;
  },

  set actionRequestModal(setup) {

    $(modalActionRequest).modal('show');
    modalActionRequestTitle.innerHTML = setup.title;
    modalActionRequestMessage.innerHTML = setup.message;
    modalActionRequestSubmit.addEventListener('click', setup.submitCallback);
  },

  set informationtModal(setup) {
    $(modalInformation).modal('show');
    modalInformationTitle.innerHTML = setup.title;
    modalInformationMessage.innerHTML = setup.message;
  },

};
