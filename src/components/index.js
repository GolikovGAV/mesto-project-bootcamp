import '../pages/index.css';
import {
	openPopUp,
	closePopUp,
	changeButtonText,
	isButtonDisabled
} from './utils';
import { profilePopUp, popUpNewPlace } from './modal.js';
import {
	submitCreate,
	profileName,
	profileDescription,
	profilePic
} from './card.js';
import { enableValidation } from './validate.js';
import { changeUserInfoOnServer, updateUserPic } from './api.js';

const configSelector = {
	formSelector: '.edit-form__form',
	inputSelector: '.edit-form__input',
	submitButtonSelector: '.submit-button',
	inactiveButtonClass: 'submit-button_inactive',
	inputErrorClass: 'edit-form__input_invalid',
	errorClass: ''
};

const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const nameInput = document.querySelector('#edit-form__name');
const descriptionInput = document.querySelector('#edit-form__description');
const userProfilePicPopUp = document.querySelector('#user-profile-pic-pop-up');
const profilePicInput = document.querySelector('#user-profile-pic-input');
const changeUserPicButton = document.querySelector('#update-pic-button');
const confirmProfileChanges = document.querySelector('#save-profile');

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

// submit function for saving new profile info

function handleProfileFormSubmit(event) {
	event.preventDefault();

	const newUserInfo = {};

	newUserInfo.name = nameInput.value;
	newUserInfo.about = descriptionInput.value;

	isButtonDisabled(confirmProfileChanges, true);
	changeButtonText(confirmProfileChanges, 'Сохраняем...');

	changeUserInfoOnServer(newUserInfo)
		.then(() => {
			profileName.textContent = newUserInfo.name;
			profileDescription.textContent = newUserInfo.about;

			closePopUp(profilePopUp);
			event.target.reset();
		})
		.catch((err) => {
			console.log(err);
			isButtonDisabled(confirmProfileChanges, false);
		})
		.finally(() => {
			changeButtonText(confirmProfileChanges, 'Сохранить');
		});
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

profilePic.addEventListener('click', () => {
	openPopUp(userProfilePicPopUp);
});

userProfilePicPopUp.addEventListener('submit', (event) => {
	sendNewProfilePic(event);
});

function sendNewProfilePic(event) {
	event.preventDefault();

	isButtonDisabled(changeUserPicButton, true);
	changeButtonText(changeUserPicButton, 'Сохраняем...');

	const newUserInfo = {};

	newUserInfo.avatar = profilePicInput.value;

	updateUserPic(newUserInfo)
		.then(() => {
			profilePic.src = newUserInfo.avatar;

			closePopUp(userProfilePicPopUp);
			event.target.reset();
		})
		.catch((err) => {
			console.log(err);
			isButtonDisabled(changeUserPicButton, false);
		})
		.finally(() => {
			changeButtonText(changeUserPicButton, 'Обновить');
		});
}
