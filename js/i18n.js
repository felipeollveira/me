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
    empty:              'Nenhum projeto encontrado.',
    error:              'Não foi possível carregar os projetos.',
    store_title:        'Loja',
    store_subtitle:     'Construídos com código real. Prontos para você usar agora.',
    store_tag_app:      'App',
    store_free:         'Grátis',
    store_btn_play:     'Baixar grátis',
    store_tag_script:   'Script',
    store_tag_template: 'Template',
    store_tag_mentoring:'Mentoria',
    store_tag_ai:       'IA',
    store_btn:          'Quero esse →',
    store_error:        'Algo deu errado ao carregar os produtos.',
    store_retry:        'Tentar novamente',
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
    empty:              'No projects found.',
    error:              'Failed to load projects.',
    store_title:        'Store',
    store_subtitle:     'Built with real code. Ready for you to use right now.',
    store_tag_app:      'App',
    store_free:         'Free',
    store_btn_play:     'Download free',
    store_tag_script:   'Script',
    store_tag_template: 'Template',
    store_tag_mentoring:'Mentoring',
    store_tag_ai:       'AI',
    store_btn:          'I want this →',
    store_error:        'Something went wrong while loading the products.',
    store_retry:        'Try again',
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
