import toggleBodyLock from '../helpers/toggleBodyLock';
import { html } from '../helpers/elementsNodeList';
import Swiper, { Navigation } from 'swiper';

const gallerySwiper = new Swiper('.gallerySwiper', {
  modules: [Navigation],
  observer: true,
  observeParents: true,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const swiper = new Swiper('.mySwiper', {
  spaceBetween: 30,
});

function isWebp() {
  const testWebp = (callback) => {
    const webP = new Image();

    webP.onload = webP.onerror = () => callback(webP.height === 2);
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  };

  testWebp((support) => {
    const className = support ? 'webp' : 'no-webp';
    html.classList.add(className);
  });
}

const fixedNavPage = () => {
  const root = document.querySelector('.fixed-block');
  const section = document.querySelectorAll('.section');
  const lists = document.querySelectorAll('.fixed-block__link');

  function activeLink(li, isYears) {
    const currentClass = isYears ? 'current-year-link' : 'active-nav-link';
    lists.forEach((item) => item.classList.remove(currentClass));
    li.classList.add(currentClass);
  }
  lists.forEach((item) =>
    item.addEventListener('click', function () {
      activeLink(this, this.classList.contains('press-releases__year-btn'));
    })
  );
  if (root) {
    window.onscroll = () => {
      if (!root.classList.contains('press-releases__years')) {
        if (window.scrollY > 70) {
          root.style.opacity = 1;
          root.style.pointerEvents = 'all';
        }
        if (window.scrollY < 70) {
          root.style.opacity = 0;
          root.style.pointerEvents = 'none';
        }
      }
      section.forEach((sec) => {
        const top = window.scrollY;
        const offset = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
          const target = document.querySelector(`[href='#${id}']`);
          activeLink(target, root.classList.contains('press-releases__years'));
        }
      });
    };
  }
};

const togglePopupWindows = () => {
  if (window.innerWidth > 550) {
    document.addEventListener('click', ({ target }) => {
      if (target.closest('[data-type]')) {
        const popup = document.querySelector(
          `[data-popup="${target.dataset.type}"]`
        );

        if (target.dataset.type === 'production-gallery') {
          gallerySwiper.slideTo(target.dataset.slide);
        }

        if (document.querySelector('._is-open')) {
          document.querySelectorAll('._is-open').forEach((modal) => {
            modal.classList.remove('_is-open');
          });
        }

        popup.classList.add('_is-open');
        toggleBodyLock(true);
      }

      if (target.closest('.button-close')) {
        const popup = target.closest('._overlay-bg');

        popup.classList.remove('_is-open');
        toggleBodyLock(false);
      }
    });
  }
};

export { isWebp, togglePopupWindows, fixedNavPage, swiper, gallerySwiper };
