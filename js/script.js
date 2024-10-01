document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger');
    const navbar = document.querySelector('.nav');
    const lists = document.querySelectorAll('.list__item');

    burger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.classList.toggle('lock');


        lists.forEach(item => {
            item.classList.toggle('fade-down');
        })
    })
})