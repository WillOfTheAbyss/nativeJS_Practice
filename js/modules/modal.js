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
export default modal;
export {
    openCloseModalWindow
};