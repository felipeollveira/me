const routes = {
  '/': () => {
    document.querySelector('.hero').style.display = '';
    document.querySelector('.portfolio').style.display = '';
    document.getElementById('store').style.display = 'none';
  },
  '/store': () => {
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.portfolio').style.display = 'none';
    document.getElementById('store').style.display = '';
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
