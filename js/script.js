import burger from "./modules/burger";
import sliderAbout from "./modules/slider-about";
import animationScroll from "./modules/animationScroll";
import cardFlip from "./modules/card-flip";
import works from "./modules/works";
import animateProgressBar from "./modules/animateProgressBar";
import sliderFeedback from "./modules/slider-feedback";
import { handleFloatingLabel, validationCheckbox } from "./modules/validation";
import forms from "./modules/forms";

document.addEventListener('DOMContentLoaded', () => {
    animationScroll();
    burger();
    sliderAbout({
        trackSelector: '.about__blocks',
        slideselector: '.about__block',
        buttonselector: '.button',
        dotsContainerelector: '.dots-container',
        dotselector: '.dot',
    });
    cardFlip();
    works();
    animateProgressBar(".percent", ".progressBar");
    sliderFeedback();
    validationCheckbox('input[type="checkbox"]')
    handleFloatingLabel('.label', '.label-comments', '.form .inputs-field input', 'textarea');
    forms();
})