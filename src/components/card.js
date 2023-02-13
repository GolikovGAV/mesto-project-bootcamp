import {
	fullImagePopUp,
	newPlaceNameInput,
	newPlaceLinkInput,
	popUpNewPlace
} from './modal.js';
import { closePopUp, openPopUp } from './utils.js';
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
const confirmDeleteButton = document.querySelector('#confirm-delete-pop-up');
let userId;

function getAllRenderInfo() {
	return Promise.all([getUserInfoFromServer(), getAllCardsFromServer()]);
}

getAllRenderInfo()
	.then(([serverUserInfo, cardsData]) => {
		userId = serverUserInfo._id;

		cardsData.forEach((obj) => {
			elements.append(createNewElement(obj, userId));
		});
	})
	.catch((err) => console.log(err));

// create new place card function

const createNewElement = function (data, userId) {
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

	function handleLikeButtonCLick() {
		updateLikeInfo(cardId, isCardLiked(data, userId))
			.then((newData) => {
				data.likes = newData.likes;
				updateLikeCount(newData, userId, likeButton, likeCounter);
			})
			.catch((err) => console.log(err));
	}

	updateLikeCount(data, userId, likeButton, likeCounter);

	likeButton.addEventListener('click', handleLikeButtonCLick);

	checkerAndListenerForDeleteBtn(element, data, cardId);

	fullImageListener(element, data, imageElement);

	return element;
};

function isCardLiked(data, userId) {
	return data.likes.some((user) => user._id === userId);
}

function updateLikeCount(data, userId, likeButton, likeCounter) {
	if (isCardLiked(data, userId)) {
		likeButton.classList.add('like-button_active');
	} else {
		likeButton.classList.remove('like-button_active');
	}
	likeCounter.textContent = data.likes.length;
}

// creating custom cards by name + link

const submitCreate = function (event) {
	event.preventDefault();

	changeButtonState(submitCreateButton, true, 'Сохранение...');

	postNewCardOnServer({
		name: newPlaceNameInput.value,
		link: newPlaceLinkInput.value
	})
		.then((newCardInfo) => {
			const newCard = createNewElement(newCardInfo, userId);

			elements.prepend(newCard);

			closePopUp(popUpNewPlace);

			event.target.reset();
		})
		.catch((err) => console.log(err))
		.finally(() => {
			changeButtonState(submitCreateButton, false, 'Создать');
		});
};

// block button while pending

function changeButtonState(button, state, text) {
	if (state) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
	button.textContent = text;
}

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

// i crated this? No - remove delete button / Yes - add delete button listener

function checkerAndListenerForDeleteBtn(element, data, cardID) {
	const deleteButton = element.querySelector('.delete-button');

	if (userId !== data.owner._id) {
		deleteButton.remove();
	} else {
		addDeleteButtonListener(deleteButton, cardID, element);
	}
}

// open popup and give the cardID which should be deleted

function addDeleteButtonListener(deleteButton, cardID, element) {
	let cardToDeleteID = cardID;
	deleteButton.addEventListener('click', () => {
		openPopUp(confirmDeletePopUp);
		submitDeleteListener(element, cardToDeleteID);
	});
}

// delete Card on server and remove localy

function submitDeleteListener(element, cardToDeleteID) {
	confirmDeleteButton.addEventListener('click', () => {
		element.remove();
		deleteCardOnServer(cardToDeleteID).catch((err) => console.log(err));
		closePopUp(confirmDeletePopUp);
	});
}

export {
	templateElement,
	fullImage,
	fullImageDescription,
	elements,
	createNewElement,
	submitCreate,
	changeButtonState
};
