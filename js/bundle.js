/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/animation.js":
/*!*********************************!*\
  !*** ./js/modules/animation.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function animation() {
  const buttons = document.querySelectorAll('a[href^="#"]'); // Получаем все ссылки, ведущие на якорные блоки

  buttons.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault(); // Отменяем стандартное поведение ссылки

      const blockID = btn.getAttribute('href').substring(1); // Получаем ID блока, к которому нужно прокрутить
      const block = document.getElementById(blockID); // Находим блок по ID

      if (block) {
        const targetPosition = block.getBoundingClientRect().top + window.pageYOffset; // Позиция блока
        const startPosition = window.pageYOffset; // Текущая позиция прокрутки
        const distance = targetPosition - startPosition - 140; // Расстояние до блока
        const duration = 1000; // Продолжительность анимации в миллисекундах
        let startTime = null;

        // Функция анимации
        function scrollAnimation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
        }

        // Функция плавности анимации (easing function)
        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }
        requestAnimationFrame(scrollAnimation);
      }
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (animation);

/***/ }),

/***/ "./js/modules/burger.js":
/*!******************************!*\
  !*** ./js/modules/burger.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ burger)
/* harmony export */ });
function burger() {
  const burger = document.querySelector('.header__burger');
  const navbar = document.querySelector('.nav');
  const lists = document.querySelectorAll('.list__item');
  burger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('lock');
    lists.forEach(item => {
      item.classList.toggle('fade-down');
    });
  });
}

/***/ }),

/***/ "./js/modules/card-flip.js":
/*!*********************************!*\
  !*** ./js/modules/card-flip.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cardFlip)
/* harmony export */ });
function cardFlip() {
  document.querySelectorAll('.flip-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      this.closest('.service-card-inner').classList.add('flipped');
    });
  });
  document.querySelectorAll('.flip-back-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      this.closest('.service-card-inner').classList.remove('flipped');
    });
  });
}

/***/ }),

/***/ "./js/modules/percent.js":
/*!*******************************!*\
  !*** ./js/modules/percent.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ percent)
/* harmony export */ });
function percent(percent, progressBar) {
  let percentElements = document.querySelectorAll(percent);
  let progressBarElements = document.querySelectorAll(progressBar);
  let animated = Array(percentElements.length).fill(false); // Флаги анимации для каждого прогресс-бара

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }
  function updateProgressBar(i) {
    let percentJS = 0;
    let targetPercent = parseInt(percentElements[i].innerText.replace('%', ''), 10);
    function animate() {
      if (percentJS < targetPercent) {
        percentJS++;
        progressBarElements[i].style.width = percentJS + '%';
        percentElements[i].innerText = percentJS + '%';
        setTimeout(animate, 10);
      }
    }
    animate();
  }
  function checkAndAnimateProgressBars() {
    percentElements.forEach((item, i) => {
      if (isInViewport(item) && !animated[i]) {
        updateProgressBar(i);
        animated[i] = true; // Помечаем прогресс-бар как анимированный
      }
    });
  }

  // Проверяем и анимируем прогресс-бары при первой загрузке страницы
  checkAndAnimateProgressBars();

  // Проверяем и анимируем прогресс-бары при прокрутке
  window.addEventListener('scroll', checkAndAnimateProgressBars);
}

/***/ }),

/***/ "./js/modules/slider-about.js":
/*!************************************!*\
  !*** ./js/modules/slider-about.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sliderAbout)
/* harmony export */ });
function sliderAbout({
  trackSelector,
  slideselector,
  buttonselector,
  dotsContainerelector,
  dotselector
}) {
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
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  // Функция для обновления позиции слайдера
  function updateSliderPosition() {
    // Сбрасываем все классы с слайдов
    slides.forEach(slide => slide.classList.remove('active', 'prev', 'next'));

    // Определяем индексы предыдущего и следующего слайда
    const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    const nextIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;

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
    currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0; // увеличиваем индекс, иначе переходим к первому слайду
    updateSliderPosition();
    moveActiveDot(currentIndex);
  }

  // Функция для перехода к предыдущему слайду
  function gotoPrev() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1; // уменьшаем индекс, иначе переходим к последнему слайду
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
  document.addEventListener('keydown', event => {
    if (!isInViewport(track)) return; // Проверка видимости слайдера

    if (event.key === 'ArrowLeft') {
      gotoPrev(); // Переход к предыдущему слайду
    } else if (event.key === 'ArrowRight') {
      gotoNext(); // Переход к следующему слайду
    }
  });

  // Обработчики для сенсорного ввода

  track.addEventListener('touchstart', event => {
    startX = event.touches[0].clientX; // Сохраняем начальную позицию касания
    isDragging = true; // Устанавливаем флаг перетаскивания
  });
  track.addEventListener('touchmove', event => {
    if (!isDragging) return; // Если не перетаскиваем, выходим

    const currentX = event.touches[0].clientX; // Текущая позиция касания
    const diff = startX - currentX; // Разница между начальной и текущей позицией

    // event.preventDefault();

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

/***/ }),

/***/ "./js/modules/slider-feedback.js":
/*!***************************************!*\
  !*** ./js/modules/slider-feedback.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ sliderFeedback)
/* harmony export */ });
function sliderFeedback() {
  const wrapper = document.querySelector('.feedback__blocks-wrapper'),
    inner = document.querySelector('.feedback__blocks-inner'),
    blocks = document.querySelectorAll('.feedback__block'),
    width = window.getComputedStyle(wrapper).width;
  let offset = 0;
  let slideIndex = 1;
  inner.style.width = 100 * blocks.length + '%';

  // Анимация прогресс-бара с задержкой
  function animateProgressBar(block) {
    const percentElement = block.querySelector('.percent');
    const progressBarElement = block.querySelector('.progressBar');
    let percentJS = 0;
    const targetPercent = parseInt(percentElement.innerText.replace('%', ''), 10);
    function animate() {
      if (percentJS < targetPercent) {
        percentJS++;
        progressBarElement.style.width = percentJS + '%';
        percentElement.innerText = percentJS + '%';
        setTimeout(animate, 10);
      }
    }
    animate();
  }

  // Проверка, виден ли слайд в области видимости
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }

  // Переключение на нужный слайд
  function moveToSlide(index) {
    offset = +width.slice(0, width.length - 2) * (index - 1);
    inner.style.transform = `translateX(-${offset}px)`;
    activeDot();

    // Запуск анимации прогресс-бара для активного слайда
    const activeSlide = blocks[index - 1];
    if (isInViewport(wrapper)) {
      animateProgressBar(activeSlide);
    }
  }

  // Листание слайдов с клавиатуры
  document.addEventListener('keydown', event => {
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
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      slideIndex = slideTo;
      moveToSlide(slideIndex);
    });
  });
  activeDot();
}

