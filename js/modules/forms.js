import {
    validate
} from './validation';

export default function forms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            let isValid = validate(form, '.input-name', '.input-phone', '.input-service', '.input-checkbox');

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

<<<<<<< HEAD
    const modalButtons = document.querySelectorAll('.btn_for_modal');
    const modals = document.querySelectorAll('.modal');

=======

    // Получаем все кнопки для открытия модальных окон
    const modalButtons = document.querySelectorAll('.btn_for_modal');

    // Получаем все модальные окна
    const modals = document.querySelectorAll('.modal');

    // Функция для открытия модального окна
>>>>>>> origin/master
    function openModal(modal) {
        modal.style.display = 'flex';
    }

<<<<<<< HEAD
=======
    // Функция для закрытия модального окна
>>>>>>> origin/master
    function closeModal(modal) {
        modal.style.display = 'none';
    }

<<<<<<< HEAD
=======
    // Добавляем обработчики событий на кнопки открытия модальных окон
>>>>>>> origin/master
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetModalId = button.getAttribute('data-target');
            const targetModal = document.getElementById(targetModalId);
            openModal(targetModal);
        });
    });

<<<<<<< HEAD
=======
    // Добавляем обработчики событий на кнопки закрытия модальных окон
>>>>>>> origin/master
    modals.forEach(modal => {
        const closeButton = modal.querySelector('.modal__close');
        closeButton.addEventListener('click', () => closeModal(modal));
    });

<<<<<<< HEAD
=======
    // Закрытие модального окна при клике вне его содержимого
>>>>>>> origin/master
    window.addEventListener('click', function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
}