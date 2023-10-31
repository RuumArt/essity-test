class BurgerMenu {
  constructor() {
    this.body = document.body;
    this.burgerButton = document.querySelector('.burger-button');
    this.burgerMenu = document.querySelector('.burger-menu');
    this.burgerCross = document.getElementById('burger-cross');
    this.rootElement = document.querySelector('.root');
  }

  init() {
    if (this.burgerButton) {
      this.burgerButton.addEventListener('click', () => {
        this.burgerMenu.children[1].classList.add('menu-open');
        this.burgerMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this.rootElement.style.pointerEvents = 'none';
        this.burgerMenu.style.pointerEvents = 'all';
      });
      this.burgerMenu.addEventListener('click', (event) => {
        if (event.target.classList.contains('burger-menu__left')) {
          this.burgerMenu.children[1].classList.remove('menu-open');
          this.burgerMenu.style.backgroundColor = 'rgba(0, 0, 0, 0)';
          this.rootElement.style.pointerEvents = 'all';
          this.burgerMenu.style.pointerEvents = 'none';
        }
      });
      if (this.burgerCross) {
        this.burgerCross.addEventListener('click', () => {
          this.burgerMenu.children[1].classList.remove('menu-open');
          this.burgerMenu.style.backgroundColor = 'rgba(0, 0, 0, 0)';
          this.rootElement.style.pointerEvents = 'all';
          this.burgerMenu.style.pointerEvents = 'none';
        });
      }
    }
  }
}

export default BurgerMenu;
