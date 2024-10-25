import { validate } from './validation';

export default function forms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Предотвращаем отправку формы для валидации

            let isValid = validate(form, '.input-name', '.input-phone', '.input-service', 'input[type="checkbox"]');

            let formData = new FormData(form);

            if (isValid) {

                let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: formData
                })
                if (response.ok) {
                    document.body.classList.add('sending');
                    form.classList.add('sending');
                    document.querySelector('.loader-wrapper').classList.add('active');

                    // alert('Данные отправлены');
                //     let result = await response.json();
                //     alert(result.message);
                //     form.reset();
                //     form.querySelector('input[type="checkbox"]').classList.remove('success');
                } else {
                    alert("Ошибка");
                }

            } else {

            }
        });
    })

}