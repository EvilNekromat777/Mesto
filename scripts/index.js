const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input-container_name');
const jobInput = formElement.querySelector('.form__input-container_job');
const name = profile.querySelector('.profile__title');
const job = profile.querySelector('.profile__subtitle');
const cardsListElement = document.querySelector('.elements');
const cardsTemplateElement = document.querySelector('.cards-template');
const formAdd = document.querySelector('.form_addCard');
const nameInputCard = formAdd.querySelector('.form__input-container_addCard_name');
const linkInput = formAdd.querySelector('.form__input-container_addCard_link');
const popupImageImg = document.querySelector('.popup__zoom-image');
const popupImageText = document.querySelector('.popup__zoom-title');


const togglePopup = function (popup) {
    popup.classList.toggle('popup_opened')
};

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

//функция закрытия первого попапа (где меняем имя пользователя)
const toggleUserPopup = function () {
    if (popup.classList.contains('popup_opened') === false) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    }
    popup.classList.toggle('popup_opened');
}

//Функция сохранения изменений в первом попапе:
//Сначала отменяет стандартное поведение браузера, потом сохраняет
//данные, которые ввел пользователь. Потом закрывает попап. 
function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    toggleUserPopup();
}
//слушатель - при нажатии на кнопку "Сохранить", срабатывает функция formSubmitHandler
formElement.addEventListener('submit', formSubmitHandler);

//функция добавления карточек через JS
function addCard(item) {
    //копируем все содержимое Template 
    const card = cardsTemplateElement.content.cloneNode(true);

    //слушатель - при нажатии на иконку корзины, сработает функция deleteCard
    card.querySelector('.element__delete').addEventListener('click', deleteCard);

    //слушатель - при нажатии на картинку, сработает функция popupZoomImage
    card.querySelector('.element__image').addEventListener('click', function () { popupZoomImage(item) });

    //берем данные из массива
    card.querySelector('.element__title').textContent = item.name;
    card.querySelector('.element__image').setAttribute("src", item.link);
    card.querySelector('.element__image').setAttribute("alt", item.alt);
    //говорим, что хотим добавить карточку в начало, а не в конец
    cardsListElement.prepend(card);

    const like = document.querySelector('.element__like');
    like.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_theme_dark')
    });
}
initialCards.forEach(function (item) {
    addCard(item)
});

//функция добавления новых карточек
//функцияКотораяСработаетПослеНажатияНаКнопкуФормы
function renderCard(evt) {
    //останавливаемСтандартноеПоведениеБраузера
    evt.preventDefault()
    //const имяНовойКарточки = беремЗначениеИзПоляА
    const newCardName = nameInputCard.value;
    //const картинкаНовойКарточки = беремЗначениеИзПоляБ
    const newCardImage = linkInput.value;
    //const новаяКарточка = { name: имяНовойКарточки, link: картинкаНовойКарточки }
    const newCard = { name: newCardName, link: newCardImage };
    //функцияКотораяСоздаетКарточку(новаяКарточка)
    addCard(newCard);
    //закрываемПопап()
    togglePopup(popupAdd);

}

// Popups
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

// Popups Close Button
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupAddClose = popupAdd.querySelector('.popup__close');
const popupImageClose = popupImage.querySelector('.popup__close');

// Popups Open Button
const popupEditOpen = document.querySelector('.button_edit_open');
const popupAddOpen = document.querySelector('.button_add_open');
const popupImageOpen = document.querySelector('.element__image');

//слушатель: при нажатии на кнопку сработает функция renderCard
formAdd.addEventListener('submit', renderCard);

popupEditOpen.addEventListener('click', function () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    togglePopup(popupEdit)
});
popupAddOpen.addEventListener('click', function () {
    togglePopup(popupAdd);
    nameInputCard.value = '';
    linkInput.value = '';
});
popupEditClose.addEventListener('click', function () {
    togglePopup(popupEdit)
});
popupAddClose.addEventListener('click', function () {
    togglePopup(popupAdd)
});
popupImageClose.addEventListener('click', function () {
    togglePopup(popupImage)
});

//функция удаления карточки
function deleteCard(e) {
    //добавляем event на карточку, чтобы отслеживать клик по любой рандомной карточке
    const card = e.target.closest('.element');
    //когда event отследит клик, он должен  удалить карточку, по которой он был сделан
    card.remove()
};

//функция увеличения картинки в попапе
function popupZoomImage(item) {
    const image = item.link;
    const place = item.name;

    popupImageImg.src = image
    popupImageText.textContent = place

    togglePopup(popupImage)
};