const translations = {
  pt: {
    role:         'Engenheiro de Software',
    nav_projects:  'Projetos',
    nav_store:   'Loja',
    hero_bio:      'Tive o prazer de trabalhar em diversos projetos e conhecer pessoas incríveis.<br>Veja alguns dos meus trabalhos!',
    filter_all:    'Todos',
    filter_dev:    'Apps & Dev',
    filter_ai:     'IA & LLMs',
    filter_bots:   'Bots',
    filter_web:    'Web',
    contact_title: 'Entre em contato',
    card_details:  'Ver Detalhes',
    modal_link:    'Acessar Projeto →',
    empty:         'Nenhum projeto encontrado.',
    error:         'Não foi possível carregar os projetos.',
  },
  en: {
    role:         'Software Engineer',
    nav_projects:  'Projects',
    nav_store:   'Store',
    hero_bio:      "I've had the pleasure of working on diverse projects and meeting incredible people.<br>Check out some of my work!",
    filter_all:    'All',
    filter_dev:    'Apps & Dev',
    filter_ai:     'AI & LLMs',
    filter_bots:   'Bots',
    filter_web:    'Web',
    contact_title: 'Get in touch',
    card_details:  'See Details',
    modal_link:    'View Project →',
    empty:         'No projects found.',
    error:         'Failed to load projects.',
  },
};

let currentLang = localStorage.getItem('lang') || 'pt';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update dynamically rendered card overlays
  document.querySelectorAll('.overlay a').forEach(el => {
    el.textContent = translations[lang].card_details;
  });

  if (typeof currentModalProject !== 'undefined' && currentModalProject) {
    document.getElementById('modal-desc').textContent = getDesc(currentModalProject);
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

setLanguage(currentLang);
