const listKeywordsHeader = document.querySelector('#list-keywords-header');
const listKeywordsBody = document.querySelector('#list-keywords-body');
const listKeywordsCard = document.querySelector('#list-keywords-card');
const listKeywordsCardEdit = document.querySelector('#list-keywords-card-edit');
<<<<<<< HEAD
import auth from '../tools/storage.js';
=======
>>>>>>> 82361c688c5524e219854a580f94f1827f791b1d

export default {

  cleanContainer() {
    listKeywordsBody.innerHTML = '';
  },

  getElement(item) {

    return `
      <span class="badge" style="background-color: #${item.hex_color}; cursor: pointer;">#${item.name}</span>`;
  },

  drawDataInContainer(keywordsData) {
    keywordsData.forEach((item) => {
      listKeywordsBody.insertAdjacentHTML('beforeend', this.getElement(item));

      listKeywordsBody.lastChild.addEventListener('click', function () {
        listKeywordsHeader.classList.add('d-none');
        listKeywordsHeader.classList.remove('d-flex');
        listKeywordsBody.classList.add('d-none');
        listKeywordsCard.classList.remove('d-none');
        listKeywordsCardEdit.innerHTML = `<div class="text-center"><button type="button" class="btn btn-lg text-white" style="background-color: #${item.hex_color}">#${item.name}</button></div>`;
<<<<<<< HEAD
        console.log(item.id);
        auth.currentKeywordId = item.id;
        console.log(auth.currentKeywordId);
=======
>>>>>>> 82361c688c5524e219854a580f94f1827f791b1d
      });

    });
  },

  drawMarkupInContainer(markup) {
    listKeywordsBody.insertAdjacentHTML('beforeend', markup);
  },

};
