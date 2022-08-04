import { galleryItems } from "./gallery-items.js";
// Change code below this line
let instance;
const galleryEl = document.querySelector(".gallery");

const galleryItemsMarkupEl = createGallaryItemMarkup(galleryItems);

galleryEl.insertAdjacentHTML(`beforeend`, galleryItemsMarkupEl);

galleryEl.addEventListener(`click`, onGalleryClick);

function createGallaryItemMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
    <a class="gallery__link" href="large-image.jpg">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
    })
    .join(``);
}

function onGalleryClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains(`gallery__image`)) {
    return;
  }
  instance = basicLightbox.create(
    `
    <div class="modal">
        <img src="${e.target.dataset.source}" width="800" height="600">
    </div>
    
`,
    {
      onShow: (instance) => {
        window.addEventListener(`keydown`, onEscKeyPress);
      },
      onClose: (instance) => {
        window.removeEventListener(`keydown`, onEscKeyPress);
      },
    }
  );
  instance.show();
}
function onEscKeyPress(e) {
  if (e.code === "Escape") instance.close();
}
