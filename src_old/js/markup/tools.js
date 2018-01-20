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
  }


};
