export const config = {
    formElement: '.form',
    inputElement: '.form__input-container',
    buttonElement: '.popup__submit',
    inputErrorClass: 'form__input-container_error',
    errorClass: 'form__error_active',
    inactiveButtonClass: 'popup__submit_inactive'
};

// функция "Показать ошибку"
export const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
    inputElement.classList.add(config.inputErrorClass);
}

// функция "Скрыть ошибку"
export const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
    inputElement.classList.remove(config.inputErrorClass);
}

// функция будет показывать и убирать ошибку
export const checkInputValidity = (formElement, inputElement) => {
    const isInputValid = inputElement.validity.valid

    if (!isInputValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(config, formElement, inputElement, errorMessage);
    } else {
        hideInputError(config, formElement, inputElement);
    }
}

// Функция принимает массив полей
export const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся фунцкция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    })
};

// Валидация кнопки
export const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

//функция, которая устанавливает обработчики событий
export const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputElement)); // находим все инпуты
    const buttonElement = formElement.querySelector(config.buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

//создаем функцию валидации
export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formElement)); // находим все формы в документе

    //прописываем обработчик для каждой формы, чтобы страница не перезагружалась каждый раз при нажатии на Submit
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault(); //останавливаем стандартное поведение браузера при нажатии на Submit
        });

        setEventListeners(config, formElement);
    });
};

enableValidation(config);