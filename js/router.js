function show(el) { if (el) el.style.display = ''; }
function hide(el) { if (el) el.style.display = 'none'; }

const sel = id => document.getElementById(id);
const qs  = cls => document.querySelector(cls);

const routes = {
  '/': () => {
    show(qs('.hero'));
    show(qs('.portfolio'));
    hide(sel('store'));
    hide(sel('links'));
    show(qs('.contato'));
    show(qs('footer'));
  },
  '/store': () => {
    hide(qs('.hero'));
    hide(qs('.portfolio'));
    show(sel('store'));
    hide(sel('links'));
    hide(qs('.contato'));
    hide(qs('footer'));
    if (typeof fetchStoreProducts === 'function') fetchStoreProducts();
  },
  '/links': () => {
    hide(qs('.hero'));
    hide(qs('.portfolio'));
    hide(sel('store'));
    show(sel('links'));
    hide(qs('.contato'));
    hide(qs('footer'));
  },
};

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || '/';
  const handler = routes[hash] || routes['/'];
  handler();
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', { page_path: hash });
  }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);
