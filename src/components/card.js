import { initialCards, newCard } from "./objects.js";
import { openPopUp, fullImagePopUp } from "./modal.js";
import {
  newPlaceNameInput,
  newPlaceLinkInput,
  closePopUp,
  popUpNewPlace,
} from "./modal.js";

const templateElement = document.querySelector("#templateElement");
const fullImage = document.querySelector(".pop-up__full-image");
const fullImageDescription = document.querySelector(".pop-up__description");
const closeButtonNewPlace = document.querySelector("#close-newplace");
const elements = document.querySelector(".elements");

// create new place card function

const createNewElement = function (data) {
  const element = templateElement.content
    .querySelector(".element")
    .cloneNode(true);

  element.querySelector(".element__image").src = data.link;
  element.querySelector(".element__image").alt = data.alt;
  element.querySelector(".element__name").textContent = data.name;

  addLikeButtonListener(element);
  fullImageListener(element, data);
  addDeleteButtonListener(element);

  return element;
};

// creating custom cards by name + link

const submitCreate = function (event) {
  event.preventDefault();

  newCard[0].name = newPlaceNameInput.value;
  newCard[0].link = newPlaceLinkInput.value;

  newCard.forEach(function (data) {
    const card = createNewElement(data);
    elements.prepend(card);
  });

  closePopUp(popUpNewPlace);

  event.target.reset();
};

// like button

function addLikeButtonListener(element) {
  const likeButton = element.querySelector(".like-button");

  likeButton.addEventListener("click", (event) =>
    event.target.classList.toggle("like-button_active")
  );
}

// full image listener

function fullImageListener(element, data) {
  const imageListener = element.querySelector(".element__image");

  imageListener.addEventListener("click", function (object) {
    if (object.target.closest(".element")) {
      fullImage.src = data.link;
      fullImageDescription.textContent = data.name;

      openPopUp(fullImagePopUp);
    }
  });
}

// delete button

function addDeleteButtonListener(element) {
  const deleteButton = element.querySelector(".delete-button");

  deleteButton.addEventListener("click", () => element.remove());
}

// rendering initialCards
initialCards.forEach(function (obj) {
  elements.append(createNewElement(obj));
});

export {
  templateElement,
  fullImage,
  fullImageDescription,
  closeButtonNewPlace,
  elements,
  createNewElement,
  submitCreate,
};
