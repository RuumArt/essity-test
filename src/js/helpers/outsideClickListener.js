export default (elements, cb, event = 'click') => {
    const handle = (e) => {
        const targets = [];

        elements.forEach(element => {
            if (element.contains(e.target)) {
                targets.push(true);
            }
        });

        if(targets.length === 0) {
            cb();
        }
    }

    window.addEventListener(event, handle);

    return () => {
        window.removeEventListener(event, handle);
    }
}