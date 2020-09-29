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


// // //функция создания карточек через JS
//  function addCard(item) {
// //     //копируем все содержимое Template 
//   const card = cardsTemplateElement.content.cloneNode(true);

// //     //слушатель - при нажатии на иконку корзины, сработает функция deleteCard (удаление карточки)
//    card.querySelector('.element__delete').addEventListener('click', deleteCard);

//      //слушатель - при нажатии на картинку, сработает функция popupZoomImage (увеличение картинки в попапе)
//     card.querySelector('.element__image').addEventListener('click', () => popupZoomImage(item));

//      //берем данные из массива
//      card.querySelector('.element__title').textContent = item.name;
//      card.querySelector('.element__image').setAttribute("src", item.link);
//      card.querySelector('.element__image').setAttribute("alt", item.alt);

//      //говорим, что хотим добавить карточку в начало, а не в конец
//      cardsListElement.prepend(card);
//      //ставим карточкам лайки
//      const like = document.querySelector('.element__like');
//     like.addEventListener('click', evt => evt.target.classList.toggle('element__like_theme_dark')
//      );
//  }
//  initialCards.forEach(function (item) {
//      addCard(item)
// });


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
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    togglePopup(popupEdit);
});
popupAddOpen.addEventListener('click', () => {
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



// //создаем объект валидации
// const objValid = {
//     formSelector: '.form',
//     inputSelector: '.form__input-container',
//     submitButtonSelector: '.button',
//     errorClass: 'form__error_active'
// }
// enableValidation(objValid);


// //создаем функцию валидации
// function enableValidation({ formSelector, inputSelector, submitButtonSelector, errorClass }) {
//     //** ОТДЕЛЬНАЯ ФУНКЦИЯ: Действие запуска процесса наложения валидаций
//     const forms = document.querySelectorAll(formSelector);
//     forms.forEach(
//         form => {
//             //прописываем обработчик для каждой формы, чтобы страница не перезагружалась каждый раз при нажатии на Submit
//             form.addEventListener('submit', evt => evt.prependDefauld());//останавливаем стандартное поведение браузера при нажатии на Submit

//             //** ОТДЕЛЬНАЯ ФУНКЦИЯ: Действие наложения обработчиков на поля форм
//             const inputs = form.querySelectorAll(inputSelector);
//             inputs.forEach(
//                 input => {
//                     input.addEventListener('input', evt => {
//                         //** ОТДЕЛЬНАЯ ФУНКЦИЯ: проверка валидности введенных данных
//                         if (input.validity.valid) {
//                             //** ОТДЕЛЬНАЯ ФУНКЦИЯ: если поле валидное - скрыть ошибку под полем

//                             //** ЕЩЕ ОДНА ОТДЕЛЬНАЯ ФУНКЦИЯ: поиск  errorNameProfile
//                             const inputNameProfile = input.getAttribute('name');
//                             const errorNameProfile = document.getElementById('nameProfile-error');

//                             errorNameProfile.textContent = input.validationMessage
//                             errorNameProfile.classList.remove(errorClass)

//                             const inputJobProfile = input.getAttribute('job');
//                             const errorJobProfile = document.getElementById('jobProfile-error');

//                             errorJobProfile.textContent = input.validationMessage
//                             errorJobProfile.classList.remove(errorClass)

//                         } else {
//                             //** ОТДЕЛЬНАЯ ФУНКЦИЯ: если поле не валидное - показать ошибку под полем

//                             //** ЕЩЕ ОДНА ОТДЕЛЬНАЯ ФУНКЦИЯ: поиск  errorNameProfile


//                             const inputJobProfile = input.getAttribute('job');
//                             const errorJobProfile = document.getElementById('jobProfile-error');
//                             const inputNameProfile = input.getAttribute('name');
//                             const errorNameProfile = document.getElementById('nameProfile-error');

//                             errorNameProfile.textContent = input.validationMessage
//                             errorNameProfile.classList.add(errorClass)



//                             errorJobProfile.textContent = input.validationMessage
//                             errorJobProfile.classList.add(errorClass)

//                         }
//                     }

//                     )
//                 }
//             )
//         }
//     )
// }


// //** ОТДЕЛЬНАЯ ФУНКЦИЯ: Действие запуска процесса наложения валидаций
// //** ОТДЕЛЬНАЯ ФУНКЦИЯ: Действие наложения обработчиков на поля форм
// //** ОТДЕЛЬНАЯ ФУНКЦИЯ: проверка валидности введенных данных
// //** ОТДЕЛЬНАЯ ФУНКЦИЯ: если поле валидное - скрыть ошибку под полем
// //** ОТДЕЛЬНАЯ ФУНКЦИЯ: если поле не валидное - показать ошибку под полем
// //** ЕЩЕ ОДНА ОТДЕЛЬНАЯ ФУНКЦИЯ: поиск  errorNameProfile

// //** ОТДЕЛЬНАЯ ФУНКЦИЯ: функция валидности кнопки



// //ФУНКЦИЯ: поиск  errorNameProfile
// function addClass() {

// };


// функция "Показать ошибку"
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__error_active');

}

// функция "Скрыть ошибку"
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove('form__error_active');
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


//функция, которая устанавливает обработчики событий
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input-container')); // находим все инпуты

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
        });
    });
};

const toggleButtonState = () => {

}

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