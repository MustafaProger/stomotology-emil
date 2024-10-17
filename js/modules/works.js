export default function works() {
    document.querySelectorAll('.before-after-container').forEach(container => {
        const beforeImage = container.getAttribute('data-before');
        const afterImage = container.getAttribute('data-after');
        
        // Назначаем фоны для before и after
        const beforeElement = container.querySelector('.before_after');
        const afterElement = container.querySelector('figure');
    
        // Присваиваем background-image
        beforeElement.style.backgroundImage = `url(${beforeImage})`;
        afterElement.style.backgroundImage = `url(${afterImage})`;
    });
    
    // Добавляем обработчики для слайдеров
    document.querySelectorAll('.before_after_slider').forEach(slider => {
        slider.addEventListener('input', () => {
            beforeAfter(slider); // Вызываем локальную функцию для обработки
        });
    });

    // Локальная функция для обработки слайдера
    function beforeAfter(slider) {
        const container = slider.closest('.before-after-container');
        const beforeElement = container.querySelector('.before_after');
        
        // Получаем значение слайдера и изменяем ширину элемента before
        const value = slider.value;
        beforeElement.style.width = `${value}%`;
    }
}