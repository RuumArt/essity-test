import {
    createCheckbox,
    createFormGroupEl, createFormTooltip, createSubmitButton,
} from "../helpers/formUtils.js";

import JustValidate from "just-validate";

import {
    BRANDS,
    COUNTS,
    PRODUCTS,
    PRODUCTS_TYPES,
    RULES,
    SIZES,
    TYPE_REVIEW,
    TYPE_TO,
    TYPE_TO_2
} from "../helpers/constants.js";
import { apiRequest } from "../helpers/api.js";

class Form {
    constructor(form) {
        this.state = {};

        this.validator = {};

        this.form = form;
        this.type = this.form.dataset?.formType || '';
        this.formInner = form.querySelector('[data-body]');
        this.formImage = form.querySelector('[data-image]');
        this.formHeader = document.querySelector('[data-form-header]');

        this.submitDOM = null;

        this.successPopup = window.modals.success;

        this.init();
    }

    changeLogotype = (src) => {
        this.form.classList.add('is-brand');
        const img = document.createElement('img');
        img.setAttribute('src', src);

        this.formImage.innerHTML = '';
        this.formImage.appendChild(img);
    }

    setValue = (name, value) => {
        this.state = {
            ...this.state,
            [name]: value,
        };
    }

    setFileInput = (e) => {
        const { name, files } = e.target;

        this.state = {
            ...this.state,
            [name]: files,
        };
    }

    setInputValue = (e) => {
        const { name, value } = e.target;

        console.log('fire')

        this.state = {
            ...this.state,
            [name]: value,
        };
    }

    createSubmitBlock = () => {
        const requireDiv = createFormGroupEl();
        requireDiv.appendChild(createFormTooltip('поле обязательное для заполнения'));

        const btnDiv = createFormGroupEl();
        const btn = createSubmitButton('Отправить');
        btnDiv.appendChild(btn);

        const checkGroup = createFormGroupEl();
        const checkInput = createCheckbox('accept', 'Я согласен с обработкой персональных данных', true);
        checkGroup.appendChild(checkInput);

        checkGroup.querySelector('input').addEventListener('change', this.setInputValue);

        this.submitDOM = {
            requireDiv,
            btnDiv,
            checkGroup
        };

        Object.keys(this.submitDOM).forEach(key => {
            this.formInner.appendChild(this.submitDOM[key]);
        });

        this.validator.addField(`[name=accept]`, [ RULES.REQ ]);
    }

    removeSubmitBlock = () => {
        if (this.submitDOM) {
            this.validator.removeField('[name=accept]');
            this.submitDOM.checkGroup.querySelector('input').removeEventListener('change', this.setInputValue);

            Object.keys(this.submitDOM).forEach(key => {
                this.submitDOM[key].remove();
            });

            this.submitDOM = null;
        }
    }

    getNormalValue = (key) => {
        switch (key) {
            case 'brand':
                    return BRANDS.find(item => item.value === this.state[key])?.title;
                break;
            case 'type_product':
                    return PRODUCTS_TYPES[this.state.brand].find(item => item.value === this.state[key])?.title;
                break;
            case 'product':
                    return PRODUCTS.find(item => item.value === this.state[key])?.title;
                break;
            case 'size':
                    return SIZES.find(item => item.value === this.state[key])?.title;
                break;
            case 'count':
                    return COUNTS.find(item => item.value === this.state[key])?.title;
                break;
            case 'type_review':
                    return TYPE_REVIEW.find(item => item.value === this.state[key])?.title;
                break;
            case 'type_of':
                    return [...TYPE_TO, ...TYPE_TO_2].find(item => item.value === this.state[key])?.title;
                break;
            default:
                    return this.state[key];
                break;
        }
    }

    sendForm = async (fd) => {
        try {
            await apiRequest('/local/templates/essity/ajax/form.php', {
                method: 'POST',
                body: fd,
            });

            if (this.successPopup) this.successPopup.open();
        } catch (e) {
            console.log(e);
        }
    }

    initValidator() {
        this.validator = new JustValidate(this.form, {
            errorFieldCssClass: '_error',
            errorLabelCssClass: 'form__error',
            errorLabelStyle: null,
            validateBeforeSubmitting: true,
        }).onSuccess((e) => {
            e.preventDefault();
            const fd = new FormData();

            fd.append('type', this.type);

            Object.keys(this.state).forEach(key => {
                if (key === 'file') {
                    for (let file of this.state[key]) {
                        fd.append("file[]", file);
                    }
                } else {
                    fd.append(key, this.getNormalValue(key));
                }
            });

            this.sendForm(fd);
        }).onValidate(({ isValid }) => {
            if (this.submitDOM.btnDiv) this.submitDOM.btnDiv.querySelector('button').disabled = !isValid;
        });
    }

    init() {
        this.initValidator();
    }
}

export default Form;