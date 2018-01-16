const listEnterprisesBody = document.querySelector('#list-enterprises-body');
import auth from '../tools/storage.js';

export default {

  cleanContainer() {
    listEnterprisesBody.innerHTML = '';
  },

  getElement(item) {
    const currentEnterpriseFlag = (item.b_id === auth.data['currentBusiness']) ? 'V' : '';

    return `
    <div id="log-row" class="card mb-0 p-1 rounded-0" style="width: 100%">
      <div class="media">
        <div class="media-body">
          <b>ID: </b>${item.b_id} <b>Имя: </b>${item.b_name} <b>Почта: </b>${item.b_owner_email} <b>Время: </b>${new Date(+(item.b_time_activity + '000')).toLocaleString()}
          <div class="badge text-right float-right"><span class="badge badge-pill badge-success">${currentEnterpriseFlag}</span> <button type="button" class="btn btn-primary btn-sm" data-enterprise-id="${item.b_id}"> > </button> </div>
        </div>
      </div>`;
  },

  drawDataInContainer(enterprisesData) {
    enterprisesData.forEach((item) => listEnterprisesBody.insertAdjacentHTML('beforeend', this.getElement(item)));
  },

  drawMarkupInContainer(markup) {
    listEnterprisesBody.insertAdjacentHTML('beforeend', markup);
  },

};
