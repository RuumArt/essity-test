export default htmlString => {
    const dom = document.createElement('div');
    dom.innerHTML = htmlString;

    return dom.children[0];
}