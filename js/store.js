const STORE_API_URL = 'https://projects-tau-pearl.vercel.app/api/products';

const typeConfig = {
  app:       { label: 'store_tag_app',      icon: 'fab fa-google-play' },
  script:    { label: 'store_tag_script',   icon: 'fab fa-python'      },
  template:  { label: 'store_tag_template', icon: 'fab fa-android'     },
  mentoring: { label: 'store_tag_mentoring',icon: 'fas fa-video'       },
  ai:        { label: 'store_tag_ai',       icon: 'fas fa-robot'       },
};

function formatPrice(product) {
  if (product.free) return `<span class="store-price store-price--free" data-i18n="store_free">Grátis</span>`;
  return `<span class="store-price">R$ ${product.price}</span>`;
}

function renderBuyBtn(product) {
  if (product.type === 'app') {
    return `
      <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="store-btn store-btn--play">
        <i class="fab fa-google-play"></i> ${translations[currentLang].store_btn_play}
      </a>`;
  }
  return `<a href="${product.link}" target="_blank" rel="noopener noreferrer" class="store-btn">${translations[currentLang].store_btn}</a>`;
}

function renderStoreCard(product) {
  const config = typeConfig[product.type] || typeConfig.script;
  const isApp = product.type === 'app';
  const desc = currentLang === 'en' && product.description_en ? product.description_en : product.description;
  const title = currentLang === 'en' && product.title_en ? product.title_en : product.title;

  return `
    <div class="store-card">
      <div class="store-card-img ${isApp ? 'store-card-img--app' : ''}">
        ${product.image
          ? `<img src="${product.image}" alt="${title}">`
          : `<i class="${config.icon}"></i>`}
      </div>
      <div class="store-card-body">
        <span class="store-tag">${translations[currentLang][config.label]}</span>
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="store-card-footer">
          ${formatPrice(product)}
          ${renderBuyBtn(product)}
        </div>
      </div>
    </div>`;
}

function renderSkeletons(grid, count = 3) {
  grid.innerHTML = Array.from({ length: count }, () => `
    <div class="store-skeleton skeleton-item">
      <div class="store-skeleton-img"></div>
      <div class="store-skeleton-body">
        <div class="store-skeleton-tag"></div>
        <div class="store-skeleton-title"></div>
        <div class="store-skeleton-text"></div>
        <div class="store-skeleton-text" style="width:70%"></div>
        <div class="store-skeleton-footer">
          <div class="store-skeleton-price"></div>
          <div class="store-skeleton-btn"></div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderError(grid) {
  const t = translations[currentLang];
  grid.innerHTML = `
    <div class="store-error">
      <i class="fas fa-exclamation-circle"></i>
      <p>${t.store_error}</p>
      <button class="store-retry-btn" onclick="fetchStoreProducts()">${t.store_retry}</button>
    </div>
  `;
}

async function fetchStoreProducts() {
  const grid = document.getElementById('store-grid');
  if (!grid) return;

  renderSkeletons(grid);

  try {
    const res = await fetch(STORE_API_URL);
    if (!res.ok) throw new Error(res.status);

    const products = await res.json();
    grid.innerHTML = products.map(renderStoreCard).join('');
  } catch (err) {
    console.error('Falha ao carregar produtos:', err);
    renderError(grid);
  }
}
