const listEnterprisesBody = document.querySelector('#list-enterprises-body');
import auth from '../tools/storage.js';

export default {

  cleanContainer() {
    listEnterprisesBody.innerHTML = '';
  },

  getElement(item) {
    const currentEnterpriseFlag = (item.b_id === auth.data['currentBusiness']) ? '<button type="button" class="btn p-0 bg-white reference-icon""><img src="img/icons8-checked-96.png" alt=""></button>' : '';

    return `
    <div class="d-flex justify-content-between border rounded-0">
      <div><b>ID: </b>${item.b_id} <b>Имя: </b>${item.b_name} <b>Почта: </b>${item.b_owner_email} <b>Время: </b>${new Date(+(item.b_time_activity + '000')).toLocaleString()}</div>
      <div>
        ${currentEnterpriseFlag}

        <button type="button" class="btn p-0 bg-white reference-icon" data-enterprise-id="${item.b_id}" style="background-image: url(img/arrow-right.png); background-size: cover;"></button>
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
