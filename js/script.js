import burger from "./modules/burger";
import slider from "./modules/slider";
import animation from "./modules/animation";
import cardFlip from "./modules/card-flip";
import works from "./modules/works";

document.addEventListener('DOMContentLoaded', () => {
    animation();
    burger();
    slider({
        trackSelector: '.about__blocks',
        slideselector: '.about__block',
        buttonselector: '.button',
        dotsContainerelector: '.dots-container',
        dotselector: '.dot',
    });
    cardFlip();
    works();
})