/***/ }),

/***/ "./js/modules/works.js":
/*!*****************************!*\
  !*** ./js/modules/works.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ works)
/* harmony export */ });
function works() {
  const imageComparisonSliders = document.querySelectorAll('.image-comparison__slider-wrapper');
  function setSliderState(e, sliderRange) {
    if (e.type === 'input') {
      sliderRange.classList.add('image-comparison__range--active');
      return;
    }
    sliderRange.classList.remove('image-comparison__range--active');
  }
  function moveSliderThumb(e, sliderRange, thumb) {
    let position = e.layerY - 20;
    if (e.layerY <= sliderRange.offsetTop) {
      position = -20;
    }
    if (e.layerY >= sliderRange.offsetHeight) {
      position = sliderRange.offsetHeight - 20;
    }
    thumb.style.top = `${position}px`;
  }
  function moveSliderRange(e, element) {
    const value = e.target.value;
    const slider = element.querySelector('[data-image-comparison-slider]');
    const imageWrapperOverlay = element.querySelector('[data-image-comparison-overlay]');
    const thumb = element.querySelector('[data-image-comparison-thumb]');
    slider.style.left = `${value}%`;
    imageWrapperOverlay.style.width = `${value}%`;
    moveSliderThumb(e, slider.parentElement, thumb);
    setSliderState(e, element.querySelector('[data-image-comparison-range]'));
  }
  function init(element) {
    const sliderRange = element.querySelector('[data-image-comparison-range]');
    const thumb = element.querySelector('[data-image-comparison-thumb]');
    if ('ontouchstart' in window === false) {
      sliderRange.addEventListener('mouseup', e => setSliderState(e, sliderRange));
      function moveSliderThumbHandler(e) {
        moveSliderThumb(e, sliderRange, thumb);
      }
      sliderRange.addEventListener('mousedown', e => {
        moveSliderThumb(e, sliderRange, thumb);
        element.addEventListener('mousemove', moveSliderThumbHandler);
      });
      sliderRange.addEventListener('mouseup', () => {
        element.removeEventListener('mousemove', moveSliderThumbHandler);
      });
    }
    sliderRange.addEventListener('input', e => moveSliderRange(e, element));
    sliderRange.addEventListener('change', e => moveSliderRange(e, element));
  }
  imageComparisonSliders.forEach(slider => init(slider));
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_burger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/burger */ "./js/modules/burger.js");
/* harmony import */ var _modules_slider_about__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider-about */ "./js/modules/slider-about.js");
/* harmony import */ var _modules_animation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/animation */ "./js/modules/animation.js");
/* harmony import */ var _modules_card_flip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/card-flip */ "./js/modules/card-flip.js");
/* harmony import */ var _modules_works__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/works */ "./js/modules/works.js");
/* harmony import */ var _modules_percent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/percent */ "./js/modules/percent.js");
/* harmony import */ var _modules_slider_feedback__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider-feedback */ "./js/modules/slider-feedback.js");







document.addEventListener('DOMContentLoaded', () => {
  (0,_modules_animation__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_burger__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_slider_about__WEBPACK_IMPORTED_MODULE_1__["default"])({
    trackSelector: '.about__blocks',
    slideselector: '.about__block',
    buttonselector: '.button',
    dotsContainerelector: '.dots-container',
    dotselector: '.dot'
  });
  (0,_modules_card_flip__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_works__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_percent__WEBPACK_IMPORTED_MODULE_5__["default"])(".percent", ".progressBar");
  (0,_modules_slider_feedback__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map