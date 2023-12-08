
import {
    createFormGroup,
} from "../helpers/formUtils.js";

import {
    BRANDS,
    BRANDS_WITHOUT_TYPE, CONTACT_INPUTS, COUNTS,
    PRODUCTS,
    PRODUCTS_TYPES,
    ROLLS_ARR, RULES, SIZES,
    TYPE_REVIEW,
    TYPE_TO
} from "../helpers/constants.js";
import Form from "./Form.js";

import IMask from "imask";

const INPUT_CHANGE_CONTACT = ['type_of', 'brand', 'type_review', 'type_product'];

class AnswerForm extends Form {
    constructor(...args) {
        super(...args);

        this.typeSelect = this.form.querySelector('select[name="type_of"]');

        this.DOM = {};

        this.targetPath = [];

        this.initForm();
    }

    clearDomFromPath = (name) => {
        const currentIndex = this.targetPath.findIndex(item => item === name);
        const removePath = [...this.targetPath].splice(currentIndex + 1, this.targetPath.length);
        this.removeDom(removePath);
        this.targetPath = [...this.targetPath].splice(0, currentIndex + 1);

        if (INPUT_CHANGE_CONTACT.includes(name)) {
            this.removeContactsInfo();
            this.removeSubmitBlock();
            this.removeMapInput();
        }
    }

    onChangeLogicInput = (e) => {
        const { name, value } = e.target;

        this.setValue(name, value);
        this.clearDomFromPath(name);

        switch (name) {
            case 'brand':
                this.changeBrand(e);
                break;
            case 'type_review':
                this.changeTypeReview(e);
                break;
            case 'type_of':
                this.onChangeType(e);
                break;
            case 'type_product':
                this.onChangeTypeProduct(e);
                break;
            case 'product':
                this.onChangeProduct(e);
                break;
        }
    }

    onChangeType = (e) => {
        const { target } = e;

        const currentType = TYPE_TO.find(item => item.value === target.value);

        if (this.formHeader) this.formHeader.textContent = currentType.title;

        this.form.classList.remove('is-brand');

        switch (target.value) {
            case 'review':
                this.createDom('Тип отзыва', 'type_review', '', 'Выберите тип', false, TYPE_REVIEW, 'select');
                break;
            case 'offer':
                this.createBrandSelect();
                break;
        }
    }

    sampleChange = (e) => {
        const { value, name } = e.target;

        this.setValue(name, value);

        if (value === 'yes') {
            this.createMapInput(e.target.closest('.form__group'));
        } else {
            this.removeMapInput();
        }
    }

    changeTypeReview = () => {
        this.createBrandSelect();
    }

    changeBrand = (e) => {
        const { target, detail } = e;

        const key = target.value.toLowerCase();

        if (detail.image) this.changeLogotype(detail.image);

        if(!BRANDS_WITHOUT_TYPE.includes(key)) {
            this.createDom('Тип продукта', 'type_product', '', 'Выберите тип продукта', false, PRODUCTS_TYPES[key], 'select');
        } else {
            this.createProductSelect(this.state.brand, this.state.type_product);
            this.createContactInfo(this.state.type_of, this.state.type_review);
            this.createSubmitBlock();
        }
    }

    onChangeTypeProduct = () => {
        if(this.state.type_product !== 'other') {
            this.createProductSelect(this.state.brand, this.state.type_product);
        }

        this.createContactInfo(this.state.type_of, this.state.type_review);
        this.createSubmitBlock();
    }

    getProductMask = (brand, product, type) => {
        if (brand === 'libresse') {
            return {
                placeholder: 'дд.мм.гггг XXX 00:00',
                value: '00.00.0000 *** 00:00',
            }
        } else if (brand === 'zewa') {
            if (product === 'napkins') {
                if (['p4', 'p5', 'p6'].includes(product)) {
                    return {
                        placeholder: 'дд/мм/гг XXX 00:00',
                        value: '00/00/00 *** 00:00',
                    }
                } else {
                    return {
                        placeholder: 'дд/мм/гг XXX 00:00',
                        value: '00/00/00 *** 00:00',
                    }
                }
            } else if (type === 'toilet_paper') {
                if (['p9', 'p10', 'p11'].includes(product)) {
                    return {
                        placeholder: 'дд.мм.гггг. XX 00:00',
                        value: '00.00.0000. ** 00:00',
                    }
                } else {
                    return {
                        placeholder: 'XXX.XX.X дд.мм.гг 00:00',
                        value: '***.**.* 00.00.00 00:00',
                    }
                }
            }
        }

        return {
            placeholder: '24.02.2022 VEN 01:22',
            value: '00.00.000 *** 00:00',
        };
    }

