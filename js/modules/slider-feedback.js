export default function sliderFeedback() {
    const wrapper = document.querySelector('.feedback__blocks-wrapper'),
        inner = document.querySelector('.feedback__blocks-inner'),
        blocks = document.querySelectorAll('.feedback__block'),
        width = window.getComputedStyle(wrapper).width;

    let offset = 0;
    let slideIndex = 1;

    inner.style.width = 100 * blocks.length + '%';

    // Проверка, виден ли слайд в области видимости
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    // Переключение на нужный слайд
    function moveToSlide(index) {
        offset = +width.slice(0, width.length - 2) * (index - 1);
        inner.style.transform = `translateX(-${offset}px)`;
        activeDot();
    }

    // Листание слайдов с клавиатуры
    document.addEventListener('keydown', (event) => {
        if (!isInViewport(wrapper)) return; // Проверка видимости слайдера

        if (event.key === 'ArrowLeft') {
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) * (blocks.length - 1);
                slideIndex = blocks.length;
            } else {
                offset -= +width.slice(0, width.length - 2);
                slideIndex--;
            }
            moveToSlide(slideIndex);

        } else if (event.key === 'ArrowRight') {
            if (offset == +width.slice(0, width.length - 2) * (blocks.length - 1)) {
                offset = 0;
                slideIndex = 1;
            } else {
                offset += +width.slice(0, width.length - 2);
                slideIndex++;
            }
            moveToSlide(slideIndex);
        }
    });

    // Индикаторы
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    wrapper.append(indicators);

    for (let i = 0; i < blocks.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('feedback__dot');
        if (i == 0) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function activeDot() {
        dots.forEach(dot => {
            dot.style.backgroundColor = '#fff';
        });
        dots[slideIndex - 1].style.backgroundColor = '#00B5E2';
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            moveToSlide(slideIndex);
        });
    });

    activeDot();

}