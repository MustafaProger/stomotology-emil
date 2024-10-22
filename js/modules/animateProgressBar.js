export default function percent(percent, progressBar) {
    let percentElements = document.querySelectorAll(percent);
    let progressBarElements = document.querySelectorAll(progressBar);
    let animated = Array(percentElements.length).fill(false); // Флаги анимации для каждого прогресс-бара

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function updateProgressBar(i) {
        let percentJS = 0;
        let targetPercent = parseInt(percentElements[i].innerText.replace('%', ''), 10);

        function animate() {
            if (percentJS < targetPercent) {
                percentJS++;
                progressBarElements[i].style.width = percentJS + '%';
                percentElements[i].innerText = percentJS + '%';
                requestAnimationFrame(animate, 10)
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