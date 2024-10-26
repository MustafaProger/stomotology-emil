import burger from "./modules/burger";
import sliderAbout from "./modules/slider-about";
import animationScroll from "./modules/animationScroll";
import cardFlip from "./modules/card-flip";
import works from "./modules/works";
import sliderFeedback from "./modules/slider-feedback";
import { backFlag, validationCheckbox } from "./modules/validation";
import forms from "./modules/forms";
import openModal from "./modules/openModal";

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
    sliderFeedback();
    validationCheckbox('input[type="checkbox"]');
    backFlag('.form');
    backFlag('#modal1');
    backFlag('#modal2');
    forms();
    openModal();
})