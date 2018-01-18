const listKeywordsBody = document.querySelector('#list-keywords-body');

export default {

  cleanContainer() {
    listKeywordsBody.innerHTML = '';
  },

  getElement(item) {

    return `
      <span class="badge" style="background-color: #${item.hex_color}">#${item.name}</span>`;
  },

  drawDataInContainer(keywordsData) {
    keywordsData.forEach((item) => listKeywordsBody.insertAdjacentHTML('beforeend', this.getElement(item)));
  },

  drawMarkupInContainer(markup) {
    listKeywordsBody.insertAdjacentHTML('beforeend', markup);
  },

};
