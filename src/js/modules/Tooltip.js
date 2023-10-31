import outsideClickListener from "../helpers/outsideClickListener.js";

class Tooltip {
    constructor(tooltip) {
        this.el = tooltip;
        this.btn = this.el.querySelector('.tooltip__icon');

        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => {
            this.el.classList.toggle('_active');
        });

        outsideClickListener([this.el], () => {
            this.el.classList.remove('_active');
        });
    }
}

export default Tooltip;