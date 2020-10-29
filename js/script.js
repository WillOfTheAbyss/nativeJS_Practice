window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsParent = document.querySelector(".tabheader__items"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        modalBtn = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('.modal__close');


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

    hideTabContent();
    showTabContent();
    setTimer('.timer', deadline);
});