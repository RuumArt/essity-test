
import {
    createFormGroup, getNumWord,
} from "../helpers/formUtils.js";

import {
    BRANDS,
    BRANDS_WITHOUT_TYPE, CONTACT_INPUTS, COUNTS,
    PRODUCTS,
    PRODUCTS_TYPES, RULES, SIZES,
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

        this.lastBrandImage = null;

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

        if(['type_review', 'type_of'].includes(name)) {
            this.clearLogotype();
        }

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
            case 'size':
                this.onChangeSizes(e);
                break;
            case 'count':
                this.onChangeSizes(e);
                break;
        }
    }

    onChangeSizes = (e) => {
        const { target } = e;
        this.setDetailImage(target.value);
    }

    onChangeType = (e) => {
        const { target } = e;

        const currentType = TYPE_TO.find(item => item.value === target.value);

        if (this.formHeader) this.formHeader.textContent = currentType.title;

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

        this.lastBrandImage = detail.image;

        if (this.state.type_of === 'review' && this.state.type_review === 'brand') {
            this.createContactInfo(this.state.type_of, this.state.type_review);
            this.createSubmitBlock();
        } else {
            if(!BRANDS_WITHOUT_TYPE.includes(key)) {
                this.createDom('Тип продукта', 'type_product', '', 'Выберите тип продукта', false, PRODUCTS_TYPES[key], 'select');
            } else {
                this.createProductSelect(this.state.brand, this.state.type_product);
                this.createContactInfo(this.state.type_of, this.state.type_review);
                this.createSubmitBlock();
                this.setCodeInputMask(null);
            }
        }
    }

    onChangeTypeProduct = () => {
        if (this.state.type_product !== 'other') {
            this.createProductSelect(this.state.brand, this.state.type_product);
        }

        this.createContactInfo(this.state.type_of, this.state.type_review);
        this.createSubmitBlock();
        this.setCodeInputMask(null);
    }

    getProductMask = (brand, productId, type) => {
        if (brand === 'libresse') {
            return {
                placeholder: 'дд.мм.гггг XXX 00:00',
                value: 'дд.мм.гггг XXX HH:MM',
            }
        } else if (brand === 'zewa') {
            if (type === 'napkins') {
                if (['p4', 'p5', 'p6', 'p6-n'].includes(productId)) {
                    return {
                        placeholder: 'H12 дд/мм/гг чч:мм',
                        value: 'H12 дд/мм/гг HH:MM',
                    }
                } else {
                    return {
                        placeholder: 'дд/мм/гг XXX 00:00',
                        value: 'дд/мм/гг XXX HH:MM',
                    }
                }
            } else if (type === 'toilet_paper') {
                if (['p9', 'p10', 'p11', 'p4-n'].includes(productId)) {
                    return {
                        placeholder: 'дд.мм.гггг. 00:00',
                        value: 'дд.мм.гггг. HH:MM',
                    }
                } else {
                    return {
                        placeholder: 'XXX.XX.X дд.мм.гг 00:00',
                        value: 'XXX.XX.X дд.мм.гг HH:MM',
                    }
                }
            } else if (type === 'paper_towels') {
                if (['p3'].includes(productId)) {
                    return {
                        placeholder: 'SOV.L.X.X. дд/мм/гг. чч:мм',
                        value: 'SOV.L.X.X. дд.мм.гг HH:MM',
                    }
                } else {
                    return {
                        placeholder: 'XXX.LXX дд.мм.гг чч:мм',
                        value: 'XXX.LXX дд.мм.гг HH:MM',
                        lazy: false
                    }
                }
            }
        }

        return {
            placeholder: 'LOT 2100021541 211217 09:04',
            value: 'LOT 0000000000 000000 HH:MM',
        };
    }

    setCodeInputMask = (product) => {
        if (this.DOM.contact?.code) {
            const input = this.DOM.contact.code.querySelector('input');
            const mask = this.getProductMask(this.state.brand, product?.id, this.state.type_product);

            if (this.contactMask) {
                this.contactMask.destroy();
                input.value = '';
            }

            if (mask.placeholder) input.placeholder = mask.placeholder;

            if (mask?.value) {
                this.contactMask = IMask(input, {
                    mask: mask.value,
                    lazy: true,
                    blocks: {
                        X: {
                          mask: /^[a-zA-Zа-яА-Я0-9]$/,
                          placeholderChar: 'X',
                          maxLength: 1,
                        },
                        'дд': {
                            mask: IMask.MaskedRange,
                            from: 1,
                            to: 31,
                            placeholderChar: 'д',
                            maxLength: 2
                        },
                        'мм': {
                            from: 1,
                            to: 12,
                            mask: IMask.MaskedRange,
                            placeholderChar: 'м',
                        },
                        'гг': {
                            from: 10,
                            to: 24,
                            mask: IMask.MaskedRange,
                            placeholderChar: 'г',
                            maxLength: 2
                        },
                        'гггг': {
                            mask: IMask.MaskedRange,
                            placeholderChar: 'г',
                            from: 1990,
                            to: 2024,
                            maxLength: 4
                        },
                        HH: {
                            mask: IMask.MaskedRange,
                            placeholderChar: '0',
                            from: 0,
                            to: 23,
                            maxLength: 2
                        },
                        MM: {
                            mask: IMask.MaskedRange,
                            placeholderChar: '0',
                            from: 0,
                            to: 59,
                            maxLength: 2
                        }
                    }
                });

                input.addEventListener('focus', () => {
                    this.contactMask.updateOptions({ lazy: false });
                }, true);

                input.addEventListener('blur', () => {
                    this.contactMask.updateOptions({ lazy: true });
                }, true);
            }
        }
    }

    setDetailImage = (name) => {
        const folder = BRANDS.find(item => item.value === this.state.brand )?.folder;
        this.changeLogotype(name ? `/images/form/products/${folder}/detail/${name}.png` : this.lastBrandImage);
    }

    onChangeProduct = (e) => {
        const { value } = e.target;
        const product = PRODUCTS.find(p => p.value === value);

        this.setCodeInputMask(product);

        this.state.rolls = '';

        if (product?.isRoll) {
            const rollsArr = product?.rolls.map(item => {
                return {
                    id: `rolls_${item}`,
                    title:  getNumWord(item || 4, ['рулон', 'рулона', 'рулонов']),
                    value: `${item}`,
                }
            });

            this.state.rolls = rollsArr[0]?.value;
            this.createDom('Количество рулонов в упаковке', 'rolls', '', null, false, rollsArr, 'select', null, this.DOM.product);
        }

        const currentSizes = SIZES.filter(item => item.product === value);
        const currentCounts = COUNTS.filter(item => item.product === value);

        if(this.state.type_of === 'review') {
            if (product?.isSize) {
                this.createDom('Размер и количество в упаковке', 'size', '', null, false, currentSizes, 'select', null, this.DOM.product);
            }

            if (product?.isCount) {
                this.createDom('Размер и количество в упаковке', 'count', '', null, false, currentCounts, 'select', null, this.DOM.product);
            }
        }

        const detailPhotoName = currentSizes[0]?.value || currentCounts[0]?.value || product?.id;
        this.setDetailImage(detailPhotoName);
    }

    createDom = (title, name, value, placeholder, isRequired, options, type = 'input', mask = null, element = null, isReadonly = false) => {
        if (this.DOM[name]) {
            this.DOM[name].removeEventListener('change', this.onChangeLogicInput);
        }

        this.DOM[name] = createFormGroup(title, name, value, placeholder, isRequired, options, type, mask, null, isReadonly);

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
        this.createDom('Продукт', 'product', '', 'Выберите продукт', true, [...currentProducts, {
            id: 'other',
            title: 'Не помню / нет в списке',
            value: 'other',
        }], 'select');

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
                                    text: 'Код производства – это специальный код, который поможет нам отследить, на какой фабрике был сделан продукт и в какое время.',
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
                                    text: 'Мы сами заберем у вас образец и отправим для анализа на фабрику. Мы можем забрать образцы курьером только по России',
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
                                rules: [RULES.FILE, RULES.FILE_EXT,RULES.FILE_SIZE],
                                tooltip: {
                                    title: 'Фото/видео',
                                    text: '<p>Мы сможем разобраться в проблеме быстрее, если получим фото, где хорошо виден брак и сам продукт </p>'  + 
                                    '<p>Для целей соблюдения требований законодательства Российской Федерации просим Вас загружать только цветные фотографии/видеозаписи, содержащие изображение продукции ООО «Эссити». Фотографии/видеозаписи, содержащие персональные данные физического лица (в том числе, изображения) не принимаются.</p>' +
                                    '<p>Максимальный размер файла для загрузки 20Мб</p>',
                                    
                                }
                            });
                        break;
                }
                break;
        }

        const CURRENT_CONTACT_INPUT = CONTACT_INPUTS.map(item => {
            return {
                ...item,
            }
        });

        const INPUTS_RENDER = [...INPUTS, ...CURRENT_CONTACT_INPUT];

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
        this.DOM.map = createFormGroup('Введите адрес, откуда забрать образец', 'address', '', '', false, {}, 'address', null, {
            title: '',
            text: 'Мы можем забрать образцы курьером только по России',
        });
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
