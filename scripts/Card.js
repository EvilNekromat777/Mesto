
import { popupImageImg, popupImage, popupImageText, keyHandler } from './index.js'



export const initialCards = [
    {
        name: 'Архыз',
        alt: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        alt: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        alt: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        alt: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        alt: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        alt: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _handleOpenPopup() {
        popupImageImg.src = this._link;
        popupImageText.textContent = this._name;
        popupImage.classList.add('popup_opened');
        document.addEventListener('keydown', keyHandler);
    }

    // _handleClosePopup() {
    //     popupImage.classList.remove('popup_opened');
    //     document.removeEventListener('keydown', keyHandler);
    // }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._like();
        });
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        // this._element.querySelector('.popup__close').addEventListener('click', () => {
        //     this._handleClosePopup();
        // });

    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;

    }
    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
    _like() {
        this._element.querySelector('.element__like').classList.toggle('element__like_theme_dark');
    }
    _deleteCard() {
        this._element.remove();
    }
}





