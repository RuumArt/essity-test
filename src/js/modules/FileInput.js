class FileInput {
    constructor(input) {
        this.el = input;
        this.btn = this.el.querySelector('.file-input__btn');
        this.target = this.el.querySelector('.file-input__target');
        this.list = this.el.querySelector('.file-input__list');


        this.init();
    }

    removeFile = (e, index) => {
        const dt = new DataTransfer();
        const { files } = this.target;

        const item = e.target.closest('.file-input__item');

        for (let i = 0; i < files.length; i += 1) {
            const file = files[i]

            if (index !== i)
                dt.items.add(file)
        }

        item.remove();

        this.target.files = dt.files;

        this.target.dispatchEvent(new CustomEvent('change'))
    }

    createItem = (name, index) => {
        const div = document.createElement('div');
        div.textContent = name;
        div.classList.add('file-input__item');
        div.addEventListener('click', (e) => this.removeFile(e, index));

        return div;
    }

    display = (files) => {
        this.list.innerHTML = '';

        for (let i = 0; i < files.length; i++) {
            this.list.appendChild(this.createItem(files[i].name, i));
        }
    }

    onClick = (e) => {
        e.preventDefault();
        this.target.click();
    }

    onChange = (e) => {
        const { files } = e.target;

        if (this.list) {
            const dt = new DataTransfer()

            for (let i = 0; i < files.length; i += 1) {
                const file = files[i];
                dt.items.add(file);
            }

            this.display(dt.files);

            e.target.onchange = null
            e.target.files = dt.files;
        }
    }

    init() {
        if (this.btn && this.target) {
            this.btn.addEventListener('click', this.onClick);
            this.target.addEventListener('change', this.onChange);
        }
    }
}

export default FileInput;