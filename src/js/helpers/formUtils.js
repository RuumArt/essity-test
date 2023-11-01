import CustomSelect from "../modules/CustomSelect.js";
import IMask from "imask";
import Tooltip from "../modules/Tooltip.js";
import FileInput from "../modules/FileInput.js";
import AddressInput from "../modules/AddressInput.js";

export const getNumWord = (number, txt) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return `${number} ${txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]}`;
}

const createInput = (name, value, mask, placeholder = "", type = "text") => {
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;

    if (mask) {
        input.setAttribute('data-mask-input', mask);

        IMask(input, {
            mask: mask,
        });
    }

    return input;
}

const createTextarea = (name, value, placeholder = "") => {
    const textarea = document.createElement('textarea');
    textarea.classList.add('form-control');
    textarea.name = name;
    textarea.placeholder = placeholder;

    return textarea;
}

const createAddress = (name) => {
    const root = document.createElement('div');
    root.classList.add('address-input');

    const addressTarget = document.createElement('div');
    addressTarget.classList.add('address-input__target');

    const input = createInput(name, '', null, '', 'text');
    addressTarget.appendChild(input);

    const addressMap = document.createElement('div');
    ['address-input__map', 'js-input-map'].forEach(className => addressMap.classList.add(className))

    root.appendChild(addressTarget);
    root.appendChild(addressMap);

    return root;
}



const createRadios = (name, options) => {
    const root = document.createElement('div');
    root.classList.add('inline-radio');

    options.forEach(option => {
        const item = document.createElement('div');
        item.classList.add('inline-radio__item');
        const radio = document.createElement('div');
        radio.classList.add('custom-radio');

        const radioInput = document.createElement('input');
        radioInput.classList.add('custom-radio__input');
        radioInput.type = 'radio';
        radioInput.value = option.value;
        radioInput.name = name;
        radioInput.checked = option?.checked;

        const radioIcon= document.createElement('div');
        radioIcon.classList.add('custom-radio__icon');

        const radioLabel = document.createElement('div');
        radioLabel.classList.add('custom-radio__label')
        radioLabel.textContent = option.title;

        radio.appendChild(radioInput);
        radio.appendChild(radioIcon);
        radio.appendChild(radioLabel);

        item.appendChild(radio);
        root.appendChild(item)
    })

    return root;
}

const createFiles = (name) => {
    const root = document.createElement('div');
    root.classList.add('file-input');
    const list = document.createElement('div');
    list.classList.add('file-input__list');
    const body = document.createElement('div');
    body.classList.add('file-input__body');

    const button = document.createElement('button');
    button.textContent = 'Выберите файлы';
    button.type = 'button';
    ['file-input__btn', 'btn', 'btn--primary', 'btn--full'].forEach(className => button.classList.add(className));

    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.classList.add('file-input__target');
    input.name = `${name}`;

    body.appendChild(button);
    body.appendChild(input);

    root.appendChild(list);
    root.appendChild(body);

    return root;
}

const createSelectOption = (value, title, image) => {
    const option = document.createElement("option");
    option.value = value;
    option.text = title;
    if (image) option.setAttribute('data-image', image);

    return option;
}

const createSelect = (options, name, placeholder = "") => {
    const select = document.createElement('select');
    select.classList.add('custom-select');
    select.name = name;

    if (placeholder) {
        const option = createSelectOption('', placeholder);
        select.add(option);
    }

    for (let i = 0; i < options.length; i += 1) {
        const option = createSelectOption(options[i].value, options[i].title, options[i].image);
        select.add(option);
    }

    return select;
}

export const createSubmitButton = (text) => {
    const btn = document.createElement('button');
    ['btn', 'btn--primary', 'btn--full'].forEach(cl => btn.classList.add(cl));
    btn.textContent = text;
    btn.type = 'submit';
    btn.disabled = true;

    return btn;
}