    onChangeProduct = (e) => {
        const { value } = e.target;
        const product = PRODUCTS.find(p => p.value === value);

        if (this.DOM.contact?.code) {
            const input = this.DOM.contact.code.querySelector('input');
            const mask = this.getProductMask(this.state.brand, product.id, this.state.type_product);

            if (this.contactMask) {
                this.contactMask.destroy();
                input.value = '';
            }

            if (mask.placeholder) input.placeholder = mask.placeholder;

            if (mask?.value) {
                this.contactMask = IMask(input, {
                    mask: mask.value,
                });
            }
        }

        if (product.isRoll) {
            this.createDom('Количество рулонов в упаковке', 'rolls', `rolls_${product?.rolls || 4}`, null, false, ROLLS_ARR, 'select', null, this.DOM.product);
        }

        if(this.state.type_of === 'review') {
            if (product.isSize) {
                const currentSizes = SIZES.filter(item => item.product === value)
                this.createDom('Размер', 'size', '', null, false, currentSizes, 'select', null, this.DOM.product);
            }

            if (product.isCount) {
                const currentCounts = COUNTS.filter(item => item.product === value)
                this.createDom('Количество в упаковке', 'count', '', null, false, currentCounts, 'select', null, this.DOM.product);
            }
        }
    }

    createDom = (title, name, value, placeholder, isRequired, options, type = 'input', mask = null, element = null) => {
        if (this.DOM[name]) {
            this.DOM[name].removeEventListener('change', this.onChangeLogicInput);
        }

        this.DOM[name] = createFormGroup(title, name, value, placeholder, isRequired, options, type, mask);

        if (element) {
            element.after(this.DOM[name]);
        } else {
            this.formInner.appendChild(this.DOM[name]);
        }

        this.DOM[name].querySelector(type).addEventListener('change', this.onChangeLogicInput);

        this.targetPath.push(name);
    }

    removeDom = (arrNames) => {
        arrNames.forEach(name => {
            const validatorField = this.validator.fieldIds.get(`[name=${name}]`);
            if (validatorField) this.validator?.removeField(`[name=${name}]`);
            if (this.DOM[name]) this.DOM[name].remove();
            if (window.outsides[name]) window.outsides[name]();
            if (window.tooltipOutsides[name]) window.tooltipOutsides[name]();
        });
    }

    createBrandSelect = () => {
        this.createDom('Бренд', 'brand', '', 'Выберите бренд, если ваш запрос связан с конкретным брендом', false, BRANDS, 'select');
    }

    createProductSelect = (brand, type) => {
        const currentProducts = brand === 'libresse' ? PRODUCTS.filter(item => item.brand === 'libresse') : PRODUCTS.filter(item => item.brand === brand && item.type === type);
        this.createDom('Продукт', 'product', '', 'Выберите продукт', true, currentProducts, 'select');
        this.validator.addField(`[name=product]`, [RULES.REQ]);
    }

