import {
  isWebp,
  togglePopupWindows,
  fixedNavPage,
  swiper,
  gallerySwiper,
} from './modules';

import BurgerMenu from './modules/BurgerMenu';
import DropDown from './modules/DropDown';

import Tabs from './modules/Tabs';
import Masks from './modules/Masks';
import CustomSelect from "./modules/CustomSelect.js";
import AddressInput from "./modules/AddressInput.js";
import QuestionForm from "./modules/QuestionForm.js";
import AnswerForm from "./modules/AnswerForm.js";
import Modal from "./modules/Modal.js";

window.outsides = {};
window.tooltipOutsides = {};

isWebp();
const burger = new BurgerMenu().init();
const dropdown = new DropDown().init();

swiper.init();
gallerySwiper.init();

togglePopupWindows();
fixedNavPage();

Masks();

const customSelects = document.querySelectorAll('.custom-select');

customSelects.forEach((select) => {
  new CustomSelect(select)
})

const addressInputs = document.querySelectorAll('.address-input');

addressInputs.forEach((input) => {
  new AddressInput(input)
});

const modals = document.querySelectorAll('.js-modal');
window.modals = {};

modals.forEach(modal => {
  const id = modal.getAttribute('id');
  window.modals[id] = new Modal(modal);
});

const questForms = document.querySelectorAll('.js-question-form');

questForms.forEach(form => {
  new QuestionForm(form);
})

const answerForms = document.querySelectorAll('.js-answer-form');

answerForms.forEach(form => {
  new AnswerForm(form);
});


const tabs = new Tabs('stories-page', {});
