const config = {
	url: 'https://mesto.nomoreparties.co/v1/wbf-cohort-5',
	headers: {
		'content-type': 'application/json',
		authorization: 'ca51e6fb-6237-4bb4-a2a5-e53f09cdfe95'
	}
};

//if response is ok => convert it in data that we can work with
// if => not show promise with error msg

function responsCheck(res) {
	return res.ok
		? res.json()
		: res.json().then((res) => Promise.reject(`Ошибка: ${res.message}`));
}

function getAllCardsFromServer() {
	return fetch(`${config.url}/cards`, {
		method: 'GET',
		headers: config.headers
	}).then(responsCheck);
}

function getUserInfoFromServer() {
	return fetch(`${config.url}/users/me`, {
		method: 'GET',
		headers: config.headers
	}).then(responsCheck);
}

function changeUserInfoOnServer(newUserInfo) {
	return fetch(`${config.url}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify(newUserInfo)
	}).then(responsCheck);
}

function deleteCardOnServer(cardID) {
	return fetch(`${config.url}/cards/${cardID}`, {
		method: 'DELETE',
		headers: config.headers
	}).then(responsCheck);
}

function postNewCardOnServer(newCardData) {
	return fetch(`${config.url}/cards`, {
		method: 'POST',
		headers: config.headers,
		body: JSON.stringify(newCardData)
	}).then(responsCheck);
}

function updateLikeInfo(cardID, isCardLiked) {
	return fetch(`${config.url}/cards/likes/${cardID}`, {
		method: isCardLiked ? 'DELETE' : 'PUT',
		headers: config.headers
	}).then(responsCheck);
}

function updateUserPic(newUserPicLink) {
	return fetch(`${config.url}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify(newUserPicLink)
	}).then(responsCheck);
}

export {
	getAllCardsFromServer,
	getUserInfoFromServer,
	changeUserInfoOnServer,
	postNewCardOnServer,
	deleteCardOnServer,
	updateLikeInfo,
	updateUserPic
};
