export default function validation() {
    function handleFloatingLabel(labelsForInputSelector, labelsForTextareaSelector, inputSelector, textareaSelector) {
        const labelsForInput = document.querySelectorAll(labelsForInputSelector);
        const labelsForTextarea = document.querySelectorAll(labelsForTextareaSelector);
        const inputs = document.querySelectorAll(inputSelector);
        const textareas = document.querySelectorAll(textareaSelector);

        function moveLabel(isActive, index, labelName, topValue, translateValue) {
            const label = labelName[index]; // Связываем конкретный инпут с его лейблом
            if (isActive) {
                label.style.cssText = `font-size: 0.8rem; top: ${topValue}px; transform: translateY(-${translateValue}%);`;
            } else {
                label.style.cssText = ''; // Возвращаем лейбл в исходное положение, если инпут пустой
            }
        }

        inputs.forEach((input, index) => {
            input.addEventListener('input', () => moveLabel(input.value.trim() !== '', index, labelsForInput, 10, 150))
        })

        textareas.forEach((textarea, index) => {
            textarea.addEventListener('input', () => moveLabel(textarea.value.trim() !== '', index, labelsForTextarea, 16.6666666667, 250))
        })

    }

    function validation(form, inputName, inputPhone, inputService) {
        const nameInput = form.querySelector(inputName);
        const phoneInput = form.querySelector(inputPhone);
        const serviceInput = form.querySelector(inputService);
    
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
    
        let { name, phone, service } = message;
    
        errorWork(nameInput, 'name', 2, /\d/, name);
        errorWork(phoneInput, 'phone', 11, /\D/, phone);
        errorWork(serviceInput, 'service', 1, null, service);
    
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
    
    // Пример вызова функции
    const form = document.querySelector('#form form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем отправку формы для валидации
        validation(form, '.input-name', '.input-phone', '.input-service');
    });
    
    handleFloatingLabel('.label', '.label-comments', '.form input', 'textarea');
}