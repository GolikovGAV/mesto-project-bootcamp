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

// close and open for pop-ups
function closePopUp(data) {
  data.classList.remove("pop-up_opened");
}
function openPopUp(data) {
  data.classList.add("pop-up_opened");
}

// submit function for saving new profile info
function submit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopUp(profilePopUp);
}

// createNewElement function
const createNewElement = function (data) {
  const element = templateElement.content
    .querySelector(".element")
    .cloneNode(true);
  element.querySelector(".element__image").src = data.link;
  element.querySelector(".element__image").alt = data.alt;
  element.querySelector(".element__name").textContent = data.name;

  // adding cards like
  const likeButton = element.querySelector(".like-button");
  likeButton.addEventListener("click", (event) =>
    event.target.classList.toggle("like-button_active")
  );

  // full image listener

  const imageListener = element.querySelector(".element__image");
  imageListener.addEventListener("click", function (object) {
    if (object.target.closest(".element")) {
      fullImage.src = data.link;
      fullImageDescription.textContent = data.name;
      openPopUp(fullImagePopUp);
    }
  });
  // delete button
  const deleteButton = element.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => element.remove());

  return element;
}; // the end of createNewElement

// rendering initialCards
initialCards.forEach(function (data) {
  const element = createNewElement(data);
  elements.append(element);
});

// adding pop-up for creating custom cards by name + link
function submitCreate(event) {
  const newCard = [
    {
      name: "",
      link: "",
      alt: "Ваша изображение",
    },
  ];
  event.preventDefault();
  newCard[0].name = newPlaceNameInput.value;
  newCard[0].link = newPlaceLinkInput.value;
  newCard.forEach(function (data) {
    const element = createNewElement(data);
    elements.prepend(element);
  });
  closePopUp(popUpNewPlace);
  newPlaceNameInput.value = "";
  newPlaceLinkInput.value = "";
}

// eventListeners for new cards pop-up
closeButtonNewPlace.addEventListener("click", () => closePopUp(popUpNewPlace));
addButton.addEventListener("click", () => openPopUp(popUpNewPlace));
createButton.addEventListener("click", submitCreate);

// eventListenres for profile buttons
closeProfile.addEventListener("click", () => closePopUp(profilePopUp));
editButton.addEventListener("click", function () {
  // При открытии попапа профиля нужно вставлять в его инпуты данные пользователя, которые отображены сейчас на сайте, чтобы можно было их отредактировать сразу и обновить.
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopUp(profilePopUp);
});
submitButton.addEventListener("click", submit);

// full image
closeButtonFullImage.addEventListener("click", () =>
  closePopUp(fullImagePopUp)
);
