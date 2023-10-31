import {
    createCheckbox,
    createFormGroupEl, createFormTooltip, createSubmitButton,
    sendForm
} from "../helpers/formUtils.js";

import JustValidate from "just-validate";
import {BRANDS, COUNTS, PRODUCTS, PRODUCTS_TYPES, RULES, SIZES, TYPE_REVIEW, TYPE_TO} from "../helpers/constants.js";

class Modal {
    constructor(el) {
        this.state = {};

        this.el = el;
        this.id = el.getAttribute('id');
        this.closeBtn = el.querySelector('.modal__close');
        this.bg = el.querySelector('.modal__bg');

        this.links = document.querySelectorAll(`.js-open-modal#${this.id}`);

        this.isOpen = false;

        this.init();
    }

    open = (e) => {
        if (e) e.preventDefault();

        this.el.classList.add('_open');
        this.isOpen = true;
    }

   close = (e) => {
        if (e) e.preventDefault();

        this.el.classList.remove('_open');
        this.isOpen = false;
    }

    addEventListeners = () => {
        this.links.forEach(link => {
            link.addEventListener('click', this.open);
        });

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', this.close);
        }

        if (this.bg) {
            this.bg.addEventListener('click', this.close);
        }
    }

    init() {
        this.addEventListeners();
    }
}

export default Modal;