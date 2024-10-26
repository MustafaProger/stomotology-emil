import burger from "./modules/burger";
import sliderAbout from "./modules/slider-about";
import animationScroll from "./modules/animationScroll";
import cardFlip from "./modules/card-flip";
import works from "./modules/works";
import sliderFeedback from "./modules/slider-feedback";
import { handleFloatingLabel, validationCheckbox } from "./modules/validation";
import forms from "./modules/forms";

function flag(nameBlock) {
    handleFloatingLabel(`${nameBlock} .label`, `${nameBlock} .label-comments`, `${nameBlock} .inputs-field input`, `${nameBlock} textarea`);
}

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
<<<<<<< HEAD
    validationCheckbox('input[type="checkbox"]');
    flag('.form');
    flag('#modal1');
    flag('#modal2');
=======
    validationCheckbox('input[type="checkbox"]')
    handleFloatingLabel('.form .label', '.form .label-comments', '.form .form__input', '.form textarea');
    handleFloatingLabel('#modal1 .label', '#modal1 .label-comments', '#modal1 .form__input', '#modal1 textarea');
    handleFloatingLabel('#modal2 .label', '#modal2 .label-comments', '#modal2 .form__input', '#modal2 textarea');
    
>>>>>>> origin/master
    forms();
})