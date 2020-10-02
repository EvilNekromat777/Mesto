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

//Отдельно функция создания карточки из Темплейта:
function createCard(item) {
    // копируем все содержимое Template
    const card = cardsTemplateElement.content.cloneNode(true);
    //слушатель - при нажатии на иконку корзины, сработает функция deleteCard (удаление карточки)
    card.querySelector('.element__delete').addEventListener('click', deleteCard);

    const elementImage = card.querySelector('.element__image');
    //слушатель - при нажатии на картинку, сработает функция popupZoomImage (увеличение картинки в попапе)
    elementImage.addEventListener('click', () => popupZoomImage(item));
    //ставим карточкам лайки
    card.querySelector('.element__like').addEventListener('click', evt => evt.target.classList.toggle('element__like_theme_dark'));
    //берем данные из массива
    card.querySelector('.element__title').textContent = item.name;
    elementImage.setAttribute("src", item.link);
    card.querySelector('.element__image').setAttribute("alt", item.alt);
    //возвращаем созданную карточку
    return card;
}

//И отдельно функция добавления карточки из Темплейта в контейнер
function addCard(cardsListElement, card) {
    //добавление карточки в начало списка
    cardsListElement.prepend(card);
};
initialCards.forEach(function (item) {
    createCard(item);
    addCard(cardsListElement, createCard(item));
});