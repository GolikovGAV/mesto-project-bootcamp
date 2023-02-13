// VALIDATION

export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  // adding event listeners for all forms with addEventListenersForm()

  [...forms].forEach((form) => {
    addEventListenersForm(form, config);
  });
}

function addEventListenersForm(form, config) {
  const inputElements = form.querySelectorAll(config.inputSelector);
  const buttonElement = form.querySelector(config.submitButtonSelector);

  // disabling submit button before pop up opens

  toggleSubmitButton(buttonElement, form.checkValidity(), config);

  // preventing page reload

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  // when form resets (submits) we disable sumbit button

  form.addEventListener('reset', () => {
    toggleSubmitButton(buttonElement, false, config);
  });

  // we found every input element (in const inputElements)
  // now for each element we are adding listener by input
  // checking if each input is valid + disabling/enabling submit button

  [...inputElements].forEach((element) => {
    element.addEventListener('input', () => {
      checkInputForValidity(element, form, config);
      toggleSubmitButton(buttonElement, form.checkValidity(), config);
    });
  });
}

// checking if input is valid + disabling/enabling submit button + showing/hiding error messages

function checkInputForValidity(element, form, config) {
  const isInputValid = element.validity.valid;
  const errorMessage = form.querySelector(`#${element.name}-error`);

  // finding submit button in form

  const buttonElement = form.querySelector(config.submitButtonSelector);

  // checking submit button state

  toggleSubmitButton(buttonElement, form.checkValidity(), config);

  if (!isInputValid) {
    showErrorMessage(element, errorMessage, config);
  } else {
    hideErrorMessage(element, errorMessage, config);
  }
}

// show error message function

function showErrorMessage(element, errorMessage, config) {
  element.classList.add(config.inputErrorClass);
  errorMessage.textContent = element.validationMessage;
}

// hide error message function

function hideErrorMessage(element, errorMessage, config) {
  element.classList.remove(config.inputErrorClass);
  errorMessage.textContent = '';
}

// disabling submit buttons for pop ups

function toggleSubmitButton(buttonElement, isActive, config) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  }
}
