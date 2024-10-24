import { validate } from './validation';

export default function forms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {

        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем отправку формы для валидации

            const isValid = validate(form, '.input-name', '.input-phone', '.input-service', 'input[type="checkbox"]');

            if (isValid) {
                alert('Данные отправлены');
                form.reset();
            } else {
                alert("Заполните все данные")
            }
        });
    })

}