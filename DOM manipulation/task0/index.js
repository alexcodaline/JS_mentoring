const form = document.getElementById("formAddImage");
const gallery = document.getElementById("gallery");

// ----------------------------------------------------
const imagesNav = [];
// -----------------------------form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = document.getElementById("imageURL").value;
  const desc = document.getElementById("imageDesc").value;
  if (url.length === 0 || desc.length === 0) {
    return alert("form is empty");
  }
// ---------------add new image
  const container = document.createElement("div");
  container.classList.add("container-items");
  const newImage = document.createElement("img");
  newImage.classList.add("new-image");
  newImage.src = url;
  newImage.alt = desc;

  const newDesc = document.createElement("span");
  newDesc.textContent = `Description: ${desc}`;
//   ----------- remove img
  const buttonRemove = document.createElement("button");
  buttonRemove.classList.add("button-remove-smallImg");
  buttonRemove.textContent = "Delete";
  buttonRemove.addEventListener("click", () => {
    gallery.removeChild(container);
    const indexRemoveItem = imagesNav.findIndex(
      (img) => img.src === url
    );
    if (indexRemoveItem !== -1) {
      imagesNav.splice(indexRemoveItem, 1);
    }
  });

  container.append(newImage, newDesc, buttonRemove);
  gallery.appendChild(container);

  // --------------add to array
  imagesNav.push({ src: url, desc: desc });
// -----------------lightbox
  newImage.addEventListener("click", () => {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    const lightboxContainer = document.createElement("div");
    lightboxContainer.classList.add("lightbox-container");

    const lightboxLargeImg = document.createElement("img");
    lightboxLargeImg.src = url;

    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.classList.add("close-button-lightbox");
    closeButton.addEventListener("click", () => {
      gallery.removeChild(lightbox);
    });

    // --------------- next img
    const nextImg = document.createElement("button");
    nextImg.textContent = "Next";
    nextImg.classList.add("next-button");

    // --------prev img
    const prevImg = document.createElement("button");
    prevImg.textContent = "Prev";
    prevImg.classList.add("prev-button");

    // -----navigate
    const navImg = (direction) => {
      const indexImg = imagesNav.findIndex(img => img.src === lightboxLargeImg.src);
      let newIndex = indexImg + direction;
      if (newIndex < 0) {
        newIndex = imagesNav.length - 1;
      } else if (newIndex >= imagesNav.length) {
        newIndex = 0;
      }
      lightboxLargeImg.src = imagesNav[newIndex].src;
    };
    nextImg.addEventListener('click', () => navImg(1));
    prevImg.addEventListener('click', () => navImg(-1));
    lightboxContainer.append(lightboxLargeImg, closeButton, nextImg, prevImg);
    lightbox.appendChild(lightboxContainer);
    gallery.appendChild(lightbox);
  });

  form.reset();
});