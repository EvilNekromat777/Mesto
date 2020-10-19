
import { popupImageImg, popupImage } from './index.js'
// export const popupElement = document.querySelector('.popup_image');


// export const popupImage = document.querySelector('.popup__zoom-image');

//const popupCloseButton = document.querySelector('.popup__close');
// export const popupImageClose = document.querySelector('.popup__close_image');
const popupImageText = document.querySelector('.popup__zoom-title');



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
        this._image = data.image;
        this._templateSelector = templateSelector;
    }

    _handleOpenPopup() {
        popupImageImg.src = this._link;
        popupImageText.textContent = this._name;
        popupImage.classList.add('popup_opened');
    }


    // _handleClosePopup() {
    //     popupImage.src = '';
    //     popupElement.classList.remove('popup_opened');
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

        // popupImageClose.addEventListener('click', () => {
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
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }
    _like() {
        this._element.querySelector('.element__like').classList.toggle('element__like_theme_dark');
    }
    _deleteCard() {
        this._element.remove();
    }
}



initialCards.forEach((item) => {
    const card = new Card(item, '.card-template_type_default');
    const cardElement = card.generateCard();
    const cardsListElement = document.querySelector('.elements');
    cardsListElement.prepend(cardElement);
});




