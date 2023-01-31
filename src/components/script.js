import "../pages/index.css";
import {
  profilePopUp,
  fullImagePopUp,
  popUpNewPlace,
  closePopUp,
  openPopUp,
  closePopUpNotWorkingArea,
  closeByEscape,
} from "./modal.js";
import { closeButtonNewPlace, submitCreate } from "./card.js";
import { enableValidation } from "./validation.js";

const configSelector = {
  formSelector: ".edit-form__form",
  inputSelector: ".edit-form__input",
  submitButtonSelector: ".submit-button",
  inactiveButtonClass: "submit-button_inactive",
  inputErrorClass: "edit-form__input_invalid",
  errorClass: "",
};

const closeProfile = document.querySelector("#close-profile");
const editButton = document.querySelector(".edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const closeButtonFullImage = document.querySelector("#close-full-image");
const addButton = document.querySelector(".add-button");
const nameInput = document.querySelector("#edit-form__name");
const descriptionInput = document.querySelector("#edit-form__description");

//get user info to edit form
function getUserInfo() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// submit function for saving new profile info

function submit(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopUp(profilePopUp);
  event.target.reset();
}

// eventListeners for new cards pop-up

closeButtonNewPlace.addEventListener("click", () => {
  closePopUp(popUpNewPlace);
});

// open profile edit
editButton.addEventListener("click", function () {
  getUserInfo();
  openPopUp(profilePopUp);
});

// new place add button (opening a pop-up window for further creation)

addButton.addEventListener("click", () => {
  openPopUp(popUpNewPlace);
});

// eventListenres for profile buttons

closeProfile.addEventListener("click", () => closePopUp(profilePopUp));

// close pop-ups by escape listener

// submit button (confirming the creation of a new card)

popUpNewPlace
  .querySelector(".edit-form__form")
  .addEventListener("submit", submitCreate);

// confirming changes for new profile info

profilePopUp
  .querySelector(".edit-form__form")
  .addEventListener("submit", submit);

// full image listener

closeButtonFullImage.addEventListener("click", () =>
  closePopUp(fullImagePopUp)
);

// close pop up by clicking on "not working area"

document.addEventListener("click", closePopUpNotWorkingArea);

enableValidation(configSelector);
