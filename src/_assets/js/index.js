// eslint-disable-next-line import/extensions
import Switcher from './color-theme-toggle.js';

const switcher = new Switcher(document.querySelector('[data-theme-switcher]'));
console.log(switcher);

switcher.init();
