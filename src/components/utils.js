import { closeByEscape } from './modal';
// close pop-ups

function closePopUp(data) {
	data.classList.remove('pop-up_opened');
	document.removeEventListener('keydown', closeByEscape);
}

//  open pop-ups

function openPopUp(data) {
	data.classList.add('pop-up_opened');
	document.addEventListener('keydown', closeByEscape);
}
// block button while pending

function changeButtonText(button, text) {
	button.textContent = text;
}

function isButtonDisabled(button, state) {
	if (state) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
}
export { openPopUp, closePopUp, isButtonDisabled, changeButtonText };
