/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/culc.js":
/*!****************************!*\
  !*** ./js/modules/culc.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function culc(culcFieldSelector, culcFieldChildSelector, resultSelector, itemActiveClass) {
    const culcField = document.querySelector(culcFieldSelector),
        culcFieldChild = culcField.querySelectorAll(`${culcFieldChildSelector}:not(input)`),
        result = document.querySelector(resultSelector),
        culcEvent = new Event("click", {
            bubbles: true,
        });

    let sex = localStorage.getItem("sex") ? localStorage.getItem("sex") : "female",
        height,
        weight,
        age,
        ratio = localStorage.getItem("ratio") ? localStorage.getItem("ratio") : 1.375;

    function culc() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "---";
            return;
        }

        if (sex === "female") {
            result.textContent = Math.round(
                (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
            );
        } else {
            result.textContent = Math.round(
                (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
            );
        }
    }

    culcField.addEventListener("click", (e) => {
        if (!e.isTrusted) {
            culcFieldChild.forEach((item) => {
                if (item.dataset.sex === sex || item.dataset.ratio == ratio) {
                    item.classList.add(itemActiveClass);
                } else {
                    item.classList.remove(itemActiveClass);
                }
            });
            culc();
        } else {
            let target = e.target;
            if (target.dataset.ratio || target.dataset.sex) {
                if (target.dataset.ratio) {
                    ratio = target.dataset.ratio;
                    localStorage.setItem("ratio", ratio);
                } else {
                    sex = target.dataset.sex;
                    localStorage.setItem("sex", sex);
                }
                Array.from(target.parentElement.children).forEach((item) => {
                    item.classList.remove(itemActiveClass);
                });
                target.classList.add(itemActiveClass);
                culc();
            }
        }
    });

    culcField.addEventListener("input", (e) => {
        let target = e.target;
        if (target.value.match(/\D/g)) {
            target.style.border = "2px solid red";
        } else {
            target.style.border = "";
        }
        if (target.matches(culcFieldChildSelector)) {
            switch (target.getAttribute("id")) {
                case "height":
                    height = +target.value;
                    break;
                case "weight":
                    weight = +target.value;
                    break;
                case "age":
                    age = +target.value;
                    break;
            }
            culc();
        }
    });

    culcField.dispatchEvent(culcEvent);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (culc);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");
;


function form(wrapper, modalWindow) {
    const forms = document.querySelectorAll("form");
    let timerToCloseThanks;

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так...",
    };

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `display: block;margin: 0 auto;`;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_service__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
                .then((data) => {
                    console.log(data);
                    statusMessage.remove();
                    showThanksModal(message.success);
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
        const thankModal = document.createElement("div"),
            modalWrapper = document.querySelector(wrapper),
            modal = document.querySelector(modalWindow);

        modal.classList.add("hide");
        thankModal.classList.add("modal__dialog");
        thankModal.innerHTML = `
        <div class = "modal__content">
            <div class = "modal__close" data-modal>×</div>
            <div class = "modal__title" style ="margin: 25px auto">${mess}</div>
            <button class="btn btn btn_dark btn_min" data-modal>Вернуться назад</button>
        </div>`;

        modalWrapper.append(thankModal);

        timerToCloseThanks = setTimeout(() => {
            thankModal.remove();
            modal.classList.remove("hide");
            if (modalWrapper.classList.contains("show")) {
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openCloseModalWindow)(modalWrapper);
            }
        }, 2000);
    }

    forms.forEach((item) => bindPostData(item));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/service */ "./js/services/service.js");
;

function menu() {
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

    (0,_services_service__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export openCloseModalWindow [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "openCloseModalWindow": () => /* binding */ openCloseModalWindow
/* harmony export */ });
function openCloseModalWindow(modalWrapper) {
    modalWrapper.classList.toggle('show');
    if (modalWrapper.matches('.show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function modal(wrapper, triggerSelector) {
    const modalWrapper = document.querySelector(wrapper);

    modalWrapper.addEventListener('click', (e) => {
        if (e.target == modalWrapper) {
            openCloseModalWindow(modalWrapper);
        }
    });

    modalWrapper.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modalWrapper.matches('.show')) {
            openCloseModalWindow(modalWrapper);
        }
    });

    document.addEventListener('click', e => {
        if (e.target && e.target.matches(triggerSelector)) {
            openCloseModalWindow(modalWrapper);
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector, tabsParentSelector, tabsContentSelector, tabActiveClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabsParent = document.querySelector(tabsParentSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector);

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove(tabActiveClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(tabActiveClass);
    }

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.replace(/./, ''))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(time) {
    const deadline = time;

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
    setTimer('.timer', deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_culc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/culc */ "./js/modules/culc.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
;







window.addEventListener("DOMContentLoaded", () => {
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_0__.default)({
        container: ".offer__slider",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        totalCount: "#total",
        currentCount: "#current",
        slide: ".offer__slide",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner",
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__.default)(
        ".tabheader__item",
        ".tabheader__items",
        ".tabcontent",
        "tabheader__item_active"
    );
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_2__.default)(".modal", ".modal__dialog");
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__.default)("2020-12-31");
    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_culc__WEBPACK_IMPORTED_MODULE_5__.default)(
        ".calculating__field",
        ".calculating__choose-item",
        ".calculating__result span",
        "calculating__choose-item_active"
    );
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_6__.default)(".modal", "[data-modal]");
});

/***/ }),

/***/ "./js/services/service.js":
/*!********************************!*\
  !*** ./js/services/service.js ***!
  \********************************/
/*! namespace exports */
/*! export getResource [provided] [no usage info] [missing usage info prevents renaming] */
/*! export postData [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResource": () => /* binding */ getResource
/* harmony export */ });
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

const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map