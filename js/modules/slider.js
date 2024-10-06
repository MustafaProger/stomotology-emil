export default function slider({trackSelector, slideselector, buttonselector, dotsContainerelector, dotselector}) {
    const track = document.querySelector(trackSelector);
    const slides = document.querySelectorAll(slideselector);
    const buttons = document.querySelectorAll(buttonselector);
    const dotsContainer = document.querySelector(dotsContainerelector);
    const dots = document.querySelectorAll(dotselector);
    let currentIndex = 0; // текущий индекс слайда

    const totalSlides = slides.length; // общее количество слайдов
    const totalDots = dots.length; // количество индикаторов

    const movingDot = document.createElement('div'); // создаем элемент для перемещения активной точки
    movingDot.id = 'active-dot';
    dotsContainer.appendChild(movingDot); // добавляем активную точку в контейнер с точками
    
    let startX = 0; // начальная позиция касания
    let isDragging = false; // состояние перетаскивания

    // Обрабатываем клик по индикаторам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index; // устанавливаем текущий индекс на основе индикатора
            updateSliderPosition(); // обновляем позицию слайдера
            moveActiveDot(currentIndex); // перемещаем активную точку
        });
    });

    // Функция для обновления позиции слайдера
    function updateSliderPosition() {
        // Сбрасываем все классы с слайдов
        slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));

        // Определяем индексы предыдущего и следующего слайда
        const prevIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
        const nextIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;

        // Устанавливаем классы активного, предыдущего и следующего слайдов
        slides[currentIndex].classList.add('active');
        slides[prevIndex].classList.add('prev');
        slides[nextIndex].classList.add('next');
    }

    // Функция для перемещения активной точки индикатора
    function moveActiveDot(currentSlideIndex) {
        const activeDotIndex = currentSlideIndex % totalDots;
        const activeDotPosition = dots[activeDotIndex].offsetLeft; // позиция нужного индикатора
        movingDot.style.transform = `translateX(${activeDotPosition}px)`; // перемещаем активную точку

        // Обновляем стили индикаторов
        dots.forEach(dot => dot.classList.remove('active')); // сбрасываем активный класс у всех индикаторов
        dots[activeDotIndex].classList.add('active'); // добавляем активный класс текущему индикатору
    }

    // Функция для перехода к следующему слайду
    function gotoNext() {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0; // увеличиваем индекс, иначе переходим к первому слайду
        updateSliderPosition();
        moveActiveDot(currentIndex);
    }

    // Функция для перехода к предыдущему слайду
    function gotoPrev() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1; // уменьшаем индекс, иначе переходим к последнему слайду
        updateSliderPosition();
        moveActiveDot(currentIndex);
    }

    // Добавляем обработчики для кнопок "Назад" и "Вперед"
    buttons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            index === 0 ? gotoPrev() : gotoNext(); // если индекс кнопки 0, переходим назад, иначе вперед
        });
    });

    // Обработчик нажатия клавиш
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            gotoPrev(); // Переход к предыдущему слайду
        } else if (event.key === 'ArrowRight') {
            gotoNext(); // Переход к следующему слайду
        }
    });

    // Обработчики для сенсорного ввода

    track.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX; // Сохраняем начальную позицию касания
        isDragging = true; // Устанавливаем флаг перетаскивания
    });

    track.addEventListener('touchmove', (event) => {
        if (!isDragging) return; // Если не перетаскиваем, выходим

        const currentX = event.touches[0].clientX; // Текущая позиция касания
        const diff = startX - currentX; // Разница между начальной и текущей позицией

        // Если движение больше 50 пикселей, переключаем слайды
        if (diff > 50) {
            gotoNext(); // Переключаем на следующий слайд
            isDragging = false; // Сбрасываем флаг перетаскивания
        } else if (diff < -50) {
            gotoPrev(); // Переключаем на предыдущий слайд
            isDragging = false; // Сбрасываем флаг перетаскивания
        }
    });

    track.addEventListener('touchend', () => {
        isDragging = false; // Сбрасываем флаг перетаскивания при завершении касания
    });

    // Инициализируем слайдер
    updateSliderPosition();
}