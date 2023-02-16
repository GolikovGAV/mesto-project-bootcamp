import {
	fullImagePopUp,
	newPlaceNameInput,
	newPlaceLinkInput,
	popUpNewPlace
} from './modal.js';
import {
	closePopUp,
	openPopUp,
	changeButtonText,
	isButtonDisabled
} from './utils.js';
import {
	getAllCardsFromServer,
	getUserInfoFromServer,
	postNewCardOnServer,
	deleteCardOnServer,
	updateLikeInfo
} from './api.js';

const templateElement = document.querySelector('#templateElement');
const fullImage = document.querySelector('.pop-up__full-image');
const fullImageDescription = document.querySelector('.pop-up__description');
const elements = document.querySelector('.elements');
const submitCreateButton = document.querySelector('#create-button');
const confirmDeletePopUp = document.querySelector('#confirm-delete-pop-up');
const confirmDeleteButton = document.querySelector('#confirm-delete-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profilePic = document.querySelector('.profile__avatar');
let userID;
let cardToDelete;
let cardToDeleteID;

function getAllRenderInfo() {
	return Promise.all([getUserInfoFromServer(), getAllCardsFromServer()]);
}

getAllRenderInfo()
	.then(([serverUserInfo, cardsData]) => {
		userID = serverUserInfo._id;

		profileName.textContent = serverUserInfo.name;
		profileDescription.textContent = serverUserInfo.about;
		profilePic.src = serverUserInfo.avatar;

		cardsData.forEach((obj) => {
			elements.append(createNewElement(obj, userID));
		});
	})
	.catch((err) => console.log(err));

// create new place card function

const createNewElement = function (data, userID) {
	const element = templateElement.content
		.querySelector('.element')
		.cloneNode(true);
	const imageElement = element.querySelector('.element__image');

	imageElement.src = data.link;
	imageElement.alt = `Изображение, на котором ${data.name}`;
	element.querySelector('.element__name').textContent = data.name;

	const cardId = data._id;
	const likeButton = element.querySelector('.like-button');
	const likeCounter = element.querySelector('.like-counter');

	const deleteButton = element.querySelector('.delete-button');

	function handleLikeButtonCLick() {
		updateLikeInfo(cardId, isCardLiked(data, userID))
			.then((newData) => {
				data.likes = newData.likes;
				updateLikeCount(newData, userID, likeButton, likeCounter);
			})
			.catch((err) => console.log(err));
	}

	updateLikeCount(data, userID, likeButton, likeCounter);

	likeButton.addEventListener('click', handleLikeButtonCLick);

	// i crated this? No - remove delete button
	if (userID !== data.owner._id) {
		deleteButton.remove();
	}

	deleteButton.addEventListener('click', () => {
		cardToDeleteID = cardId;
		cardToDelete = element;
		openPopUp(confirmDeletePopUp);
	});

	fullImageListener(element, data, imageElement);

	return element;
};

confirmDeleteButton.addEventListener('click', () => {
	isButtonDisabled(confirmDeleteButton, true);
	changeButtonText(confirmDeleteButton, 'Сохраняем...');

	deleteCardOnServer(cardToDeleteID)
		.then(() => {
			cardToDelete.remove();
			closePopUp(confirmDeletePopUp);
		})
		.catch((err) => {
			console.log(err);
			isButtonDisabled(confirmDeleteButton, false);
			changeButtonText(confirmDeleteButton, 'Да');
		})
		.finally(() => {
			changeButtonText(confirmDeleteButton, 'Да');
			isButtonDisabled(confirmDeleteButton, false);
		});
});

function isCardLiked(data, userID) {
	return data.likes.some((user) => user._id === userID);
}

function updateLikeCount(data, userID, likeButton, likeCounter) {
	if (isCardLiked(data, userID)) {
		likeButton.classList.add('like-button_active');
	} else {
		likeButton.classList.remove('like-button_active');
	}
	likeCounter.textContent = data.likes.length;
}

// creating custom cards by name + link

const submitCreate = function (event) {
	event.preventDefault();

	isButtonDisabled(submitCreateButton, true);
	changeButtonText(submitCreateButton, 'Сохраняем...');

	postNewCardOnServer({
		name: newPlaceNameInput.value,
		link: newPlaceLinkInput.value
	})
		.then((newCardInfo) => {
			const newCard = createNewElement(newCardInfo, userID);

			elements.prepend(newCard);

			closePopUp(popUpNewPlace);

			event.target.reset();
		})
		.catch((err) => {
			console.log(err);
			isButtonDisabled(submitCreateButton, false);
			changeButtonText(submitCreateButton, 'Создать');
		})
		.finally(() => {
			changeButtonText(submitCreateButton, 'Создать');
		});
};

// full image listener

function fullImageListener(element, data, imageElement) {
	imageElement.addEventListener('click', function (object) {
		if (object.target.closest('.element')) {
			fullImage.src = data.link;
			fullImageDescription.textContent = data.name;
			fullImage.alt = `Изображение, на котором ${data.name}`;

			openPopUp(fullImagePopUp);
		}
	});
}

export {
	templateElement,
	fullImage,
	fullImageDescription,
	elements,
	profileName,
	profileDescription,
	profilePic,
	createNewElement,
	submitCreate
};
