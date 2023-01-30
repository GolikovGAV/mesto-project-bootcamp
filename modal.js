const profilePopUp = document.querySelector("#edit-form");
const fullImagePopUp = document.querySelector("#full-image");
const popUpNewPlace = document.querySelector("#new-place");
const newPlaceNameInput = popUpNewPlace.querySelector("#newplace-name");
const newPlaceLinkInput = popUpNewPlace.querySelector("#newplace-link");

// close pop-ups

function closePopUp(data) {
  data.classList.remove("pop-up_opened");
}

//  open pop-ups

function openPopUp(data) {
  data.classList.add("pop-up_opened");
}

// close pop up by clicking on "not working area"

function closePopUpNotWorkingArea(event) {
  const openedPopUp = document.querySelector(".pop-up_opened");
  if (event.target == openedPopUp) {
    closePopUp(openedPopUp);
  }
}

// close by escape function

function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopUp = document.querySelector(".pop-up_opened");
    closePopUp(openedPopUp);
  }
}

export {
  profilePopUp,
  fullImagePopUp,
  popUpNewPlace,
  newPlaceNameInput,
  newPlaceLinkInput,
  closePopUp,
  openPopUp,
  closePopUpNotWorkingArea,
  closeByEscape,
};
