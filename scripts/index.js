const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const cardGrid = document.querySelector('.cards-grid');
const formEditReset = document.forms.formEdit;

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');

const popupCard = document.querySelector('#popup-card');
const formCard = popupCard.querySelector('#form-card');
const formInputCardTitle = formCard.querySelector('.form__input-card-title');
const formInputCardLink = formCard.querySelector('.form__input-card-link');

const popupEdit = document.querySelector('#popup-edit');
const formEdit = document.querySelector('#form-edit');
const formInputEditTitle = formEdit.querySelector('#edit-name-input');
const formInputEditSubtitle = formEdit.querySelector('#edit-work-input');

const popupImageOpen = document.querySelector('#popup_image');
const popupImageFull = popupImageOpen.querySelector('.popup__image-full');
const popupImageTitle = popupImageOpen.querySelector('.popup__image-title');

function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', keyHandlerEsc);
  document.addEventListener('click', keyHandlerOverlay);
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_open');
  document.removeEventListener('keydown', keyHandlerEsc);
  document.removeEventListener('click', keyHandlerOverlay);
}

function keyHandlerEsc(evt) {
  if (evt.key === 'Escape') {
    const popupEsc = document.querySelector('.popup_open');
    closePopup(popupEsc);
  }
}

function keyHandlerOverlay(evt) {
  if (evt.target.classList.contains('popup_open')) {
    closePopup(evt.target);
  }
}

function handleNewCardClick() {
  openPopup(popupCard);
}

function handleAddCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: formInputCardTitle.value,
    link: formInputCardLink.value,
  };
  addCard(cardGrid, newCard);
  closePopup(popupCard);
  evt.target.reset();
}

function openProfileEdit() {
  formInputEditTitle.value = profileTitle.textContent;
  formInputEditSubtitle.value = profileSubtitle.textContent;
  openPopup(popupEdit);
  formEditReset.reset();
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputEditTitle.value;
  profileSubtitle.textContent = formInputEditSubtitle.value;

  closePopup(popupEdit);
}

function createCard(cardData) {
  const cardTemplate = document
    .getElementById("card-template")
    .content.querySelector(".card");

  const cardElement = cardTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementName = cardElement.querySelector('.card__title');
  const cardElementDelete = cardElement.querySelector('.card__button-delete');
  const cardElementLike = cardElement.querySelector('.card__button-like');

  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementName.textContent = cardData.name;

  function openImagePopup() {
    popupImageFull.src = cardData.link;
    popupImageFull.alt = cardData.name;
    popupImageTitle.textContent = cardData.name;
    openPopup(popupImageOpen);
  }

  cardElementDelete.addEventListener('click', handleDeleteButtonClick);
  cardElementLike.addEventListener('click', likeCard);
  cardElementImage.addEventListener('click', openImagePopup);

  return cardElement;
}

function addCard(cardItems, currentCard) {
  return cardItems.prepend(createCard(currentCard));
}

function handleDeleteButtonClick(evt) {
  evt.target.closest('.card').remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__button-like_active');
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
formCard.addEventListener('submit', handleAddCard);
addCardButton.addEventListener('click', handleNewCardClick);
editProfileButton.addEventListener('click', openProfileEdit);

initialCards.forEach((card) => addCard(cardGrid, card));

setEventListeners();
