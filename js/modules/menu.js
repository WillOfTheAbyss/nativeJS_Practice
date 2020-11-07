import {
    getResource
} from '../services/service';

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
}
export default menu;