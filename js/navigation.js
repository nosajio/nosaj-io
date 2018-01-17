import $ from './$';
import { store, alias } from './store';
import { addClassName, removeClassName } from './classNames';

// Navigation interactive elements
const toggle = $('.nav-toggle')[0];
const body = document.body;
const menu = $('.nav-menu')[0];
const heading = $('.nav-heading')[0];

// Set up a store instance for the nav
let navStore = store('nav', {
  navActiveClass: 'nav-active',
  navActive: false,
});

// Set up events
registerEventListeners();

// Handle behaviour for when nav store is changed
document.addEventListener('stateChange', ({detail: { key, store }}) => {
  if (key !== 'nav') return;
  const { navActive } = store;
  if (navActive) {
    addClassName(body, 'nav-active')
    addClassName(menu, 'nav-menu--active');
    addClassName(heading, 'nav-heading--active');
  } else {
    removeClassName(body, 'nav-active')
    removeClassName(menu, 'nav-menu--active');
    removeClassName(heading, 'nav-heading--active');
  }
})

function registerEventListeners() {
  toggle.addEventListener('mouseup', event => handleToggle(event), false);
}

function handleToggle(event) {
  navStore.update({ navActive: ! navStore.get('navActive') });
}

console.log(alias('nav'));
