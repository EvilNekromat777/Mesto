let popup = document.querySelector('.popup')
let popupOpenButton = document.querySelector('.button__open-popup')
let popupCloseButton = popup.querySelector('.popup__close')
let popupToggle = function (event) {
    popup.classList.toggle('popup_opened')
}

popupOpenButton.addEventListener('click', popupToggle)
popupCloseButton.addEventListener('click', popupToggle)


let profile = document.querySelector('.profile')
let formElement = document.querySelector('.form')

let nameInput = formElement.querySelector('.form__input-container_name')
let jobInput = formElement.querySelector('.form__input-container_job')
let name = profile.querySelector('.profile__title')
let job = profile.querySelector('.profile__subtitle')
nameInput.value = 'Жак-Ив Кусто';
jobInput.value = 'Исследователь океана';



function formSubmitHandler(evt) {
    evt.preventDefault();

    name.textContent = nameInput.value
    job.textContent = jobInput.value
}

formElement.addEventListener('submit', formSubmitHandler);

let saveAndClose = popup.querySelector('.popup__submit')
saveAndClose.addEventListener('click', popupToggle);