    createContactInfo = (type, typeReview) => {
        this.DOM.contact = {};

        const INPUTS = [];

        switch (type) {
            case 'offer':
                INPUTS.push({
                    name: 'comment',
                    placeholder: '',
                    title: 'Опишите предложение',
                    isRequired: true,
                    type: 'textarea',
                    rules: [
                        RULES.REQ,
                    ]
                });

                break;
            case 'review':
                INPUTS.push({
                    name: 'comment',
                    placeholder: '',
                    title: 'Оставьте комментарий',
                    isRequired: true,
                    type: 'textarea',
                    rules: [
                        RULES.REQ,
                    ]
                });

                switch (typeReview) {
                    case 'product':
                            INPUTS.push({
                                name: 'code',
                                placeholder: '24.02.2022 VEN 01:22',
                                title: 'Заполните информацию о коде производства',
                                isRequired: false,
                                type: 'input',
                                tooltip: {
                                    title: 'Что такое код производства?',
                                    text: 'Код производства – это специальный код, который поможет нам отследить, на какой фабрике был сделан продукт и в какое время. Код выглядит примерно так: 24.02.2022 VEN 01:22',
                                }
                            });

                            INPUTS.push({
                                name: 'sample',
                                placeholder: '',
                                title: 'Готовы ли вы предоставить образец для анализа?',
                                isRequired: false,
                                type: 'radios',
                                options: [
                                    {
                                        id: 'yes',
                                        title: 'Да',
                                        value: 'yes',
                                    },
                                    {
                                        id: 'no',
                                        title: 'Нет',
                                        value: 'no',
                                        checked: true,
                                    }
                                ],
                                tooltip: {
                                    title: 'Образец для анализа',
                                    text: 'Мы сами заберем у вас образец и отправим для анализа на фабрику',
                                }
                            });

                            INPUTS.push({
                                name: 'file',
                                placeholder: '',
                                title: 'Прикрепите фото/видео',
                                isRequired: false,
                                type: 'file',
                                event: 'change',
                                cb: this.setFileInput,
                                rules: [RULES.FILE],
                                tooltip: {
                                    title: 'Фото/видео',
                                    text: 'Мы сможем разобраться в проблеме быстрее, если получим фото, где хорошо виден брак и сам продукт',
                                }
                            });
                        break;
                }
                break;
        }

        const CURRENT_CONTACT_INPUT = CONTACT_INPUTS.map(item => {
            return {
                ...item,
                isRequired: type !== 'offer',
            }
        });

        let INPUTS_RENDER = [...INPUTS];

        if (type === 'offer' || typeReview === 'product') {
            INPUTS_RENDER = [...INPUTS, ...CURRENT_CONTACT_INPUT];
        }

        INPUTS_RENDER.forEach(INPUT => {
            this.DOM.contact[INPUT.name] = createFormGroup(INPUT.title, INPUT.name, '', INPUT.placeholder, INPUT.isRequired, INPUT?.options, INPUT.type, INPUT.mask, INPUT?.tooltip);

            if(INPUT.name === 'sample') {
                const currentTargets = this.DOM.contact[INPUT.name].querySelectorAll(`[name="${INPUT.name}"]`);
                currentTargets.forEach(ct => {
                    ct.addEventListener('change', this.sampleChange);
                })
            } else {
                const currentTarget = this.DOM.contact[INPUT.name].querySelector(`[name="${INPUT.name}"]`);
                currentTarget.addEventListener(INPUT?.event || 'input', INPUT?.cb || this.setInputValue);
            }

            this.formInner.appendChild(this.DOM.contact[INPUT.name]);

            if (INPUT?.rules) {
                let newRules = INPUT.rules;

                if(!INPUT.isRequired) {
                    newRules = INPUT.rules.filter(item => item.rule !== 'required')
                }

                if (newRules.length > 0) this.validator.addField(`[name=${INPUT.name}]`, newRules);
            }
        });
    }

    removeContactsInfo = () => {
        if (this.DOM.contact) {
            Object.keys(this.DOM.contact).forEach(key => {
                const target = this.DOM.contact[key].querySelector(`[name=${key}]`);
                target.removeEventListener('input', this.setInputValue);
                this.DOM.contact[key].remove();
            });

            this.DOM.contact = null;
        }
    }

    createMapInput = (node) => {
        this.DOM.map = createFormGroup('Введите адрес, откуда забрать образец', 'address', '', '', false, {}, 'address', null, null);
        const target = this.DOM.map.querySelector(`input`);
        target.addEventListener('input', this.setInputValue);
        target.addEventListener('change', this.setInputValue);
        target.addEventListener('blur', this.setInputValue);

        node.after(this.DOM.map);
    }

    removeMapInput = () => {
        if (this.DOM.map) {
            const target = this.DOM.map.querySelector(`input`);
            target.removeEventListener('input', this.setInputValue);
            target.removeEventListener('change', this.setInputValue);
            target.removeEventListener('blur', this.setInputValue);
            this.DOM.map.remove();
            this.DOM.map = null;
            delete this.state.address;
        }
    }

    initForm() {
        this.createDom('Что вы хотите оставить?', 'type_of', '', 'Выберите тип', false, TYPE_TO, 'select');
    }

}

export default AnswerForm;
