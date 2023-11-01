import outsideClickListener from "../helpers/outsideClickListener.js";

class Tooltip {
    constructor(id, tooltip) {
        this.el = tooltip;
        this.id = id;
        this.btn = this.el.querySelector('.tooltip__icon');

        this.init();
    }

    init() {
        this.btn.addEventListener('click', () => {
            this.el.classList.toggle('_active');
        });

        window.tooltipOutsides[this.id] = outsideClickListener([this.el], () => {
            this.el.classList.remove('_active');
        });
    }
}

export default Tooltip;
