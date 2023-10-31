import IMask from "imask";

export default () => {
    const inputs = document.querySelectorAll('[data-mask-input]');

    inputs.forEach(input => {
        const maskStr = input.dataset.maskInput;

        IMask(input, {
            mask: maskStr,
        });
    })
}