import burger from "./modules/burger";
import sliderAbout from "./modules/slider-about";
import animation from "./modules/animation";
import cardFlip from "./modules/card-flip";
import works from "./modules/works";
import percent from "./modules/percent";
import sliderFeedback from "./modules/slider-feedback";

document.addEventListener('DOMContentLoaded', () => {
    animation();
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
    percent(".percent", ".progressBar");
    sliderFeedback();
})