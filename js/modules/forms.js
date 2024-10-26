import {
    validate
} from './validation';

export default function forms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Предотвращаем отправку формы для валидации

            let isValid = validate(form, '.input-name', '.input-phone', '.input-service', 'input[type="checkbox"]');

            let formData = new FormData(form);

            if (isValid) {
                document.body.classList.add('sending');
                let response = await fetch('php/php/make_appointment.php', {
                    method: 'POST',
                    body: formData
                })
                if (response.ok) {
                    let result = await response.json();
                    alert(result.message);
                    form.reset();
                    form.querySelector('input[type="checkbox"]').classList.remove('success');
                    document.body.classList.remove('sending');
                } else {
                    alert("Ошибка");
                    document.body.classList.remove('sending');
                }

            } else {

            }
        });
    })


    // Получаем все кнопки для открытия модальных окон
    const modalButtons = document.querySelectorAll('.btn_for_modal');

    // Получаем все модальные окна
    const modals = document.querySelectorAll('.modal');

    // Функция для открытия модального окна
    function openModal(modal) {
        modal.style.display = 'flex';
    }

    // Функция для закрытия модального окна
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Добавляем обработчики событий на кнопки открытия модальных окон
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetModalId = button.getAttribute('data-target');
            const targetModal = document.getElementById(targetModalId);
            openModal(targetModal);
        });
    });

    // Добавляем обработчики событий на кнопки закрытия модальных окон
    modals.forEach(modal => {
        const closeButton = modal.querySelector('.modal__close');
        closeButton.addEventListener('click', () => closeModal(modal));
    });

    // Закрытие модального окна при клике вне его содержимого
    window.addEventListener('click', function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
}