const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_invalid',
  submitButtonSelector: '.form__button-save',
};

function showError(formElement, inputElement, errorMessage, config) {
  const errorField = formElement.querySelector('#error-' + inputElement.id);
  errorField.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideError(formElement, inputElement, config) {
  const errorField = formElement.querySelector('#error-' + inputElement.id);
  errorField.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}

function checkValid(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, config);
  } else {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  }
}

function toggleButton(formElement, buttonSubmitForm) {
  if (formElement.checkValidity()) {
    buttonSubmitForm.disabled = false;
  } else {
    buttonSubmitForm.disabled = true;
  }
}

function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const buttonSubmitForm = formElement.querySelector(
    config.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValid(formElement, inputElement, config);
      toggleButton(formElement, buttonSubmitForm);
    });
  });
}

function enableValidation(config) {
  const formsList = document.querySelectorAll(config.formSelector);
  formsList.forEach((formElement) => {
    setEventListener(formElement, config);
  });
}

enableValidation(configValidation);
