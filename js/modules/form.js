import {
    openCloseModalWindow
} from "./modal";
import {
    postData
} from "../services/service";

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

            postData("http://localhost:3000/requests", json)
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
        if (!modalWrapper.classList.contains("show")) {
            openCloseModalWindow(modalWrapper);
        }
        timerToCloseThanks = setTimeout(() => {
            thankModal.remove();
            modal.classList.remove("hide");
            if (modalWrapper.classList.contains("show")) {
                openCloseModalWindow(modalWrapper);
            }
        }, 2000);
    }

    forms.forEach((item) => bindPostData(item));
}
export default form;