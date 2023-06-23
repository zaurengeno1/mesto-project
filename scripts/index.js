const popupMain = document.querySelector(".popup");
const cardGrid = document.querySelector(".cards-grid");
const formEditReset = document.forms.formEdit;

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const popupButtonClose = document.querySelector(".popup__button-close");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");

const popupCard = document.getElementById("popup-card");
const formCard = document.getElementById("form-card");
const formInputCardTitle = document.querySelector(".form__input-card-title");
const formInputCardLink = document.querySelector(".form__input-card-link");

const popupEdit = document.getElementById("popup-edit");
const formEdit = document.getElementById("form__edit");
const formInputEditTitle = document.getElementById("form__edit-name-input");
const formInputEditSubtitle = document.getElementById("form__edit-work-input");



const popupImageOpen = document.getElementById("popup_image");
const popupImageFull = document.querySelector(".popup__image-full");
const popupImageTitle = document.querySelector(".popup__image-title");

function openPopup(popupElement) {
  popupElement.classList.add("popup_open");
}
function closePopup(popupElement) {
  popupElement.classList.remove("popup_open");
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
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementName = cardElement.querySelector(".card__title");
  const cardElementDelete = cardElement.querySelector(".card__button-delete");
  const cardElementLike = cardElement.querySelector(".card__button-like");

  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementName.textContent = cardData.name;

  function openImagePopup() {
    popupImageFull.src = cardData.link;
    popupImageFull.alt = cardData.name;
    popupImageTitle.textContent = cardData.name;
    openPopup(popupImageOpen);
		console.log(popupImageOpen);
  }

  cardElementDelete.addEventListener("click", deleteCard);
  cardElementLike.addEventListener("click", likeCard);
  cardElementImage.addEventListener("click", openImagePopup);

  return cardElement;
}

function addCard(cardItems, currentCard) {
  return cardItems.prepend(createCard(currentCard));
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__button-like_active");
}

function closeEventListeners() {
  document.querySelectorAll(".popup__button-close").forEach((buttonElement) => {
    const popupElement = buttonElement.closest(".popup");
    buttonElement.addEventListener("click", () => {
      closePopup(popupElement);
    });
  });
}
closeEventListeners();

formEdit.addEventListener("submit", handleProfileSubmit);
formCard.addEventListener("submit", handleAddCard);
addCardButton.addEventListener("click", handleNewCardClick);
editProfileButton.addEventListener("click", openProfileEdit);

initialCards.forEach((card) => addCard(cardGrid, card));
