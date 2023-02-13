import '../pages/index.css';
import { openPopUp, closePopUp } from './utils';
import { profilePopUp, popUpNewPlace } from './modal.js';
import { submitCreate, changeButtonState } from './card.js';
import { enableValidation } from './validate.js';
import {
	getUserInfoFromServer,
	changeUserInfoOnServer,
	updateUserPic
} from './api.js';

const configSelector = {
	formSelector: '.edit-form__form',
	inputSelector: '.edit-form__input',
	submitButtonSelector: '.submit-button',
	inactiveButtonClass: 'submit-button_inactive',
	inputErrorClass: 'edit-form__input_invalid',
	errorClass: ''
};

const editButton = document.querySelector('.edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profilePic = document.querySelector('.profile__avatar');
const addButton = document.querySelector('.add-button');
const nameInput = document.querySelector('#edit-form__name');
const descriptionInput = document.querySelector('#edit-form__description');

const popups = document.querySelectorAll('.pop-up');

popups.forEach((popup) => {
	popup.addEventListener('mousedown', (evt) => {
		if (evt.target.classList.contains('pop-up_opened')) {
			closePopUp(popup);
		}
		if (evt.target.classList.contains('close-button')) {
			closePopUp(popup);
		}
	});
});

//get user info to edit form

function updateProfileInfo() {
	getUserInfoFromServer()
		.then((serverUserInfo) => {
			profileName.textContent = serverUserInfo.name;
			profileDescription.textContent = serverUserInfo.about;
			profilePic.src = serverUserInfo.avatar;
		})
		.catch((err) => console.log(err));
}

updateProfileInfo();

// submit function for saving new profile info

function handleProfileFormSubmit(event) {
	event.preventDefault();
	const newUserInfo = {};

	newUserInfo.name = nameInput.value;
	newUserInfo.about = descriptionInput.value;

	profileName.textContent = newUserInfo.name;
	profileDescription.textContent = newUserInfo.about;

	changeUserInfoOnServer(newUserInfo).catch((err) => console.log(err));

	closePopUp(profilePopUp);
	event.target.reset();
}

// open profile edit

editButton.addEventListener('click', function () {
	nameInput.value = profileName.textContent;
	descriptionInput.value = profileDescription.textContent;
	openPopUp(profilePopUp);
});

// new place add button (opening a pop-up window for further creation)

addButton.addEventListener('click', () => openPopUp(popUpNewPlace));

// submit button (confirming the creation of a new card)

popUpNewPlace
	.querySelector('.edit-form__form')
	.addEventListener('submit', submitCreate);

// confirming changes for new profile info

profilePopUp
	.querySelector('.edit-form__form')
	.addEventListener('submit', handleProfileFormSubmit);

enableValidation(configSelector);

// open edit profile pic pop-up

const userProfilePicPopUp = document.querySelector('#user-profile-pic-pop-up');
const profilePicInput = document.querySelector('#user-profile-pic-input');
const changeUserPicButton = document.querySelector('#update-pic-button');

profilePic.addEventListener('click', () => {
	openPopUp(userProfilePicPopUp);
});

userProfilePicPopUp.addEventListener('submit', (event) => {
	sendNewProfilePic(event);
});

function sendNewProfilePic(event) {
	event.preventDefault();

	changeButtonState(changeUserPicButton, true, 'Сохранение...');

	const newUserInfo = {};

	newUserInfo.avatar = profilePicInput.value;

	updateUserPic(newUserInfo)
		.then(() => {
			profilePic.src = newUserInfo.avatar;

			closePopUp(userProfilePicPopUp);
		})
		.catch((err) => console.log(err))
		.finally(() => {
			changeButtonState(changeUserPicButton, true, 'Обновить');
		});
	event.target.reset();
}
