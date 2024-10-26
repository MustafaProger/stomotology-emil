import {
    validate
} from './validation';

export default function forms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        if (form.classList.contains('make_appointment')) {
            sendmail(form, 'make_appointment');
        } else if (form.classList.contains('consultation')) {
            sendmail(form, 'consultation');
        }
    })

    function sendmail(form, namePhpFile) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            let isValid = validate(form, '.input-name', '.input-phone', '.input-service', '.input-checkbox');

            let formData = new FormData(form);

            if (isValid) {
                document.body.classList.add('sending');
                let response = await fetch(`php/php/${namePhpFile}.php`, {
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
    }
}