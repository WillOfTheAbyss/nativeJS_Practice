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
export default culc;