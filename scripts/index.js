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
    popup.classList.toggle('popup_opened')
    nameInput.value = name.textContent
    jobInput.value = job.textContent
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value
    job.textContent = jobInput.value
    popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);


