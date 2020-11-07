function slider({
    container,
    nextArrow,
    prevArrow,
    totalCount,
    currentCount,
    slide,
    wrapper,
    field
}) {
    const slides = document.querySelectorAll(slide),
        slideWrapper = document.querySelector(wrapper),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCount),
        current = document.querySelector(currentCount),
        slideInner = document.querySelector(field),
        width = window.getComputedStyle(slideWrapper).width,
        slider = document.querySelector(container),
        dots = [],
        carouselIndicators = document.createElement('div');

    let slideIndex = 1,
        slideOffset = 0;

    slider.style.position = 'relative';
    carouselIndicators.classList.add('carousel-indicators');
    slider.append(carouselIndicators);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('ol');
        dot.classList.add('dot');
        dot.setAttribute('data-goto', i + 1);
        if (i === 0) {
            dot.style.opacity = 1;
        }
        carouselIndicators.append(dot);
        dots.push(dot);
    }
    carouselIndicators.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('dot')) {
            slideOffset = getNumb(width) * (+e.target.dataset.goto - 1);
            slideInner.style.transform = `translateX(-${slideOffset}px)`;
            slideIndex = e.target.dataset.goto;
            slideNumb();
            resertDotStyle(slideIndex);
        }
    });

    function resertDotStyle(dotIndex) {
        dots.forEach(item => {
            item.style.opacity = '';
        });
        dots[dotIndex - 1].style.opacity = 1;
    }

    function slideNumb() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
            total.textContent = `0${slides.length}`;
        } else {
            current.textContent = `${slideIndex}`;
            total.textContent = `${slides.length}`;
        }
    }
    slideInner.style.width = 100 * slides.length + '%';
    slideInner.style.display = 'flex';
    slideInner.style.transition = '0.5s all';
    slideWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    function getNumb(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', (e) => {
        if (slideOffset == getNumb(width) * (slides.length - 1)) {
            slideOffset = 0;
        } else {
            slideOffset += getNumb(width);
        }

        slideInner.style.transform = `translateX(-${slideOffset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
            slideNumb();
        } else {
            slideIndex++;
            slideNumb();
        }
        resertDotStyle(slideIndex);
    });

    prev.addEventListener('click', (e) => {
        if (slideOffset === 0) {
            slideOffset = getNumb(width) * (slides.length - 1);
        } else {
            slideOffset -= getNumb(width);
        }

        slideInner.style.transform = `translateX(-${slideOffset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
            slideNumb();
        } else {
            slideIndex--;
            slideNumb();
        }

        resertDotStyle(slideIndex);
    });
    slideNumb();

}
export default slider;