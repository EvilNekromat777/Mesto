export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._inputElement = config.inputElement;
        this._config = config;
        this._buttonElement = config.buttonElement;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inactiveButtonClass = config.inactiveButtonClass;
    }


    // функция "Показать ошибку"
    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
        inputElement.classList.add(this._config.inputErrorClass);
    }

    // функция "Скрыть ошибку"
    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
        inputElement.classList.remove(this._config.inputErrorClass);
    }

    // функция будет показывать и убирать ошибку
    _checkInputValidity(formElement, inputElement) {
        const isInputValid = inputElement.validity.valid

        if (!isInputValid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(formElement, inputElement, errorMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    // Функция принимает массив полей
    _hasInvalidInput(inputList) {
        // проходим по этому массиву методом some
        return inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся фунцкция
            // hasInvalidInput вернёт true
            return !inputElement.validity.valid;
        })
    };

    // Валидация кнопки
    _toggleButtonState(inputList, buttonElement) {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
            // сделай кнопку неактивной
            buttonElement.classList.add(this._config.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            // иначе сделай кнопку активной
            buttonElement.classList.remove(this._config.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    //функция, которая устанавливает обработчики событий
    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._config.inputElement)); // находим все инпуты
        const buttonElement = formElement.querySelector(this._config.buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    //создаем функцию валидации
    enableValidation = () => {
        // const formList = Array.from(document.querySelectorAll(this._config.formElement)); // находим все формы в документе

        //прописываем обработчик для каждой формы, чтобы страница не перезагружалась каждый раз при нажатии на Submit
        // formList.forEach((formElement) => {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault(); //останавливаем стандартное поведение браузера при нажатии на Submit
        });

        this._setEventListeners(this._formElement);
    };
    // };

}