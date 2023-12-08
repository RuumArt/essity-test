import outsideClickListener from "../helpers/outsideClickListener.js";
import convertStringToHtml from "../helpers/convertStringToHtml.js";

class CustomSelect {
    constructor(el) {
        this.select = el;

        this.customSelect = null;
        this.options = [];
        this.valueBtn = null;
        this.dropdown = null;

        this.value = null;
        this.placeholder = null;
        this.isOpen = false;
        this.disconnectOutside = null;
        this.imageClass = 'custom-select__image';

        this.init();
    }

    setSelectedValue = (value) => {
        const _options = Array.from(this.select.options);
        const optionToSelect = _options.find(item => item.value === value);
        optionToSelect.selected = true;
    }

    createValueImage = (image) => {
        return convertStringToHtml(this.renderImage(image.getAttribute('src')));
    }

    onChange = (e) => {
        const btn = e.target.closest('button');

        const { value } = btn.dataset;
        const text = btn.textContent;
        const image = btn.querySelector('img');

        this.handleToggle(false);

        this.value = value;
        this.setSelectedValue(value);

        this.options.forEach(option => option.classList.remove('_selected'));
        btn.classList.add('_selected');

        this.valueBtn.querySelector('span._title').textContent = text;

        if (image) {
            this.valueBtn.querySelector(`.${this.imageClass}`)?.remove();
            this.valueBtn.prepend(this.createValueImage(image));
        }

        this.select.dispatchEvent(new CustomEvent('change', {
            detail: {
                image: image ? image.getAttribute('src') : '',
            }
        }));
    }

    onValueClick = () => {
        this.handleToggle(!this.isOpen);
    }

    handleToggle = (isOpen) => {
        this.isOpen = isOpen;
        this.customSelect.classList.toggle('_active', isOpen);
    }

    renderOption(value, label, img = null) {
        return `<button type="button" class="custom-select__option" data-value="${value}">
                    ${img ? `<span class="custom-select__image"><img src="${img}" /></span>` : ``}
                    <span>${label}</span>
                </button>`;
    }

    renderSelect() {
        return `
            <div class="custom-select"></div>
        `;
    }

    renderImage(src) {
        return `
            <span class="custom-select__image"><img src="${src}" /></span>
        `;
    }

    renderValueEl(placeholder) {
        return `
            <button type="button" class="custom-select__value">
                <span class="_title">${placeholder}</span>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 9.5L12 14.5L17 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;
    }

    createSelect() {
        this.customSelect = convertStringToHtml(this.renderSelect());

        const _options = Array.from(this.select.options);

        _options.forEach((option) => {
            if (option.value === '') {
                this.placeholder = option.textContent;
            } else {
                const img = option.dataset.image;
                this.options.push(convertStringToHtml(this.renderOption(option.value, option.textContent, img)))
            }
        });

        this.valueBtn = convertStringToHtml(this.renderValueEl(this.placeholder));

        this.customSelect.append(this.valueBtn);

        this.dropdown = document.createElement('div');
        this.dropdown.classList.add('custom-select__dropdown');
        this.options.forEach(opt => this.dropdown.append(opt));
        this.customSelect.append(this.dropdown);

        this.select.parentNode.appendChild(this.customSelect);
        this.select.classList.add('custom-select__input');
        this.customSelect.append(this.select);
    }

    addEventListeners() {
        this.valueBtn.addEventListener('click', this.onValueClick);

        this.options.forEach(opt => {
           opt.addEventListener('click', this.onChange);
        });

        this.disconnectOutside = outsideClickListener([this.customSelect], () => this.handleToggle(false));

        window.outsides[this.select.name] = this.disconnectOutside;
    }

    init() {
        this.createSelect();
        this.addEventListeners();

        if(!this.placeholder && this.options.length > 0) {
            const _selectedOptionIndex = Array.from(this.select.options).findIndex(item => {
                return item.selected === true;
            });

            this.options[_selectedOptionIndex !== -1 ? _selectedOptionIndex : 0].dispatchEvent(new Event('click'));
        }
    }
}

export default CustomSelect;