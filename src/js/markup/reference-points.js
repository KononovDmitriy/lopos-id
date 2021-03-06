const listPointsBody = document.querySelector('#list-points-body');
import auth from '../tools/storage.js';

export default {

  cleanContainer() {
    listPointsBody.innerHTML = '';
  },

  getElement(item) {
    // const currentStockFlag = (item.id === auth.data['currentStock']) ? '<button type="button" class="btn p-0 bg-white icon-btn icon-btn__check--green"></button>' : '';
    const currentStockFlag = (item.id === auth.data['currentStock']) ? '<div class="p-0 bg-white icon icon__check"></div>' : '';

    return `

    <input type="radio" id="${item.id}" name="contact" value="email" class="d-none">
    <label for="${item.id}"  class="d-flex justify-content-between align-items-center reference-string" data-stock-id="${item.id}" data-stock-name="${item.name}">
      <div><b>ID: </b>${item.id} <b>Имя: </b>${item.name}</div>
      <div class="d-flex justify-content-between align-items-center">
        ${currentStockFlag}
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
