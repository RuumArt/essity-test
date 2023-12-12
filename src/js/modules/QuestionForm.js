import {
    createFormGroup,
    createSubmitButton,
    createFormTooltip,
    createFormGroupEl,
    createCheckbox,
} from "../helpers/formUtils.js";

import {BRANDS, CONTACT_INPUTS, CONTACT_INPUTS_WITH_COMMENT, DEFAULT_LOGO, RULES} from "../helpers/constants.js";
import Form from "./Form.js";

class QuestionForm extends Form {
    constructor(...args) {
        super(...args);

        this.state = {};

        this.typeSelect = this.form.querySelector('select[name="type_of"]');

        this.DOM = {
            brand: null,
            submit: null,
            contact: null,
        };

        this.addEventListeners();
    }

    removeContactInfoFields = () => {
        if (this.DOM.contact) {
            Object.keys(this.DOM.contact).forEach(key => {
                const elTarget = this.DOM.contact[key].querySelector(`[name=${key}]`);
                if (CONTACT_INPUTS[key]?.rules) this.validator.removeField(`[name=${key}]`);
                elTarget.removeEventListener('input', this.setInputValue);
                this.DOM.contact[key].remove();
            });

            this.DOM.contact = null;
        }
    }

    clearAllFormElements = () => {
        this.state = {};
        this.clearLogotype();

        if (this.DOM.brand) {
            this.DOM.brand.querySelector('select').removeEventListener('change', this.onChangeBrand);
            this.DOM.brand.remove();

            if (window.outsides.brand) {
                window.outsides.brand();
            }
        }

        this.removeContactInfoFields();
        this.removeSubmitBlock();
    }

    createBrandSelect = () => {
        if (this.DOM.brand) {
            this.DOM.brand.querySelector('select').removeEventListener('change', this.onChangeBrand);
        }

        this.DOM.brand = createFormGroup('Бренд', 'brand', '', 'Выберите бренд, если ваш запрос связан с конкретным брендом', false, BRANDS, 'select');
        this.formInner.appendChild(this.DOM.brand);
        this.DOM.brand.querySelector('select').addEventListener('change', this.onChangeBrand);
    }

    createContactBlock = () => {
        this.DOM.contact = {};

        CONTACT_INPUTS_WITH_COMMENT.forEach(INPUT => {
            this.DOM.contact[INPUT.name] = createFormGroup(INPUT.title, INPUT.name, '', INPUT.placeholder, INPUT.isRequired, {}, INPUT.type, INPUT.mask);
            this.formInner.appendChild(this.DOM.contact[INPUT.name]);
            this.DOM.contact[INPUT.name].querySelector(INPUT.type).addEventListener('input', this.setInputValue);

            if (INPUT?.rules) {
                this.validator.addField(`[name=${INPUT.name}]`, INPUT.rules);
            }
        });
    }

    onChangeType = (e) => {
        this.clearAllFormElements();

        const { target } = e;

        this.setValue(target.name, target.value);

        switch (target.value) {
            case 'type-1':
                this.createContactBlock();
                this.createSubmitBlock();
                break;
            default:
                this.createBrandSelect();
        }

    }

    onChangeBrand = (e) => {
        const { target, detail } = e;
        this.setValue(target.name, target.value);

        if (detail.image) this.changeLogotype(detail.image);

        if (!this.DOM.contact) {
            this.createContactBlock();
            this.createSubmitBlock();
        }
    }

    addEventListeners() {
        if (this.typeSelect) {
            this.typeSelect.addEventListener('change', this.onChangeType);
        }
    }
}

export default QuestionForm;