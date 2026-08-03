function show(el) { if (el) el.style.display = ''; }
function hide(el) { if (el) el.style.display = 'none'; }

const contato = () => document.querySelector('.contato');
const footer  = () => document.querySelector('footer');

const routes = {
  '/': () => {
    show(document.querySelector('.hero'));
    show(document.querySelector('.portfolio'));
    hide(document.getElementById('store'));
    show(contato());
    show(footer());
  },
  '/store': () => {
    hide(document.querySelector('.hero'));
    hide(document.querySelector('.portfolio'));
    show(document.getElementById('store'));
    hide(contato());
    hide(footer());
    if (typeof fetchStoreProducts === 'function') fetchStoreProducts();
  },
};

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || '/';
  const handler = routes[hash] || routes['/'];
  handler();
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);
