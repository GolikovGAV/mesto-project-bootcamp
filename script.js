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
const closeButton = document.querySelector(".close-button");
const editButton = document.querySelector(".edit-button");
const ProfileName = document.querySelector(".profile__name");
const ProfileDescription = document.querySelector(".profile__description");
const submitButton = document.querySelector(".submit-button");

function submit(event) {
  event.preventDefault();
  ProfileName.textContent = document.querySelector(".edit-form__name").value;
  ProfileDescription.textContent = document.querySelector(
    ".edit-form__description"
  ).value;
  closeOpen();
}

function closeOpen() {
  popUp.classList.contains("pop-up_opened")
    ? popUp.classList.remove("pop-up_opened")
    : popUp.classList.add("pop-up_opened");
}

closeButton.addEventListener("click", closeOpen);
editButton.addEventListener("click", closeOpen);
submitButton.addEventListener("click", submit);
