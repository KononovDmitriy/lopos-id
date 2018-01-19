const listEnterprisesBody = document.querySelector('#list-enterprises-body');
import auth from '../tools/storage.js';

export default {

  cleanContainer() {
    listEnterprisesBody.innerHTML = '';
  },

  getElement(item) {
    const currentEnterpriseFlag = (item.b_id === auth.data['currentBusiness']) ? '<div class="p-0 bg-white icon icon__check"></div>' : '';

    return `
    <div class="d-flex justify-content-between border rounded-0">
      <div><b>ID: </b>${item.b_id} <b>Имя: </b>${item.b_name} <b>Почта: </b>${item.b_owner_email} <b>Время: </b>${new Date(+(item.b_time_activity + '000')).toLocaleString()}</div>
      <div class="d-flex justify-content-between align-items-center">
        ${currentEnterpriseFlag}

        <button type="button" class="btn p-0 bg-white icon-btn icon-btn__go" data-enterprise-id="${item.b_id}"></button>
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
