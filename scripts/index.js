
import { initialCards, Card } from './Card.js'
import FormValidator from './FormValidator.js'

const config = {
    formElement: '.form',
    inputElement: '.form__input-container',
    buttonElement: '.popup__submit',
    inputErrorClass: 'form__input-container_error',
    errorClass: 'form__error_active',
    inactiveButtonClass: 'popup__submit_inactive'
};

const profile = document.querySelector('.profile');
const formEdit = document.querySelector('.form__edit');
const nameInput = formEdit.querySelector('.form__input-container_name');
const jobInput = formEdit.querySelector('.form__input-container_job');
const name = profile.querySelector('.profile__title');
const job = profile.querySelector('.profile__subtitle');
const cardsListElement = document.querySelector('.elements');

const formAdd = document.querySelector('.form_addCard');
const nameInputCard = formAdd.querySelector('.form__input-container_addCard_name');
const linkInput = formAdd.querySelector('.form__input-container_addCard_link');
export const popupImageImg = document.querySelector('.popup__zoom-image');
export const popupImageText = document.querySelector('.popup__zoom-title');
const nameProfileError = document.getElementById(`nameProfile-error`);
const jobProfileError = document.getElementById(`jobProfile-error`);
const nameCardError = document.getElementById(`nameCard-error`);
const linkCardError = document.getElementById(`linkCard-error`);


// Popups
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
export const popupImage = document.querySelector('.popup_image');

// Popups Close Button
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupAddClose = popupAdd.querySelector('.popup__close');
const popupImageClose = popupImage.querySelector('.popup__close');

// Popups Open Button
const popupEditOpen = document.querySelector('.button_edit_open');
const popupAddOpen = document.querySelector('.button_add_open');


// Функция открытия попапа
const openPopup = function (popup) {
    popup.classList.toggle('popup_opened');
    document.addEventListener('keydown', keyHandler);
};

// Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
}

// Закрытие попапа на Esc
export function keyHandler(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

//Закрытие попапа на оверлей 
const popupCloseByClickOnOverlay = (event) => {
    if (event.target != event.currentTarget) {
        return
    }
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
}
popupEdit.addEventListener('click', popupCloseByClickOnOverlay)
popupAdd.addEventListener('click', popupCloseByClickOnOverlay)
popupImage.addEventListener('click', popupCloseByClickOnOverlay)


//функция открытия первого попапа (где меняем имя пользователя)
const openUserPopup = function () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    openPopup(popupEdit);
}

//Функция сохранения изменений в первом попапе: 
function formSubmitHandler(evt) {
    evt.preventDefault();  //Отменяем стандартное поведение браузера
    name.textContent = nameInput.value; // Сохраняем данные, которые ввел пользователь
    job.textContent = jobInput.value;
    closePopup(popupEdit);
};


initialCards.forEach((item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.generateCard();
    const cardsListElement = document.querySelector('.elements');
    cardsListElement.prepend(cardElement);
});

function renderCard(evt) {
    evt.preventDefault();
    const newCard = new Card({ name: nameInputCard.value, link: linkInput.value }, '.card-template');
    const newCardElement = newCard.generateCard();
    cardsListElement.prepend(newCardElement);
    closePopup(popupAdd);
}
formEdit.addEventListener('submit', (evt) => { formSubmitHandler(evt) });
formAdd.addEventListener('submit', (evt) => { renderCard(evt) });


popupEditOpen.addEventListener('click', () => {
    nameProfileError.textContent = '';
    jobProfileError.textContent = '';
    nameInput.classList.remove('form__error_active');
    jobInput.classList.remove('form__error_active');

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    openPopup(popupEdit);
});

popupAddOpen.addEventListener('click', () => {
    nameCardError.textContent = '';
    linkCardError.textContent = '';
    nameInput.classList.remove('form__error_active');
    linkInput.classList.remove('form__error_active');

    openPopup(popupAdd);
    nameInputCard.value = '';
    linkInput.value = '';

    const buttonElementAdd = document.querySelector('.popup__submitAdd');
    buttonElementAdd.classList.add('popup__submit_inactive')
    buttonElementAdd.setAttribute('disabled', true)
});

popupEditClose.addEventListener('click', () => openUserPopup(popupEdit));
popupAddClose.addEventListener('click', () => closePopup(popupAdd));
popupImageClose.addEventListener('click', () => closePopup(popupImage));

const formEditValidator = new FormValidator(config, formEdit);
formEditValidator.enableValidation()

const formAddValidator = new FormValidator(config, formAdd);
formAddValidator.enableValidation()



