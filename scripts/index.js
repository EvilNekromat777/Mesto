const profile = document.querySelector('.profile');
const formElement = document.querySelector('.form__edit');
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
const nameProfileError = document.getElementById(`nameProfile-error`);
const jobProfileError = document.getElementById(`jobProfile-error`);
const nameCardError = document.getElementById(`nameCard-error`);
const linkCardError = document.getElementById(`linkCard-error`);
//const buttonElement = document.querySelector('.popup__submit');


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
function keyHandler(evt) {
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

//слушатель - при нажатии на кнопку "Сохранить", срабатывает функция formSubmitHandler
formElement.addEventListener('submit', formSubmitHandler);


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
    closePopup(popupAdd);

}

//слушатель: при нажатии на кнопку сработает функция renderCard
formAdd.addEventListener('submit', renderCard);

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
});

popupEditClose.addEventListener('click', () => openUserPopup(popupEdit));
popupAddClose.addEventListener('click', () => closePopup(popupAdd));
popupImageClose.addEventListener('click', () => closePopup(popupImage));

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

    openPopup(popupImage)
};

