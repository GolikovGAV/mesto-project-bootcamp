const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Архыз горы",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Зимний лес и река",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Иваново панельки",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Камчатка",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Железная дорого в лесу",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Берег Байкала",
  },
];
const newCard = [
  {
    name: "",
    link: "",
    alt: "Ваше изображение",
  },
];
const profilePopUp = document.querySelector("#edit-form");
const closeProfile = document.querySelector("#close-profile");
const editButton = document.querySelector(".edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const submitButton = document.querySelector("#save-profile");
const fullImagePopUp = document.querySelector("#full-image");
const elements = document.querySelector(".elements");
const templateElement = document.querySelector("#templateElement");
const closeButtonFullImage = document.querySelector("#close-full-image");
const popUpNewPlace = document.querySelector("#new-place");
const closeButtonNewPlace = document.querySelector("#close-newplace");
const addButton = document.querySelector(".add-button");
const createButton = document.querySelector("#create-button");
const nameInput = document.querySelector(".edit-form__name");
const descriptionInput = document.querySelector(".edit-form__description");
const fullImage = document.querySelector(".pop-up__full-image");
const fullImageDescription = document.querySelector(".pop-up__description");
const newPlaceNameInput = popUpNewPlace.querySelector(".edit-form__name");
const newPlaceLinkInput = popUpNewPlace.querySelector(
  ".edit-form__description"
);

// close pop-ups
function closePopUp(data) {
  data.classList.remove("pop-up_opened");
}
//  open pop-ups
function openPopUp(data) {
  data.classList.add("pop-up_opened");
}
//get user info to edit form
function getUserInfo() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}
// open profile edit
editButton.addEventListener("click", function () {
  getUserInfo();
  openPopUp(profilePopUp);
});
// submit function for saving new profile info
function submit(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopUp(profilePopUp);
}
// like button
function addLikeButtonListener(element) {
  const likeButton = element.querySelector(".like-button");

  likeButton.addEventListener("click", (event) =>
    event.target.classList.toggle("like-button_active")
  );
}
// delete button
function addDeleteButtonListener(element) {
  const deleteButton = element.querySelector(".delete-button");

  deleteButton.addEventListener("click", () => element.remove());
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
// rendering initialCards
initialCards.forEach(function (obj) {
  elements.append(createNewElement(obj));
});
// adding pop-up for creating custom cards by name + link
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
// eventListeners for new cards pop-up
closeButtonNewPlace.addEventListener("click", () => closePopUp(popUpNewPlace));

addButton.addEventListener("click", () => openPopUp(popUpNewPlace));

// eventListenres for profile buttons
closeProfile.addEventListener("click", () => closePopUp(profilePopUp));
//
popUpNewPlace
  .querySelector(".edit-form__form")
  .addEventListener("submit", submitCreate);

profilePopUp
  .querySelector(".edit-form__form")
  .addEventListener("submit", submit);
// full image
closeButtonFullImage.addEventListener("click", () =>
  closePopUp(fullImagePopUp)
);
// // VALIDATION
// function enableValidation() {
//   const forms = document.querySelectorAll(".edit-form__form");

//   [...forms].forEach((form) => {
//     form.addEventListener("sumbit", (event) => {
//       event.preventDefault();
//       console.log(form);
//     });
//   });
//   // console.log(forms);
// }
// // enableValidation();
