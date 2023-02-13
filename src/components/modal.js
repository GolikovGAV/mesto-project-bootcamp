import { closePopUp } from './utils';

const profilePopUp = document.querySelector('#edit-form');
const fullImagePopUp = document.querySelector('#full-image');
const popUpNewPlace = document.querySelector('#new-place');
const newPlaceNameInput = popUpNewPlace.querySelector('#newplace-name');
const newPlaceLinkInput = popUpNewPlace.querySelector('#newplace-link');

// close by escape function

function closeByEscape(event) {
	if (event.key === 'Escape') {
		const openedPopUp = document.querySelector('.pop-up_opened');
		closePopUp(openedPopUp);
	}
}

export {
	profilePopUp,
	fullImagePopUp,
	popUpNewPlace,
	newPlaceNameInput,
	newPlaceLinkInput,
	closeByEscape
};
