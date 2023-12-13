import './pages/index.css';

import { initialCards, createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

const cardGrid = document.querySelector('.cards-grid');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

const popupCard = document.querySelector('#popup-card');
const formCard = popupCard.querySelector('#form-card');
const formInputCardTitle = formCard.querySelector('.form__input-card-title');
const formInputCardLink = formCard.querySelector('.form__input-card-link');

const popupEdit = document.querySelector('#popup-edit');
const formEdit = popupEdit.querySelector('#form-edit');
const formInputEditTitle = formEdit.querySelector('#edit-name-input');
const formInputEditSubtitle = formEdit.querySelector('#edit-work-input');

function handleNewCard () {
  openPopup(popupCard);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: formInputCardTitle.value,
    link: formInputCardLink.value,
  };

  addCard(cardGrid, newCard);
  closePopup(popupCard);
  evt.target.reset();
}

function handleEditButton(evt) {
  evt.preventDefault();
  formInputEditTitle.value = profileTitle.textContent;
  formInputEditSubtitle.value = profileSubtitle.textContent;
  openPopup(popupEdit);
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputEditTitle.value;
  profileSubtitle.textContent = formInputEditSubtitle.value;
  closePopup(popupEdit);
}

function addCard(cardItems, currentCard) {
  return cardItems.prepend(createCard(currentCard));
}

function setEventListeners() {
  document.querySelectorAll('.popup__button-close').forEach((buttonElement) => {
    const popupElement = buttonElement.closest('.popup');
    buttonElement.addEventListener('click', () => {
      closePopup(popupElement);
    });
  });
}
formEdit.addEventListener('submit', handleProfileSubmit);
formCard.addEventListener('submit', handleAddCardSubmit);
addCardButton.addEventListener('click', handleNewCard);
editProfileButton.addEventListener('click', handleEditButton);

initialCards.forEach((card) => addCard(cardGrid, card));

setEventListeners();
