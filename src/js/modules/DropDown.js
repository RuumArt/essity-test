class DropDown {
  constructor() {
    this.dropdownItems = document.querySelectorAll('.dropdown');
  }

  init() {
    if (this.dropdownItems.length > 0) {
      this.dropdownItems.forEach((item) => {
        item.firstElementChild.addEventListener('click', ({ target }) => {
          if (target.nextElementSibling.style.display === 'none') {
            target.nextElementSibling.style.display = 'block';
            target.classList.add('rotate180');
            if (target.classList.contains('menu-dropdown__title')) {
              target.classList.add('header-dpdwn-open');
            }
          } else {
            target.nextElementSibling.style.display = 'none';
            target.classList.remove('rotate180');
            if (target.classList.contains('menu-dropdown__title')) {
              target.classList.remove('header-dpdwn-open');
            }
          }
        });
      });
    }
  }
}

export default DropDown;
