import $ from './$';
import { store } from './store';

// Navigation interactive elements
const toggle = $('.nav-toggle')[0];
const menu = $('.nav-menu')[0];

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
    menu.className = 'nav-menu nav-menu--active';
  } else {
    menu.className= 'nav-menu';
  }
})

function registerEventListeners() {
  toggle.addEventListener('mouseup', event => handleToggle(event), false);
}

function handleToggle(event) {
  navStore.update({ navActive: ! navStore.get().navActive });
}
