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
    <label id="log-row" for="${item.id}"  class="d-flex justify-content-between border rounded-0 m-0" style="min-height: 33px;" data-stock-id="${item.id}" data-stock-name="${item.name}">
      <div><b>ID: </b>${item.id} <b>Имя: </b>${item.name}</div>
      <div>
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
