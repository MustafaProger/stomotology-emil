export default function works() {
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