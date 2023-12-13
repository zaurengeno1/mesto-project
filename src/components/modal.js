export function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', keyHandlerEsc);
  document.addEventListener('click', keyHandlerOverlay);
}

export function closePopup(popupElement) {
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
