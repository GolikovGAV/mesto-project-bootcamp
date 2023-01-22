const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const popUp = document.querySelector("#edit-form");
const closeProfile = document.querySelector("#close-profile");
const editButton = document.querySelector(".edit-button");
const ProfileName = document.querySelector(".profile__name");
const ProfileDescription = document.querySelector(".profile__description");
const submitButton = document.querySelector("#save-profile");
const fullImagePopUp = document.querySelector("#full-image");
const elements = document.querySelector(".elements");
function closeOpen(data) {
  // close and open for pop-ups
  data.classList.contains("pop-up_opened")
    ? data.classList.remove("pop-up_opened")
    : data.classList.add("pop-up_opened");
}
// submit function for saving new profile info
function submit(event) {
  event.preventDefault();
  ProfileName.textContent = document.querySelector(".edit-form__name").value;
  ProfileDescription.textContent = document.querySelector(
    ".edit-form__description"
  ).value;
  closeOpen(popUp);
}
// eventListenres for profile buttons
closeProfile.addEventListener("click", () => closeOpen(popUp));
editButton.addEventListener("click", () => closeOpen(popUp));
submitButton.addEventListener("click", submit);
// createNewElement function
const templateElement = document.querySelector("#templateElement").content;
const createNewElement = function (data) {
  const element = templateElement.querySelector(".element").cloneNode(true);
  element.querySelector(".element__image").src = data.link;
  element.querySelector(".element__name").textContent = data.name;
  elements.prepend(element);
  // adding cards like
  const likeButton = element.querySelector(".like-button");
  likeButton.addEventListener("click", (event) =>
    event.target.classList.toggle("like-button_active")
  );
  // full image listener
  const imageListener = element.querySelector(".element__image");
  imageListener.addEventListener("click", function (object) {
    if (object.target.closest(".element")) {
      document.querySelector(".pop-up__full-image").src = data.link;
      document.querySelector(".pop-up__description").textContent = data.name;
      closeOpen(fullImagePopUp);
    }
  });
  // delete button
  const deleteButton = element.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => element.remove());
};
// full image
const closeButtonFullImage = document.querySelector("#close-full-image");
closeButtonFullImage.addEventListener("click", () => closeOpen(fullImagePopUp));
// rendering initialCards
initialCards.forEach(createNewElement);
// adding pop-up for creating custom cards by name + link
const popUpNewPlace = document.querySelector("#new-place");
closeButtonNewPlace = document.querySelector("#close-newplace");
addButton = document.querySelector(".add-button");
createButton = document.querySelector("#create-button");
function submitCreate(event) {
  const newCard = [
    {
      name: "",
      link: "",
    },
  ];
  event.preventDefault();
  newCard[0].name = popUpNewPlace.querySelector(".edit-form__name").value;
  newCard[0].link = popUpNewPlace.querySelector(
    ".edit-form__description"
  ).value;
  newCard.forEach(createNewElement);
  closeOpen(popUpNewPlace);
}
// eventListeners for new cards pop-up
closeButtonNewPlace.addEventListener("click", () => closeOpen(popUpNewPlace));
addButton.addEventListener("click", () => closeOpen(popUpNewPlace));
createButton.addEventListener("click", submitCreate);
