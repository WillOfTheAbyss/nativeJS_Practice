import slider from "./modules/slider";
import tabs from "./modules/tabs";
import form from "./modules/form";
import timer from "./modules/timer";
import menu from "./modules/menu";
import culc from "./modules/culc";
import modal from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
    slider({
        container: ".offer__slider",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        totalCount: "#total",
        currentCount: "#current",
        slide: ".offer__slide",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner",
    });
    tabs(
        ".tabheader__item",
        ".tabheader__items",
        ".tabcontent",
        "tabheader__item_active"
    );
    form(".modal", ".modal__dialog");
    timer("2020-12-31");
    menu();
    culc(
        ".calculating__field",
        ".calculating__choose-item",
        ".calculating__result span",
        "calculating__choose-item_active"
    );
    modal(".modal", "[data-modal]");
});