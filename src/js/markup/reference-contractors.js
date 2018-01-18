const listContractorsBody = document.querySelector('#list-contractors-body');

export default {

  cleanContainer() {
    listContractorsBody.innerHTML = '';
  },

  getElement(item) {

    return `

    <div class="d-flex justify-content-between border rounded-0">
      <div><b>ID: </b>${item.id} <b>Имя: </b>${item.name}</div>
      <div>
        <button type="button" class="btn btn-primary btn-sm" data-buyer-id="${item.id}"> &rarr; </button>
      </div>
    </div>`;
  },

  drawDataInContainer(buyersBodyData) {
    buyersBodyData.forEach((item) => listContractorsBody.insertAdjacentHTML('beforeend', this.getElement(item)));
  },

  drawMarkupInContainer(markup) {
    listContractorsBody.insertAdjacentHTML('beforeend', markup);
  },

};
