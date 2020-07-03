const togglePopup = function (popup) {
    popup.classList.toggle('popup_opened')
};


let popup = document.querySelector('.popup');
//let popupOpenButton = document.querySelector('.button_open-popup');
//let popupCloseButton = popup.querySelector('.popup__close');
let profile = document.querySelector('.profile');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input-container_name');
let jobInput = formElement.querySelector('.form__input-container_job');
let name = profile.querySelector('.profile__title');
let job = profile.querySelector('.profile__subtitle');

//функция закрытия первого попапа (где меняем имя пользователя)
//если попап открыт, то в инпутах показывает то же, что и в профайле, потом закрывает попап
let toggleUserPopup = function () {
    if (popup.classList.contains('popup_opened') === false) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    }
    popup.classList.toggle('popup_opened');
}

//функция: сначала отменяет стандартное поведение браузера, потом 
function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    toggleUserPopup();
}
//слушатель - при нажатии на кнопку "Сохранить", срабатывает функция formSubmitHandler
formElement.addEventListener('submit', formSubmitHandler);



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
const formAdd = document.querySelector('.form_addCard');
const nameInputCard = formAdd.querySelector('.form__input-container_addCard_name') // эту переменную лучше объявить сразу после addForm
const linkInput = formAdd.querySelector('.form__input-container_addCard_link') // сделать по аналогии с linkInput

//const addForm = ... // это у вас уже написано должно быть
//const linkInput = addForm.querySelector(...) // эту переменную лучше объявить сразу после addForm
//const nameInput = addForm.querySelector(...) // сделать по аналогии с linkInput

function addCard(item) {
    const card = cardsTemplateElement.content.cloneNode(true);
    card.querySelector('.element__title').textContent = item.name;
    card.querySelector('.element__image').setAttribute("src", item.link);
    card.querySelector('.element__image').setAttribute("alt", item.alt);
    cardsListElement.prepend(card);

    const like = document.querySelector('.element__like')
    like.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_theme_dark');
    });
}
initialCards.forEach(function (item) {
    addCard(item);
});


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
formAdd.addEventListener('submit', renderCard);


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
const popupImageOpen = document.querySelector('.button_image_open');


//const togglePopup = function (popup) {
//    popup.classList.toggle('popup_opened')
//};   -  Хаз сказал перенести эту функцию наверх. Она в самом верху

popupEditOpen.addEventListener('click', function () {
    togglePopup(popupEdit)
})
popupAddOpen.addEventListener('click', function () {
    togglePopup(popupAdd);
    nameInputCard.value = '';
    linkInput.value = '';
})
popupImageOpen.addEventListener('click', function () {
    togglePopup(popupImage)
})
popupEditClose.addEventListener('click', function () {
    togglePopup(popupEdit)
})
popupAddClose.addEventListener('click', function () {
    togglePopup(popupAdd)
})
popupImageClose.addEventListener('click', function () {
    togglePopup(popupImage)
})


//создаем переменные для попапа с картинкой
//const popupImage = popup.querySelector('.popup_image'); - эта переменная уже создавалась выше
const popupImageImg = document.querySelector('.popup-image__img');
const popupImageText = document.querySelector('.popup-image__text');
console.log(popupImage, popupImageImg, popupImageText);