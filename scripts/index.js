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


const togglePopup = function (popup) {
    popup.classList.toggle('popup_opened');
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

//функция открытия первого попапа (где меняем имя пользователя)
const openUserPopup = function () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    togglePopup(popupEdit);
}

//Функция сохранения изменений в первом попапе:
//Сначала отменяет стандартное поведение браузера, потом сохраняет
//данные, которые ввел пользователь. Потом закрывает попап. 
function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    togglePopup(popupEdit);
}
//слушатель - при нажатии на кнопку "Сохранить", срабатывает функция formSubmitHandler
formElement.addEventListener('submit', formSubmitHandler);


// Закрытие попапа на Esc
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
function keyHandler(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }
}
document.addEventListener('keydown', function (evt) {
    keyHandler(evt, popupAdd);
});
document.addEventListener('keydown', function (evt) {
    keyHandler(evt, popupEdit);
});
document.addEventListener('keydown', function (evt) {
    keyHandler(evt, popupImage);
});

// Закрытие на оверлей первого попапа 
const popupEditCloseByClickOnOverlay = (event) => {
    if (event.target != event.currentTarget) {
        return
    }
    togglePopup(popupEdit);
}
popupEdit.addEventListener('click', popupEditCloseByClickOnOverlay)

// Закрытие на оверлей второго попапа
const popupAddCloseByClickOnOverlay = (event) => {
    if (event.target != event.currentTarget) {
        return
    }
    togglePopup(popupAdd);
}
popupAdd.addEventListener('click', popupAddCloseByClickOnOverlay)

// Закрытие на оверлей третьего попапа
const popupImageCloseByClickOnOverlay = (event) => {
    if (event.target != event.currentTarget) {
        return
    }
    togglePopup(popupImage);
}
popupImage.addEventListener('click', popupImageCloseByClickOnOverlay)



//Отдельно функция создания карточки:
function createCard(item) {
    // копируем все содержимое Template
    const card = cardsTemplateElement.content.cloneNode(true);
    //слушатель - при нажатии на иконку корзины, сработает функция deleteCard (удаление карточки)
    card.querySelector('.element__delete').addEventListener('click', deleteCard);
    //слушатель - при нажатии на картинку, сработает функция popupZoomImage (увеличение картинки в попапе)
    card.querySelector('.element__image').addEventListener('click', () => popupZoomImage(item));
    //ставим карточкам лайки
    card.querySelector('.element__like').addEventListener('click', evt => evt.target.classList.toggle('element__like_theme_dark'));
    //берем данные из массива
    card.querySelector('.element__title').textContent = item.name;
    card.querySelector('.element__image').setAttribute("src", item.link);
    card.querySelector('.element__image').setAttribute("alt", item.alt);
    //возвращаем созданную карточку
    return card;
}

//И отдельно функция добавления карточки в контейнер
function addCard(cardsListElement, card) {
    //добавление карточки в начало списка
    cardsListElement.prepend(card);
};
initialCards.forEach(function (item) {
    createCard(item);
    addCard(cardsListElement, createCard(item));
});


//функция добавления новых карточек
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
    addCard(cardsListElement, createCard(newCard));
    //закрываемПопап()
    togglePopup(popupAdd);
}

//слушатель: при нажатии на кнопку сработает функция renderCard
formAdd.addEventListener('submit', renderCard);

popupEditOpen.addEventListener('click', () => {
    const nameProfileError = document.getElementById(`nameProfile-error`);
    const jobProfileError = document.getElementById(`jobProfile-error`);
    nameProfileError.textContent = '';
    jobProfileError.textContent = '';
    nameInput.classList.remove('form__error_active');
    jobInput.classList.remove('form__error_active');

    const buttonElement = document.querySelector('.popup__submit');
    buttonElement.classList.remove('popup__submit_inactive')
    buttonElement.removeAttribute('disabled', true)

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    togglePopup(popupEdit);
});

popupAddOpen.addEventListener('click', () => {
    const nameCardError = document.getElementById(`nameCard-error`);
    const linkCardError = document.getElementById(`linkCard-error`);
    nameCardError.textContent = '';
    linkCardError.textContent = '';
    nameInput.classList.remove('form__error_active');
    linkInput.classList.remove('form__error_active');

    togglePopup(popupAdd);
    nameInputCard.value = '';
    linkInput.value = '';
});

popupEditClose.addEventListener('click', () => openUserPopup(popupEdit));
popupAddClose.addEventListener('click', () => togglePopup(popupAdd));
popupImageClose.addEventListener('click', () => togglePopup(popupImage));

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


// функция "Показать ошибку"
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    const errorInput = inputElement.querySelector('.form__input-container');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__error_active');
    //errorInput.classList.add('form__input-container_error');

}

// функция "Скрыть ошибку"
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    const errorInput = inputElement.querySelector('.form__input-container');
    errorElement.textContent = '';
    errorElement.classList.remove('form__error_active');
    //errorInput.classList.remove('form__input-container_error');
}

// функция будет показывать и убирать ошибку
const checkInputValidity = (formElement, inputElement) => {
    const isInputValid = inputElement.validity.valid

    if (!isInputValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, errorMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

//функция для кнопки
const toggleButtonState = (inputList, buttonElement) => {
    const hasInvalidInput = inputList.some(
        (inputElement) => !inputElement.validity.valid // проверяем инпуты, валидны или нет
    );
    if (hasInvalidInput) {
        buttonElement.classList.add('popup__submit_inactive');
        buttonElement.setAttribute('disabled', true);  //если хотя бы один инпут не валидный, тогда кнопка не активна и на нее падает класс: popup__submit_inactive
    } else {
        buttonElement.classList.remove('popup__submit_inactive');
        buttonElement.removeAttribute('disabled', true);
    }
};

//функция, которая устанавливает обработчики событий
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input-container')); // находим все инпуты
    const buttonElement = formElement.querySelector('.popup__submit');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

//создаем функцию валидации
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form')); // находим все формы в документе

    //прописываем обработчик для каждой формы, чтобы страница не перезагружалась каждый раз при нажатии на Submit
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault(); //останавливаем стандартное поведение браузера при нажатии на Submit
        });

        setEventListeners(formElement);
    });
};

enableValidation();