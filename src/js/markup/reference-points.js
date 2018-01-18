const listPointsBody = document.querySelector('#list-points-body');
import auth from '../tools/storage.js';

export default {

  cleanContainer() {
    listPointsBody.innerHTML = '';
  },

  getElement(item) {
    const currentStockFlag = (item.id === auth.data['currentStock']) ? 'V' : '';

    return `
    <input type="radio" id="${item.id}" name="contact" value="email" class="d-none">
    <label id="log-row" for="${item.id}" class="card mb-0 p-1 rounded-0" style="width: 100%" data-stock-id="${item.id}" data-stock-name="${item.name}">
        <div>
          <b>ID: </b>${item.id} <b>Имя: </b>${item.name}
          <div class="badge text-right float-right">
            <span class="badge badge-pill badge-success">${currentStockFlag}</span>
          </div>
      </label>`;
  },

  drawDataInContainer(enterprisesData) {
    enterprisesData.forEach((item) => listPointsBody.insertAdjacentHTML('beforeend', this.getElement(item)));
  },

  drawMarkupInContainer(markup) {
    listPointsBody.insertAdjacentHTML('beforeend', markup);
  },

};