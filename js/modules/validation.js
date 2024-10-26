function handleFloatingLabel(labelsForInputSelector, labelsForTextareaSelector, inputSelector, textareaSelector) {
    const labelsForInput = document.querySelectorAll(labelsForInputSelector);
    const labelsForTextarea = document.querySelectorAll(labelsForTextareaSelector);
    const inputs = document.querySelectorAll(inputSelector);
    const textareas = document.querySelectorAll(textareaSelector);

    function moveLabel(isActive, index, labelName, topValue, translateValue) {
        const label = labelName[index];
        if (label) { // Проверка на существование
            if (isActive) {
                label.style.fontSize = '0.8rem';
                label.style.top = `${topValue}px`;
                label.style.transform = `translateY(-${translateValue}%)`;
            } else {
                label.style.fontSize = '';
                label.style.top = '';
                label.style.transform = '';
            }
        } else {
            console.error(`Label not found for index: ${index}`); // Логируем ошибку
        }
    }

    inputs.forEach((input, index) => {
        input.addEventListener('input', () => moveLabel(input.value.trim() !== '', index, labelsForInput, 10, 150));
        // Начальная проверка для установки состояния лейблов
        moveLabel(input.value.trim() !== '', index, labelsForInput, 10, 150);
    });

    textareas.forEach((textarea, index) => {
        textarea.addEventListener('input', () => moveLabel(textarea.value.trim() !== '', index, labelsForTextarea, 16.67, 250));
        // Начальная проверка для установки состояния лейблов
        moveLabel(textarea.value.trim() !== '', index, labelsForTextarea, 16.67, 250);
    });
}

function validate(form, inputName, inputPhone, inputService, inputCheckbox) {
    const nameInput = form.querySelector(inputName);
    const phoneInput = form.querySelector(inputPhone);
    const serviceInput = form.querySelector(inputService);
    const checkboxInput = document.querySelectorAll(inputCheckbox);

    let isValid = true;

    let message = {
        name: {
            required: 'Введите имя пользователя',
            minLength: 'Введите не менее 2 символов',
            correct: 'Имя не должно содержать цифр'
        },
        phone: {
            required: 'Введите номер телефона',
            minLength: 'Введите не менее 11 символов',
            correct: 'Номер не должен содержать буквы'
        },
        service: {
            required: 'Выберите услугу'
        }
    };

    let {
        name,
        phone,
        service
    } = message;

    errorWork(nameInput, 'name', 2, /\d/, name);
    errorWork(phoneInput, 'phone', 11, /\D/, phone);
    errorWork(serviceInput, 'service', 1, null, service);
    validationCheckbox(checkboxInput);

    return isValid;

    function errorWork(input, classError, length, regex, message) {
        createError(input, classError);
        const error = form.querySelector(`.${classError}__error`);

        const validateField = () => {
            validationNamePhone(input, error, length, regex, message);
        };

        input.removeEventListener('input', validateField);
        input.addEventListener('input', validateField);
        validateField();
    }

    function validationNamePhone(input, error, length, regex, message) {
        let fieldIsValid = true;

        if (input.value.trim() === '') {
            error.innerHTML = message.required;
            error.style.display = 'block';
            fieldIsValid = false;
        } else if (regex && regex.test(input.value)) {
            error.innerHTML = message.correct;
            error.style.display = 'block';
            fieldIsValid = false;
        } else if (input.value.length < length) {
            error.innerHTML = message.minLength;
            error.style.display = 'block';
            fieldIsValid = false;
        } else {
            error.style.display = 'none';
        }

        if (!fieldIsValid) isValid = false;
    }

    function validationCheckbox(checkboxsSelector) {

        function errorRemove(checkbox) {
            checkbox.classList.remove('error');
            checkbox.classList.add('success');
        }

        function errorAdd(checkbox) {
            checkbox.classList.remove('success');
            checkbox.classList.add('error');
        }

        checkboxsSelector.forEach((checkbox) => {
            if (checkbox.checked) {
                errorRemove(checkbox);
                isValid = true;
            } else {
                errorAdd(checkbox);
                isValid = false;
            }
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    errorRemove(checkbox);
                    isValid = true;
                } else {
                    errorAdd(checkbox);
                    isValid = true;
                }
            });
        });
    }

    function createError(input, name) {
        let error = form.querySelector(`.${name}__error`);
        if (!error) {
            error = document.createElement('span');
            error.classList.add('error', `${name}__error`);
            error.style.display = 'none';
            input.insertAdjacentElement('afterend', error);
        }
    }
}

function validationCheckbox(checkboxsSelector) {
    const checkboxs = document.querySelectorAll(checkboxsSelector)
    checkboxs.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkbox.classList.add('success');
            } else {
                checkbox.classList.remove('success');
            }
        });
    });
}

export {
    handleFloatingLabel,
    validate,
    validationCheckbox
};