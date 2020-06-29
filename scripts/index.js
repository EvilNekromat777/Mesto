let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.button_open-popup');
let popupCloseButton = popup.querySelector('.popup__close');
let profile = document.querySelector('.profile');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input-container_name');
let jobInput = formElement.querySelector('.form__input-container_job');
let name = profile.querySelector('.profile__title');
let job = profile.querySelector('.profile__subtitle');


let popupToggle = function () {
    if (popup.classList.contains('popup_opened') === false) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    }
    popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);


const initialCards = [
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

const cardsListElement = document.querySelector('.elements');
const listItem = document.createElement('li');
const cardsTemplateElement = document.querySelector('.cards-template');


function addCard(item) {
    const card = cardsTemplateElement.content.cloneNode(true);
    card.querySelector('.element__title').textContent = item.name;
    card.querySelector('.element__image').setAttribute("src", item.link);
    card.querySelector('.element__image').setAttribute("alt", item.alt);
    cardsListElement.prepend(card);
}

initialCards.forEach(function (item) {
    addCard(item);
});