export const createFormTooltip = (text) => {
    const p = document.createElement('p');
    p.innerHTML = `<span>*</span> ${text}`;
    ['typo', 'typo--small', 'form__tooltip'].forEach(cl => p.classList.add(cl));

    return p;
}

export const createFormGroupEl = () => {
    const div = document.createElement('div');
    div.classList.add('form__group');
    return div;
}

export const createFormGroup = (title, name, value, placeholder, isRequired, options, type = 'input', mask = null, tooltip = null) => {
    const groupEl = document.createElement('div');
    groupEl.classList.add('form__group');

    if (title) {
        const labelEl = document.createElement('div');
        labelEl.classList.add('form__label');

        if (tooltip) {
            const span = document.createElement('span');
            span.textContent = title;
            labelEl.appendChild(span);
        } else {
            labelEl.textContent = title;
        }

        if (isRequired) {
            const sup = document.createElement('sup');
            sup.textContent = '*';

            labelEl.appendChild(sup);
        }

        if (tooltip) {
            const tooltipDiv = document.createElement('span');
            tooltipDiv.classList.add('tooltip');

            const tooltipBtn = document.createElement('button');
            tooltipBtn.type = 'button';
            tooltipBtn.classList.add('tooltip__icon');

            const tooltipContent = document.createElement('span');
            tooltipContent.classList.add('tooltip__content');

            const tooltipTitle = document.createElement('span');
            tooltipTitle.classList.add('tooltip__title');
            tooltipTitle.textContent = tooltip.title;

            const tooltipText = document.createElement('span');
            tooltipText.classList.add('tooltip__text');
            tooltipText.textContent = tooltip.text;

            tooltipContent.appendChild(tooltipTitle);
            tooltipContent.appendChild(tooltipText);

            tooltipDiv.appendChild(tooltipBtn);
            tooltipDiv.appendChild(tooltipContent);

            new Tooltip(name, tooltipDiv);

            labelEl.appendChild(tooltipDiv);
        }

        groupEl.appendChild(labelEl);
    }

    switch (type) {
        case 'input':
                groupEl.appendChild(createInput(name, value, mask, placeholder))
            break;
        case 'textarea':
                groupEl.appendChild(createTextarea(name, value, placeholder))
            break;
        case 'select':
                const select = createSelect(options, name, placeholder);
                groupEl.appendChild(select);
                new CustomSelect(select);
            break;
        case 'radios':
                const radios = createRadios(name, options);
                groupEl.appendChild(radios);
            break;
        case 'address':
                const address = createAddress(name);
                groupEl.appendChild(address);
                new AddressInput(address);
            break;
        case 'file':
                const file = createFiles(name);
                groupEl.appendChild(file);
                new FileInput(file);
            break;
    }

    return groupEl;
}

export const createCheckbox = (name, text, isChecked = false) => {
    const root = document.createElement('div');
    root.classList.add('custom-checkbox');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = name;
    input.checked = isChecked;
    input.classList.add('custom-checkbox__input');

    const icon = document.createElement('div');
    icon.classList.add('custom-checkbox__icon');

    const label = document.createElement('div');
    label.classList.add('custom-checkbox__label');
    label.textContent = text;

    root.appendChild(input);
    root.appendChild(icon);
    root.appendChild(label);

    return root;
}


export const sendForm = async (fd) => {
    const response = await fetch('/local/templates/essity/ajax/form.php', {
        method: 'POST',
        body: fd,
    });

    let data;

    if (response.status === 400) {
        data = await response.json();

        throw {
            status: response.status,
            data: data,
        };
    }

    if (!response.ok) {
        data = await response.json();

        throw {
            status: response.status,
            data: data,
        };
    }

    try {
        data = await response.json();
    } catch (e) {
        data = null;
    }

    // No content
    if (response.status === 204) {
        return { response, parsedBody: null };
    }

    return {
        response,
        data,
    };
}
