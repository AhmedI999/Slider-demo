'use strict';


const slider = function() {
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const maxSlide = slides.length - 1;
    const dotContainer = document.querySelector('.dots');

//// Functions
    const slideMover = function(slide) {
        slides.forEach((s, i) => {
            s.style.transform = `translateX(${100 * (i - slide)}%)`
        });
    };
    slideMover(0); // first position
    const nextSlide = function() {
        if (currentSlide === maxSlide) currentSlide = 0;
        else currentSlide++;
        slideMover(currentSlide)
        activateDot(currentSlide);
    }
    const previousSlide = function() {

        if (currentSlide === 0) currentSlide = maxSlide;
        else currentSlide--;
        slideMover(currentSlide);
        activateDot(currentSlide);
    }

// dots function
    const createDots = function() {
        slides.forEach(function(_, i) {
            dotContainer.insertAdjacentHTML('beforeend',
                `<button class='dots__dot' data-slide='${i}'></button>`);
        });
    };
    createDots();

////////// EVENT HANDLERS
// create dot active
    const activateDot = function(slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot
            .classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };
    activateDot(0);
// next slide
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', previousSlide);

// For keyboards
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') previousSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    dotContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dots__dot')) {
            const slide = e.target.dataset.slide;
            nextSlide(slide);
            activateDot(slide);
        }
    });
}
slider();