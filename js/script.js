window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsParent = document.querySelector(".tabheader__items"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        thankModal = document.createElement('div'),
        modal = document.querySelector('.modal'),
        prevModalDialog = document.querySelector('.modal__dialog');

    let timerToCloseThanks;



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
            console.log(23);
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

    //!ServerForms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            //? Для FormData не нужен заголовок, он создается автоматически
            request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            const json = JSON.stringify(obj);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
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

    hideTabContent();
    showTabContent();
    forms.forEach(item => postData(item));
    new MenuItem(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
        овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
        ценой и высоким качеством!`,
        9,
        '.menu .container'
    ).render();

    new MenuItem(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но
        и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода
        в ресторан!`,
        21,
        '.menu .container'
    ).render();

    new MenuItem(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие
        продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное
        количество белков за счет тофу и импортных вегетарианских стейков.`,
        14,
        '.menu .container'
    ).render();
    setTimer('.timer', deadline);
});