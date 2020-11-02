window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsParent = document.querySelector(".tabheader__items"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        thankModal = document.createElement('div'),
        modal = document.querySelector('.modal'),
        prevModalDialog = document.querySelector('.modal__dialog'),
        slides = document.querySelectorAll('.offer__slide'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slideInner = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slideWrapper).width,
        slider = document.querySelector('.offer__slider'),
        dots = [],
        carouselIndicators = document.createElement('div');

    let timerToCloseThanks,
        slideIndex = 1,
        slideOffset = 0;



    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //!TIMER----------------------------------------------------------
    const deadline = '2020-12-31';

    function getTimeRemaining(endtime) {
        const time = Date.parse(endtime) - Date.parse(new Date()),
            day = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor(time / (1000 * 60 * 60) % 24),
            minutes = Math.floor((time / 1000 / 60) % 60),
            seconds = Math.floor((time / 1000) % 60);

        return {
            'total': time,
            'day': day,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTimer(selector, endTime) {
        const timer = document.querySelector(selector),
            day = timer.querySelector('#days'),
            minutes = timer.querySelector('#minutes'),
            hours = timer.querySelector('#hours'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const time = getTimeRemaining(endTime);
            day.innerHTML = getZero(time.day);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);

            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    //!ModalWindow

    function openCloseModalWindow() {
        modal.classList.toggle('show');
        if (modal.matches('.show')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        if (modal.contains(thankModal)) {
            thankModal.remove();
            prevModalDialog.classList.remove('hide');
            clearTimeout(timerToCloseThanks);
        }
    }

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            openCloseModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.matches('.show')) {
            openCloseModalWindow();
        }
    });

    document.addEventListener('click', e => {
        if (e.target && e.target.matches('[data-modal]')) {
            openCloseModalWindow();
        }
    });

    //!MenuItem

    class MenuItem {
        constructor(src, alt, title, descr, cost, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.cost = cost;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 80;
            this.changeToUAH();
        }

        changeToUAH() {
            this.cost = this.cost * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div   div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.cost}</span> грн/день</div>
                    </div>
                </div>`;

            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    //!ServerForms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });

        });

    }

    function showThanksModal(mess) {
        prevModalDialog.classList.add('hide');
        thankModal.classList.add('modal__dialog');
        thankModal.innerHTML = `
            <div class = "modal__content">
                <div class = "modal__close" data-modal>×</div>
                <div class = "modal__title">${mess}</div>
            </div>
        `;

        document.querySelector('.modal').append(thankModal);
        timerToCloseThanks = setTimeout(() => {
            thankModal.remove();
            prevModalDialog.classList.remove('hide');
            if (modal.classList.contains('show')) {
                openCloseModalWindow();
            }
        }, 4000);
    }

    //!Slider

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
            slideOffset = +width.slice(0, width.length - 2) * (+e.target.dataset.goto - 1);
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

    next.addEventListener('click', (e) => {
        if (slideOffset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            slideOffset = 0;
        } else {
            slideOffset += +width.slice(0, width.length - 2);
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
            slideOffset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            slideOffset -= +width.slice(0, width.length - 2);
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


    hideTabContent();
    showTabContent();
    forms.forEach(item => bindPostData(item));
    slideNumb();
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
    setTimer('.timer', deadline);
});