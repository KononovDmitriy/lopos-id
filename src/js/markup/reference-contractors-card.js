const listContractorsCardBody = document.querySelector('#list-contractors-card-body');

// import auth from '../tools/storage.js';


const drawHeaderInContainer = (data) => {
  return `
    <div class="d-flex justify-content-between">
      <div class="border">${data.name}</div>
      <div class="border">${data.phone}</div>
      <div class="border">${data.email}</div>
    </div>
    <div class="d-flex border">${data.description}</div>
  `;
};
export default {

  cleanContainer() {
    listContractorsCardBody.innerHTML = '';
  },

  getElement(item) {
    // const currentStockFlag = (item.id === auth.data['currentStock']) ? 'V' : '';

    return `
        <div class="border">
          <b>ID: </b>${item.id}
          <b> Статус: </b>${item.status}
          <b> Время: </b>${new Date(+(item.time_activity + '000')).toLocaleString()}
          <b> Всего: </b>${item.total}
          <b> Тип: </b>${item.type}
        </div>
`;
  },

  drawDataInContainer(buyersCardData) {
    listContractorsCardBody.insertAdjacentHTML('beforeend', drawHeaderInContainer(buyersCardData));
    if (buyersCardData.naklads) {
      buyersCardData.naklads.forEach((item) => listContractorsCardBody.insertAdjacentHTML('beforeend', this.getElement(item)));
    } else {
      listContractorsCardBody.insertAdjacentHTML('beforeend', '<p class="border">Накладных нет</p>');

    }
  },

  drawMarkupInContainer(markup) {
    listContractorsCardBody.insertAdjacentHTML('beforeend', markup);
  },

};
