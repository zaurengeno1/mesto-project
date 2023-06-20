const popup = document.querySelector('.popup');
const popupOpened = document.querySelector('.popup_opened');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editProfileButton = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.form');

const inputProfileTitle = document.querySelector('.form__input-profile-title');
const inputProfileSubtitle = document.querySelector('.form__input-profile-subtitle');

const closePopupButton = document.querySelector('.popup__button-close');



function  openPopup (popupElement)  {
	popupElement.classList.add('popup-open');
	};
	function closePopup (popupElement) {
	popupElement.classList.remove('popup-open');
	};
	
	function openProfileEdit () {
	inputProfileTitle.value = profileTitle.textContent;
	inputProfileSubtitle.value = profileSubtitle.textContent;
	openPopup(popup);
	 console.log(profileTitle.value)
	};
	
	function handleProfileSubmit (evt) {
		evt.preventDefault();
	profileTitle.textContent = inputProfileTitle.value;
	profileSubtitle.textContent = inputProfileSubtitle.value;
	closePopup(popup);
	evt.target.reset();
	};
	
	editProfileButton.addEventListener('click', openProfileEdit);
	formEditProfile.addEventListener('submit', handleProfileSubmit);
	closePopupButton.addEventListener('click', () => {
closePopup(popup);
	});
	